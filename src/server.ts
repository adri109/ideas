import { serve } from "@hono/node-server";
import { Hono } from "hono";
import type { Config } from "./config.js";
import { isCursorConfigured, isPubsubConfigured } from "./config.js";
import { GmailService, createOAuthState, verifyOAuthState } from "./gmail/client.js";
import { CursorWebhookClient } from "./cursor/webhook.js";
import { ProcessedStore } from "./store/processed.js";
import { InboxProcessor } from "./pubsub/handler.js";
import type { PubSubPushMessage } from "./types.js";
import { SessionManager } from "./auth/session.js";
import { TokenStore } from "./auth/token-store.js";
import {
  exchangeGoogleCode,
  getGmailProfile,
  getGoogleAuthUrl,
} from "./auth/oauth.js";
import { requireAuth } from "./auth/middleware.js";
import { inboxPage, loginPage, messagePage } from "./views/pages.js";

type AppVariables = {
  userEmail: string;
};

export function createApp(config: Config) {
  const app = new Hono<{ Variables: AppVariables }>();
  const sessions = new SessionManager(config.SESSION_SECRET);
  const tokenStore = new TokenStore(config.GMAIL_TOKEN_DIR);
  const gmail = new GmailService(config, tokenStore);
  const cursor = new CursorWebhookClient(config);
  const store = new ProcessedStore(config.PROCESSED_STORE_PATH);
  const processor = new InboxProcessor(config, gmail, cursor, store);
  const auth = requireAuth(sessions);

  app.get("/health", (c) =>
    c.json({
      status: "ok",
      service: "gmail-inbox-agent",
      timestamp: new Date().toISOString(),
    }),
  );

  app.get("/", (c) => {
    const session = sessions.getSession(c);
    if (!session) return c.html(loginPage());
    return c.redirect("/inbox");
  });

  app.get("/auth/google", async (c) => {
    const state = createOAuthState(config.SESSION_SECRET);
    const url = await getGoogleAuthUrl(config, state);
    return c.redirect(url);
  });

  app.get("/auth/google/callback", async (c) => {
    const code = c.req.query("code");
    const state = c.req.query("state");
    const error = c.req.query("error");

    if (error) {
      return c.html(
        loginPage("Google rechazó la autorización. Inténtalo de nuevo."),
        400,
      );
    }

    if (!code || !state || !verifyOAuthState(config.SESSION_SECRET, state)) {
      return c.html(
        loginPage("Sesión de autorización inválida. Vuelve a iniciar sesión."),
        400,
      );
    }

    try {
      const tokens = await exchangeGoogleCode(config, code);
      const { email } = await getGmailProfile(config, tokens);
      await tokenStore.save(email, tokens);
      sessions.setSession(c, email);
      return c.redirect("/inbox");
    } catch (err) {
      console.error("OAuth callback error:", err);
      return c.html(
        loginPage(
          err instanceof Error
            ? err.message
            : "Error al conectar con Google",
        ),
        500,
      );
    }
  });

  app.post("/auth/logout", async (c) => {
    const session = sessions.getSession(c);
    if (session) await tokenStore.delete(session.email);
    sessions.clearSession(c);
    return c.redirect("/");
  });

  app.get("/inbox", auth, async (c) => {
    const email = c.get("userEmail");
    try {
      const messages = await gmail.listInbox(email);
      return c.html(
        inboxPage({
          email,
          messages,
          cursorConfigured: isCursorConfigured(config),
          pubsubConfigured: isPubsubConfigured(config),
        }),
      );
    } catch (err) {
      return c.html(
        inboxPage({
          email,
          messages: [],
          cursorConfigured: isCursorConfigured(config),
          pubsubConfigured: isPubsubConfigured(config),
          error: err instanceof Error ? err.message : "Error al cargar la bandeja",
        }),
        500,
      );
    }
  });

  app.get("/inbox/:messageId", auth, async (c) => {
    const email = c.get("userEmail");
    const messageId = c.req.param("messageId");
    if (!messageId) return c.redirect("/inbox");

    try {
      const message = await gmail.getMessage(email, messageId);
      if (!message) {
        return c.html(
          messagePage({
            email,
            message: {
              from: "",
              to: "",
              subject: "No encontrado",
              receivedAt: new Date().toISOString(),
              bodyText: "",
              gmailLink: "#",
            },
            error: "Correo no encontrado",
          }),
          404,
        );
      }

      return c.html(
        messagePage({
          email,
          message: {
            from: message.from,
            to: message.to,
            subject: message.subject,
            receivedAt: message.receivedAt,
            bodyText: message.bodyText,
            gmailLink: message.gmailLink,
          },
        }),
      );
    } catch (err) {
      return c.html(
        messagePage({
          email,
          message: {
            from: "",
            to: "",
            subject: "Error",
            receivedAt: new Date().toISOString(),
            bodyText: "",
            gmailLink: "#",
          },
          error: err instanceof Error ? err.message : "Error al cargar el correo",
        }),
        500,
      );
    }
  });

  app.get("/api/inbox", auth, async (c) => {
    const email = c.get("userEmail");
    try {
      const limit = Number(c.req.query("limit") ?? 25);
      const messages = await gmail.listInbox(email, Math.min(limit, 50));
      return c.json({ account: email, count: messages.length, messages });
    } catch (err) {
      return c.json(
        { error: err instanceof Error ? err.message : "Error" },
        500,
      );
    }
  });

  app.get("/api/inbox/:messageId", auth, async (c) => {
    const email = c.get("userEmail");
    const messageId = c.req.param("messageId");
    if (!messageId) return c.json({ error: "messageId required" }, 400);

    try {
      const message = await gmail.getMessage(email, messageId);
      if (!message) return c.json({ error: "Not found" }, 404);
      return c.json(message);
    } catch (err) {
      return c.json(
        { error: err instanceof Error ? err.message : "Error" },
        500,
      );
    }
  });

  app.get("/dashboard", auth, (c) => c.redirect("/inbox"));

  app.post("/dashboard/activate-watch", auth, async (c) => {
    const email = c.get("userEmail");

    try {
      const watch = await gmail.setupWatch(email);
      return c.redirect("/inbox?watch=activated");
    } catch (err) {
      return c.redirect(`/inbox?error=${encodeURIComponent(err instanceof Error ? err.message : "Error al activar watch")}`);
    }
  });

  app.post("/pubsub/gmail", async (c) => {
    try {
      const userEmail = await tokenStore.getPrimaryEmail();
      if (!userEmail) {
        return c.json(
          { ok: false, error: "No hay cuenta de Google conectada" },
          503,
        );
      }

      const body = (await c.req.json()) as PubSubPushMessage;
      const result = await processor.handlePubSubNotification(body, userEmail);

      return c.json({ ok: true, ...result });
    } catch (error) {
      console.error("Pub/Sub handler error:", error);
      return c.json(
        {
          ok: false,
          error: error instanceof Error ? error.message : "Unknown error",
        },
        500,
      );
    }
  });

  app.post("/webhook/test", auth, async (c) => {
    try {
      const email = (await c.req.json()) as Parameters<
        CursorWebhookClient["send"]
      >[0]["email"];

      await cursor.send({
        source: "gmail-inbox-agent",
        triggeredAt: new Date().toISOString(),
        email,
      });

      return c.json({ ok: true, message: "Test payload sent to Cursor" });
    } catch (error) {
      return c.json(
        {
          ok: false,
          error: error instanceof Error ? error.message : "Unknown error",
        },
        500,
      );
    }
  });

  return { app, config };
}

export function startServer(config: Config) {
  const { app } = createApp(config);

  serve(
    {
      fetch: app.fetch,
      hostname: config.HOST,
      port: config.PORT,
    },
    (info) => {
      console.log(
        `gmail-inbox-agent listening on http://${info.address}:${info.port}`,
      );
      console.log(`  Login:     GET  /`);
      console.log(`  Google:    GET  /auth/google`);
      console.log(`  Inbox:     GET  /inbox`);
      console.log(`  Health:    GET  /health`);
      console.log(`  Pub/Sub:   POST /pubsub/gmail`);
    },
  );
}
