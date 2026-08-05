# Opción A: Gmail → Cursor Automation (automático)

Cuando llegue un correo a tu bandeja, un **Cloud Agent de Cursor** se ejecutará solo, lo clasificará y actuará (tareas, Slack, etc.).

```
Correo nuevo
    → Gmail Watch
    → Google Pub/Sub
    → gmail-inbox-agent (/pubsub/gmail)
    → Webhook Cursor
    → Cloud Agent (clasifica + actúa)
```

## Lo que necesitas (3 pasos)

### Paso 1 — Google Pub/Sub (~10 min)

Proyecto: **`project-cea767a6-0d8a-43d9-aca`**

1. Activa [Cloud Pub/Sub API](https://console.cloud.google.com/apis/library/pubsub.googleapis.com?project=project-cea767a6-0d8a-43d9-aca)

2. Crea un **tema** en [Pub/Sub Topics](https://console.cloud.google.com/cloudpubsub/topic/list?project=project-cea767a6-0d8a-43d9-aca):
   - Nombre: `gmail-inbox`

3. Permisos del tema → **Añadir principal**:
   - Principal: `gmail-api-push@system.gserviceaccount.com`
   - Rol: **Pub/Sub Publisher**

4. Crea una **suscripción push** en [Subscriptions](https://console.cloud.google.com/cloudpubsub/subscription/list?project=project-cea767a6-0d8a-43d9-aca):
   - Tema: `gmail-inbox`
   - Tipo: **Push**
   - URL del endpoint (usa tu túnel actual):
     ```
     https://oil-enforcement-allows-coupled.trycloudflare.com/pubsub/gmail
     ```
   - Si el túnel cambia, actualiza esta URL.

5. Añade a tu `.env`:
   ```
   PUBSUB_TOPIC=projects/project-cea767a6-0d8a-43d9-aca/topics/gmail-inbox
   ```

---

### Paso 2 — Automatización en Cursor (~5 min)

1. Ve a [cursor.com/automations/new](https://cursor.com/automations/new)

2. Configura:
   | Campo | Valor |
   |-------|--------|
   | Trigger | **Webhook** |
   | Repositorio | **Ninguno** |
   | Herramientas | Las que uses (Slack, Linear, Notion…) |

3. Copia el prompt de [`prompts/cursor-automation.md`](../prompts/cursor-automation.md)

4. **Guarda** y copia:
   - URL del webhook → `CURSOR_WEBHOOK_URL`
   - Token `crsr_...` → `CURSOR_WEBHOOK_TOKEN`

5. Añade a tu `.env`:
   ```
   CURSOR_WEBHOOK_URL=https://api2.cursor.sh/automations/webhook/TU_ID
   CURSOR_WEBHOOK_TOKEN=crsr_TU_TOKEN
   ```

6. **Reinicia el servidor** (`npm run dev`)

---

### Paso 3 — Activar Gmail Watch

Con `.env` completo y servidor en marcha:

- En la app: **Automatización avanzada → Activar vigilancia de bandeja**
- O en terminal: `npm run watch:renew`

El watch expira cada ~7 días. Programa `npm run watch:renew` en cron semanal.

---

## Probar sin esperar un correo real

Envía un correo de prueba al webhook de Cursor:

```bash
curl -X POST http://localhost:3000/webhook/test \
  -H "Content-Type: application/json" \
  -H "Cookie: TU_COOKIE_DE_SESION" \
  -d '{
    "source": "gmail",
    "messageId": "test-123",
    "threadId": "test-123",
    "from": "test@example.com",
    "to": "adriperezcaspe@gmail.com",
    "subject": "Prueba automatización",
    "receivedAt": "2026-08-05T15:00:00.000Z",
    "bodyText": "Por favor revisa el presupuesto antes del viernes.",
    "labels": ["INBOX"],
    "gmailLink": "https://mail.google.com/mail/u/0/#inbox/test-123"
  }'
```

O revisa la ejecución del agente en [cursor.com/agents](https://cursor.com/agents) tras llegar un correo real.

---

## Importante

| Tema | Detalle |
|------|---------|
| **Túnel Cloudflare** | La URL `*.trycloudflare.com` cambia si reinicias el túnel. Actualiza la suscripción Pub/Sub. |
| **Producción** | Usa un dominio fijo o VPS con HTTPS estable. |
| **Aviso en chat** | El agente actúa en segundo plano; no abre el chat de Cursor en tu Mac. Usa Slack en la automatización para avisos. |
| **Clientes** | No se envía correo a clientes sin tu permiso explícito. |

---

## Checklist rápido

- [ ] Pub/Sub API activada
- [ ] Tema `gmail-inbox` creado
- [ ] Permiso para `gmail-api-push@...`
- [ ] Suscripción push apuntando al túnel `/pubsub/gmail`
- [ ] `PUBSUB_TOPIC` en `.env`
- [ ] Automatización Cursor creada (webhook)
- [ ] `CURSOR_WEBHOOK_URL` y `CURSOR_WEBHOOK_TOKEN` en `.env`
- [ ] Servidor reiniciado
- [ ] Gmail Watch activado
