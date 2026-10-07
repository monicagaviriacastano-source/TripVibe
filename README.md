# TripVibe

Prototipo mobile-first para organizar un viaje en grupo: el plan, la gente, la plata y las decisiones. La interfaz está en español (Colombia) y los montos en pesos colombianos (COP).

## Qué puedes probar

- Ver el viaje, el itinerario y el detalle del plan.
- Buscar destinos y abrir un viaje destacado de ejemplo.
- Aportar a la alcancía compartida y ver el saldo del parche.
- Votar, invitar gente y crear un viaje nuevo.
- Recorrer el registro simulado en un toque.

Crear un viaje **reemplaza** el viaje de ejemplo y empieza vacío. No hay una lista de varios viajes.

## Estado

Es un prototipo de frontend. Los datos viven en memoria: al recargar la página vuelven al ejemplo inicial. No hay backend, cuentas reales ni persistencia.

`@google/genai` está en las dependencias y **no se usa**. No hace falta una clave de Gemini para correr la app.

## Stack

React 19, Vite, TypeScript y Tailwind CSS 4.

## Requisitos

- Node.js 22
- pnpm (el repo incluye `pnpm-lock.yaml`)

## Cómo correrlo

```bash
pnpm install
pnpm dev
```

Abre [http://localhost:3000](http://localhost:3000).

Si en este Mac Node no está en el `PATH`:

```bash
./scripts/abrir.sh
```

## Scripts

| Comando | Qué hace |
| --- | --- |
| `pnpm dev` | Servidor de desarrollo en el puerto 3000 |
| `pnpm lint` | Revisa tipos con `tsc --noEmit` |
| `pnpm build` | Genera la carpeta `dist` |
| `pnpm preview` | Sirve el build local |

## Vocabulario

En la interfaz, **viaje** es el plan, **parche** es la gente, **alcancía** es la plata y **voto** es la decisión.
