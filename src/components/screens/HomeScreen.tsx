import React, { useRef, useState } from 'react';
import { 
  Search, 
  Heart, 
  Users, 
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Sparkles, 
  Check, 
  Plus, 
  Flame, 
  Sun, 
  Mountain, 
  DollarSign, 
  Compass,
  Calendar,
  MessageSquare
} from 'lucide-react';
import { TRENDING_HEROES, SECOND_TRIP_PROGRESS, RECOMMENDATIONS } from '../../data/mockData';
import { Trip } from '../../types/trip';
import { MemberAvatar } from '../MemberAvatar';
import { RegisterCard } from '../RegisterCard';
import { SIGN_IN_OPTIONS, SignInMethod } from '../signIn';

interface HomeScreenProps {
  trip: Trip;
  account: SignInMethod | null;
  onNavigate: (screen: string) => void;
  onOpenContribute: () => void;
  onOpenVote: () => void;
  onOpenCreate: () => void;
  onSignIn: (method: SignInMethod) => void;
  likedCards: Record<string, boolean>;
  onToggleLike: (id: string) => void;
  onOpenFeatured: (id: string) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  trip,
  account,
  onNavigate,
  onOpenVote,
  onOpenCreate,
  onSignIn,
  likedCards,
  onToggleLike,
  onOpenFeatured,
}) => {
  const [heroIndex, setHeroIndex] = useState(0);
  const heroScrollerRef = useRef<HTMLDivElement>(null);
  const heroDragRef = useRef({
    startX: 0,
    startScroll: 0,
    moved: false,
    dragging: false,
    pointerId: -1,
  });
  const [recIndex, setRecIndex] = useState(0);
  const recScrollerRef = useRef<HTMLDivElement>(null);
  const recDragRef = useRef({
    startX: 0,
    startScroll: 0,
    moved: false,
    dragging: false,
    pointerId: -1,
  });
  const nextHero = TRENDING_HEROES[(heroIndex + 1) % TRENDING_HEROES.length];

  const nearestHeroIndex = (scroller: HTMLDivElement) => {
    const slides = [...scroller.querySelectorAll('article')];
    let nearest = 0;
    let best = Infinity;
    slides.forEach((slide, i) => {
      const dist = Math.abs((slide as HTMLElement).offsetLeft - scroller.scrollLeft);
      if (dist < best) {
        best = dist;
        nearest = i;
      }
    });
    return nearest;
  };

  const scrollHeroTo = (index: number) => {
    const scroller = heroScrollerRef.current;
    if (!scroller) return;
    const count = TRENDING_HEROES.length;
    const next = ((index % count) + count) % count;
    const slide = scroller.querySelectorAll('article')[next] as HTMLElement | undefined;
    if (!slide) return;
    scroller.scrollTo({ left: slide.offsetLeft, behavior: 'smooth' });
  };

  const syncHeroIndex = () => {
    const scroller = heroScrollerRef.current;
    if (!scroller || scroller.clientWidth === 0) return;
    const clamped = nearestHeroIndex(scroller);
    setHeroIndex((current) => (current === clamped ? current : clamped));
  };

  const onHeroPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const drag = heroDragRef.current;
    drag.moved = false;
    drag.dragging = false;
    drag.startX = e.clientX;
    if (e.pointerType === 'touch') return;
    if ((e.target as HTMLElement).closest('button')) return;
    const scroller = heroScrollerRef.current;
    if (!scroller) return;
    drag.startX = e.clientX;
    drag.startScroll = scroller.scrollLeft;
    drag.pointerId = e.pointerId;
    drag.dragging = true;
    scroller.setPointerCapture(e.pointerId);
  };

  const onHeroPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const drag = heroDragRef.current;
    if (Math.abs(e.clientX - drag.startX) > 10) drag.moved = true;
    if (!drag.dragging || e.pointerId !== drag.pointerId) return;
    const scroller = heroScrollerRef.current;
    if (!scroller) return;
    scroller.scrollLeft = drag.startScroll - (e.clientX - drag.startX);
  };

  const onHeroPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    const drag = heroDragRef.current;
    if (!drag.dragging || e.pointerId !== drag.pointerId) return;
    drag.dragging = false;
    const scroller = heroScrollerRef.current;
    if (!scroller || scroller.clientWidth === 0) return;
    scrollHeroTo(nearestHeroIndex(scroller));
  };

  const nearestRecIndex = (scroller: HTMLDivElement) => {
    const slides = [...scroller.querySelectorAll('article')];
    let nearest = 0;
    let best = Infinity;
    slides.forEach((slide, i) => {
      const dist = Math.abs((slide as HTMLElement).offsetLeft - scroller.scrollLeft);
      if (dist < best) {
        best = dist;
        nearest = i;
      }
    });
    return nearest;
  };

  const scrollRecTo = (index: number) => {
    const scroller = recScrollerRef.current;
    if (!scroller) return;
    const slides = scroller.querySelectorAll('article');
    const next = Math.min(Math.max(index, 0), slides.length - 1);
    const slide = slides[next] as HTMLElement | undefined;
    if (!slide) return;
    scroller.scrollTo({ left: slide.offsetLeft, behavior: 'smooth' });
  };

  const syncRecIndex = () => {
    const scroller = recScrollerRef.current;
    if (!scroller || scroller.clientWidth === 0) return;
    const clamped = nearestRecIndex(scroller);
    setRecIndex((current) => (current === clamped ? current : clamped));
  };

  const onRecPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const drag = recDragRef.current;
    drag.moved = false;
    drag.dragging = false;
    drag.startX = e.clientX;
    if (e.pointerType === 'touch') return;
    if ((e.target as HTMLElement).closest('button')) return;
    const scroller = recScrollerRef.current;
    if (!scroller) return;
    drag.startScroll = scroller.scrollLeft;
    drag.pointerId = e.pointerId;
    drag.dragging = true;
    scroller.setPointerCapture(e.pointerId);
  };

  const onRecPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const drag = recDragRef.current;
    if (Math.abs(e.clientX - drag.startX) > 10) drag.moved = true;
    if (!drag.dragging || e.pointerId !== drag.pointerId) return;
    const scroller = recScrollerRef.current;
    if (!scroller) return;
    scroller.scrollLeft = drag.startScroll - (e.clientX - drag.startX);
  };

  const onRecPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    const drag = recDragRef.current;
    if (!drag.dragging || e.pointerId !== drag.pointerId) return;
    drag.dragging = false;
    const scroller = recScrollerRef.current;
    if (!scroller || scroller.clientWidth === 0) return;
    scrollRecTo(nearestRecIndex(scroller));
  };

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Playas');

  const toggleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleLike(id);
  };

  const goalLeft = Math.max(trip.totalGoal - trip.totalSaved, 0);
  const ringOffset = 188.5 * (1 - Math.min(trip.progressPercentage, 100) / 100);

  const categories = [
    { name: 'Playas', icon: 'beach_access' },
    { name: 'Ciudades', icon: 'location_city' },
    { name: 'Montaña', icon: 'landscape' },
    { name: 'Aventura', icon: 'hiking' },
    { name: 'Cultural', icon: 'museum' },
    { name: 'Foodie', icon: 'restaurant' },
  ];

  const searchPills = [
    { label: 'Top Parches', icon: 'local_fire_department', active: true },
    { label: 'Playas & Sol', icon: 'wb_sunny' },
    { label: 'Glamping & Montaña', icon: 'cabin' },
    { label: '< $1.000.000 COP', icon: 'payments' },
    { label: 'De fin de semana', icon: 'event' },
  ];

  return (
    <div className="flex flex-col w-full px-4 pt-2 pb-28 max-w-lg mx-auto space-y-6">
      <>
          {/* 1. Greeting & Active Squad Badge */}
          <section className="flex flex-col space-y-1">
            <div className="flex items-start justify-between">
              <div className="flex flex-col min-w-0 pr-2 flex-1">
                {account && (
                  <button
                    onClick={() => onNavigate('parche')}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e3d2ff]/60 text-[#68548e] font-caption text-[11px] font-bold w-max mb-1 hover:bg-[#e3d2ff] transition-colors"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#68548e] animate-ping"></span>
                    <span>Parche activo: “{trip.squadName}”</span>
                    <span className="material-symbols-outlined text-[13px]">chevron_right</span>
                  </button>
                )}
                <h1 className="font-headline-lg-mobile text-2xl text-[#1b1c1c] font-extrabold tracking-tight flex items-center gap-1.5">
                  {account ? `¡Hola, ${SIGN_IN_OPTIONS[account].name}!` : '¡Hola!'}
                  <span className="text-[#FFD93D]">✨</span>
                </h1>
                <p className="font-body-md text-xs text-[#3f4946] mt-0.5 leading-snug">
                  {account
                    ? '¿Listos para planear la próxima aventura juntos?'
                    : 'Entra para ver tu parche y tu alcancía.'}
                </p>
              </div>

              {/* Radar Icon Button */}
              <button
                onClick={() => onNavigate('buscar')}
                aria-label="Explorar destinos"
                className="relative flex-shrink-0 mt-1 w-11 h-11 rounded-2xl bg-[#eae7e7] flex items-center justify-center text-[#2a685e] shadow-xs active:scale-95 transition-transform"
              >
                <span className="material-symbols-outlined text-[26px]">explore</span>
                <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#FFD93D] text-[#1b1c1c] font-mono text-[9px] font-bold flex items-center justify-center shadow-xs">
                  2
                </span>
              </button>
            </div>
          </section>

          {!account && <RegisterCard method={null} onSignIn={onSignIn} />}

          {/* Quick Search Bar */}
          <section className="flex flex-col space-y-2">
            <div className="relative flex items-center w-full shadow-xs rounded-2xl bg-white border border-[#e4e2e1] p-1">
              <div className="pl-3 pr-2 text-[#2a685e] flex items-center justify-center pointer-events-none">
                <Search size={18} />
              </div>
              <input
                type="text"
                placeholder="Buscar destinos, parches o planes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') onNavigate('buscar');
                }}
                className="w-full bg-transparent border-0 text-[#1b1c1c] placeholder:text-[#3f4946]/70 font-body-sm text-xs focus:ring-0 focus:outline-none py-2 pr-2"
              />
              <button
                onClick={() => onNavigate('filtros')}
                aria-label="Abrir filtros de búsqueda"
                className="w-8 h-8 rounded-xl bg-[#eae7e7]/70 hover:bg-[#f0eded] text-[#3f4946] flex items-center justify-center shrink-0 transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">tune</span>
              </button>
            </div>

            {/* Quick Filter Carousel Chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar -mx-4 px-4">
              {searchPills.map((pill, i) => (
                <button
                  key={i}
                  onClick={() => onNavigate('buscar')}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-full font-caption text-[11px] font-bold shrink-0 active:scale-95 transition-all shadow-2xs ${
                    pill.active
                      ? 'bg-[#ffdbc9] text-[#331200]'
                      : 'bg-white text-[#1b1c1c] hover:bg-[#f0eded]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[14px]">{pill.icon}</span>
                  <span>{pill.label}</span>
                </button>
              ))}
            </div>
          </section>

          {/* 2. Hero Trending Squad Card */}
          <section className="flex flex-col space-y-2" aria-label="Lo más buscado">
            <div className="relative">
            <div
              ref={heroScrollerRef}
              onScroll={syncHeroIndex}
              onPointerDown={onHeroPointerDown}
              onPointerMove={onHeroPointerMove}
              onPointerUp={onHeroPointerUp}
              onPointerCancel={onHeroPointerUp}
              className="flex w-full gap-4 overflow-x-auto overflow-y-hidden snap-x snap-mandatory no-scrollbar"
              aria-label="Carrusel de lo más buscado"
            >
              {TRENDING_HEROES.map((slide) => (
                <article
                  key={slide.id}
                  aria-label={slide.title}
                  onClick={() => {
                    if (heroDragRef.current.moved) return;
                    onOpenFeatured(slide.id);
                  }}
                  className="relative min-w-full w-full shrink-0 basis-full snap-start rounded-3xl overflow-hidden shadow-lg bg-[#eae7e7] cursor-pointer group"
                >
                  <div
                    className="w-full h-80 bg-cover bg-center relative transform transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url("${slide.image}")` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/90 via-[#1A1A1A]/40 to-transparent" />

                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#fc8a40] text-white font-caption text-xs font-bold shadow-md">
                        <Flame size={14} className="fill-white" />
                        <span>{slide.tag}</span>
                      </span>
                      <button
                        onClick={(e) => toggleLike(slide.id, e)}
                        aria-label={`Guardar ${slide.title}`}
                        className="w-9 h-9 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-[#1b1c1c] shadow-md active:scale-90 transition-transform"
                      >
                        <Heart
                          size={18}
                          className={likedCards[slide.id] ? 'fill-[#FF6B6B] text-[#FF6B6B]' : 'text-[#3f4946]'}
                        />
                      </button>
                    </div>

                    <div className="absolute bottom-0 inset-x-0 p-4 flex flex-col space-y-2 text-white">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-sm text-white font-caption text-[11px] font-semibold">
                          {slide.vibe}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-sm text-white font-caption text-[11px] font-semibold">
                          {slide.duration}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full bg-[#a8e6d9] text-[#00201b] font-caption text-[11px] font-bold">
                          {slide.votesText}
                        </span>
                      </div>

                      <div className="flex flex-col">
                        <h2 className="font-headline-lg-mobile text-xl text-white font-extrabold leading-tight">
                          {slide.title} {slide.emoji}
                        </h2>
                        <div className="flex items-baseline gap-1.5 mt-0.5">
                          <span className="font-caption text-xs text-[#eae7e7]">Estimado:</span>
                          <span className="font-mono text-base text-[#FFD93D] font-bold">
                            {slide.costCOP}
                          </span>
                          <span className="font-caption text-xs text-[#eae7e7]">/ persona</span>
                        </div>
                      </div>

                      <div className="pt-1">
                        <button
                          type="button"
                          className="w-full py-3 px-4 rounded-2xl bg-[#fc8a40] text-white font-headline-sm text-sm font-bold shadow-md active:translate-y-0.5 transition-all flex items-center justify-center gap-2 hover:brightness-105"
                        >
                          <span>Arma este viaje</span>
                          <ArrowRight size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            {heroIndex > 0 && (
              <button
                type="button"
                aria-label="Anterior"
                onClick={(e) => {
                  e.stopPropagation();
                  scrollHeroTo(heroIndex - 1);
                }}
                className="absolute left-2 top-1/2 z-10 -translate-y-1/2 w-10 h-10 rounded-full bg-[#fcf9f8] shadow-md flex items-center justify-center active:scale-95"
              >
                <ChevronLeft />
              </button>
            )}
            {heroIndex < TRENDING_HEROES.length - 1 && (
              <button
                type="button"
                aria-label="Siguiente tarjeta"
                onClick={(e) => {
                  e.stopPropagation();
                  scrollHeroTo(heroIndex + 1);
                }}
                className="absolute right-2 top-1/2 z-10 -translate-y-1/2 w-10 h-10 rounded-full bg-[#fcf9f8] shadow-md flex items-center justify-center active:scale-95"
              >
                <ChevronRight />
              </button>
            )}
            </div>

            <div
              className="flex items-center justify-center gap-2"
              role="tablist"
              aria-label="Destinos destacados"
            >
              {TRENDING_HEROES.map((slide, i) => (
                <button
                  key={slide.id}
                  type="button"
                  role="tab"
                  aria-selected={i === heroIndex}
                  aria-label={slide.title}
                  onClick={() => scrollHeroTo(i)}
                  className={`slider-dot rounded-full shrink-0 ${
                    i === heroIndex ? 'bg-secondary-container' : 'bg-surface-variant'
                  }`}
                />
              ))}
            </div>
            <div className="flex justify-end px-1">
              <button
                type="button"
                onClick={() => scrollHeroTo(heroIndex + 1)}
                aria-label={`Siguiente: ${nextHero.title}`}
                className="flex items-center gap-1 text-[#3f4946] font-caption text-[11px] min-w-0"
              >
                <span className="shrink-0">Siguiente: </span>
                <span className="font-semibold text-[#2a685e] truncate">{nextHero.title} {nextHero.emoji}</span>
                <span className="material-symbols-outlined text-[14px] shrink-0">chevron_right</span>
              </button>
            </div>
          </section>

          {account && (
          <>
          {/* 3. Tus Viajes en Progreso */}
          <section className="flex flex-col space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h3 className="font-headline-sm text-base text-[#1b1c1c] font-bold flex items-center gap-1.5">
                  <span>Tus viajes en progreso</span>
                  <span className="material-symbols-outlined text-[18px] text-[#9b4500]">lock_clock</span>
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-[#a8e6d9] text-[#2b695f] font-caption text-[11px] font-bold">
                  2 activos
                </span>
              </div>
              <button
                onClick={() => onNavigate('perfil')}
                className="font-caption text-xs text-[#2a685e] font-bold hover:underline flex items-center"
              >
                <span>Ver perfil</span>
                <span className="material-symbols-outlined text-[15px]">chevron_right</span>
              </button>
            </div>

            {/* Active Card 1: Costa Brava */}
            <div
              onClick={() => onNavigate('detalle-viaje')}
              className="bg-white rounded-3xl p-4 shadow-sm border border-[#e4e2e1] flex flex-col space-y-3 cursor-pointer hover:shadow-md transition-all active:scale-[0.99]"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-11 h-11 rounded-2xl bg-[#ffdbc9] flex items-center justify-center text-[#331200] shrink-0">
                    <span className="material-symbols-outlined text-[22px]">directions_car</span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <h4 className="font-headline-sm text-sm font-bold text-[#1b1c1c] truncate">
                      {trip.title}
                    </h4>
                    <span className="font-caption text-xs text-[#3f4946]">
                      {trip.dates}{trip.daysRemaining > 0 ? ` • En ${trip.daysRemaining} días` : ''}
                    </span>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-[#e3d2ff] text-[#68558f] font-caption text-[10px] font-bold shrink-0">
                  {trip.status}
                </span>
              </div>

              {/* Piggybank Progress Bar */}
              <div className="flex flex-col space-y-1.5 bg-[#f6f3f2] p-3 rounded-2xl">
                <div className="flex items-center justify-between text-xs font-caption">
                  <span className="text-[#3f4946] font-medium flex items-center gap-1">
                    <span className="material-symbols-outlined text-[15px] text-[#2a685e]">savings</span>
                    <span>Alcancía</span>
                  </span>
                  <div className="flex items-center gap-1">
                    <span className="font-mono text-xs text-[#2a685e] font-bold">
                      {trip.progressPercentage}%
                    </span>
                    <span className="text-[#3f4946] text-[11px]">
                      (${trip.totalSaved.toLocaleString('es-CO')} / ${trip.totalGoal.toLocaleString('es-CO')})
                    </span>
                  </div>
                </div>
                <div className="w-full h-3 rounded-full bg-[#eae7e7] overflow-hidden p-0.5">
                  <div
                    className="h-full rounded-full bg-[#2a685e] transition-all duration-700 shadow-xs"
                    style={{ width: `${trip.progressPercentage}%` }}
                  />
                </div>
              </div>

              {/* Members Row & Action */}
              <div className="flex items-center justify-between pt-0.5">
                <div className="flex items-center">
                  <div className="flex -space-x-2 overflow-hidden items-center">
                    {trip.members.slice(0, 3).map((m) => (
                      <MemberAvatar
                        key={m.id}
                        name={m.name}
                        avatar={m.avatar}
                        className="inline-block h-8 w-8 rounded-full object-cover ring-2 ring-white bg-[#f0eded] text-[11px]"
                      />
                    ))}
                    {trip.members.length > 3 && (
                      <span className="flex items-center justify-center h-8 w-8 rounded-full bg-[#fc8a40] text-white font-caption text-[11px] font-bold ring-2 ring-white">
                        +{trip.members.length - 3}
                      </span>
                    )}
                  </div>
                  <span className="font-caption text-[11px] text-[#3f4946] ml-2">
                    {trip.members.length} del parche
                  </span>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenVote();
                  }}
                  className="px-3 py-1.5 rounded-full bg-[#a8e6d9] text-[#2b695f] font-caption text-xs font-bold flex items-center gap-1 active:scale-95 transition-all shadow-xs"
                >
                  <MessageSquare size={13} />
                  <span>Votar</span>
                </button>
              </div>
            </div>

            {/* Active Card 2: Andes */}
            <div
              onClick={() => onNavigate('detalle-viaje')}
              className="bg-white rounded-3xl p-4 shadow-sm border border-[#e4e2e1] flex flex-col space-y-3 cursor-pointer hover:shadow-md transition-all active:scale-[0.99]"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-11 h-11 rounded-2xl bg-[#b0efe2] flex items-center justify-center text-[#00201b] shrink-0">
                    <span className="material-symbols-outlined text-[22px]">cabin</span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <h4 className="font-headline-sm text-sm font-bold text-[#1b1c1c] truncate">
                      {SECOND_TRIP_PROGRESS.title}
                    </h4>
                    <span className="font-caption text-xs text-[#3f4946] truncate">
                      {SECOND_TRIP_PROGRESS.dates}
                    </span>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-[#a8e6d9] text-[#2b695f] font-caption text-[10px] font-bold shrink-0">
                  {SECOND_TRIP_PROGRESS.tag}
                </span>
              </div>

              {/* Progress */}
              <div className="flex flex-col space-y-1.5 bg-[#f6f3f2] p-3 rounded-2xl">
                <div className="flex items-center justify-between text-xs font-caption">
                  <span className="text-[#3f4946] font-medium flex items-center gap-1">
                    <span className="material-symbols-outlined text-[15px] text-[#9b4500]">savings</span>
                    <span>Alcancía</span>
                  </span>
                  <div className="flex items-center gap-1">
                    <span className="font-mono text-xs text-[#9b4500] font-bold">
                      {SECOND_TRIP_PROGRESS.percentage}%
                    </span>
                    <span className="text-[#3f4946] text-[11px]">
                      ({SECOND_TRIP_PROGRESS.savedText})
                    </span>
                  </div>
                </div>
                <div className="w-full h-3 rounded-full bg-[#eae7e7] overflow-hidden p-0.5">
                  <div
                    className="h-full rounded-full bg-[#fc8a40] transition-all duration-700"
                    style={{ width: `${SECOND_TRIP_PROGRESS.percentage}%` }}
                  />
                </div>
              </div>

              {/* Members Row */}
              <div className="flex items-center justify-between pt-0.5">
                <div className="flex items-center">
                  <span className="font-caption text-xs text-[#3f4946]">
                    4 amigos viajando juntos
                  </span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onNavigate('detalle-viaje');
                  }}
                  className="px-3 py-1.5 rounded-full bg-[#f0eded] text-[#1b1c1c] font-caption text-xs font-semibold flex items-center gap-1 hover:bg-[#eae7e7]"
                >
                  <Calendar size={13} />
                  <span>Ver itinerario</span>
                </button>
              </div>
            </div>
          </section>
          </>
          )}

          {/* 4. Quick Categories */}
          <section className="flex flex-col space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-headline-sm text-base text-[#1b1c1c] font-bold flex items-center gap-1.5">
                <span>Categorías rápidas</span>
                <span className="text-[#FFD93D]">⚡</span>
              </h3>
              <span className="font-caption text-xs text-[#3f4946]">Desliza</span>
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar -mx-4 px-4">
              {categories.map((cat, i) => {
                const isSelected = selectedCategory === cat.name;
                return (
                  <button
                    key={i}
                    onClick={() => {
                      setSelectedCategory(cat.name);
                      onNavigate('buscar');
                    }}
                    className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full font-caption text-xs shrink-0 active:scale-95 transition-all shadow-2xs ${
                      isSelected
                        ? 'bg-[#2a685e] text-white font-bold'
                        : 'bg-white text-[#1b1c1c] font-semibold border border-[#e4e2e1] hover:bg-[#f6f3f2]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[16px]">{cat.icon}</span>
                    <span>{cat.name}</span>
                  </button>
                );
              })}
            </div>
          </section>

          {account && (
          <>
          {/* 5. "Mi Alcancía Digital" Highlight Box */}
          <section
            role="button"
            tabIndex={0}
            aria-label="Entrar a la alcancía"
            onClick={() => onNavigate('alcancia')}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onNavigate('alcancia');
              }
            }}
            className="w-full rounded-3xl bg-gradient-to-br from-[#ebddff] via-white to-[#b0efe2] p-4 shadow-md border border-[#e4e2e1] flex flex-col space-y-3 relative overflow-hidden cursor-pointer text-left"
          >
            <div className="flex items-center justify-between relative z-10">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-full bg-[#68548e] text-white flex items-center justify-center shadow-xs">
                  <span className="material-symbols-outlined text-[20px]">stars</span>
                </div>
                <div>
                  <h3 className="font-headline-sm text-base font-bold text-[#230e46] flex items-center gap-1">
                    <span>La alcancía</span>
                    <span className="material-symbols-outlined text-[16px] text-[#68548e]">savings</span>
                  </h3>
                  <p className="font-caption text-xs text-[#4f3c75]">Meta: {trip.title}</p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-white text-[#68548e] font-caption text-[11px] font-extrabold shadow-xs">
                {trip.status}
              </span>
            </div>

            {/* Donut Chart & Stat Display */}
            <div className="flex items-center gap-4 bg-white/90 backdrop-blur-md p-3.5 rounded-2xl relative z-10 border border-[#e4e2e1]/70">
              {/* SVG Donut Chart */}
              <div className="relative w-18 h-18 flex-shrink-0 flex items-center justify-center">
                <svg className="w-18 h-18 transform -rotate-90" viewBox="0 0 72 72">
                  <circle
                    className="text-[#f0eded]"
                    cx="36"
                    cy="36"
                    fill="transparent"
                    r="30"
                    stroke="currentColor"
                    strokeWidth="7"
                  />
                  <circle
                    className="transition-all duration-1000"
                    cx="36"
                    cy="36"
                    fill="transparent"
                    r="30"
                    stroke="#68548e"
                    strokeDasharray="188.5"
                    strokeDashoffset={ringOffset}
                    strokeLinecap="round"
                    strokeWidth="7"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="font-mono text-xs font-extrabold text-[#68548e]">{trip.progressPercentage}%</span>
                  <span className="font-caption text-[8px] uppercase font-bold text-[#3f4946]">Hecho</span>
                </div>
              </div>

              <div className="flex flex-col min-w-0">
                <div className="flex items-baseline gap-1">
                  <span className="font-mono text-base font-bold text-[#1b1c1c]">${trip.totalSaved.toLocaleString('es-CO')}</span>
                  <span className="font-caption text-[11px] text-[#3f4946]">de ${trip.totalGoal.toLocaleString('es-CO')} COP</span>
                </div>
                <p className="font-body-sm text-xs text-[#3f4946] mt-0.5 leading-snug">
                  Llevan <strong className="text-[#9b4500]">${trip.totalSaved.toLocaleString('es-CO')} COP</strong>. Faltan <strong className="text-[#9b4500]">${goalLeft.toLocaleString('es-CO')} COP</strong> para la meta.
                </p>
              </div>
            </div>

            <span className="relative z-10 w-full py-3 px-4 rounded-2xl bg-[#68548e] text-white font-headline-sm text-sm font-bold shadow-md flex items-center justify-center gap-1.5">
              <span>Ver la alcancía</span>
            </span>
          </section>
          </>
          )}

          <section className="flex flex-col space-y-3" aria-label="Recomendados para ti">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-headline-sm text-base text-[#1b1c1c] font-bold flex items-center gap-1.5">
                  <span>Recomendados para ti</span>
                  <span className="text-[#FFD93D]">✨</span>
                </h2>
                <p className="font-body-md text-sm text-[#3f4946]">
                  {account ? 'Según lo que le gusta a tu parche' : 'Ideas para cuando armes el parche'}
                </p>
              </div>
              <button
                onClick={() => onNavigate('buscar')}
                aria-label="Filtrar recomendaciones"
                className="w-8 h-8 rounded-full bg-[#f0eded] flex items-center justify-center text-[#3f4946]"
              >
                <span className="material-symbols-outlined text-[18px]">tune</span>
              </button>
            </div>

            <div className="relative">
              <div
                ref={recScrollerRef}
                onScroll={syncRecIndex}
                onPointerDown={onRecPointerDown}
                onPointerMove={onRecPointerMove}
                onPointerUp={onRecPointerUp}
                onPointerCancel={onRecPointerUp}
                className="flex w-full gap-4 overflow-x-auto overflow-y-hidden snap-x snap-mandatory no-scrollbar"
                aria-label="Carrusel de recomendados"
              >
                {RECOMMENDATIONS.map((item) => (
                  <article
                    key={item.id}
                    aria-label={item.title}
                    onClick={() => {
                      if (recDragRef.current.moved) return;
                      onNavigate('buscar');
                    }}
                    className="bg-white rounded-2xl overflow-hidden shadow-xs border border-[#e4e2e1] flex flex-col cursor-grab active:cursor-grabbing hover:shadow-md transition-all w-[calc(50%-8px)] min-w-[calc(50%-8px)] shrink-0 basis-[calc(50%-8px)] snap-start"
                  >
                    <div
                      className="relative w-full h-32 bg-cover bg-center"
                      style={{ backgroundImage: `url("${item.image}")` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/70 via-transparent to-transparent" />
                      <div className="absolute top-2 left-2">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/90 backdrop-blur-xs text-[#1b1c1c] font-caption text-[10px] font-bold shadow-2xs">
                          <span className="text-[#FFD93D]">★</span>
                          <span>{item.rating}</span>
                        </span>
                      </div>

                      <button
                        onClick={(e) => toggleLike(item.id, e)}
                        aria-label={`Guardar ${item.title}`}
                        className="absolute top-2 right-2 w-7 h-7 rounded-full bg-[#1A1A1A]/40 backdrop-blur-xs text-white flex items-center justify-center active:scale-90"
                      >
                        <Heart
                          size={14}
                          className={likedCards[item.id] ? 'fill-[#FF6B6B] text-[#FF6B6B]' : 'text-white'}
                        />
                      </button>

                      <div className="absolute bottom-2 left-2">
                        <span className="px-2 py-0.5 rounded-full bg-[#fc8a40] text-white font-caption text-[9px] font-bold uppercase tracking-wider">
                          {item.tag}
                        </span>
                      </div>
                    </div>

                    <div className="p-3 flex flex-col flex-1 justify-between gap-1.5">
                      <div>
                        <h3 className="font-headline-sm text-sm font-bold text-[#1b1c1c] line-clamp-1">
                          {item.title}
                        </h3>
                        <div className="flex items-center gap-1 text-[#3f4946] font-caption text-[10px] mt-0.5">
                          <span>{item.people}</span>
                          <span>•</span>
                          <span>{item.days}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-1 border-t border-[#f6f3f2]">
                        <div className="flex flex-col">
                          <span className="font-caption text-[9px] text-[#707976] uppercase">Desde</span>
                          <span className="font-mono text-[11px] font-bold text-[#2a685e]">
                            {item.price}
                          </span>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onOpenCreate();
                          }}
                          aria-label={`Planear ${item.title}`}
                          className="w-7 h-7 rounded-full bg-[#a8e6d9] text-[#00201b] flex items-center justify-center active:scale-90 transition-transform"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
              {recIndex > 0 && (
                <button
                  type="button"
                  aria-label="Recomendado anterior"
                  onClick={() => scrollRecTo(recIndex - 1)}
                  className="absolute left-2 top-1/2 z-10 -translate-y-1/2 w-10 h-10 rounded-full bg-[#fcf9f8] shadow-md flex items-center justify-center active:scale-95"
                >
                  <ChevronLeft />
                </button>
              )}
              {recIndex < RECOMMENDATIONS.length - 1 && (
                <button
                  type="button"
                  aria-label="Recomendado siguiente"
                  onClick={() => scrollRecTo(recIndex + 1)}
                  className="absolute right-2 top-1/2 z-10 -translate-y-1/2 w-10 h-10 rounded-full bg-[#fcf9f8] shadow-md flex items-center justify-center active:scale-95"
                >
                  <ChevronRight />
                </button>
              )}
            </div>
          </section>

          {/* 7. Bottom Squad Motivation Banner */}
          {account ? (
          <div className="w-full bg-[#FFFBF0] rounded-3xl p-4 border border-[#e4e2e1] shadow-xs flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-[#fc8a40] text-white flex items-center justify-center shrink-0 shadow-xs">
              <Users size={22} />
            </div>
            <div className="flex flex-col min-w-0 flex-1">
              <span className="font-headline-sm text-xs font-bold text-[#1b1c1c]">¿Tienes una idea loca?</span>
              <span className="font-body-sm text-[11px] text-[#3f4946] leading-snug">
                Lanza un voto y deja que el parche decida.
              </span>
            </div>
            <button
              onClick={onOpenVote}
              className="px-3.5 py-2 rounded-full bg-[#eae7e7] text-[#1b1c1c] font-caption text-xs font-bold hover:bg-[#f0eded] shrink-0 inline-flex items-center gap-1"
            >
              <span>Votar</span>
              <span className="material-symbols-outlined text-[14px]">open_in_new</span>
            </button>
          </div>
          ) : (
          <div className="w-full bg-[#FFFBF0] rounded-3xl p-4 border border-[#e4e2e1] shadow-xs flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-[#2a685e] text-white flex items-center justify-center shrink-0 shadow-xs">
              <Users size={22} />
            </div>
            <div className="flex flex-col min-w-0 flex-1">
              <span className="font-headline-sm text-xs font-bold text-[#1b1c1c]">Tu parche te espera</span>
              <span className="font-body-sm text-[11px] text-[#3f4946] leading-snug">
                Cuando entras ves la alcancía, los votos y los viajes del grupo.
              </span>
            </div>
          </div>
          )}
      </>
    </div>
  );
};
