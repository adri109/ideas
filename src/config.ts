import { z } from "zod";

const envSchema = z.object({
  PORT: z.coerce.number().default(3000),
  HOST: z.string().default("0.0.0.0"),
  BASE_URL: z.string().url().default("http://localhost:3000"),
  SESSION_SECRET: z
    .string()
    .min(16, "SESSION_SECRET debe tener al menos 16 caracteres"),
  GMAIL_CREDENTIALS_PATH: z.string().default("./credentials.json"),
  GMAIL_TOKEN_DIR: z.string().default("./data/tokens"),
  GOOGLE_REDIRECT_URI: z.string().url().optional(),
  PUBSUB_TOPIC: z.string().optional(),
  CURSOR_WEBHOOK_URL: z.string().url().optional(),
  CURSOR_WEBHOOK_TOKEN: z.string().optional(),
  PROCESSED_STORE_PATH: z.string().default("./data/processed.json"),
  PUBSUB_AUDIENCE: z.string().optional(),
});

export type Config = z.infer<typeof envSchema> & {
  GOOGLE_REDIRECT_URI: string;
};

export function loadConfig(): Config {
  const parsed = envSchema.safeParse(process.env);
  if (!parsed.success) {
    const details = parsed.error.issues
      .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
      .join("\n");
    throw new Error(`Invalid configuration:\n${details}`);
  }

  const data = parsed.data;
  return {
    ...data,
    GOOGLE_REDIRECT_URI:
      data.GOOGLE_REDIRECT_URI ?? `${data.BASE_URL}/auth/google/callback`,
  };
}

export function isCursorConfigured(config: Config): boolean {
  return Boolean(config.CURSOR_WEBHOOK_URL && config.CURSOR_WEBHOOK_TOKEN);
}

export function isPubsubConfigured(config: Config): boolean {
  return Boolean(config.PUBSUB_TOPIC);
}
