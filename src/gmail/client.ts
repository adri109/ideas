import { readFile, writeFile } from "node:fs/promises";
import { google, type gmail_v1 } from "googleapis";
import type { Config } from "../config.js";
import type { NormalizedEmail } from "../types.js";

const SCOPES = [
  "https://www.googleapis.com/auth/gmail.readonly",
  "https://www.googleapis.com/auth/gmail.modify",
];

export class GmailService {
  private client: gmail_v1.Gmail | null = null;

  constructor(private readonly config: Config) {}

  async getClient(): Promise<gmail_v1.Gmail> {
    if (this.client) return this.client;

    const credentials = JSON.parse(
      await readFile(this.config.GMAIL_CREDENTIALS_PATH, "utf8"),
    );

    const { client_secret, client_id, redirect_uris } =
      credentials.installed ?? credentials.web;

    const oAuth2Client = new google.auth.OAuth2(
      client_id,
      client_secret,
      redirect_uris?.[0],
    );

    try {
      const token = JSON.parse(
        await readFile(this.config.GMAIL_TOKEN_PATH, "utf8"),
      );
      oAuth2Client.setCredentials(token);
    } catch {
      throw new Error(
        `Missing OAuth token at ${this.config.GMAIL_TOKEN_PATH}. Run: npm run watch:setup`,
      );
    }

    this.client = google.gmail({ version: "v1", auth: oAuth2Client });
    return this.client;
  }

  async setupWatch(): Promise<{ historyId?: string | null; expiration?: string | null }> {
    const gmail = await this.getClient();
    const response = await gmail.users.watch({
      userId: this.config.GMAIL_USER_ID,
      requestBody: {
        topicName: this.config.PUBSUB_TOPIC,
        labelIds: ["INBOX"],
      },
    });
    return {
      historyId: response.data.historyId,
      expiration: response.data.expiration,
    };
  }

  async listMessagesSinceHistory(
    startHistoryId: string,
  ): Promise<string[]> {
    const gmail = await this.getClient();
    const messageIds: string[] = [];
    let pageToken: string | undefined;

    do {
      const response = await gmail.users.history.list({
        userId: this.config.GMAIL_USER_ID,
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

  async getMessage(messageId: string): Promise<NormalizedEmail | null> {
    const gmail = await this.getClient();
    const response = await gmail.users.messages.get({
      userId: this.config.GMAIL_USER_ID,
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

export async function saveToken(
  tokenPath: string,
  token: Record<string, unknown>,
): Promise<void> {
  await writeFile(tokenPath, JSON.stringify(token, null, 2), "utf8");
}

export function getOAuthUrl(config: Config): Promise<string> {
  return readFile(config.GMAIL_CREDENTIALS_PATH, "utf8").then((raw) => {
    const credentials = JSON.parse(raw);
    const { client_secret, client_id, redirect_uris } =
      credentials.installed ?? credentials.web;

    const oAuth2Client = new google.auth.OAuth2(
      client_id,
      client_secret,
      redirect_uris?.[0],
    );

    return oAuth2Client.generateAuthUrl({
      access_type: "offline",
      scope: SCOPES,
      prompt: "consent",
    });
  });
}

export async function exchangeCodeForToken(
  config: Config,
  code: string,
): Promise<Record<string, unknown>> {
  const credentials = JSON.parse(
    await readFile(config.GMAIL_CREDENTIALS_PATH, "utf8"),
  );
  const { client_secret, client_id, redirect_uris } =
    credentials.installed ?? credentials.web;

  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris?.[0],
  );

  const { tokens } = await oAuth2Client.getToken(code);
  await saveToken(config.GMAIL_TOKEN_PATH, tokens as Record<string, unknown>);
  return tokens as Record<string, unknown>;
}
