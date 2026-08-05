import { z } from "zod";

const envSchema = z.object({
  PORT: z.coerce.number().default(3000),
  HOST: z.string().default("0.0.0.0"),
  GMAIL_CREDENTIALS_PATH: z.string().default("./credentials.json"),
  GMAIL_TOKEN_PATH: z.string().default("./token.json"),
  GMAIL_USER_ID: z.string().default("me"),
  PUBSUB_TOPIC: z.string().min(1, "PUBSUB_TOPIC is required"),
  CURSOR_WEBHOOK_URL: z.string().url("CURSOR_WEBHOOK_URL must be a valid URL"),
  CURSOR_WEBHOOK_TOKEN: z
    .string()
    .min(1, "CURSOR_WEBHOOK_TOKEN is required"),
  PROCESSED_STORE_PATH: z.string().default("./data/processed.json"),
  PUBSUB_AUDIENCE: z.string().optional(),
});

export type Config = z.infer<typeof envSchema>;

export function loadConfig(): Config {
  const parsed = envSchema.safeParse(process.env);
  if (!parsed.success) {
    const details = parsed.error.issues
      .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
      .join("\n");
    throw new Error(`Invalid configuration:\n${details}`);
  }
  return parsed.data;
}
