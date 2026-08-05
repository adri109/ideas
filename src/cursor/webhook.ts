import type { Config } from "../config.js";
import type { CursorWebhookPayload } from "../types.js";

export class CursorWebhookClient {
  constructor(private readonly config: Config) {}

  async send(payload: CursorWebhookPayload): Promise<void> {
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
