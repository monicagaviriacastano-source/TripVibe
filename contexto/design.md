# Design — TripVibe

Fuente de tokens: `src/index.css` `@theme`. No duplicar hex aquí salvo ancla.

## Marca y tono

- Nombre: TripVibe. Voz: parche colombiano, directo, cálido. No corporativo.
- Idioma UI: español. Montos: COP. Chip de moneda en header.
- Producto: viaje grupal + alcancía + votos + itinerario.

## Vocabulario UI

- **Viaje** = el plan. **Parche** = la gente. **Alcancía** = la plata. **Voto** = la decisión.
- *Squad* solo como nombre propio del parche, nunca en labels, CTAs ni tabs.
- Plata: **Aportar**, **Meta**, **Saldo**. No “pagar” hasta que haya un gasto real.
- CTAs: verbo + objeto corto (`Crear parche`, `Aportar`, `Votar`). Tú + el parche.
- No prometer fideicomiso, garantía ni backend. Placeholders = ejemplo (Barichara, COP).

## Color (anclas)

- Surface: `#fcf9f8`. Texto: `#1b1c1c`.
- Primary teal: `#2a685e` / container `#a8e6d9`.
- Acción / acento naranja: `#fc8a40` (FAB crear, pulsos).
- Secondary texto: `#9b4500`. Cream: `#FFFBF0`.
- Selección: `#a8e6d9` sobre `#00201b`.

## Tipo

- Escala: H1 20px, H2 16px, párrafo 14px. Entre secciones, 24px (`space-y-6`).
- Botones: 48px de alto; texto 14px en móvil y 16px desde 768px.
- Labels de la barra inferior: 12px en móvil y 14px desde 768px.
- Headline: Plus Jakarta Sans (`font-headline-*`).
- Body: Inter (`font-body-*`, `font-caption`).
- Números/plata: Space Mono (`font-label-numeric-*`). Captions y montos pueden ir bajo 14px.
- Iconos: trazo, color principal `#2a685e`, grosor 1.5px, 24×24. Sobre un botón de color sólido van en blanco. En «¿Qué tan importante es para ti?» cada prioridad lleva ese mismo icono de trazo junto al nombre.

## Layout

- Mobile-first, columna `max-w-lg` (contenido) / `max-w-md` (nav).
- Header fixed `h-16` + `pt-safe`. Main `pt-16`. Contenido `pb-28`.
- Nav: píldora blanca blur, FAB naranja que sobresale (`-mt-5`).
- Tab activo: fondo `#a8e6d9`, texto `#2b695f`.
- Radios grandes (`rounded-2xl` / `rounded-full`). Sombras suaves; naranja en el FAB.

## Patrón de pantallas

- Tabs: Inicio, Buscar, Alcancía, Perfil.
- Stack: Detalle viaje, Parche (back en header).
- Modales: aportar, votar, crear, invitar — estado en App, no en cada screen.
- En el detalle de lo más buscado, «Armar con el parche» abre un modal: elige un grupo de ejemplo y manda el plan por WhatsApp. No reserva. En Cancún la foto es un carrusel deslizable.
- Home sin cuenta: invitación a entrar (Google, WhatsApp, Facebook). No muestra parche, viajes ni alcancía. El header lleva ícono de perfil, sin foto. Es simulación.
- Después de las prioridades, Entrar abre la cuenta. «Saltar por ahora» también abre entrar, sin avión. La X sigue como invitado. Un toque simula Google, WhatsApp o Facebook. Crear cuenta pide email y clave (solo en esa pantalla), luego «Revisar correo»: no sale ningún mensaje. Cualquier ingreso (también «Ya activé mi cuenta») muestra unos segundos el logo flotando, sin el recuadro blanco («Espera unos segundos mientras cargamos tu próximo viaje») y después el inicio autenticado. Sigue siendo simulación.
- Home con cuenta: saludo con nombre, parche activo, viajes y alcancía.
- Filtros: el destino se ve en blanco y negro hasta elegirlo. Al elegirlo pasa a color, se marca en el mapa y el enlace abre ese lugar en Google Maps.
