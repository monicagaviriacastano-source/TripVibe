import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Calendar, Check, ChevronLeft, ChevronRight, MapPin, Plane, Users, Utensils } from 'lucide-react';
import { getFeaturedTrip } from '../../data/featuredTrips';
import { ShareParcheModal } from '../modals/ShareParcheModal';

interface FeaturedTripScreenProps {
  tripId: string | null;
}

type PriceOption = {
  id: string;
  name: string;
  detail: string;
  amount: number;
};

const HOTELS: PriceOption[] = [
  { id: 'centro', name: 'Hotel céntrico', detail: 'Habitación doble y desayuno', amount: 820000 },
  { id: 'parche', name: 'Alojamiento del parche', detail: 'Apartamento para el grupo', amount: 640000 },
  { id: 'hostal', name: 'Hostal compartido', detail: 'Cama en habitación de 4', amount: 390000 },
];

const FLIGHTS: PriceOption[] = [
  { id: 'directo', name: 'Vuelo directo', detail: 'Ida y vuelta, maleta de mano', amount: 1480000 },
  { id: 'escala', name: 'Vuelo con escala', detail: 'Una escala, maleta de mano', amount: 1120000 },
  { id: 'flexible', name: 'Vuelo flexible', detail: 'Permite cambiar la fecha', amount: 1710000 },
];

const PACKAGES: PriceOption[] = [
  { id: 'premium', name: 'Todo incluido premium', detail: 'Vuelo, hotel y comidas', amount: 3450000 },
  { id: 'clasico', name: 'Todo incluido clásico', detail: 'Vuelo, hotel y desayunos', amount: 2890000 },
  { id: 'basico', name: 'Todo incluido básico', detail: 'Vuelo y hotel, sin comidas', amount: 2410000 },
];

const REFERENCE_BASE = 2890000;

function parseCOP(value: string) {
  const digits = value.replace(/[^\d]/g, '');
  return Number(digits) || REFERENCE_BASE;
}

function formatCOP(value: number) {
  return `$${Math.round(value).toLocaleString('es-CO')} COP`;
}

function scaleAmount(amount: number, factor: number) {
  return Math.round((amount * factor) / 10000) * 10000;
}

export const FeaturedTripScreen: React.FC<FeaturedTripScreenProps> = ({ tripId }) => {
  const trip = getFeaturedTrip(tripId);
  const [shareOpen, setShareOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const photoScrollerRef = useRef<HTMLDivElement>(null);
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [hotelId, setHotelId] = useState(HOTELS[1].id);
  const [flightId, setFlightId] = useState(FLIGHTS[1].id);
  const [packageId, setPackageId] = useState(PACKAGES[1].id);

  const factor = trip ? parseCOP(trip.costCOP) / REFERENCE_BASE : 1;
  const priced = useMemo(
    () => ({
      hotels: HOTELS.map((item) => ({ ...item, amount: scaleAmount(item.amount, factor) })),
      flights: FLIGHTS.map((item) => ({ ...item, amount: scaleAmount(item.amount, factor) })),
      packages: PACKAGES.map((item) => ({ ...item, amount: scaleAmount(item.amount, factor) })),
    }),
    [factor],
  );
  const hotel = priced.hotels.find((item) => item.id === hotelId) ?? priced.hotels[0];
  const flight = priced.flights.find((item) => item.id === flightId) ?? priced.flights[0];
  const pack = priced.packages.find((item) => item.id === packageId) ?? priced.packages[0];
  const separateTotal = hotel.amount + flight.amount;
  const cheaperIsPackage = pack.amount <= separateTotal;
  const datesReady = Boolean(dateFrom && dateTo && dateTo >= dateFrom);
  const photos = trip?.photos ?? [];

  useEffect(() => {
    setPhotoIndex(0);
    photoScrollerRef.current?.scrollTo({ left: 0 });
  }, [trip?.id]);

  const syncPhotoIndex = () => {
    const scroller = photoScrollerRef.current;
    if (!scroller || scroller.clientWidth === 0) return;
    setPhotoIndex(Math.round(scroller.scrollLeft / scroller.clientWidth));
  };

  const scrollPhotoTo = (index: number) => {
    const scroller = photoScrollerRef.current;
    if (!scroller) return;
    scroller.scrollTo({ left: index * scroller.clientWidth, behavior: 'smooth' });
  };

  if (!trip) {
    return (
      <div className="mx-auto flex w-full max-w-lg flex-col px-4 pt-6 pb-28">
        <h1 className="font-headline-md font-bold text-on-surface">Este ejemplo no está</h1>
        <p className="mt-6 text-on-surface-variant">
          Vuelve a Inicio y elige otro de lo más buscado.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto flex w-full max-w-lg flex-col space-y-6 px-4 pt-2 pb-28">
      <section className="flex flex-col gap-3" aria-label={`Fotos de ${trip.place}`}>
        <div className="relative">
          <div
            ref={photoScrollerRef}
            onScroll={syncPhotoIndex}
            className="flex h-64 w-full snap-x snap-mandatory overflow-x-auto overflow-y-hidden rounded-3xl bg-surface-container-high shadow-lg no-scrollbar"
          >
            {photos.map((photo) => (
              <div key={photo.src} className="relative h-full basis-full shrink-0 snap-start overflow-hidden">
                <img src={photo.src} alt={photo.alt} className="absolute inset-0 h-full w-full object-cover" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/90 via-[#1A1A1A]/40 to-transparent" />
              </div>
            ))}
          </div>
          <p className="font-caption pointer-events-none absolute top-4 left-4 rounded-full bg-white/20 px-3 py-1 font-semibold text-white">
            {trip.vibe}
          </p>
          {photoIndex > 0 && (
            <button
              type="button"
              aria-label="Foto anterior"
              onClick={() => scrollPhotoTo(photoIndex - 1)}
              className="absolute top-1/2 left-2 z-10 flex -translate-y-1/2 items-center justify-center rounded-full bg-[#fcf9f8] shadow-md"
            >
              <ChevronLeft aria-hidden />
            </button>
          )}
          {photoIndex < photos.length - 1 && (
            <button
              type="button"
              aria-label="Foto siguiente"
              onClick={() => scrollPhotoTo(photoIndex + 1)}
              className="absolute top-1/2 right-2 z-10 flex -translate-y-1/2 items-center justify-center rounded-full bg-[#fcf9f8] shadow-md"
            >
              <ChevronRight aria-hidden />
            </button>
          )}
        </div>
        {photos.length > 1 && (
          <div className="flex items-center justify-center gap-2" role="tablist" aria-label="Fotos del destino">
            {photos.map((photo, index) => (
              <button
                key={photo.src}
                type="button"
                role="tab"
                aria-selected={index === photoIndex}
                aria-label={photo.alt}
                onClick={() => scrollPhotoTo(index)}
                className={`slider-dot shrink-0 rounded-full ${
                  index === photoIndex ? 'bg-secondary-container' : 'bg-surface-variant'
                }`}
              />
            ))}
          </div>
        )}
      </section>

      <section className="flex flex-col gap-3">
        <h1 className="font-headline-md font-bold text-on-surface">
          {trip.title}
        </h1>
        <div className="flex items-center gap-2">
          <MapPin aria-hidden />
          <p className="text-on-surface">{trip.place}</p>
        </div>
        <div className="flex items-center gap-2">
          <Calendar aria-hidden />
          <p className="text-on-surface">{trip.duration}</p>
        </div>
        <p className="text-on-surface">
          Estimado por persona:{' '}
          <span className="font-label-numeric-md text-primary">{trip.costCOP}</span>
        </p>
        <p className="text-on-surface-variant">{trip.description}</p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="font-headline-sm font-bold text-on-surface">Fechas del viaje</h2>
        <div className="grid grid-cols-2 gap-2">
          <label className="flex flex-col gap-1">
            <span className="font-caption text-xs font-semibold text-[#3f4946]">Fecha de inicio</span>
            <input
              type="date"
              value={dateFrom}
              onChange={(event) => {
                const next = event.target.value;
                setDateFrom(next);
                if (dateTo && next && dateTo < next) setDateTo('');
              }}
              className="h-11 rounded-xl border border-[#bfc9c5] bg-white px-3 font-body-md text-sm text-[#1b1c1c] focus:border-[#2a685e] focus:outline-none"
            />
          </label>
          <label className="flex flex-col gap-1">
            <span className="font-caption text-xs font-semibold text-[#3f4946]">Fecha de fin</span>
            <input
              type="date"
              value={dateTo}
              min={dateFrom || undefined}
              onChange={(event) => setDateTo(event.target.value)}
              className="h-11 rounded-xl border border-[#bfc9c5] bg-white px-3 font-body-md text-sm text-[#1b1c1c] focus:border-[#2a685e] focus:outline-none"
            />
          </label>
        </div>
        <p className="text-on-surface-variant">
          {datesReady
            ? 'Los precios de abajo son de ejemplo para esas fechas. Sirven para comparar, no para reservar.'
            : 'Elige inicio y fin para ver el estimado de esas fechas.'}
        </p>
      </section>

      <PriceGroup
        title="Hotel"
        icon={<MapPin aria-hidden />}
        options={priced.hotels}
        selectedId={hotel.id}
        onSelect={setHotelId}
      />
      <PriceGroup
        title="Vuelos"
        icon={<Plane aria-hidden />}
        options={priced.flights}
        selectedId={flight.id}
        onSelect={setFlightId}
      />
      <PriceGroup
        title="Todo incluido"
        icon={<Utensils aria-hidden />}
        options={priced.packages}
        selectedId={pack.id}
        onSelect={setPackageId}
      />

      <section className="flex flex-col gap-3 rounded-2xl border border-[#e4e2e1] bg-white p-4">
        <h2 className="font-headline-sm font-bold text-on-surface">Compara el precio</h2>
        <p className="text-on-surface">
          Hotel + vuelo:{' '}
          <span className="font-label-numeric-md text-primary">{formatCOP(separateTotal)}</span>
        </p>
        <p className="text-on-surface">
          Todo incluido:{' '}
          <span className="font-label-numeric-md text-primary">{formatCOP(pack.amount)}</span>
        </p>
        <p className="text-on-surface-variant">
          {cheaperIsPackage
            ? `${datesReady ? 'Para estas fechas, t' : 'T'}odo incluido queda más bajo: ${formatCOP(pack.amount)} por persona.`
            : `${datesReady ? 'Para estas fechas, h' : 'H'}otel y vuelo por separado quedan más bajos: ${formatCOP(separateTotal)} por persona.`}
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="font-headline-sm font-bold text-on-surface">Qué incluye</h2>
        <ul className="flex flex-col gap-3">
          {trip.included.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <Check aria-hidden />
              <p className="text-on-surface">{item}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="font-headline-sm font-bold text-on-surface">Así se verían los días</h2>
        <ol className="flex flex-col gap-4">
          {trip.days.map((day) => (
            <li key={day.label}>
              <h3 className="font-headline-sm font-bold text-on-surface">{day.label}</h3>
              <p className="text-on-surface-variant">{day.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="font-headline-sm font-bold text-on-surface">Para quién es</h2>
        <div className="flex items-start gap-3">
          <Users aria-hidden />
          <p className="text-on-surface">{trip.audience}</p>
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <button
          type="button"
          onClick={() => setShareOpen(true)}
          className="flex w-full items-center justify-center rounded-2xl bg-secondary-container px-4 font-headline-sm font-bold text-white"
        >
          Armar con el parche
        </button>
      </section>

      <ShareParcheModal
        isOpen={shareOpen}
        onClose={() => setShareOpen(false)}
        tripTitle={trip.title}
        place={trip.place}
        dateFrom={dateFrom}
        dateTo={dateTo}
        hotel={{ name: hotel.name, amountLabel: formatCOP(hotel.amount) }}
        flight={{ name: flight.name, amountLabel: formatCOP(flight.amount) }}
        pack={{ name: pack.name, amountLabel: formatCOP(pack.amount) }}
        separateLabel={formatCOP(separateTotal)}
        packageLabel={formatCOP(pack.amount)}
        cheaperLabel={formatCOP(cheaperIsPackage ? pack.amount : separateTotal)}
      />
    </div>
  );
};

function PriceGroup({
  title,
  icon,
  options,
  selectedId,
  onSelect,
}: {
  title: string;
  icon: React.ReactNode;
  options: PriceOption[];
  selectedId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <section className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        {icon}
        <h2 className="font-headline-sm font-bold text-on-surface">{title}</h2>
      </div>
      <div className="flex flex-col gap-2" role="radiogroup" aria-label={title}>
        {options.map((option) => {
          const selected = option.id === selectedId;
          return (
            <button
              key={option.id}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => onSelect(option.id)}
              className={`flex items-center justify-between gap-3 rounded-2xl px-4 text-left ${
                selected
                  ? 'border-2 border-[#2a685e] bg-[#a8e6d9]/40'
                  : 'border border-[#e4e2e1] bg-white'
              }`}
            >
              <span className="min-w-0">
                <span className="block font-bold text-[#1b1c1c]">{option.name}</span>
                <span className="block text-[#3f4946]">{option.detail}</span>
              </span>
              <span className="shrink-0 font-label-numeric-sm font-bold text-[#2a685e]">
                {formatCOP(option.amount)}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
