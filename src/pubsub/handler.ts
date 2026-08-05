import type { Config } from "../config.js";
import { GmailService } from "../gmail/client.js";
import { CursorWebhookClient } from "../cursor/webhook.js";
import { ProcessedStore } from "../store/processed.js";
import type { GmailPushNotification, PubSubPushMessage } from "../types.js";

export class InboxProcessor {
  constructor(
    private readonly config: Config,
    private readonly gmail: GmailService,
    private readonly cursor: CursorWebhookClient,
    private readonly store: ProcessedStore,
  ) {}

  decodePubSubMessage(body: PubSubPushMessage): GmailPushNotification | null {
    const encoded = body.message?.data;
    if (!encoded) return null;

    const decoded = Buffer.from(encoded, "base64").toString("utf8");
    return JSON.parse(decoded) as GmailPushNotification;
  }

  async handlePubSubNotification(
    body: PubSubPushMessage,
    userEmail: string,
  ): Promise<{
    processed: number;
    skipped: number;
    historyId: string | null;
  }> {
    if (!this.cursor.isConfigured()) {
      throw new Error("Cursor webhook no configurado");
    }

    const notification = this.decodePubSubMessage(body);
    if (!notification?.historyId) {
      return { processed: 0, skipped: 0, historyId: null };
    }

    await this.store.load();
    const previousHistoryId = this.store.getLastHistoryId();

    if (!previousHistoryId) {
      await this.store.setLastHistoryId(notification.historyId);
      return {
        processed: 0,
        skipped: 0,
        historyId: notification.historyId,
      };
    }

    const messageIds = await this.gmail.listMessagesSinceHistory(
      userEmail,
      previousHistoryId,
    );

    let processed = 0;
    let skipped = 0;

    for (const messageId of messageIds) {
      if (this.store.has(messageId)) {
        skipped += 1;
        continue;
      }

      const email = await this.gmail.getMessage(userEmail, messageId);
      if (!email) {
        skipped += 1;
        continue;
      }

      await this.cursor.send({
        source: "gmail-inbox-agent",
        triggeredAt: new Date().toISOString(),
        email,
      });

      await this.store.add(messageId);
      processed += 1;
    }

    await this.store.setLastHistoryId(notification.historyId);

    return {
      processed,
      skipped,
      historyId: notification.historyId,
    };
  }
}
