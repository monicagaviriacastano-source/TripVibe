import React, { useEffect, useState } from 'react';
import { Minus, Plus } from 'lucide-react';

export interface SearchFilters {
  destinationId: string;
  customDestination: string;
  dateFrom: string;
  dateTo: string;
  people: number;
}

export const EMPTY_FILTERS: SearchFilters = {
  destinationId: '',
  customDestination: '',
  dateFrom: '',
  dateTo: '',
  people: 2,
};

const DESTINATIONS = [
  {
    id: 'mundo',
    label: 'Mundo',
    mapQuery: 'Mundo',
    bbox: '-160,-55,180,75',
    marker: '15,10',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=640&q=60',
  },
  {
    id: 'europa',
    label: 'Europa',
    mapQuery: 'Europa',
    bbox: '-11.5,35,40.5,71.5',
    marker: '50.1,10.4',
    image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=640&q=60',
  },
  {
    id: 'asia',
    label: 'Asia',
    mapQuery: 'Asia',
    bbox: '26,-10,150,75',
    marker: '34,100',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=640&q=60',
  },
  {
    id: 'norte-america',
    label: 'Norte América',
    mapQuery: 'América del Norte',
    bbox: '-168,14,-52,72',
    marker: '45,-100',
    image: 'https://images.unsplash.com/photo-1485738422979-f5c462d49f74?auto=format&fit=crop&w=640&q=60',
  },
  {
    id: 'america-central',
    label: 'América Central',
    mapQuery: 'América Central',
    bbox: '-92,7,-77,22',
    marker: '14.6,-86.5',
    image: 'https://images.unsplash.com/photo-1518638150340-f706e86654de?auto=format&fit=crop&w=640&q=60',
  },
];

const TILE = 256;

const lonToX = (lon: number, zoom: number) => ((lon + 180) / 360) * 2 ** zoom;

const latToY = (lat: number, zoom: number) => {
  const rad = (Math.min(Math.max(lat, -85), 85) * Math.PI) / 180;
  return ((1 - Math.log(Math.tan(rad) + 1 / Math.cos(rad)) / Math.PI) / 2) * 2 ** zoom;
};

const DestinationMap: React.FC<{ bbox: string; marker: string; label: string; mapsUrl: string }> = ({
  bbox,
  marker,
  label,
  mapsUrl,
}) => {
  const [west, south, east, north] = bbox.split(',').map(Number);
  const [lat, lon] = marker.split(',').map(Number);
  const width = 480;
  const height = 208;
  let zoom = 1;
  for (let z = 1; z <= 16; z++) {
    const spanX = Math.abs(lonToX(east, z) - lonToX(west, z)) * TILE;
    const spanY = Math.abs(latToY(north, z) - latToY(south, z)) * TILE;
    if (spanX > width * 1.8 && spanY > height * 1.8) break;
    zoom = z;
    const coversCard = spanX >= width * 0.85 || spanY >= height * 0.85;
    if (coversCard && (spanX > width || spanY > height)) break;
  }
  const originX = lonToX(lon, zoom) * TILE - width / 2;
  const originY = latToY(lat, zoom) * TILE - height / 2;
  const x0 = Math.floor(originX / TILE);
  const y0 = Math.floor(originY / TILE);
  const x1 = Math.floor((originX + width - 1) / TILE);
  const y1 = Math.floor((originY + height - 1) / TILE);
  const n = 2 ** zoom;
  const tiles: { key: string; src: string; left: number; top: number }[] = [];
  for (let x = x0; x <= x1; x++) {
    for (let y = y0; y <= y1; y++) {
      if (y < 0 || y >= n) continue;
      const wrapped = ((x % n) + n) % n;
      tiles.push({
        key: `${zoom}-${x}-${y}`,
        src: `https://tile.openstreetmap.org/${zoom}/${wrapped}/${y}.png`,
        left: x * TILE - originX,
        top: y * TILE - originY,
      });
    }
  }
  const pinLeft = lonToX(lon, zoom) * TILE - originX;
  const pinTop = latToY(lat, zoom) * TILE - originY;

  return (
    <a
      href={mapsUrl}
      target="_blank"
      rel="noreferrer"
      aria-label={`Ver ${label} en Google Maps`}
      className="relative block w-full h-52 overflow-hidden rounded-2xl border border-[#e4e2e1] bg-[#d7e6df]"
    >
      <span className="absolute inset-0" aria-hidden="true">
        {tiles.map((tile) => (
          <img
            key={tile.key}
            src={tile.src}
            alt=""
            width={TILE}
            height={TILE}
            className="absolute max-w-none"
            style={{ left: tile.left, top: tile.top, width: TILE, height: TILE }}
          />
        ))}
      </span>
      <span
        className="absolute w-4 h-4 rounded-full bg-[#fc8a40] border-2 border-white shadow-md"
        style={{ left: pinLeft, top: pinTop, transform: 'translate(-50%, -50%)' }}
      />
    </a>
  );
};

const mapFor = (filters: SearchFilters) => {
  if (filters.destinationId === 'custom' && filters.customDestination.trim()) {
    return { label: filters.customDestination.trim(), query: filters.customDestination.trim(), bbox: '', marker: '' };
  }
  const destination = DESTINATIONS.find((item) => item.id === filters.destinationId);
  if (!destination) return null;
  return {
    label: destination.label,
    query: destination.mapQuery,
    bbox: destination.bbox,
    marker: destination.marker,
  };
};

interface FiltersScreenProps {
  filters: SearchFilters;
  onChange: (filters: SearchFilters) => void;
  onDone: () => void;
}

export const FiltersScreen: React.FC<FiltersScreenProps> = ({ filters, onChange, onDone }) => {
  const [addingDestination, setAddingDestination] = useState(false);
  const [draftDestination, setDraftDestination] = useState(filters.customDestination);

  const [customPoint, setCustomPoint] = useState<{ bbox: string; marker: string } | null>(null);

  const selectDestination = (id: string) => {
    onChange({ ...filters, destinationId: id });
  };

  const map = mapFor(filters);
  const point = map && filters.destinationId === 'custom' ? customPoint : map;

  useEffect(() => {
    if (filters.destinationId !== 'custom' || !filters.customDestination.trim()) {
      setCustomPoint(null);
      return;
    }
    setCustomPoint(null);
    const query = filters.customDestination.trim();
    const controller = new AbortController();
    fetch(`https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(query)}`, {
      signal: controller.signal,
      headers: { 'Accept-Language': 'es' },
    })
      .then((response) => response.json())
      .then((results: { lat: string; lon: string; boundingbox: [string, string, string, string] }[]) => {
        const hit = results[0];
        if (!hit) return;
        const [south, north, west, east] = hit.boundingbox;
        setCustomPoint({ bbox: `${west},${south},${east},${north}`, marker: `${hit.lat},${hit.lon}` });
      })
      .catch(() => setCustomPoint(null));
    return () => controller.abort();
  }, [filters.destinationId, filters.customDestination]);

  const saveCustomDestination = (event: React.FormEvent) => {
    event.preventDefault();
    const name = draftDestination.trim();
    if (!name) return;
    onChange({ ...filters, destinationId: 'custom', customDestination: name });
    setAddingDestination(false);
  };

  return (
    <div className="flex flex-col w-full px-4 pt-3 pb-28 max-w-lg mx-auto space-y-6">
      <section className="flex flex-col gap-3">
        <h2 className="font-headline-sm text-base font-bold text-[#1b1c1c]">Destino</h2>
        <div className="grid grid-cols-2 gap-3">
          {DESTINATIONS.map((destination) => {
            const selected = filters.destinationId === destination.id;
            return (
              <button
                key={destination.id}
                type="button"
                aria-pressed={selected}
                onClick={() => selectDestination(destination.id)}
                className={`relative h-28 rounded-2xl overflow-hidden text-left active:scale-[0.98] transition-all ${
                  selected ? 'ring-2 ring-[#2a685e] ring-offset-2 ring-offset-[#fcf9f8]' : ''
                }`}
              >
                <img
                  src={destination.image}
                  alt=""
                  className={`absolute inset-0 w-full h-full object-cover transition-[filter] duration-300 ${
                    selected ? '' : 'grayscale'
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1b1c1c]/80 via-[#1b1c1c]/20 to-transparent" />
                <span className="absolute bottom-2.5 left-3 right-3 font-headline-sm text-sm font-bold text-white">
                  {destination.label}
                </span>
              </button>
            );
          })}

          <button
            type="button"
            aria-pressed={filters.destinationId === 'custom'}
            onClick={() => setAddingDestination(true)}
            className={`relative h-28 rounded-2xl overflow-hidden bg-[#eae7e7] text-left active:scale-[0.98] transition-all flex flex-col justify-end p-3 ${
              filters.destinationId === 'custom' ? 'ring-2 ring-[#2a685e] ring-offset-2 ring-offset-[#fcf9f8]' : ''
            }`}
          >
            <span className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white text-[#2a685e] flex items-center justify-center">
              <Plus size={16} />
            </span>
            <span className="font-headline-sm text-sm font-bold text-[#1b1c1c]">
              {filters.customDestination || 'Añadir destino'}
            </span>
          </button>
        </div>

        {addingDestination && (
          <form onSubmit={saveCustomDestination} className="flex gap-2">
            <input
              type="text"
              value={draftDestination}
              onChange={(event) => setDraftDestination(event.target.value)}
              placeholder="Ej. Barichara"
              autoFocus
              className="flex-1 h-11 px-3 rounded-xl bg-white border border-[#bfc9c5] font-body-md text-sm text-[#1b1c1c] focus:outline-none focus:border-[#2a685e]"
            />
            <button
              type="submit"
              className="h-11 px-4 rounded-xl bg-[#2a685e] text-white font-headline-sm text-xs font-bold"
            >
              Agregar
            </button>
          </form>
        )}

        {map && (
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between gap-2">
              <h3 className="font-headline-sm text-sm font-bold text-[#1b1c1c]">{map.label} en el mapa</h3>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(map.query)}`}
                target="_blank"
                rel="noreferrer"
                className="font-caption text-xs font-semibold text-[#2a685e] shrink-0"
              >
                Abrir en Google Maps
              </a>
            </div>
            {point && point.bbox ? (
              <DestinationMap
                bbox={point.bbox}
                marker={point.marker}
                label={map.label}
                mapsUrl={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(map.query)}`}
              />
            ) : (
              <div className="w-full h-52 rounded-2xl border border-[#e4e2e1] bg-[#f6f3f2] flex items-center justify-center">
                <span className="font-caption text-xs text-[#3f4946]">Buscando el lugar…</span>
              </div>
            )}
            <p className="font-caption text-[10px] text-[#707976]">Mapa © OpenStreetMap</p>
          </div>
        )}
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="font-headline-sm text-base font-bold text-[#1b1c1c]">Fechas posibles del viaje</h2>
        <div className="grid grid-cols-2 gap-2">
          <label className="flex flex-col gap-1">
            <span className="font-caption text-xs font-semibold text-[#3f4946]">Desde</span>
            <input
              type="date"
              value={filters.dateFrom}
              onChange={(event) => onChange({ ...filters, dateFrom: event.target.value })}
              className="h-11 px-3 rounded-xl bg-white border border-[#bfc9c5] font-body-md text-sm text-[#1b1c1c] focus:outline-none focus:border-[#2a685e]"
            />
          </label>
          <label className="flex flex-col gap-1">
            <span className="font-caption text-xs font-semibold text-[#3f4946]">Hasta</span>
            <input
              type="date"
              value={filters.dateTo}
              min={filters.dateFrom || undefined}
              onChange={(event) => onChange({ ...filters, dateTo: event.target.value })}
              className="h-11 px-3 rounded-xl bg-white border border-[#bfc9c5] font-body-md text-sm text-[#1b1c1c] focus:outline-none focus:border-[#2a685e]"
            />
          </label>
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="font-headline-sm text-base font-bold text-[#1b1c1c]">Personas que viajan</h2>
        <div className="flex items-center justify-between bg-white rounded-2xl border border-[#e4e2e1] px-4 py-3">
          <span className="font-body-md text-sm text-[#3f4946]">Cantidad</span>
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Quitar una persona"
              disabled={filters.people <= 1}
              onClick={() => onChange({ ...filters, people: Math.max(1, filters.people - 1) })}
              className="w-9 h-9 rounded-full bg-[#f0eded] text-[#1b1c1c] flex items-center justify-center disabled:opacity-40"
            >
              <Minus size={16} />
            </button>
            <span className="font-mono text-base font-bold text-[#1b1c1c] min-w-6 text-center">
              {filters.people}
            </span>
            <button
              type="button"
              aria-label="Sumar una persona"
              disabled={filters.people >= 20}
              onClick={() => onChange({ ...filters, people: Math.min(20, filters.people + 1) })}
              className="w-9 h-9 rounded-full bg-[#2a685e] text-white flex items-center justify-center disabled:opacity-40"
            >
              <Plus size={16} />
            </button>
          </div>
        </div>
      </section>

      <button
        type="button"
        onClick={onDone}
        className="w-full py-3.5 rounded-2xl bg-[#fc8a40] text-white font-headline-sm text-base font-bold shadow-[0_4px_12px_rgba(252,138,64,0.35)]"
      >
        Listo
      </button>
    </div>
  );
};
