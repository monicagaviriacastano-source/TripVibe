# Dev server

**Síntoma:** `ERR_CONNECTION_REFUSED` en `http://localhost:3000/`.

**Causa:** Vite no queda corriendo entre sesiones. Este Mac no tiene Node en el PATH.

**Remedio:** `./scripts/abrir.sh`. Usa Node del sistema si existe; si no, `~/.local/tripvibe-node` (copia estable). Si esa carpeta no está y `/tmp/tripvibe-node` sí, el script la copia. No relanzar si ya hay proceso en el puerto 3000.
