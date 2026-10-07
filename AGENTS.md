# TripVibe — control del agente

App mobile-first (React 19 + Vite + Tailwind 4) para viajes grupales: alcancía compartida, votaciones e itinerario. Copy en español (CO). Moneda: COP. Origen: Google AI Studio; prototipo frontend.

Dueña: Monik (Designer). Trabajar en código, iterar UI, verificar en browser.

## Memoria (no el chat)

El context window es caro y volátil. La memoria real vive en archivos.

- Nunca cargar todo el historial ni todos los archivos del proyecto.
- Cargar solo lo estrictamente necesario para la tarea actual.
- Preferir referenciar archivos antes que copiar contenido largo al prompt.
- Convertir procedimientos repetitivos en skills reutilizables.
- Mantener este archivo ≤ 300 líneas, alta densidad.
- Al final de cada sesión importante: actualizar `state/`, registrar decisiones, comprimir lo valioso en `logs/`, y correr `skills/actualizar-contexto.md`.

**No leer:** `node_modules/`, `.vite/`, lockfiles, URLs largas de `lh3.googleusercontent.com`, `HomeScreen.tsx` entero (salvo la tarea sea esa pantalla), `mockData.ts` entero (usar tipos + el recorte que haga falta).

## Lectura por tipo de tarea

Siempre: este archivo + `reglas.md` + `state/actual.md`.

| Tarea | Leer además |
| --- | --- |
| UI / layout / tokens | `contexto/design.md`, `src/index.css` (`@theme`), pantalla o modal concreto |
| Flujo / pantallas / estado | `src/App.tsx`, `src/types/trip.ts`, `src/components/BottomNav.tsx` |
| Datos de ejemplo | recorte de `src/data/mockData.ts` (MAIN_TRIP / miembros), no el archivo completo |
| Decisión de producto | `contexto/decisiones.md` + `decisions/` reciente |
| Bug / rareza | `gotchas/` |
| Cerrar sesión | `skills/actualizar-contexto.md` |

Punteros: `contexto/` (design, decisiones, reglas de producto) · `decisions/` · `state/` · `gotchas/` · `logs/` · `skills/` · `reglas.md`.

## Skills

| Cuándo | Skill |
| --- | --- |
| Cerrar sesión importante (no cada mensaje) | `skills/actualizar-contexto.md` |
| Procedimiento que se repite 2+ veces | extraer a `skills/<nombre>.md` y enlazarlo aquí en una línea |

## Stack real

- Arranque: `src/main.tsx` → `src/App.tsx`. Sin router: `currentScreen` + `history`.
- Estado del viaje: un `Trip` en `useState` (`MAIN_TRIP` inicial). Modales globales en App.
- Pantallas: `inicio` `buscar` `detalle-viaje` `alcancia` `parche` `perfil` `landing`. Default: `inicio` (landing no es el entry).
- Nav inferior: Inicio, Buscar, + crear, Alcancía, Perfil. Header con back: `detalle-viaje`, `parche` y también `alcancia` (es tab y stack a la vez; ver `gotchas/alcancia-header-stack.md`).
- Datos: solo mock en memoria. Recarga = reset. `@google/genai` está en package.json y **no se usa**.
- Dev: `npm run dev` → puerto **3000**, host `0.0.0.0`. Lint: `tsc --noEmit`.
- Layout: `max-w-lg` / `max-w-md`, `pb-28` por nav, `pt-16` por header sticky.

## Invariantes (detalle en `reglas.md`)

- No backend, persistencia ni auth “de verdad” salvo que Monik lo pida.
- No sustituir el modelo de un solo `trip` en App sin decisión explícita.
- Tokens: `src/index.css` `@theme`. No paleta paralela.
- Copy ES-CO; plata en COP; tono “parche / alcancía”. Vocabulario UI: `contexto/design.md`.
- Verificar UI en browser (flujo, no solo screenshot).
- No commits ni push salvo pedido explícito.
- No meter secretos en git.

## Definition of Done

- Cambio acotado a lo pedido; archivos de memoria solo si la sesión lo merece.
- UI: flujo real en browser + rutas/estados que comparten el estado tocado + vacíos/errores si aplica + viewport mobile si cambió layout.
- Tipos en `src/types/trip.ts` si cambió la forma de datos.
- Si hubo decisión o gotcha: archivo corto en `decisions/` o `gotchas/`.
- Sesión importante: skill de actualizar contexto.

## Arranque de sesión (agente)

1. Este archivo ya entra en el turno: no releerlo. Sí leer `reglas.md` + `state/actual.md` si aún no están.
2. Pregunta de Monik → un archivo de `contexto/` o `gotchas/` si aplica.
3. Código mínimo. No re-auditar el repo.
