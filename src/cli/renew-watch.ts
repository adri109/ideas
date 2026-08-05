import { loadConfig } from "../config.js";
import { GmailService } from "../gmail/client.js";
import { TokenStore } from "../auth/token-store.js";

async function main() {
  const config = loadConfig();
  const tokenStore = new TokenStore(config.GMAIL_TOKEN_DIR);
  const email = await tokenStore.getPrimaryEmail();

  if (!email) {
    console.error("No hay cuenta conectada. Inicia sesión en la app web primero.");
    process.exit(1);
  }

  const gmail = new GmailService(config, tokenStore);
  const watch = await gmail.setupWatch(email);

  console.log("Gmail watch renovado correctamente para", email);
  console.log("  historyId:", watch.historyId);
  console.log("  expiration:", watch.expiration);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
