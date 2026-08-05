import "dotenv/config";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { loadConfig } from "../config.js";
import { GmailService } from "../gmail/client.js";
import { TokenStore } from "../auth/token-store.js";

function textResult(data: unknown) {
  return {
    content: [{ type: "text" as const, text: JSON.stringify(data, null, 2) }],
  };
}

function markdownResult(text: string) {
  return {
    content: [{ type: "text" as const, text }],
  };
}

async function main() {
  const config = loadConfig();
  const tokenStore = new TokenStore(config.GMAIL_TOKEN_DIR);
  const gmail = new GmailService(config, tokenStore);

  async function requireAccount(): Promise<string> {
    const email = await tokenStore.getPrimaryEmail();
    if (!email) {
      throw new Error(
        "No hay cuenta de Gmail conectada. Abre la app web e inicia sesión con Google primero.",
      );
    }
    return email;
  }

  const server = new McpServer({
    name: "gmail-inbox-agent",
    version: "0.1.0",
  });

  server.registerResource(
    "inbox",
    "gmail://inbox",
    {
      description: "Resumen en markdown de la bandeja de entrada de Gmail",
      mimeType: "text/markdown",
    },
    async () => {
      const email = await requireAccount();
      const messages = await gmail.listInbox(email, 25);
      const lines = [
        `# Bandeja de entrada — ${email}`,
        "",
        `Última actualización: ${new Date().toISOString()}`,
        "",
        ...messages.map(
          (m, i) =>
            `## ${i + 1}. ${m.subject}\n- **De:** ${m.from}\n- **Fecha:** ${m.receivedAt}\n- **ID:** ${m.messageId}\n- **Preview:** ${m.snippet}\n`,
        ),
      ];
      return {
        contents: [
          {
            uri: "gmail://inbox",
            mimeType: "text/markdown",
            text: lines.join("\n"),
          },
        ],
      };
    },
  );

  server.registerTool(
    "list_inbox",
    {
      description:
        "Lista los correos de la bandeja de entrada de Gmail del usuario conectado",
      inputSchema: {
        limit: z
          .number()
          .min(1)
          .max(50)
          .optional()
          .describe("Número de correos a devolver (por defecto 25)"),
      },
    },
    async ({ limit }) => {
      const email = await requireAccount();
      const messages = await gmail.listInbox(email, limit ?? 25);
      return textResult({ account: email, count: messages.length, messages });
    },
  );

  server.registerTool(
    "get_email",
    {
      description: "Obtiene el contenido completo de un correo por su messageId",
      inputSchema: {
        messageId: z.string().describe("ID del mensaje de Gmail"),
      },
    },
    async ({ messageId }) => {
      const email = await requireAccount();
      const message = await gmail.getMessage(email, messageId);
      if (!message) {
        return markdownResult(`Correo no encontrado: ${messageId}`);
      }
      return markdownResult(
        [
          `# ${message.subject}`,
          "",
          `**De:** ${message.from}`,
          `**Para:** ${message.to}`,
          `**Fecha:** ${message.receivedAt}`,
          `**Enlace:** ${message.gmailLink}`,
          "",
          "---",
          "",
          message.bodyText || "(sin contenido de texto)",
        ].join("\n"),
      );
    },
  );

  server.registerTool(
    "search_emails",
    {
      description:
        "Busca correos en Gmail usando la sintaxis de búsqueda de Gmail (ej: from:cliente@empresa.com, is:unread)",
      inputSchema: {
        query: z.string().describe("Consulta de búsqueda de Gmail"),
        limit: z
          .number()
          .min(1)
          .max(50)
          .optional()
          .describe("Número máximo de resultados (por defecto 25)"),
      },
    },
    async ({ query, limit }) => {
      const email = await requireAccount();
      const messages = await gmail.searchInbox(email, query, limit ?? 25);
      return textResult({
        account: email,
        query,
        count: messages.length,
        messages,
      });
    },
  );

  server.registerTool(
    "get_connected_account",
    {
      description: "Devuelve la cuenta de Gmail conectada actualmente",
      inputSchema: {},
    },
    async () => {
      const email = await requireAccount();
      const stored = await tokenStore.load(email);
      return textResult({
        email,
        connectedAt: stored?.updatedAt ?? null,
      });
    },
  );

  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((error) => {
  console.error("MCP server error:", error);
  process.exit(1);
});
