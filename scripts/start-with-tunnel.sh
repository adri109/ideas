#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."
CLOUDFLARED="${CLOUDFLARED:-$HOME/.local/bin/cloudflared}"
LOG="/tmp/cloudflared.log"

mkdir -p "$HOME/.local/bin"

if [[ ! -x "$CLOUDFLARED" ]]; then
  echo "Instalando cloudflared..."
  curl -fsSL https://github.com/cloudflare/cloudflared/releases/download/2024.12.2/cloudflared-linux-amd64 -o "$CLOUDFLARED"
  chmod +x "$CLOUDFLARED"
fi

# Arrancar servidor si no está activo
if ! curl -sf http://localhost:3000/health >/dev/null 2>&1; then
  echo "Arrancando servidor en :3000..."
  npm run dev &
  sleep 3
fi

# Arrancar túnel
pkill -f "cloudflared tunnel --url http://localhost:3000" 2>/dev/null || true
sleep 1
"$CLOUDFLARED" tunnel --url http://localhost:3000 2>&1 | tee "$LOG" &
sleep 4

URL=$(rg -o 'https://[a-z0-9-]+\.trycloudflare\.com' "$LOG" | head -1 || true)

if [[ -z "$URL" ]]; then
  echo "No se pudo obtener la URL del túnel. Revisa $LOG"
  exit 1
fi

echo ""
echo "✓ App disponible en: $URL"
echo ""
echo "Añade en Google Cloud → Credentials → Redirect URIs:"
echo "  ${URL}/auth/google/callback"
echo ""
echo "Actualiza .env:"
echo "  BASE_URL=$URL"
echo "  GOOGLE_REDIRECT_URI=${URL}/auth/google/callback"
