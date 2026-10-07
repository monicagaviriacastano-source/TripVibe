# Estado — 2026-10-07

## Hecho

- Prototipo React: pantallas + modales (aportar, votar, crear viaje, invitar).
- Aporte suma por `member.id`. Crear viaje reemplaza y empieza vacío.
- Filtros del buscador: pantalla `filtros`.
- Copy UI unificado: viaje / parche / alcancía / voto (`contexto/design.md`).
- Home: registro en un toque (simulado).
- Abrir: `./scripts/abrir.sh`.
- «Lo más buscado» abre `viaje-destacado` (ejemplo por destino). No reemplaza el viaje ni la alcancía.

## Pendiente

- Backend / persistencia / auth: no existen (a propósito).
- Lista de varios viajes: no. Crear sigue reemplazando.
- README describe el prototipo (ya no es la plantilla de AI Studio).

## Blockers

- `localhost:3000` no persiste. Volver a correr `./scripts/abrir.sh`.
