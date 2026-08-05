# Conectar Gmail Inbox Agent con Cursor

Cursor puede leer tu bandeja de Gmail usando el **servidor MCP** incluido en este proyecto.

## Requisitos

1. Haber iniciado sesión en la app web al menos una vez (para guardar el token en `data/tokens/`)
2. Tener Cursor con soporte MCP activado

## Configuración automática (recomendada)

Este repo incluye `.cursor/mcp.json`. Al abrir el proyecto en Cursor, el servidor MCP debería detectarse automáticamente.

Si no aparece:

1. Abre **Cursor Settings → MCP**
2. Confirma que `gmail-inbox-agent` está listado
3. O añade manualmente en tu `~/.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "gmail-inbox-agent": {
      "command": "npm",
      "args": ["run", "mcp"],
      "cwd": "/ruta/completa/a/gmail-inbox-agent"
    }
  }
}
```

## Herramientas disponibles en Cursor

| Herramienta | Descripción |
|-------------|-------------|
| `list_inbox` | Lista correos de la bandeja de entrada |
| `get_email` | Lee un correo completo por `messageId` |
| `search_emails` | Busca con sintaxis de Gmail (`is:unread`, `from:...`) |
| `get_connected_account` | Muestra la cuenta conectada |

## Recurso MCP

- **`gmail://inbox`** — Resumen markdown de la bandeja (Cursor puede leerlo como contexto)

## Ejemplos de uso en el chat de Cursor

- "Lista mis últimos 10 correos"
- "Busca correos no leídos de esta semana"
- "Lee el correo con id XXXXX"
- "¿Qué correos importantes tengo en la bandeja?"

## Probar el servidor MCP manualmente

```bash
npm run mcp
```

(Usa stdio; se comunica con Cursor, no es interactivo en terminal.)

## API HTTP (opcional)

También puedes consultar la bandeja vía HTTP (misma sesión web):

- `GET /api/inbox` — JSON con la bandeja
- `GET /api/inbox/:messageId` — JSON con un correo

Requiere estar logueado en el navegador (cookie de sesión).
