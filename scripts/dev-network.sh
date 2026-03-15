#!/bin/zsh

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
PORT="${PORT:-3000}"
BIND_HOST="0.0.0.0"

load_root_env() {
  local env_file="${ROOT_DIR}/.env"
  local line=""
  local key=""
  local value=""

  if [[ ! -f "$env_file" ]]; then
    return 0
  fi

  while IFS= read -r line || [[ -n "$line" ]]; do
    line="${line%$'\r'}"

    if [[ -z "$line" || "$line" == \#* ]]; then
      continue
    fi

    key="${line%%=*}"
    value="${line#*=}"

    if [[ -z "$key" ]]; then
      continue
    fi

    export "$key=$value"
  done < "$env_file"
}

ensure_prisma_client() {
  if [[ -f "${ROOT_DIR}/node_modules/.prisma/client/index.js" ]]; then
    return 0
  fi

  echo "Prisma client is missing. Generating it now..."
  cd "$ROOT_DIR"
  pnpm db:generate >/dev/null
}

detect_ip() {
  local ip=""

  ip="$(ipconfig getifaddr en0 2>/dev/null || true)"
  if [[ -z "$ip" ]]; then
    ip="$(ipconfig getifaddr en1 2>/dev/null || true)"
  fi
  if [[ -z "$ip" ]]; then
    ip="$(
      ifconfig 2>/dev/null \
        | awk '/inet / && $2 != "127.0.0.1" { print $2; exit }'
    )"
  fi

  printf '%s' "$ip"
}

LAN_IP="$(detect_ip)"

load_root_env
ensure_prisma_client

if [[ -z "$LAN_IP" ]]; then
  echo "Unable to determine a local network IP address."
  echo "Set NEXTAUTH_URL manually and run: pnpm --filter @tripsync/web dev -- --hostname 0.0.0.0 --port $PORT"
  exit 1
fi

export NEXTAUTH_URL="http://${LAN_IP}:${PORT}"

echo ""
echo "Trip Sync dev server will bind to ${BIND_HOST}:${PORT}"
echo "Open it on this machine: http://localhost:${PORT}"
echo "Open it on your local network: ${NEXTAUTH_URL}"
echo ""

cd "$ROOT_DIR"
pnpm --filter @tripsync/web exec next dev --hostname "$BIND_HOST" --port "$PORT"
