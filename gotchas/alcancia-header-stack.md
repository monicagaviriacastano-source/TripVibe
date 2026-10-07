# Alcancía: tab y back a la vez

**Síntoma:** En Alcancía el header muestra flecha atrás, igual que Detalle y Parche.

**Causa:** `BottomNav` navega a `alcancia`. `Header` mete `alcancia` en `isStackScreen` junto con `detalle-viaje` y `parche`.

**Remedio:** Dejarlo. Quitar el back es un cambio de nav: decisión en `decisions/` + `Header` + estas notas.
