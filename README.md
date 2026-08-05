# Gmail Inbox Agent

Middleware que conecta **Gmail** con **automatizaciones de Cursor Agents** mediante webhooks.

Cuando llega un correo a tu bandeja de entrada:

1. Gmail notifica a **Google Pub/Sub**
2. Este servicio recibe el push, lee el correo vía Gmail API
3. Normaliza el contenido y hace `POST` al webhook de tu automatización en Cursor
4. El Cloud Agent clasifica el correo y crea tareas (Linear, Slack, etiquetas Gmail, etc.)

## Arquitectura

```
Gmail Inbox
    │
    ▼
Gmail API (users.watch)
    │
    ▼
Google Pub/Sub (push)
    │
    ▼
gmail-inbox-agent  ──POST──▶  Cursor Automation Webhook
    │                                    │
    │                                    ▼
    │                            Cloud Agent (clasifica + actúa)
    ▼
data/processed.json (deduplicación)
```

## Repositorio

Este proyecto está pensado para vivir en **`adri109/gmail-inbox-agent`**.

Si el repositorio aún no existe en GitHub:

1. Créalo vacío en [github.com/new](https://github.com/new) con el nombre `gmail-inbox-agent`
2. Ejecuta:

```bash
chmod +x scripts/push-to-new-repo.sh
./scripts/push-to-new-repo.sh
```

## Conectar con Cursor (MCP)

Cursor puede leer tu bandeja directamente desde el chat. Guía completa en [`docs/cursor-mcp.md`](docs/cursor-mcp.md).

El proyecto incluye `.cursor/mcp.json` — al abrirlo en Cursor, tendrás herramientas como `list_inbox`, `get_email` y `search_emails`.

**Requisito:** haber iniciado sesión en la app web al menos una vez.

## Requisitos

- Node.js 20+
- Proyecto en Google Cloud con Gmail API y Pub/Sub activados
- Credenciales OAuth de Gmail (`credentials.json`)
- Automatización en Cursor con trigger **Webhook**

## Inicio rápido

```bash
cp .env.example .env
# Edita .env: SESSION_SECRET, credentials.json, etc.

npm install
npm run dev           # Abre http://localhost:3000
```

**Lo primero que verás es la pantalla de inicio de sesión con Google.** Tras conectar tu cuenta, accederás al panel de control para activar la vigilancia de la bandeja.

### Rutas principales

| Método | Ruta | Descripción |
|--------|------|-------------|
| `GET` | `/` | Pantalla de login (o redirige al panel) |
| `GET` | `/auth/google` | Inicia OAuth con Google |
| `GET` | `/auth/google/callback` | Callback de Google |
| `GET` | `/dashboard` | Panel de control (requiere sesión) |
| `GET` | `/health` | Estado del servicio |
| `POST` | `/pubsub/gmail` | Recibe push de Google Pub/Sub |
| `POST` | `/webhook/test` | Envía un payload de prueba a Cursor |

## Configuración de Google Cloud

Guía detallada en [`docs/setup-gmail-pubsub.md`](docs/setup-gmail-pubsub.md).

Resumen:

1. Crear proyecto en Google Cloud
2. Activar **Gmail API** y **Cloud Pub/Sub**
3. Crear tema Pub/Sub (ej. `gmail-inbox`)
4. Dar permiso de publicación a `gmail-api-push@system.gserviceaccount.com`
5. Crear suscripción **push** apuntando a `https://tu-dominio.com/pubsub/gmail`
6. Descargar credenciales OAuth y guardarlas como `credentials.json`

## Configuración de Cursor

1. Crea una automatización en [cursor.com/automations](https://cursor.com/automations)
2. Trigger: **Webhook** (sin repositorio)
3. Herramientas: MCP Gmail, Linear/Notion, Send to Slack
4. Copia la URL y el token `crsr_...` a tu `.env`
5. Usa el prompt de [`prompts/cursor-automation.md`](prompts/cursor-automation.md)

## Payload enviado a Cursor

```json
{
  "source": "gmail-inbox-agent",
  "triggeredAt": "2026-08-04T14:30:00.000Z",
  "email": {
    "source": "gmail",
    "messageId": "18f3a2b1c4d5e6f7",
    "threadId": "18f3a2b1c4d5e6f7",
    "from": "cliente@empresa.com",
    "to": "tu@gmail.com",
    "subject": "Revisión contrato Q3",
    "receivedAt": "2026-08-04T14:30:00.000Z",
    "bodyText": "Hola, necesito que revises...",
    "labels": ["INBOX", "UNREAD"],
    "gmailLink": "https://mail.google.com/mail/u/0/#inbox/18f3a2b1c4d5e6f7"
  }
}
```

## Docker

```bash
docker build -t gmail-inbox-agent .
docker run --env-file .env -p 3000:3000 \
  -v $(pwd)/credentials.json:/app/credentials.json \
  -v $(pwd)/token.json:/app/token.json \
  -v $(pwd)/data:/app/data \
  gmail-inbox-agent
```

## Renovación del watch

El watch de Gmail expira cada ~7 días. Programa un cron:

```bash
# Cada domingo a las 3:00
0 3 * * 0 cd /ruta/al/proyecto && npm run watch:renew
```

## Desarrollo

```bash
npm run typecheck
npm run build
npm start
```

## Licencia

MIT
