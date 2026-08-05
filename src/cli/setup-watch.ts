import { createInterface } from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { loadConfig } from "../config.js";
import {
  exchangeCodeForToken,
  getOAuthUrl,
  GmailService,
} from "../gmail/client.js";

async function main() {
  const config = loadConfig();
  const authUrl = await getOAuthUrl(config);

  console.log("1. Abre esta URL en el navegador y autoriza la app:\n");
  console.log(authUrl);
  console.log("\n2. Pega el código de autorización aquí:");

  const rl = createInterface({ input, output });
  const code = await rl.question("> ");
  rl.close();

  const tokens = await exchangeCodeForToken(config, code.trim());
  console.log("\nToken guardado en", config.GMAIL_TOKEN_PATH);
  console.log("Scopes:", tokens.scope);

  const gmail = new GmailService(config);
  const watch = await gmail.setupWatch();
  console.log("\nWatch configurado:");
  console.log("  historyId:", watch.historyId);
  console.log("  expiration:", watch.expiration);
  console.log(
    "\nRecuerda renovar el watch cada ~7 días con: npm run watch:renew",
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
