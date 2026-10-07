import React, { useEffect, useRef, useState } from 'react';
import { Hotel, Luggage, Plane, Ticket } from 'lucide-react';

type OfferCategory = 'vuelos' | 'hoteles' | 'paquetes' | 'actividades';

interface Offer {
  id: string;
  destination: string;
  includes: string;
  discount: string;
  previous: string;
  price: string;
  dates: string;
  image: string;
  categories: OfferCategory[];
}

const CATEGORIES: { id: OfferCategory; label: string; Icon: typeof Plane }[] = [
  { id: 'vuelos', label: 'Vuelos', Icon: Plane },
  { id: 'hoteles', label: 'Hoteles', Icon: Hotel },
  { id: 'paquetes', label: 'Paquetes', Icon: Luggage },
  { id: 'actividades', label: 'Actividades', Icon: Ticket },
];

const OFFERS: Offer[] = [
  {
    id: 'cancun',
    destination: 'Cancún',
    includes: 'Vuelo y hotel, todo incluido',
    discount: '-30%',
    previous: '$3.890.000',
    price: '$2.720.000',
    dates: '12 al 19 de dic',
    image: 'https://images.unsplash.com/photo-1510097467424-192d713fd8b2?auto=format&fit=crop&w=1200&q=80',
    categories: ['paquetes', 'vuelos'],
  },
  {
    id: 'punta-cana',
    destination: 'Punta Cana',
    includes: 'Vuelo y resort con desayuno',
    discount: '-25%',
    previous: '$4.200.000',
    price: '$3.150.000',
    dates: '8 al 15 de ene',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    categories: ['paquetes', 'hoteles'],
  },
  {
    id: 'europa',
    destination: 'Europa',
    includes: 'Roma, París y el tren entre las dos',
    discount: '-18%',
    previous: '$8.900.000',
    price: '$7.300.000',
    dates: '4 al 14 de mar',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80',
    categories: ['paquetes'],
  },
  {
    id: 'bariloche',
    destination: 'Bariloche',
    includes: 'Vuelo y cabaña en la nieve',
    discount: '-20%',
    previous: '$2.480.000',
    price: '$1.980.000',
    dates: '5 al 12 de jul',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
    categories: ['paquetes', 'hoteles'],
  },
  {
    id: 'santa-marta',
    destination: 'Santa Marta',
    includes: 'Ida y vuelta desde Bogotá',
    discount: '-15%',
    previous: '$640.000',
    price: '$544.000',
    dates: '7 al 10 de nov',
    image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1200&q=80',
    categories: ['vuelos'],
  },
  {
    id: 'tayrona',
    destination: 'Parque Tayrona',
    includes: 'Lancha y un día de playa',
    discount: '-30%',
    previous: '$210.000',
    price: '$147.000',
    dates: 'Sábados de dic',
    image: 'https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?auto=format&fit=crop&w=1200&q=80',
    categories: ['actividades'],
  },
];

export const OffersScreen: React.FC = () => {
  const [category, setCategory] = useState<OfferCategory>('paquetes');
  const [notice, setNotice] = useState<string | null>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const visible = OFFERS.filter((offer) => offer.categories.includes(category));

  useEffect(() => {
    const selected = tabsRef.current?.querySelector<HTMLElement>('[aria-selected="true"]');
    selected?.scrollIntoView({ inline: 'nearest', block: 'nearest' });
  }, [category]);

  useEffect(() => {
    if (!notice) return;
    const timeout = window.setTimeout(() => setNotice(null), 4000);
    return () => window.clearTimeout(timeout);
  }, [notice]);

  return (
    <div className="flex flex-col w-full px-4 pt-4 pb-28 max-w-lg mx-auto space-y-6">
      <div
        ref={tabsRef}
        role="tablist"
        aria-label="Tipo de oferta"
        className="flex gap-1.5 overflow-x-auto no-scrollbar -mx-4 px-4"
      >
        {CATEGORIES.map(({ id, label, Icon }) => {
          const selected = category === id;
          return (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => {
                setCategory(id);
                setNotice(null);
              }}
              className={`shrink-0 inline-flex items-center gap-1.5 rounded-full px-3 border ${
                selected
                  ? 'bg-[#a8e6d9] text-[#00201b] border-transparent font-bold'
                  : 'bg-[#FFFBF0] text-[#1b1c1c] border-[#e4e2e1]'
              }`}
            >
              <Icon aria-hidden="true" />
              <span>{label}</span>
            </button>
          );
        })}
      </div>

      <section className="flex flex-col gap-6">
        <p className="font-caption text-[#3f4946]">Ejemplo</p>
        <ul className="flex flex-col gap-6">
          {visible.map((offer) => (
            <li key={offer.id}>
              <button
                type="button"
                onClick={() => setNotice(`${offer.destination} es un ejemplo. No compra nada.`)}
                className="w-full overflow-hidden rounded-2xl border border-[#e4e2e1] bg-white text-left shadow-xs active:scale-[0.99] transition-transform"
              >
                <div className="relative h-48 w-full">
                  <img
                    src={offer.image}
                    alt={offer.destination}
                    className="h-full w-full object-cover"
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-[#fc8a40] px-2.5 py-1 font-caption font-bold text-white">
                    {offer.discount}
                  </span>
                </div>
                <div className="flex flex-col gap-1 p-4">
                  <h2 className="font-headline-sm font-bold text-[#1b1c1c]">{offer.destination}</h2>
                  <p className="text-[#3f4946]">{offer.includes}</p>
                  <p className="font-label-numeric-md text-[#3f4946] line-through">{offer.previous}</p>
                  <p>
                    <span className="font-label-numeric-lg font-bold text-[#2a685e]">{offer.price}</span>
                    <span className="font-caption text-[#3f4946]"> COP por persona</span>
                  </p>
                  <p className="font-caption text-[#3f4946]">{offer.dates}</p>
                </div>
              </button>
            </li>
          ))}
        </ul>
      </section>

      {notice && (
        <div className="fixed bottom-32 inset-x-0 z-50 px-4 pointer-events-none">
          <div
            role="status"
            className="max-w-lg mx-auto rounded-2xl bg-[#a8e6d9] px-4 py-3 text-[#00201b] shadow-md"
          >
            <p className="font-caption font-semibold">{notice}</p>
          </div>
        </div>
      )}
    </div>
  );
};
