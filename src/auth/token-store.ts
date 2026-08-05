import { mkdir, readFile, writeFile, unlink } from "node:fs/promises";
import { join } from "node:path";

export interface StoredTokens {
  email: string;
  tokens: Record<string, unknown>;
  updatedAt: string;
}

export class TokenStore {
  constructor(private readonly directory: string) {}

  private pathFor(email: string): string {
    const safe = Buffer.from(email).toString("base64url");
    return join(this.directory, `${safe}.json`);
  }

  async save(email: string, tokens: Record<string, unknown>): Promise<void> {
    await mkdir(this.directory, { recursive: true });
    const record: StoredTokens = {
      email,
      tokens,
      updatedAt: new Date().toISOString(),
    };
    await writeFile(this.pathFor(email), JSON.stringify(record, null, 2), "utf8");
  }

  async load(email: string): Promise<StoredTokens | null> {
    try {
      const raw = await readFile(this.pathFor(email), "utf8");
      return JSON.parse(raw) as StoredTokens;
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === "ENOENT") return null;
      throw error;
    }
  }

  async delete(email: string): Promise<void> {
    try {
      await unlink(this.pathFor(email));
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
    }
  }

  async getPrimaryEmail(): Promise<string | null> {
    const { readdir } = await import("node:fs/promises");
    try {
      const files = await readdir(this.directory);
      const jsonFiles = files.filter((f) => f.endsWith(".json"));
      if (jsonFiles.length === 0) return null;
      const raw = await readFile(join(this.directory, jsonFiles[0]!), "utf8");
      return (JSON.parse(raw) as StoredTokens).email;
    } catch {
      return null;
    }
  }
}
