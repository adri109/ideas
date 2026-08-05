#!/usr/bin/env bash
set -euo pipefail

DEST="/workspace/credentials.json"

search_dirs=(
  "/workspace/Downloads"
  "/workspace/downloads"
  "$HOME/Downloads"
  "/workspace"
)

patterns=(
  "client_secret*.json"
  "credentials.json"
  "*oauth*.json"
)

found=""

for dir in "${search_dirs[@]}"; do
  [[ -d "$dir" ]] || continue
  for pattern in "${patterns[@]}"; do
    match=$(find "$dir" -maxdepth 1 -name "$pattern" -type f 2>/dev/null | head -1 || true)
    if [[ -n "$match" && "$match" != "$DEST" ]]; then
      found="$match"
      break 2
    fi
  done
done

if [[ -z "$found" ]]; then
  echo "No se encontró ningún JSON de Google OAuth."
  echo "Sube el archivo a /workspace/Downloads/ y vuelve a ejecutar este script."
  exit 1
fi

cp "$found" "$DEST"
chmod 600 "$DEST"
echo "Credenciales copiadas desde: $found"
echo "Destino: $DEST"

if command -v node >/dev/null && [[ -f "$DEST" ]]; then
  node -e "
    const fs = require('fs');
    const data = JSON.parse(fs.readFileSync('$DEST', 'utf8'));
    const web = data.web || data.installed;
    if (!web?.client_id) throw new Error('JSON inválido: falta client_id');
    console.log('OK: client_id encontrado');
  "
fi
