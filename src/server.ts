import { serve } from "@hono/node-server";
import { Hono } from "hono";
import type { Config } from "./config.js";
import { GmailService } from "./gmail/client.js";
import { CursorWebhookClient } from "./cursor/webhook.js";
import { ProcessedStore } from "./store/processed.js";
import { InboxProcessor } from "./pubsub/handler.js";
import type { PubSubPushMessage } from "./types.js";

export function createApp(config: Config) {
  const app = new Hono();
  const gmail = new GmailService(config);
  const cursor = new CursorWebhookClient(config);
  const store = new ProcessedStore(config.PROCESSED_STORE_PATH);
  const processor = new InboxProcessor(config, gmail, cursor, store);

  app.get("/health", (c) =>
    c.json({
      status: "ok",
      service: "gmail-inbox-agent",
      timestamp: new Date().toISOString(),
    }),
  );

  app.post("/pubsub/gmail", async (c) => {
    try {
      const body = (await c.req.json()) as PubSubPushMessage;
      const result = await processor.handlePubSubNotification(body);

      return c.json({
        ok: true,
        ...result,
      });
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

  app.post("/webhook/test", async (c) => {
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
      console.log(`  Health:  GET  /health`);
      console.log(`  Pub/Sub: POST /pubsub/gmail`);
      console.log(`  Test:    POST /webhook/test`);
    },
  );
}
