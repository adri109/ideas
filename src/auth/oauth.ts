import { readFile } from "node:fs/promises";
import { google } from "googleapis";
import type { Config } from "../config.js";

export const GOOGLE_SCOPES = [
  "openid",
  "email",
  "profile",
  "https://www.googleapis.com/auth/gmail.readonly",
  "https://www.googleapis.com/auth/gmail.modify",
  "https://www.googleapis.com/auth/gmail.send",
];

export async function createOAuthClient(config: Config) {
  const credentials = JSON.parse(
    await readFile(config.GMAIL_CREDENTIALS_PATH, "utf8"),
  );

  const web = credentials.web ?? credentials.installed;
  if (!web?.client_id || !web?.client_secret) {
    throw new Error(
      "credentials.json debe ser de tipo Web application con client_id y client_secret",
    );
  }

  return new google.auth.OAuth2(
    web.client_id,
    web.client_secret,
    config.GOOGLE_REDIRECT_URI,
  );
}

export async function getGoogleAuthUrl(config: Config, state: string): Promise<string> {
  const client = await createOAuthClient(config);
  return client.generateAuthUrl({
    access_type: "offline",
    scope: GOOGLE_SCOPES,
    prompt: "consent",
    state,
    include_granted_scopes: true,
  });
}

export async function exchangeGoogleCode(
  config: Config,
  code: string,
): Promise<Record<string, unknown>> {
  const client = await createOAuthClient(config);
  const { tokens } = await client.getToken(code);
  return tokens as Record<string, unknown>;
}

export async function getGmailProfile(
  config: Config,
  tokens: Record<string, unknown>,
): Promise<{ email: string }> {
  const client = await createOAuthClient(config);
  client.setCredentials(tokens);
  const gmail = google.gmail({ version: "v1", auth: client });
  const profile = await gmail.users.getProfile({ userId: "me" });
  const email = profile.data.emailAddress;
  if (!email) throw new Error("No se pudo obtener el email de la cuenta de Google");
  return { email };
}
