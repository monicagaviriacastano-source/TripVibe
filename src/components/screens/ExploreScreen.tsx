import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  Users, 
  Send, 
  Sparkles, 
  Trash2, 
  Flame, 
  Heart,
  ChevronRight,
  Plus
} from 'lucide-react';
import { OPEN_PARCHES, TRENDING_DESTINATIONS } from '../../data/mockData';

interface ExploreScreenProps {
  onNavigate: (screen: string) => void;
  onOpenCreate: () => void;
}

export const ExploreScreen: React.FC<ExploreScreenProps> = ({
  onNavigate,
  onOpenCreate,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMode, setSelectedMode] = useState('Todos');
  const [selectedBudget, setSelectedBudget] = useState<'economico' | 'equilibrado' | 'premium'>('equilibrado');
  const [recentSearches, setRecentSearches] = useState([
    'Begur Costa Brava',
    'Cancún todo incluido',
    'Boyacá en carro',
  ]);
  const [appliedCategoryPill, setAppliedCategoryPill] = useState('');
  const [joinedParches, setJoinedParches] = useState<Record<string, boolean>>({});

  const modeChips = [
    { label: 'Todos', icon: 'travel_explore' },
    { label: 'Parches Abiertos', icon: 'group_add' },
    { label: 'Rutas Populares', icon: 'route' },
    { label: 'Alojamientos 6-10', icon: 'holiday_village' },
    { label: 'Planes Finde', icon: 'wb_sunny' },
  ];

  const quickPills = [
    { label: 'Playas del Caribe', icon: 'beach_access' },
    { label: 'Ecoturismo', icon: 'forest' },
    { label: 'Glamping', icon: 'cabin' },
    { label: 'Roadtrip', icon: 'directions_car' },
    { label: 'Europa mochilera', icon: 'flight_takeoff' },
    { label: '< $1.5M COP', icon: 'payments' },
  ];

  const handleJoinParche = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setJoinedParches((prev) => ({ ...prev, [id]: true }));
  };

  const filteredOpenParches = OPEN_PARCHES.filter((p) => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="flex flex-col w-full px-4 pt-3 pb-28 max-w-lg mx-auto space-y-6">
      {/* 1. Header Contextual & Search Input */}
      <section className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div>
            <span className="font-caption text-xs text-[#9b4500] uppercase tracking-wider font-bold">
              Descubre tu próxima aventura
            </span>
            <h1 className="font-headline-lg-mobile text-2xl text-[#1b1c1c] font-extrabold tracking-tight">
              Explorar Parches
            </h1>
          </div>
          <div className="flex items-center gap-1.5 bg-[#a8e6d9]/40 px-3 py-1.5 rounded-full">
            <span className="material-symbols-outlined text-[17px] text-[#2a685e]">group</span>
            <span className="font-mono text-xs font-bold text-[#2a685e]">128 Activos</span>
          </div>
        </div>

        {/* Search Input Bar */}
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#707976]">
              <Search size={18} />
            </div>
            <input
              type="text"
              placeholder="Buscar destinos, parches o actividades..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-12 pl-10 pr-4 bg-white text-[#1b1c1c] rounded-2xl font-body-md text-xs placeholder:text-[#707976] border border-[#e4e2e1] focus:outline-none focus:border-[#2a685e] shadow-xs transition-all"
            />
          </div>
          <button
            onClick={() => onNavigate('filtros')}
            aria-label="Filtros avanzados"
            className="w-12 h-12 rounded-2xl bg-[#f0eded] hover:bg-[#eae7e7] flex items-center justify-center text-[#1b1c1c] transition-colors active:scale-95 shrink-0"
          >
            <span className="material-symbols-outlined text-[20px]">tune</span>
          </button>
        </div>

        {/* Horizontal Quick Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar -mx-4 px-4 pb-1">
          {quickPills.map((pill, i) => (
            <button
              key={i}
              onClick={() => {
                setAppliedCategoryPill(pill.label === appliedCategoryPill ? '' : pill.label);
                setSearchQuery(pill.label === appliedCategoryPill ? '' : pill.label);
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-caption text-xs whitespace-nowrap shadow-2xs transition-all active:scale-95 ${
                appliedCategoryPill === pill.label
                  ? 'bg-[#2a685e] text-white font-bold'
                  : 'bg-white text-[#1b1c1c] border border-[#e4e2e1] hover:bg-[#f6f3f2]'
              }`}
            >
              <span className="material-symbols-outlined text-[15px]">{pill.icon}</span>
              <span>{pill.label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* 2. Mode Chips */}
      <section>
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar -mx-4 px-4 py-1">
          {modeChips.map((chip, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedMode(chip.label)}
              className={`px-3.5 py-2 rounded-xl font-caption text-xs font-semibold flex items-center gap-1.5 whitespace-nowrap shadow-2xs transition-all ${
                selectedMode === chip.label
                  ? 'bg-[#2a685e] text-white font-bold'
                  : 'bg-[#f0eded] text-[#3f4946] hover:bg-[#eae7e7]'
              }`}
            >
              <span className="material-symbols-outlined text-[17px]">{chip.icon}</span>
              <span>{chip.label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* 3. Recent Searches */}
      {recentSearches.length > 0 && (
        <section className="bg-[#f6f3f2] rounded-2xl p-3 flex flex-col gap-2 border border-[#e4e2e1]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 text-[#3f4946]">
              <span className="material-symbols-outlined text-[17px]">history</span>
              <span className="font-caption text-xs font-bold">Búsquedas recientes</span>
            </div>
            <button
              onClick={() => setRecentSearches([])}
              className="text-[11px] font-caption text-[#707976] hover:text-[#ba1a1a] flex items-center gap-1 transition-colors"
            >
              <Trash2 size={12} />
              <span>Limpiar</span>
            </button>
          </div>
          <div className="flex flex-wrap gap-1.5 pt-0.5">
            {recentSearches.map((term, i) => (
              <button
                key={i}
                onClick={() => setSearchQuery(term)}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-[#e4e2e1] text-[#3f4946] text-xs hover:border-[#2a685e] transition-colors"
              >
                <span>{term}</span>
                <span className="material-symbols-outlined text-[12px] text-[#707976]">north_west</span>
              </button>
            ))}
          </div>
        </section>
      )}

      {/* 4. Budget Range Selector Widget in COP */}
      <section className="flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#ffdbc9] text-[#9b4500] flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px]">account_balance_wallet</span>
            </div>
            <h2 className="font-headline-sm text-sm font-bold text-[#1b1c1c]">
              Presupuesto por persona
            </h2>
          </div>
          <span className="font-caption text-xs text-[#707976]">Estimado neto</span>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {/* Economico */}
          <button
            onClick={() => setSelectedBudget('economico')}
            className={`p-3 rounded-2xl border text-center flex flex-col items-center justify-between gap-1 transition-all active:scale-95 ${
              selectedBudget === 'economico'
                ? 'bg-white border-[#2a685e] shadow-sm ring-1 ring-[#2a685e]'
                : 'bg-white/80 border-[#e4e2e1] hover:bg-white'
            }`}
          >
            <div className="w-7 h-7 rounded-full bg-[#a8e6d9]/50 flex items-center justify-center text-[#2a685e]">
              <span className="material-symbols-outlined text-[16px]">savings</span>
            </div>
            <div>
              <span className="block font-caption text-xs font-bold text-[#1b1c1c]">Económico</span>
              <span className="font-mono text-[11px] font-bold text-[#2a685e] block">Hasta $800K</span>
            </div>
            <span className="text-[10px] text-[#707976]">Mochilero / Camping</span>
          </button>

          {/* Equilibrado */}
          <button
            onClick={() => setSelectedBudget('equilibrado')}
            className={`relative p-3 rounded-2xl border text-center flex flex-col items-center justify-between gap-1 transition-all active:scale-95 ${
              selectedBudget === 'equilibrado'
                ? 'bg-[#FFFBF0] border-[#fc8a40] shadow-md ring-1 ring-[#fc8a40]'
                : 'bg-white/80 border-[#e4e2e1] hover:bg-white'
            }`}
          >
            <div className="absolute -top-2 right-2 bg-[#fc8a40] text-white px-1.5 py-0.2 rounded-full text-[9px] font-bold">
              Popular
            </div>
            <div className="w-7 h-7 rounded-full bg-[#ffdbc9] flex items-center justify-center text-[#9b4500]">
              <span className="material-symbols-outlined text-[16px]">balance</span>
            </div>
            <div>
              <span className="block font-caption text-xs font-bold text-[#1b1c1c]">Equilibrado</span>
              <span className="font-mono text-[11px] font-bold text-[#fc8a40] block">$800K - $2.5M</span>
            </div>
            <span className="text-[10px] text-[#3f4946]">Hotel &amp; tours</span>
          </button>

          {/* Premium */}
          <button
            onClick={() => setSelectedBudget('premium')}
            className={`p-3 rounded-2xl border text-center flex flex-col items-center justify-between gap-1 transition-all active:scale-95 ${
              selectedBudget === 'premium'
                ? 'bg-white border-[#68548e] shadow-sm ring-1 ring-[#68548e]'
                : 'bg-white/80 border-[#e4e2e1] hover:bg-white'
            }`}
          >
            <div className="w-7 h-7 rounded-full bg-[#e3d2ff] flex items-center justify-center text-[#68548e]">
              <span className="material-symbols-outlined text-[16px]">diamond</span>
            </div>
            <div>
              <span className="block font-caption text-xs font-bold text-[#1b1c1c]">Premium</span>
              <span className="font-mono text-[11px] font-bold text-[#68548e] block">+ $2.5M COP</span>
            </div>
            <span className="text-[10px] text-[#707976]">Villas &amp; vuelos VIP</span>
          </button>
        </div>
      </section>

      {/* 5. Parches Abiertos */}
      <section className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#7FD8BE]/20 flex items-center justify-center text-[#2a685e]">
              <span className="material-symbols-outlined text-[18px]">person_pin_circle</span>
            </div>
            <div>
              <h2 className="font-headline-sm text-sm font-bold text-[#1b1c1c]">Parches abiertos</h2>
              <p className="font-caption text-xs text-[#707976]">Súmate a parches con cupos y alcancía activa</p>
            </div>
          </div>
          <span className="font-caption text-xs font-bold text-[#2a685e]">
            Ver 14
          </span>
        </div>

        <div className="flex flex-col gap-3">
          {filteredOpenParches.map((parche) => {
            const hasJoined = joinedParches[parche.id];
            return (
              <div
                key={parche.id}
                onClick={() => onNavigate('detalle-viaje')}
                className="bg-white rounded-3xl p-4 shadow-sm border border-[#e4e2e1] flex flex-col gap-3 cursor-pointer hover:shadow-md transition-all active:scale-[0.99]"
              >
                {/* Top Status */}
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#a8e6d9]/60 text-[#00201b] rounded-full font-caption text-[10px] font-bold">
                    <span className="material-symbols-outlined text-[13px]">savings</span>
                    <span>{parche.potStatus}</span>
                  </span>
                  <div className="flex items-center gap-1 text-[#3f4946] font-mono text-xs">
                    <span className="material-symbols-outlined text-[15px] text-[#fc8a40]">event</span>
                    <span>{parche.dates}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex gap-3 items-start">
                  <img
                    src={parche.image}
                    alt={parche.title}
                    className="w-20 h-20 rounded-2xl object-cover shrink-0 shadow-xs"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-headline-sm text-sm font-bold text-[#1b1c1c] leading-tight truncate">
                      {parche.title}
                    </h3>
                    <p className="font-caption text-xs text-[#3f4946] mt-0.5 line-clamp-1">
                      {parche.location}
                    </p>
                    <div className="flex items-center gap-1.5 mt-2">
                      <span className="font-mono text-sm font-bold text-[#2a685e]">
                        {parche.price}
                      </span>
                      <span className="text-[11px] font-caption text-[#707976]">/ persona</span>
                    </div>
                  </div>
                </div>

                {/* Squad Fill Bar */}
                <div className="bg-[#f6f3f2] p-2.5 rounded-2xl flex flex-col gap-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-caption font-semibold text-[#1b1c1c]">
                      {parche.filledSpots} de {parche.totalSpots} cupos llenos
                    </span>
                    <span className="font-caption text-[11px] font-bold text-[#fc8a40]">
                      {parche.missingText}
                    </span>
                  </div>
                  <div className="w-full bg-[#eae7e7] h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-[#2a685e] h-full rounded-full transition-all duration-500"
                      style={{ width: `${(parche.filledSpots / parche.totalSpots) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Badges */}
                <div className="flex flex-wrap gap-1 text-[#3f4946] font-caption text-[11px]">
                  {parche.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="px-2 py-0.5 rounded-md bg-[#f0eded]">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action */}
                <button
                  onClick={(e) => handleJoinParche(parche.id, e)}
                  className={`w-full py-2.5 px-4 rounded-xl font-headline-sm text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition-all ${
                    hasJoined
                      ? 'bg-[#a8e6d9] text-[#00201b]'
                      : 'bg-[#2a685e] text-white hover:bg-[#23584f] active:translate-y-0.5'
                  }`}
                >
                  <span>{hasJoined ? 'Solicitud enviada' : 'Pedir cupo'}</span>
                  <Send size={14} />
                </button>
              </div>
            );
          })}
          {filteredOpenParches.length === 0 && (
            <p className="font-caption text-xs text-[#707976] px-1">
              Aún no hay parches con esa búsqueda. Prueba otro destino o arma el tuyo.
            </p>
          )}
        </div>
      </section>

      {/* 6. Destinos en Tendencia (Horizontal Carousel) */}
      <section className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#e3d2ff] text-[#68548e] flex items-center justify-center">
              <Flame size={18} />
            </div>
            <div>
              <h2 className="font-headline-sm text-sm font-bold text-[#1b1c1c]">Destinos en tendencia</h2>
              <p className="font-caption text-xs text-[#707976]">Lo que más arma el parche este mes</p>
            </div>
          </div>
          <span className="font-caption text-xs font-bold text-[#2a685e]">Ver mapa 🗺️</span>
        </div>

        <div className="flex items-stretch gap-3 overflow-x-auto no-scrollbar -mx-4 px-4 pb-2">
          {TRENDING_DESTINATIONS.map((dest, i) => (
            <div
              key={i}
              onClick={() => onNavigate('detalle-viaje')}
              className="w-72 shrink-0 bg-white rounded-3xl shadow-sm border border-[#e4e2e1] overflow-hidden flex flex-col justify-between cursor-pointer hover:shadow-md transition-all active:scale-[0.99]"
            >
              <div
                className="relative h-40 w-full bg-cover bg-center"
                style={{ backgroundImage: `url("${dest.image}")` }}
              >
                <div className="absolute top-2.5 left-2.5 bg-[#1A1A1A]/70 backdrop-blur-xs px-2.5 py-0.5 rounded-full flex items-center gap-1 text-white text-xs">
                  <span className="text-[#FFD93D]">★</span>
                  <span className="font-mono font-bold">{dest.rating}</span>
                  <span className="text-[10px] text-[#eae7e7]">({dest.reviews})</span>
                </div>
                <div className="absolute bottom-2.5 left-2.5 bg-white/90 backdrop-blur-xs px-2 py-0.5 rounded-full text-xs font-bold text-[#1b1c1c]">
                  {dest.days}
                </div>
              </div>

              <div className="p-3.5 flex flex-col gap-1.5 flex-1 justify-between">
                <div>
                  <h3 className="font-headline-sm text-sm font-bold text-[#1b1c1c] leading-snug">
                    {dest.title}
                  </h3>
                  <p className="font-caption text-xs text-[#3f4946] mt-0.5 line-clamp-2">
                    {dest.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-[#f6f3f2] flex items-center justify-between">
                  <div>
                    <span className="text-[9px] font-caption text-[#707976] uppercase block">Base por persona</span>
                    <span className="font-mono text-xs font-bold text-[#2a685e]">{dest.price}</span>
                  </div>
                  <span className="text-[11px] font-caption text-[#3f4946] bg-[#f0eded] px-2 py-0.5 rounded-md">
                    {dest.groupSize}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Explora por tu Vibe */}
      <section className="flex flex-col gap-3">
        <h2 className="font-headline-sm text-sm font-bold text-[#1b1c1c]">Explora por tu plan</h2>
        <div className="grid grid-cols-2 gap-2.5">
          {[
            { title: 'Adrenalina', desc: 'Rafting & Trek', icon: 'paragliding', bg: 'bg-[#FF6B6B]/15 text-[#FF6B6B]' },
            { title: 'Gastronomía', desc: 'Cafés & Fogones', icon: 'restaurant', bg: 'bg-[#ffdbc9] text-[#9b4500]' },
            { title: 'Relax & Verde', desc: 'Glampings & Paz', icon: 'spa', bg: 'bg-[#7FD8BE]/25 text-[#2a685e]' },
            { title: 'Parche Nocturno', desc: 'Fiesta & Clubes', icon: 'nightlife', bg: 'bg-[#e3d2ff] text-[#68548e]' },
          ].map((vibe, idx) => (
            <button
              key={idx}
              onClick={() => setSearchQuery(vibe.title)}
              className="p-3 rounded-2xl bg-white border border-[#e4e2e1] flex items-center gap-2.5 text-left shadow-2xs hover:shadow-xs active:scale-95 transition-all"
            >
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${vibe.bg}`}>
                <span className="material-symbols-outlined text-[20px]">{vibe.icon}</span>
              </div>
              <div className="min-w-0">
                <span className="font-caption text-xs font-bold text-[#1b1c1c] block truncate">{vibe.title}</span>
                <span className="text-[10px] text-[#707976] truncate block">{vibe.desc}</span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* 8. Delight Callout */}
      <section className="w-full">
        <div className="bg-gradient-to-r from-[#a8e6d9] via-[#FFFBF0] to-[#ffdbc9] p-4 rounded-3xl shadow-sm border border-[#e4e2e1] flex items-center justify-between gap-3">
          <div className="flex flex-col gap-0.5">
            <span className="font-caption text-[11px] font-bold text-[#2a685e] uppercase">
              ¿No encuentras tu viaje ideal?
            </span>
            <h4 className="font-headline-sm text-sm font-bold text-[#1b1c1c] leading-tight">
              Arma el parche y abre la alcancía
            </h4>
            <p className="font-caption text-[11px] text-[#3f4946] mt-0.5">
              Vota, aporta y viajen sin enredo.
            </p>
          </div>
          <button
            onClick={onOpenCreate}
            className="w-12 h-12 rounded-full bg-[#fc8a40] text-white flex items-center justify-center shadow-md active:scale-95 hover:brightness-105 shrink-0"
          >
            <Plus size={24} />
          </button>
        </div>
      </section>
    </div>
  );
};
