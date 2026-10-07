#!/bin/sh
# Abre el prototipo aunque Node no esté en el PATH del Mac.
set -eu

ROOT="$(CDPATH= cd -- "$(dirname "$0")/.." && pwd)"
STABLE="${HOME}/.local/tripvibe-node"
TMP_NODE="/tmp/tripvibe-node"

if command -v node >/dev/null 2>&1; then
  NODE="$(command -v node)"
elif [ -x "${STABLE}/bin/node" ]; then
  NODE="${STABLE}/bin/node"
elif [ -x "${TMP_NODE}/bin/node" ]; then
  mkdir -p "${HOME}/.local"
  rm -rf "${STABLE}"
  cp -R "${TMP_NODE}" "${STABLE}"
  NODE="${STABLE}/bin/node"
else
  echo "No hay Node en este Mac."
  echo "Instala Node 22, o deja la carpeta ${STABLE} en su sitio, y vuelve a correr ./scripts/abrir.sh"
  exit 1
fi

export PATH="$(dirname "$NODE"):${PATH}"
cd "$ROOT"
exec "$NODE" "$ROOT/scripts/dev.mjs"
