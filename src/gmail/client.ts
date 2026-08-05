import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";
import { google, type gmail_v1 } from "googleapis";
import type { Config } from "../config.js";
import type { NormalizedEmail, InboxMessage } from "../types.js";
import { createOAuthClient } from "../auth/oauth.js";
import { TokenStore } from "../auth/token-store.js";

export class GmailService {
  private clients = new Map<string, gmail_v1.Gmail>();

  constructor(
    private readonly config: Config,
    private readonly tokenStore: TokenStore,
  ) {}

  async getClient(email: string): Promise<gmail_v1.Gmail> {
    const cached = this.clients.get(email);
    if (cached) return cached;

    const stored = await this.tokenStore.load(email);
    if (!stored) {
      throw new Error(`No hay sesión de Gmail para ${email}. Inicia sesión de nuevo.`);
    }

    const auth = await createOAuthClient(this.config);
    auth.setCredentials(stored.tokens);
    auth.on("tokens", async (tokens) => {
      const merged = { ...stored.tokens, ...tokens };
      await this.tokenStore.save(email, merged);
    });

    const client = google.gmail({ version: "v1", auth });
    this.clients.set(email, client);
    return client;
  }

  async setupWatch(
    email: string,
  ): Promise<{ historyId?: string | null; expiration?: string | null }> {
    if (!this.config.PUBSUB_TOPIC) {
      throw new Error("PUBSUB_TOPIC no está configurado en .env");
    }

    const gmail = await this.getClient(email);
    const response = await gmail.users.watch({
      userId: "me",
      requestBody: {
        topicName: this.config.PUBSUB_TOPIC,
        labelIds: ["INBOX"],
      },
    });
    return {
      historyId: response.data.historyId,
      expiration: response.data.expiration
        ? new Date(Number(response.data.expiration)).toISOString()
        : null,
    };
  }

  async listInbox(email: string, maxResults = 25): Promise<InboxMessage[]> {
    const gmail = await this.getClient(email);
    const list = await gmail.users.messages.list({
      userId: "me",
      labelIds: ["INBOX"],
      maxResults,
    });

    const ids = (list.data.messages ?? [])
      .map((m) => m.id)
      .filter((id): id is string => Boolean(id));

    const messages = await Promise.all(
      ids.map(async (id) => {
        const response = await gmail.users.messages.get({
          userId: "me",
          id,
          format: "metadata",
          metadataHeaders: ["From", "Subject", "Date"],
        });

        const msg = response.data;
        const headers = msg.payload?.headers ?? [];
        const getHeader = (name: string) =>
          headers.find((h) => h.name?.toLowerCase() === name.toLowerCase())
            ?.value ?? "";

        const receivedAt = msg.internalDate
          ? new Date(Number(msg.internalDate)).toISOString()
          : new Date().toISOString();

        return {
          messageId: id,
          from: getHeader("From") || "(desconocido)",
          subject: getHeader("Subject") || "(sin asunto)",
          snippet: msg.snippet ?? "",
          receivedAt,
          isUnread: (msg.labelIds ?? []).includes("UNREAD"),
          gmailLink: `https://mail.google.com/mail/u/0/#inbox/${id}`,
        } satisfies InboxMessage;
      }),
    );

    return messages;
  }

  async listMessagesSinceHistory(
    email: string,
    startHistoryId: string,
  ): Promise<string[]> {
    const gmail = await this.getClient(email);
    const messageIds: string[] = [];
    let pageToken: string | undefined;

    do {
      const response = await gmail.users.history.list({
        userId: "me",
        startHistoryId,
        historyTypes: ["messageAdded"],
        pageToken,
      });

      for (const record of response.data.history ?? []) {
        for (const added of record.messagesAdded ?? []) {
          const id = added.message?.id;
          if (id) messageIds.push(id);
        }
      }

      pageToken = response.data.nextPageToken ?? undefined;
    } while (pageToken);

    return [...new Set(messageIds)];
  }

  async getMessage(
    email: string,
    messageId: string,
  ): Promise<NormalizedEmail | null> {
    const gmail = await this.getClient(email);
    const response = await gmail.users.messages.get({
      userId: "me",
      id: messageId,
      format: "full",
    });

    const message = response.data;
    if (!message.id || !message.threadId) return null;

    const headers = message.payload?.headers ?? [];
    const getHeader = (name: string) =>
      headers.find((h) => h.name?.toLowerCase() === name.toLowerCase())
        ?.value ?? "";

    const bodyText = extractBodyText(message.payload);
    const receivedAt = message.internalDate
      ? new Date(Number(message.internalDate)).toISOString()
      : new Date().toISOString();

    return {
      source: "gmail",
      messageId: message.id,
      threadId: message.threadId,
      from: getHeader("From"),
      to: getHeader("To"),
      subject: getHeader("Subject") || "(sin asunto)",
      receivedAt,
      bodyText,
      labels: message.labelIds ?? [],
      gmailLink: `https://mail.google.com/mail/u/0/#inbox/${message.id}`,
    };
  }
}

function extractBodyText(
  payload: gmail_v1.Schema$MessagePart | undefined,
): string {
  if (!payload) return "";

  if (payload.body?.data) {
    return decodeBase64Url(payload.body.data);
  }

  const plain = payload.parts?.find((part) => part.mimeType === "text/plain");
  if (plain?.body?.data) {
    return decodeBase64Url(plain.body.data);
  }

  const html = payload.parts?.find((part) => part.mimeType === "text/html");
  if (html?.body?.data) {
    return stripHtml(decodeBase64Url(html.body.data));
  }

  for (const part of payload.parts ?? []) {
    const nested = extractBodyText(part);
    if (nested) return nested;
  }

  return "";
}

function decodeBase64Url(data: string): string {
  const normalized = data.replace(/-/g, "+").replace(/_/g, "/");
  return Buffer.from(normalized, "base64").toString("utf8");
}

function stripHtml(html: string): string {
  return html
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function createOAuthState(secret: string): string {
  const nonce = randomBytes(16).toString("hex");
  const sig = createHmac("sha256", secret).update(nonce).digest("hex");
  return `${nonce}.${sig}`;
}

export function verifyOAuthState(secret: string, state: string): boolean {
  const [nonce, sig] = state.split(".");
  if (!nonce || !sig) return false;
  const expected = createHmac("sha256", secret).update(nonce).digest("hex");
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}
