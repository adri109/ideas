# Configuración de Gmail + Pub/Sub

Esta guía describe cómo conectar Gmail con `gmail-inbox-agent`.

## 1. Proyecto en Google Cloud

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un proyecto (o usa uno existente)
3. Activa las APIs:
   - **Gmail API**
   - **Cloud Pub/Sub API**

## 2. Credenciales OAuth

1. Ve a **APIs & Services → Credentials**
2. Crea **OAuth client ID** (tipo Desktop o Web)
3. Descarga el JSON y guárdalo como `credentials.json` en la raíz del proyecto
4. En **OAuth consent screen**, añade tu cuenta como usuario de prueba

Scopes necesarios:

- `https://www.googleapis.com/auth/gmail.readonly`
- `https://www.googleapis.com/auth/gmail.modify`

## 3. Tema Pub/Sub

```bash
gcloud pubsub topics create gmail-inbox
```

Otorga permiso de publicación a Gmail:

```bash
gcloud pubsub topics add-iam-policy-binding gmail-inbox \
  --member="serviceAccount:gmail-api-push@system.gserviceaccount.com" \
  --role="roles/pubsub.publisher"
```

Anota el nombre completo del tema:

```
projects/TU_PROYECTO/topics/gmail-inbox
```

Ponlo en `.env` como `PUBSUB_TOPIC`.

## 4. Suscripción push

Cuando tengas el servicio desplegado con URL pública:

```bash
gcloud pubsub subscriptions create gmail-inbox-push \
  --topic=gmail-inbox \
  --push-endpoint=https://tu-dominio.com/pubsub/gmail \
  --ack-deadline=30
```

Para desarrollo local, usa un túnel (ngrok, Cloudflare Tunnel):

```bash
ngrok http 3000
# Usa la URL https://xxxx.ngrok.io/pubsub/gmail como push-endpoint
```

## 5. OAuth y watch de Gmail

```bash
cp .env.example .env
# Completa CURSOR_WEBHOOK_URL, CURSOR_WEBHOOK_TOKEN, PUBSUB_TOPIC

npm install
npm run watch:setup
```

Este comando:

1. Te pide autorizar la app en el navegador
2. Guarda `token.json`
3. Llama a `users.watch` para empezar a recibir notificaciones

## 6. Automatización en Cursor

1. Crea automatización en [cursor.com/automations/new](https://cursor.com/automations/new)
2. Trigger: **Webhook**
3. Repositorio: ninguno
4. Herramientas: MCP Gmail, Linear, Send to Slack
5. Copia URL y token a `.env`
6. Pega el prompt de `prompts/cursor-automation.md`

## 7. Probar el flujo

1. Arranca el servidor: `npm run dev`
2. Envía un correo de prueba a tu inbox
3. Verifica logs del servidor
4. Revisa la ejecución del agente en [cursor.com/agents](https://cursor.com/agents)

### Prueba manual del webhook de Cursor

```bash
curl -X POST http://localhost:3000/webhook/test \
  -H "Content-Type: application/json" \
  -d '{
    "source": "gmail",
    "messageId": "test-123",
    "threadId": "test-123",
    "from": "test@example.com",
    "to": "tu@gmail.com",
    "subject": "Prueba de clasificación",
    "receivedAt": "2026-08-04T14:30:00.000Z",
    "bodyText": "Por favor revisa el contrato antes del viernes.",
    "labels": ["INBOX"],
    "gmailLink": "https://mail.google.com/mail/u/0/#inbox/test-123"
  }'
```

## 8. Renovación del watch

El watch expira en ~7 días. Programa:

```bash
npm run watch:renew
```

Con cron semanal o Cloud Scheduler apuntando a un job que ejecute ese comando.

## Troubleshooting

| Problema | Solución |
|----------|----------|
| No llegan notificaciones | Verifica suscripción push y que el endpoint sea HTTPS público |
| `Invalid configuration` | Revisa `.env` — todos los campos obligatorios |
| `Missing OAuth token` | Ejecuta `npm run watch:renew` |
| Duplicados en Cursor | El store en `data/processed.json` evita reprocesar; bórralo solo si sabes lo que haces |
| Watch expirado | `npm run watch:renew` |
