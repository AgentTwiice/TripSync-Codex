#!/bin/zsh

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
PORT="${PORT:-3000}"

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

load_root_env
ensure_prisma_client

cd "$ROOT_DIR"
pnpm --filter @tripsync/web exec next start --hostname 0.0.0.0 --port "$PORT"
