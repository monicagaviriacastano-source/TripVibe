# 2026-09-23 — Tabs vs stack

**Decisión:** BottomNav = inicio, buscar, crear, alcancía, perfil. `detalle-viaje` y `parche` son stack (flecha atrás). Default de app = `inicio`, no `landing`.

**Por qué:** Alcancía es destino frecuente; el parche es detalle del viaje, no tab raíz.

**Consecuencia:** No añadir Parche al nav sin actualizar `Header` `isStackScreen` y estas notas.
