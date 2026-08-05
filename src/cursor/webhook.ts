import type { Config } from "../config.js";
import type { CursorWebhookPayload } from "../types.js";

export class CursorWebhookClient {
  constructor(private readonly config: Config) {}

  isConfigured(): boolean {
    return Boolean(
      this.config.CURSOR_WEBHOOK_URL && this.config.CURSOR_WEBHOOK_TOKEN,
    );
  }

  async send(payload: CursorWebhookPayload): Promise<void> {
    if (!this.config.CURSOR_WEBHOOK_URL || !this.config.CURSOR_WEBHOOK_TOKEN) {
      throw new Error("Cursor webhook no configurado. Añade CURSOR_WEBHOOK_URL y CURSOR_WEBHOOK_TOKEN en .env");
    }

    const response = await fetch(this.config.CURSOR_WEBHOOK_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.config.CURSOR_WEBHOOK_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const body = await response.text();
      throw new Error(
        `Cursor webhook failed (${response.status}): ${body || response.statusText}`,
      );
    }
  }
}
