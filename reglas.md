# Reglas (detectables)

Violar una de estas es un error. No hay normas vagas de “buen diseño”.

1. No inventar API, backend, base de datos, auth o persistencia. El viaje vive en `useState` en `App.tsx`.
2. No leer ni pegar `node_modules/`, lockfiles, `.vite/`, ni el historial completo del chat.
3. No cargar `src/data/mockData.ts` ni `HomeScreen.tsx` enteros si la tarea no es esa zona.
4. No añadir una paleta, fuente o sistema de spacing distinto al de `src/index.css` `@theme`.
5. No cambiar copy a inglés ni moneda fuera de COP salvo pedido explícito.
6. No hacer de `landing` el screen inicial sin decisión escrita.
7. No meter un segundo `Trip` “activo” en App (hoy hay uno). Crear viaje **reemplaza** `MAIN_TRIP`.
8. No commitear, pushear, ni tocar git config salvo que Monik lo pida.
9. No poner `GEMINI_API_KEY` ni secretos en archivos del repo.
10. No declarar UI lista sin verificar el flujo en browser (o decir qué no se pudo verificar).
11. No duplicar navegación: tabs = BottomNav (inicio, buscar, alcancía, perfil) + FAB. Back en header: `detalle-viaje`, `parche` y `alcancia`. No quitar el back de Alcancía sin decisión.
12. El simulador de estados UX de Home se quitó a pedido (2026-10-04). No volver a meterlo.
13. No dejar que `AGENTS.md` pase de 300 líneas. Recortar; no anexar historial.
14. Al cerrar sesión importante, no saltarse `skills/actualizar-contexto.md`.
