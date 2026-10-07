import { TRENDING_HEROES } from './mockData';

export type FeaturedDay = {
  label: string;
  text: string;
};

export type FeaturedPhoto = {
  src: string;
  alt: string;
};

export type FeaturedTrip = {
  id: string;
  title: string;
  place: string;
  duration: string;
  costCOP: string;
  image: string;
  photos: FeaturedPhoto[];
  vibe: string;
  description: string;
  included: string[];
  days: FeaturedDay[];
  audience: string;
};

const DETAILS: Record<
  string,
  Pick<FeaturedTrip, 'place' | 'description' | 'included' | 'days' | 'audience'> & {
    photos?: FeaturedPhoto[];
  }
> = {
  bali: {
    place: 'Bali, Indonesia',
    description:
      'Canggu para el surf y el café, Ubud para el arrozal y el ritmo lento. El estimado es por persona, en COP, para un parche que quiere playa y selva sin correr.',
    included: [
      'Tiquetes de ejemplo Bogotá–Denpasar',
      'Hospedaje compartido en Canggu y Ubud',
      'Desayunos',
      'Traslados entre los dos pueblos',
      'Una clase de surf',
    ],
    days: [
      {
        label: 'Día 1 · Canggu',
        text: 'Llegas, dejas las maletas y cierras el día en la playa con el atardecer.',
      },
      {
        label: 'Día 2 · Surf',
        text: 'Clase en la mañana y café por Echo Beach. La tarde queda libre para el parche.',
      },
      {
        label: 'Día 3 · Ubud',
        text: 'Arrozales, un mercado y cena en el pueblo. De aquí el plan sigue a tu ritmo.',
      },
    ],
    audience: 'Para un parche de amigos que mezclan playa, surf y un plan sin afán.',
  },
  bariloche: {
    place: 'San Carlos de Bariloche, Argentina',
    description:
      'Lagos, chocolate y un día de cerro. Sirve para ver cómo se sentiría un viaje de frío antes de armarlo con el parche.',
    included: [
      'Tiquetes de ejemplo a Bariloche',
      'Cabaña para el parche',
      'Desayunos',
      'Salida por el Circuito Chico',
      'Un día de trekking o esquí de ejemplo',
    ],
    days: [
      {
        label: 'Día 1 · El centro',
        text: 'Llegada, caminata por el centro y una parada de chocolate caliente.',
      },
      {
        label: 'Día 2 · Circuito Chico',
        text: 'Miradores y una parada larga en el lago. Llevan cámara y algo de abrigo.',
      },
      {
        label: 'Día 3 · El cerro',
        text: 'Trekking o esquí de ejemplo, y en la noche una fondue para el parche.',
      },
    ],
    audience: 'Para amigos a los que les gusta la montaña, el lago y el frío.',
  },
  'euro-trip': {
    place: 'París, Ámsterdam y Berlín',
    description:
      'Tres ciudades unidas por tren. No es un paquete cerrado: es un borrador para que el parche vea el ritmo y el estimado por persona.',
    included: [
      'Tiquetes de ejemplo ida y vuelta',
      'Trenes entre las tres ciudades',
      'Hostal o apartamento compartido',
      'Desayunos',
      'Un pase de ciudad de ejemplo',
    ],
    days: [
      {
        label: 'Día 1 · París',
        text: 'Llegada, el barrio donde se quedan y una caminata al atardecer.',
      },
      {
        label: 'Día 2 · Ámsterdam',
        text: 'Tren en la mañana, canales y un museo corto. La noche es para caminar.',
      },
      {
        label: 'Día 3 · Berlín',
        text: 'Un barrio creativo y comida que elige el parche. El resto del viaje sigue en tren.',
      },
    ],
    audience: 'Para un parche que quiere varias ciudades y no le asusta el tren.',
  },
  'punta-cana': {
    place: 'Punta Cana, República Dominicana',
    description:
      'Resort y mar, con la comida resuelta. El estimado muestra el rango de un todo incluido antes de hablarlo con el parche.',
    included: [
      'Tiquetes de ejemplo',
      'Resort todo incluido',
      'Traslados del aeropuerto al hotel',
      'Un día a Isla Saona de ejemplo',
      'Bebidas del plan del hotel',
    ],
    days: [
      {
        label: 'Día 1 · El resort',
        text: 'Llegada, piscina y la playa del hotel. No hay que armar logística.',
      },
      {
        label: 'Día 2 · Isla Saona',
        text: 'Salida de ejemplo en la mañana y tarde libre para el parche.',
      },
      {
        label: 'Día 3 · Día lento',
        text: 'Hamaca, mar y la cena del plan. Ideal si quieren descansar de verdad.',
      },
    ],
    audience: 'Para amigos que quieren playa y que el hotel resuelva la comida.',
  },
  cancun: {
    place: 'Cancún, México',
    description:
      'Zona hotelera de día y rumba si el parche quiere. El precio es un estimado por persona para comparar, no una cotización.',
    included: [
      'Tiquetes de ejemplo',
      'Hotel en la zona hotelera',
      'Desayunos',
      'Traslados',
      'Un día a Isla Mujeres',
    ],
    days: [
      {
        label: 'Día 1 · Zona hotelera',
        text: 'Llegada, mar y una cena cerca del hotel.',
      },
      {
        label: 'Día 2 · Isla Mujeres',
        text: 'Ferry de ejemplo, playa y tiempo para volver sin afán.',
      },
      {
        label: 'Día 3 · Cenote o rumba',
        text: 'El parche elige agua dulce en el día o una noche en el centro.',
      },
    ],
    audience: 'Para un parche que mezcla playa, foto y rumba.',
    photos: [
      {
        src: 'https://images.unsplash.com/photo-1510097467424-192d713fd8b2?auto=format&fit=crop&w=1200&q=80',
        alt: 'Costa de Cancún vista desde el aire',
      },
      {
        src: 'https://images.unsplash.com/photo-1552074284-5e88ef1aef18?auto=format&fit=crop&w=1200&q=80',
        alt: 'Hoteles y jardines frente al mar en Cancún',
      },
      {
        src: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/7/73/Cancun-beach-Mexico-2016-Luka-Peternel.jpg/960px-Cancun-beach-Mexico-2016-Luka-Peternel.jpg',
        alt: 'Playa de Cancún con la zona hotelera al fondo',
      },
      {
        src: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e2/Beach_Cancun.JPG/960px-Beach_Cancun.JPG',
        alt: 'Agua turquesa en la playa de Cancún',
      },
      {
        src: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/d/de/Cancun_Strand_Luftbild_%2821981446550%29.jpg/960px-Cancun_Strand_Luftbild_%2821981446550%29.jpg',
        alt: 'Zona hotelera y playa de Cancún desde arriba',
      },
    ],
  },
};

export function getFeaturedTrip(id: string | null): FeaturedTrip | null {
  if (!id) return null;
  const hero = TRENDING_HEROES.find((item) => item.id === id);
  const extra = DETAILS[id];
  if (!hero || !extra) return null;
  return {
    id: hero.id,
    title: hero.title,
    duration: hero.duration,
    costCOP: hero.costCOP,
    image: hero.image,
    photos: extra.photos ?? [{ src: hero.image, alt: extra.place }],
    vibe: hero.vibe,
    ...extra,
  };
}
