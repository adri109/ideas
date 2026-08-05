import "dotenv/config";
import { loadConfig } from "./config.js";
import { startServer } from "./server.js";

function main() {
  const config = loadConfig();
  startServer(config);
}

main();
