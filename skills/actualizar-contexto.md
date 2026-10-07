# Skill: actualizar contexto

Correr **al cerrar una sesión importante** (feature, decisión, bug no obvio, cambio de alcance). No en cada mensaje.

## Qué actualizar

1. `state/actual.md` — hecho / pendiente / blockers. Fecha. Borrar ítems ya irrelevantes.
2. `decisions/` — un archivo `YYYY-MM-DD-slug.md` solo si hubo decisión con razonamiento. Una línea en `contexto/decisiones.md`.
3. `logs/` — un resumen ≤ 25 líneas de lo que un agente futuro necesita. No transcribir el chat.
4. `gotchas/` — si apareció un problema + fix concreto.
5. `reglas.md` / `contexto/reglas.md` — solo si cambió una línea roja (misma regla en ambos).
6. `contexto/design.md` — solo si cambió token, layout o patrón visual.

## Cómo mantenerlo corto

- Comprimir logs viejos: fusionar o borrar sesiones cuyo contenido ya está en `state/` o `decisions/`.
- Borrar blockers resueltos y pendientes hechos.
- No copiar código ni historial al prompt; dejar punteros a paths.
- Si `AGENTS.md` ya vino en el turno, no volver a leerlo. Leer `reglas.md` y `state/actual.md` solo si este turno aún no los tiene.
- `AGENTS.md` ≤ 300 líneas. Si crece: mover detalle a `contexto/` o `gotchas/`.
- Un gotcha = un síntoma + una causa + un remedio. Sin narrativa.

## Resultado

Contexto al día y **más corto** que al empezar. El siguiente agente lee `AGENTS.md` + `state/actual.md`, no este chat.
