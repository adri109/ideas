import { loadConfig } from "../config.js";
import { GmailService } from "../gmail/client.js";

async function main() {
  const config = loadConfig();
  const gmail = new GmailService(config);
  const watch = await gmail.setupWatch();

  console.log("Gmail watch renovado correctamente");
  console.log("  historyId:", watch.historyId);
  console.log("  expiration:", watch.expiration);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
