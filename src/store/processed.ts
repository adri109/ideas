import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname } from "node:path";

export class ProcessedStore {
  private ids = new Set<string>();
  private lastHistoryId: string | null = null;
  private loaded = false;

  constructor(private readonly filePath: string) {}

  async load(): Promise<void> {
    if (this.loaded) return;

    try {
      const raw = await readFile(this.filePath, "utf8");
      const data = JSON.parse(raw) as {
        messageIds?: string[];
        lastHistoryId?: string | null;
      };
      this.ids = new Set(data.messageIds ?? []);
      this.lastHistoryId = data.lastHistoryId ?? null;
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== "ENOENT") {
        throw error;
      }
    }

    this.loaded = true;
  }

  has(messageId: string): boolean {
    return this.ids.has(messageId);
  }

  async add(messageId: string): Promise<void> {
    await this.load();
    this.ids.add(messageId);
    await this.persist();
  }

  getLastHistoryId(): string | null {
    return this.lastHistoryId;
  }

  async setLastHistoryId(historyId: string): Promise<void> {
    await this.load();
    this.lastHistoryId = historyId;
    await this.persist();
  }

  private async persist(): Promise<void> {
    await mkdir(dirname(this.filePath), { recursive: true });
    await writeFile(
      this.filePath,
      JSON.stringify(
        {
          messageIds: [...this.ids],
          lastHistoryId: this.lastHistoryId,
        },
        null,
        2,
      ),
      "utf8",
    );
  }
}
