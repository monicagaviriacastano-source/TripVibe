import React, { useState } from 'react';
import { 
  Users, 
  Share2, 
  Calendar, 
  Clock, 
  MapPin, 
  Check, 
  Plus, 
  MessageSquare, 
  PiggyBank, 
  DollarSign, 
  Car, 
  Plane, 
  Hotel, 
  Utensils, 
  Key, 
  FileText, 
  CreditCard 
} from 'lucide-react';
import { Trip } from '../../types/trip';
import { MemberAvatar } from '../MemberAvatar';

interface TripDetailScreenProps {
  trip: Trip;
  onNavigate: (screen: string) => void;
  onOpenContribute: () => void;
  onOpenVote: () => void;
  onOpenInvite: () => void;
  onVote: (optionId: string) => void;
  onOpenCreate: () => void;
}

export const TripDetailScreen: React.FC<TripDetailScreenProps> = ({
  trip,
  onNavigate,
  onOpenContribute,
  onOpenVote,
  onOpenInvite,
  onVote,
  onOpenCreate,
}) => {
  const [activeTab, setActiveTab] = useState<'itinerario' | 'reservas' | 'gastos' | 'notas'>('itinerario');
  const [selectedDay, setSelectedDay] = useState('1');
  const [activityNote, setActivityNote] = useState('');
  const [showNoteAddedToast, setShowNoteAddedToast] = useState(false);

  const days = [
    { id: '1', date: '15 Jul', label: 'Día 1' },
    { id: '2', date: '16 Jul', label: 'Día 2' },
    { id: '3', date: '17 Jul', label: 'Día 3' },
    { id: '4', date: '18 Jul', label: 'Día 4' },
  ];

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activityNote.trim()) return;
    setShowNoteAddedToast(true);
    setActivityNote('');
    setTimeout(() => setShowNoteAddedToast(false), 2500);
  };

  const currentActivities = trip.activities[selectedDay] || [];
  const confirmedCount = trip.members.filter((m) => m.status === 'confirmado').length;
  const pendingCount = trip.members.filter((m) => m.status === 'pendiente').length;
  const paidCount = trip.members.filter((m) => m.percentage === 100).length;
  const hasItinerary = Object.keys(trip.activities).length > 0;

  return (
    <div className="flex flex-col w-full px-4 pt-2 pb-28 max-w-lg mx-auto space-y-6">
      {/* 1. Hero Destination Banner */}
      <section className="relative w-full rounded-3xl overflow-hidden shadow-lg bg-[#eae7e7]">
        <div
          className={`w-full h-64 bg-cover bg-center relative ${trip.image ? '' : 'bg-[#2a685e]'}`}
          style={trip.image ? { backgroundImage: `url("${trip.image}")` } : undefined}
        >
          {/* Subtle gradient for contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1b1c1c]/90 via-[#1b1c1c]/30 to-transparent" />

          {/* Top Badges */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2a685e] text-white font-caption text-xs font-bold shadow-md">
              <span className="w-2 h-2 rounded-full bg-[#a8e6d9] animate-pulse"></span>
              <span>{trip.status}</span>
            </span>
            <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#1b1c1c] font-caption text-xs font-bold shadow-md">
              {trip.daysRemaining > 0 ? `Faltan ${trip.daysRemaining} días` : 'Fechas por cerrar'}
            </span>
          </div>

          {/* Bottom Title & Squad Meta */}
          <div className="absolute bottom-4 left-4 right-4 flex flex-col space-y-1 text-white">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-sm text-white font-caption text-[11px] font-semibold">
                {trip.squadName}
              </span>
              <span className="px-2 py-0.5 rounded-full bg-[#fc8a40] text-white font-caption text-[11px] font-bold">
                {trip.days > 0 ? `${trip.days} Días` : 'Por definir'}
              </span>
            </div>
            <h1 className="font-headline-lg-mobile text-xl text-white font-extrabold leading-tight">
              {trip.title}
            </h1>
            <div className="flex items-center gap-1.5 text-xs text-[#eae7e7] font-caption">
              <Calendar size={13} className="text-[#a8e6d9]" />
              <span>{trip.dates}</span>
            </div>
          </div>
        </div>
      </section>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={onOpenCreate}
          className="px-4 py-2.5 rounded-full border border-[#e4e2e1] bg-white text-sm font-bold text-[#2a685e] shadow-xs active:scale-95"
        >
          Crear viaje
        </button>
      </div>

      {/* 2. El Parche de Viaje (Squad Avatars) */}
      <section className="bg-white rounded-3xl p-4 shadow-sm border border-[#e4e2e1] flex flex-col space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#ffdbc9] text-[#9b4500] flex items-center justify-center">
              <Users size={16} />
            </div>
            <div>
              <h2 className="font-headline-sm text-sm font-bold text-[#1b1c1c]">El parche</h2>
              <p className="font-caption text-xs text-[#707976]">
                {confirmedCount} {confirmedCount === 1 ? 'confirmado' : 'confirmados'} • {pendingCount} {pendingCount === 1 ? 'pendiente' : 'pendientes'}
              </p>
            </div>
          </div>
          <button
            onClick={() => onNavigate('parche')}
            className="font-caption text-xs text-[#2a685e] font-bold hover:underline"
          >
            Gestionar
          </button>
        </div>

        {/* Horizontal Avatars */}
        <div className="flex items-center gap-2.5 overflow-x-auto no-scrollbar pb-1">
          {trip.members.slice(0, 5).map((m) => (
            <div
              key={m.id}
              onClick={() => onNavigate('parche')}
              className="flex flex-col items-center gap-1 shrink-0 cursor-pointer active:scale-95 transition-transform"
            >
              <div className="relative">
                <MemberAvatar
                  name={m.name}
                  avatar={m.avatar}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-[#a8e6d9] text-sm"
                />
                {m.percentage === 100 && (
                  <span className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#2a685e] text-white flex items-center justify-center text-[9px] font-bold ring-2 ring-white">
                    ✓
                  </span>
                )}
              </div>
              <span className="font-caption text-[11px] font-semibold text-[#1b1c1c] text-center truncate max-w-[60px]">
                {m.name.split(' ')[0]}
              </span>
              <span className="text-[9px] text-[#707976] -mt-1 font-caption">
                {m.roleType === 'lider' ? 'Líder' : m.roleType === 'tesorero' ? 'Tesorero' : 'Viajero'}
              </span>
            </div>
          ))}

          {/* Invite Pill Trigger */}
          <button
            onClick={onOpenInvite}
            className="flex flex-col items-center justify-center w-12 h-12 rounded-full border-2 border-dashed border-[#2a685e] text-[#2a685e] shrink-0 hover:bg-[#a8e6d9]/20 active:scale-95 transition-all"
          >
            <Plus size={20} />
            <span className="text-[8px] font-bold uppercase">Invitar</span>
          </button>
        </div>
      </section>

      {/* 3. Alcancía del Parche Card */}
      <section className="bg-gradient-to-br from-[#FFFBF0] via-white to-[#a8e6d9]/20 rounded-3xl p-4 shadow-sm border border-[#e4e2e1] flex flex-col space-y-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-[#a8e6d9] text-[#2a685e] flex items-center justify-center shadow-xs">
              <PiggyBank size={22} />
            </div>
            <div>
              <h2 className="font-headline-sm text-sm font-bold text-[#1b1c1c] flex items-center gap-1.5">
                <span>Alcancía del parche</span>
                <span className="px-2 py-0.2 rounded-full bg-[#2a685e] text-white text-[10px] font-mono font-bold">
                  {trip.progressPercentage}%
                </span>
              </h2>
              <p className="font-caption text-xs text-[#3f4946]">{paidCount} de {trip.members.length} cuotas al día</p>
            </div>
          </div>
          <button
            onClick={() => onNavigate('alcancia')}
            className="px-2.5 py-1 rounded-full bg-white text-[#2a685e] font-caption text-xs font-bold border border-[#e4e2e1] hover:bg-[#f6f3f2]"
          >
            Ver detalle
          </button>
        </div>

        {/* Progress Bar */}
        <div className="flex flex-col space-y-1.5 bg-white/80 p-3 rounded-2xl border border-[#e4e2e1]/60">
          <div className="flex items-baseline justify-between">
            <div className="flex items-baseline gap-1">
              <span className="font-mono text-base font-bold text-[#2a685e]">
                ${trip.totalSaved.toLocaleString('es-CO')}
              </span>
              <span className="font-caption text-xs text-[#707976]">
                de ${trip.totalGoal.toLocaleString('es-CO')} COP
              </span>
            </div>
            <span className="font-caption text-[11px] font-semibold text-[#fc8a40]">
              Faltan ${(trip.totalGoal - trip.totalSaved).toLocaleString('es-CO')}
            </span>
          </div>

          <div className="w-full h-3 rounded-full bg-[#eae7e7] overflow-hidden p-0.5">
            <div
              className="h-full rounded-full bg-[#2a685e] transition-all duration-700 shadow-xs"
              style={{ width: `${trip.progressPercentage}%` }}
            />
          </div>
          <span className="font-caption text-[10px] text-[#707976]">
            Cuota sugerida: <strong>${trip.estimatedPerPerson.toLocaleString('es-CO')} COP / viajero</strong>
          </span>
        </div>

        {/* Two CTAs */}
        <div className="grid grid-cols-2 gap-2 pt-0.5">
          <button
            onClick={onOpenContribute}
            className="py-2.5 px-3 rounded-2xl bg-[#fc8a40] text-white font-headline-sm text-xs font-bold shadow-xs active:translate-y-0.5 transition-all flex items-center justify-center gap-1.5 hover:brightness-105"
          >
            <Plus size={15} />
            <span>Aportar</span>
          </button>
          <button
            onClick={() => onNavigate('alcancia')}
            className="py-2.5 px-3 rounded-2xl bg-white text-[#1b1c1c] font-headline-sm text-xs font-bold border border-[#e4e2e1] hover:bg-[#f6f3f2] flex items-center justify-center gap-1.5 active:scale-95 transition-all"
          >
            <CreditCard size={15} className="text-[#2a685e]" />
            <span>Movimientos</span>
          </button>
        </div>
      </section>

      {/* 4. Interactive Poll Widget */}
      <section className="bg-white rounded-3xl p-4 shadow-sm border border-[#e4e2e1] flex flex-col space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#e3d2ff] text-[#68548e] flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px]">how_to_vote</span>
            </div>
            <div>
              <span className="font-caption text-[10px] text-[#fc8a40] font-bold uppercase tracking-wider block">
                {trip.poll.dayLabel}
              </span>
              <h2 className="font-headline-sm text-sm font-bold text-[#1b1c1c]">Voto del parche</h2>
            </div>
          </div>
          <span className="px-2 py-0.5 rounded-full bg-[#f0eded] text-[#68548e] font-caption text-[11px] font-bold flex items-center gap-1">
            <Clock size={12} />
            <span>{trip.poll.closesIn}</span>
          </span>
        </div>

        <p className="font-body-md text-xs text-[#1b1c1c] font-semibold">
          {trip.poll.question}
        </p>

        {/* Live Vote Options */}
        <div className="flex flex-col gap-2">
          {trip.poll.options.length === 0 && (
            <p className="font-caption text-xs text-[#707976]">
              Aún no hay opciones. Abre el voto y propón la primera.
            </p>
          )}
          {trip.poll.options.map((option) => {
            const isSelected = trip.poll.userVotedOptionId === option.id;
            return (
              <div
                key={option.id}
                onClick={() => onVote(option.id)}
                className={`relative overflow-hidden rounded-2xl p-3 border cursor-pointer active:scale-[0.99] transition-all ${
                  isSelected
                    ? 'border-[#2a685e] bg-white shadow-xs ring-1 ring-[#2a685e]'
                    : 'border-[#e4e2e1] bg-[#fcf9f8] hover:border-[#95d2c6]'
                }`}
              >
                {/* Progress bar background fill */}
                <div
                  className={`absolute inset-0 transition-all duration-500 ${
                    isSelected ? 'bg-[#a8e6d9]/35' : 'bg-[#eae7e7]/50'
                  }`}
                  style={{ width: `${option.percentage}%` }}
                />
                <div className="relative z-10 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                        isSelected ? 'bg-[#2a685e] text-white' : 'bg-[#e4e2e1] text-[#707976]'
                      }`}
                    >
                      {isSelected ? <Check size={12} strokeWidth={3} /> : null}
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="font-body-md text-xs font-bold text-[#1b1c1c] truncate">
                        {option.title}
                      </span>
                      <span className="font-caption text-[10px] text-[#707976]">
                        {option.subtitle}
                      </span>
                    </div>
                  </div>
                  <span className="font-mono text-xs font-bold text-[#2a685e]">
                    {option.percentage}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={onOpenVote}
          className="text-center font-caption text-xs text-[#2a685e] font-bold hover:underline pt-0.5"
        >
          Abrir voto y chat →
        </button>
      </section>

      {/* 5. Segmented Navigation Tabs */}
      <section className="pt-1">
        <div className="grid grid-cols-4 p-1 bg-[#f0eded] rounded-2xl text-center">
          {(['itinerario', 'reservas', 'gastos', 'notas'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-2 text-xs font-headline-sm font-bold capitalize rounded-xl transition-all ${
                activeTab === tab
                  ? 'bg-white text-[#2a685e] shadow-xs'
                  : 'text-[#3f4946] hover:text-[#1b1c1c]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </section>

      {/* TAB CONTENT: Itinerario */}
      {activeTab === 'itinerario' && !hasItinerary && (
        <section className="p-6 text-center bg-white rounded-3xl border border-[#e4e2e1] text-[#707976] text-xs">
          Este parche todavía no tiene itinerario.
        </section>
      )}

      {activeTab === 'itinerario' && hasItinerary && (
        <section className="flex flex-col space-y-3">
          {/* Day Selector Pills */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar -mx-4 px-4 py-1">
            {days.map((d) => (
              <button
                key={d.id}
                onClick={() => setSelectedDay(d.id)}
                className={`flex flex-col items-center justify-center min-w-[70px] py-2 px-3 rounded-2xl transition-all active:scale-95 shadow-2xs ${
                  selectedDay === d.id
                    ? 'bg-[#2a685e] text-white font-bold'
                    : 'bg-white text-[#3f4946] border border-[#e4e2e1] hover:bg-[#f6f3f2]'
                }`}
              >
                <span className="text-[10px] uppercase font-caption">{d.label}</span>
                <span className="font-mono text-xs font-bold">{d.date}</span>
              </button>
            ))}
          </div>

          {/* Activities Timeline */}
          <div className="flex flex-col space-y-3">
            {currentActivities.length === 0 ? (
              <div className="p-6 text-center bg-white rounded-3xl border border-[#e4e2e1] text-[#707976] text-xs">
                No hay actividades cargadas para este día todavía. ¡Sé el primero en proponer una!
              </div>
            ) : (
              currentActivities.map((act) => (
                <div
                  key={act.id}
                  className="bg-white rounded-3xl p-4 shadow-sm border border-[#e4e2e1] flex flex-col space-y-2.5"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-caption text-xs font-semibold text-[#2a685e] flex items-center gap-1.5">
                      {act.type === 'flight' && <Plane size={15} />}
                      {act.type === 'car' && <Car size={15} />}
                      {act.type === 'hotel' && <Hotel size={15} />}
                      {act.type === 'dinner' && <Utensils size={15} />}
                      {act.type === 'activity' && <MapPin size={15} />}
                      <span>{act.time}</span>
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#f0eded] text-[#1b1c1c] font-caption text-[11px] font-bold">
                      {act.tag}
                    </span>
                  </div>

                  <h3 className="font-headline-sm text-sm font-bold text-[#1b1c1c]">
                    {act.title}
                  </h3>

                  <p className="font-body-sm text-xs text-[#3f4946] leading-relaxed">
                    {act.description}
                  </p>

                  {/* Villa Photo & Access Code if hotel */}
                  {act.image && (
                    <div className="relative rounded-2xl overflow-hidden mt-1 h-36 bg-[#f0eded]">
                      <img
                        src={act.image}
                        alt={act.title}
                        className="w-full h-full object-cover"
                      />
                      {act.accessCode && (
                        <div className="absolute bottom-2 left-2 bg-[#1b1c1c]/80 backdrop-blur-md px-3 py-1 rounded-xl text-white font-mono text-xs font-bold flex items-center gap-1.5 shadow-md">
                          <Key size={14} className="text-[#FFD93D]" />
                          <span>{act.accessCode}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>

          {/* Suggest activity button */}
          <button
            onClick={onOpenVote}
            className="w-full py-3 rounded-2xl bg-[#FFFBF0] border border-[#e4e2e1] text-[#2a685e] font-headline-sm text-xs font-bold flex items-center justify-center gap-2 hover:bg-[#f6f3f2] active:scale-95 transition-all shadow-xs"
          >
            <Plus size={16} />
            <span>Sugerir actividad</span>
          </button>
        </section>
      )}

      {/* TAB CONTENT: Reservas */}
      {activeTab === 'reservas' && (
        <section className="flex flex-col space-y-3">
          <div className="bg-white rounded-3xl p-4 border border-[#e4e2e1] shadow-xs flex flex-col gap-3">
            <h3 className="font-headline-sm text-sm font-bold text-[#1b1c1c]">Reservas</h3>
            {hasItinerary ? (
            <div className="flex flex-col gap-2">
              <div className="p-3 rounded-2xl bg-[#f6f3f2] flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Hotel size={18} className="text-[#2a685e]" />
                  <div>
                    <span className="font-bold text-xs text-[#1b1c1c] block">Villa Can Mar Blau</span>
                    <span className="text-[11px] text-[#707976]">Begur • Check-in 15 Jul</span>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-[#a8e6d9] text-[#00201b] text-[10px] font-bold">
                  Pagado 100%
                </span>
              </div>
              <div className="p-3 rounded-2xl bg-[#f6f3f2] flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Car size={18} className="text-[#2a685e]" />
                  <div>
                    <span className="font-bold text-xs text-[#1b1c1c] block">Europcar Mercedes Vito</span>
                    <span className="text-[11px] text-[#707976]">7 pasajeros • Reserva #EP-9821</span>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-[#a8e6d9] text-[#00201b] text-[10px] font-bold">
                  Confirmado
                </span>
              </div>
            </div>
            ) : (
              <p className="text-xs text-[#707976]">Este parche todavía no tiene reservas.</p>
            )}
          </div>
        </section>
      )}

      {/* TAB CONTENT: Gastos */}
      {activeTab === 'gastos' && (
        <section className="flex flex-col space-y-3">
          <div className="bg-white rounded-3xl p-4 border border-[#e4e2e1] shadow-xs flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <h3 className="font-headline-sm text-sm font-bold text-[#1b1c1c]">Presupuesto comprometido</h3>
              <button
                onClick={() => onNavigate('alcancia')}
                className="text-xs text-[#2a685e] font-bold hover:underline"
              >
                Ver alcancía completa
              </button>
            </div>
            <div className="flex flex-col gap-2">
              {trip.expenses.length === 0 && (
                <p className="text-xs text-[#707976]">Este parche todavía no tiene gastos comprometidos.</p>
              )}
              {trip.expenses.map((exp) => (
                <div key={exp.id} className="p-3 rounded-2xl bg-[#f6f3f2] flex items-center justify-between">
                  <div>
                    <span className="font-bold text-xs text-[#1b1c1c] block">{exp.title}</span>
                    <span className="text-[11px] text-[#707976]">{exp.description}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-mono text-xs font-bold text-[#2a685e] block">
                      ${exp.amount.toLocaleString('es-CO')}
                    </span>
                    <span className="text-[10px] text-[#9b4500] font-semibold">{exp.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* TAB CONTENT: Notas */}
      {activeTab === 'notas' && (
        <section className="flex flex-col space-y-3">
          <div className="bg-white rounded-3xl p-4 border border-[#e4e2e1] shadow-xs flex flex-col gap-3">
            <h3 className="font-headline-sm text-sm font-bold text-[#1b1c1c]">Notas del parche</h3>
            <p className="text-xs text-[#3f4946]">
              Apunta tips, números de emergencia, enlaces de restaurantes o cosas para empacar.
            </p>

            <form onSubmit={handleAddNote} className="flex gap-2">
              <input
                type="text"
                placeholder="Ej. Llevar protector solar extra"
                value={activityNote}
                onChange={(e) => setActivityNote(e.target.value)}
                className="flex-1 h-10 px-3 rounded-xl bg-[#f6f3f2] text-xs text-[#1b1c1c] border border-[#e4e2e1] focus:outline-none focus:border-[#2a685e]"
              />
              <button
                type="submit"
                className="px-3 rounded-xl bg-[#2a685e] text-white text-xs font-bold hover:bg-[#23584f]"
              >
                Guardar
              </button>
            </form>

            {showNoteAddedToast && (
              <span className="text-xs text-[#2a685e] font-bold animate-in fade-in">
                En este prototipo la nota no se guarda.
              </span>
            )}

            <div className="flex flex-col gap-2 pt-1 text-xs">
              <div className="p-3 rounded-2xl bg-[#FFFBF0] border border-[#e4e2e1]">
                <span className="font-bold text-[#2a685e] block">Seguro de Viaje Assist Card</span>
                <span className="text-[#3f4946]">Póliza colectiva #AC-778921. Asistencia 24h: +34 91 123 4567</span>
              </div>
              <div className="p-3 rounded-2xl bg-[#FFFBF0] border border-[#e4e2e1]">
                <span className="font-bold text-[#2a685e] block">Supermercado en Begur</span>
                <span className="text-[#3f4946]">Compra del parche en Mercadona de Palafrugell el primer día.</span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 6. Floating Action Bar */}
      <div className="fixed bottom-0 inset-x-0 w-full z-40 pb-safe px-4 pointer-events-none">
        <div className="max-w-md mx-auto mb-3 bg-[#1A1A1A]/90 backdrop-blur-xl border border-white/10 rounded-full p-2 shadow-2xl flex items-center justify-between gap-2 pointer-events-auto">
          <button
            onClick={onOpenVote}
            className="flex-1 h-11 px-4 rounded-full bg-white/10 hover:bg-white/20 text-white font-headline-sm text-xs font-bold flex items-center justify-center gap-2 active:scale-95 transition-all"
          >
            <MessageSquare size={16} className="text-[#FFD93D]" />
            <span>Votar</span>
          </button>
          <button
            onClick={onOpenContribute}
            className="flex-1 h-11 px-4 rounded-full bg-[#fc8a40] text-white font-headline-sm text-xs font-bold flex items-center justify-center gap-2 shadow-lg active:scale-95 hover:brightness-105 transition-all"
          >
            <PiggyBank size={16} />
            <span>Aportar</span>
          </button>
        </div>
      </div>
    </div>
  );
};
