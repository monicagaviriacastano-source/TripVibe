import React, { useState } from 'react';
import { 
  Users, 
  Copy, 
  Check, 
  MessageCircle, 
  QrCode, 
  Search, 
  Crown, 
  Shield, 
  Compass, 
  Camera, 
  Utensils, 
  Car, 
  Send, 
  AlertCircle, 
  ChevronDown, 
  ChevronUp, 
  UserPlus 
} from 'lucide-react';
import { Trip, SquadMember } from '../../types/trip';
import { MemberAvatar } from '../MemberAvatar';

interface SquadScreenProps {
  trip: Trip;
  onOpenInvite: () => void;
  onNavigate: (screen: string) => void;
}

export const SquadScreen: React.FC<SquadScreenProps> = ({
  trip,
  onOpenInvite,
  onNavigate,
}) => {
  const [filter, setFilter] = useState<'todos' | 'confirmados' | 'pendientes' | 'roles'>('todos');
  const [copied, setCopied] = useState(false);
  const [searchMember, setSearchMember] = useState('');
  const [directPhone, setDirectPhone] = useState('');
  const [invitedFeedback, setInvitedFeedback] = useState(false);
  const [showGovernance, setShowGovernance] = useState(false);
  const [remindedMembers, setRemindedMembers] = useState<Record<string, boolean>>({});

  const inviteLink = 'tripvibe.app/join/costa-brava-7x9';

  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(inviteLink);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendDirectInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!directPhone.trim()) return;
    setInvitedFeedback(true);
    setDirectPhone('');
    setTimeout(() => setInvitedFeedback(false), 3000);
  };

  const handleRemindMember = (id: string) => {
    setRemindedMembers((prev) => ({ ...prev, [id]: true }));
  };

  const filteredMembers = trip.members.filter((m) => {
    const matchesSearch = m.name.toLowerCase().includes(searchMember.toLowerCase()) ||
      m.role.toLowerCase().includes(searchMember.toLowerCase());
    if (!matchesSearch) return false;

    if (filter === 'confirmados') return m.status === 'confirmado';
    if (filter === 'pendientes') return m.status === 'pendiente';
    if (filter === 'roles') return m.isKeyRole;
    return true;
  });

  const confirmedCount = trip.members.filter((m) => m.status === 'confirmado').length;
  const pendingCount = trip.members.filter((m) => m.status === 'pendiente').length;

  return (
    <div className="flex flex-col w-full px-4 pt-2 pb-28 max-w-lg mx-auto space-y-6">
      {/* 1. Resumen del Squad */}
      <section className="bg-gradient-to-br from-[#FFFBF0] via-white to-[#ffdbc9]/40 rounded-3xl p-5 shadow-sm border border-[#e4e2e1] flex flex-col space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-[#fc8a40] text-white flex items-center justify-center shadow-xs">
              <Users size={22} />
            </div>
            <div>
              <span className="font-caption text-[11px] text-[#9b4500] font-extrabold uppercase tracking-wider block">
                {trip.squadName}
              </span>
              <h2 className="font-headline-sm text-sm font-bold text-[#1b1c1c]">
                {confirmedCount} confirmados • {pendingCount} pendientes
              </h2>
            </div>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-[#2a685e] text-white font-caption text-xs font-bold shadow-xs">
            Límite: 8 personas
          </span>
        </div>

        {/* Capacity Indicator */}
        <div className="bg-white/80 p-3 rounded-2xl border border-[#e4e2e1]/70 flex flex-col space-y-1.5">
          <div className="flex items-center justify-between text-xs font-caption">
            <span className="text-[#3f4946]">Capacidad Minivan &amp; Villa:</span>
            <span className="font-bold text-[#2a685e]">Quedan 2 cupos libres</span>
          </div>
          <div className="w-full h-2.5 rounded-full bg-[#eae7e7] overflow-hidden">
            <div
              className="h-full rounded-full bg-[#fc8a40] transition-all duration-700"
              style={{ width: `${(confirmedCount / 8) * 100}%` }}
            />
          </div>
          <span className="text-[10px] text-[#707976]">Minivan al 75% • Costo por persona disminuye con cada integrante</span>
        </div>
      </section>

      {/* 2. Quick Invite Card */}
      <section className="bg-white rounded-3xl p-4 shadow-sm border border-[#e4e2e1] flex flex-col space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-headline-sm text-sm font-bold text-[#1b1c1c] flex items-center gap-1.5">
            <UserPlus size={16} className="text-[#2a685e]" />
            <span>Enlace de invitación</span>
          </h3>
          <span className="font-caption text-[11px] text-[#707976]">Válido por 7 días</span>
        </div>

        <div className="flex items-center gap-2 bg-[#f6f3f2] rounded-2xl p-2 border border-[#e4e2e1]">
          <span className="font-mono text-xs font-semibold text-[#1b1c1c] px-2 truncate flex-1">
            {inviteLink}
          </span>
          <button
            onClick={handleCopyLink}
            className="px-3 py-1.5 rounded-xl bg-[#2a685e] text-white font-headline-sm text-xs font-bold flex items-center gap-1 active:scale-95 transition-all shadow-xs"
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
            <span>{copied ? '¡Copiado!' : 'Copiar'}</span>
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2 pt-0.5">
          <button
            onClick={onOpenInvite}
            className="py-2.5 px-3 rounded-2xl bg-[#a8e6d9] text-[#00201b] font-headline-sm text-xs font-bold flex items-center justify-center gap-1.5 active:scale-95 transition-transform"
          >
            <MessageCircle size={16} className="text-[#2a685e]" />
            <span>WhatsApp</span>
          </button>
          <button
            onClick={onOpenInvite}
            className="py-2.5 px-3 rounded-2xl bg-[#f0eded] text-[#1b1c1c] font-headline-sm text-xs font-bold flex items-center justify-center gap-1.5 active:scale-95 transition-transform"
          >
            <QrCode size={16} className="text-[#3f4946]" />
            <span>Código QR</span>
          </button>
        </div>
      </section>

      {/* 3. Search & Filter Squad */}
      <section className="flex flex-col space-y-2.5">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#707976]">
            <Search size={16} />
          </div>
          <input
            type="text"
            placeholder="Buscar por nombre o rol..."
            value={searchMember}
            onChange={(e) => setSearchMember(e.target.value)}
            className="w-full h-11 pl-9 pr-3 rounded-2xl bg-white border border-[#e4e2e1] text-xs font-body-md text-[#1b1c1c] focus:outline-none focus:border-[#2a685e] shadow-2xs"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar -mx-4 px-4 pb-1">
          {[
            { id: 'todos', label: 'Todos (8)' },
            { id: 'confirmados', label: `Confirmados (${confirmedCount})` },
            { id: 'pendientes', label: `Pendientes (${pendingCount})` },
            { id: 'roles', label: 'Roles Clave' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setFilter(item.id as any)}
              className={`px-3 py-1.5 rounded-full font-caption text-xs font-bold whitespace-nowrap transition-all shadow-2xs ${
                filter === item.id
                  ? 'bg-[#2a685e] text-white'
                  : 'bg-white text-[#3f4946] border border-[#e4e2e1] hover:bg-[#f6f3f2]'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </section>

      {/* 4. Squad Member Cards */}
      <section className="flex flex-col space-y-2.5">
        {filteredMembers.map((member) => (
          <div
            key={member.id}
            className="bg-white rounded-3xl p-3.5 shadow-sm border border-[#e4e2e1] flex items-center justify-between gap-3"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="relative">
                <MemberAvatar
                  name={member.name}
                  avatar={member.avatar}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-[#e4e2e1] bg-[#f0eded] text-sm"
                />
                {member.status === 'confirmado' ? (
                  <span className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#2a685e] text-white flex items-center justify-center text-[9px] font-bold ring-2 ring-white">
                    ✓
                  </span>
                ) : (
                  <span className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#fc8a40] text-white flex items-center justify-center text-[9px] font-bold ring-2 ring-white">
                    !
                  </span>
                )}
              </div>

              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1.5">
                  <h4 className="font-headline-sm text-sm font-bold text-[#1b1c1c] truncate">
                    {member.name}
                  </h4>
                  {member.roleType === 'lider' && (
                    <span className="px-1.5 py-0.2 rounded-md bg-[#ffdbc9] text-[#9b4500] font-caption text-[9px] font-bold flex items-center gap-0.5">
                      <Crown size={10} />
                      <span>Líder</span>
                    </span>
                  )}
                  {member.roleType === 'tesorero' && (
                    <span className="px-1.5 py-0.2 rounded-md bg-[#a8e6d9] text-[#00201b] font-caption text-[9px] font-bold flex items-center gap-0.5">
                      <Shield size={10} />
                      <span>Tesorero</span>
                    </span>
                  )}
                </div>

                <span className="font-caption text-xs text-[#3f4946] truncate">
                  {member.role}
                </span>

                <span className="text-[10px] text-[#707976] mt-0.5 font-caption">
                  {member.status === 'confirmado' ? (
                    <span className="text-[#2a685e] font-semibold">
                      Aporte: ${member.contributionAmount.toLocaleString('es-CO')} COP ({member.percentage}%)
                    </span>
                  ) : (
                    <span className="text-[#fc8a40] font-semibold">
                      {member.statusText}
                    </span>
                  )}
                </span>
              </div>
            </div>

            {/* Action based on status */}
            <div className="shrink-0">
              {member.status === 'confirmado' ? (
                <div className="w-8 h-8 rounded-full bg-[#a8e6d9]/40 text-[#2a685e] flex items-center justify-center">
                  <Check size={16} strokeWidth={2.5} />
                </div>
              ) : (
                <button
                  onClick={() => handleRemindMember(member.id)}
                  disabled={remindedMembers[member.id]}
                  className="px-2.5 py-1 rounded-xl bg-[#ffdbc9] text-[#9b4500] hover:bg-[#fc8a40] hover:text-white font-caption text-xs font-bold active:scale-95 transition-all disabled:opacity-50"
                >
                  {remindedMembers[member.id] ? 'Simulado' : 'Reenviar'}
                </button>
              )}
            </div>
          </div>
        ))}
      </section>

      {/* 5. Reglas & Gobernanza del Parche (Collapsible) */}
      <section className="bg-white rounded-3xl p-4 shadow-sm border border-[#e4e2e1]">
        <button
          onClick={() => setShowGovernance(!showGovernance)}
          className="w-full flex items-center justify-between text-left"
        >
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#e3d2ff] text-[#68548e] flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px]">gavel</span>
            </div>
            <div>
              <h4 className="font-headline-sm text-sm font-bold text-[#1b1c1c]">
                Reglas del parche
              </h4>
              <p className="font-caption text-xs text-[#707976]">Pautas acordadas para viajar en paz</p>
            </div>
          </div>
          {showGovernance ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>

        {showGovernance && (
          <div className="flex flex-col gap-2.5 pt-3 mt-3 border-t border-[#f0eded] text-xs text-[#3f4946] animate-in fade-in">
            <div className="flex items-start gap-2">
              <span className="font-bold text-[#2a685e]">1.</span>
              <p><strong>Los votos mandan:</strong> Un cambio de plan de más de $200.000 COP se vota. Gana la mayoría.</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-bold text-[#2a685e]">2.</span>
              <p><strong>Alcancía a la vista:</strong> Cada recibo se sube y todo el parche lo puede ver.</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-bold text-[#2a685e]">3.</span>
              <p><strong>Aportes a tiempo:</strong> Quien no complete el aporte 10 días antes del vuelo cede la prioridad de habitación.</p>
            </div>
          </div>
        )}
      </section>

      {/* 6. Formulario de Invitación Directa */}
      <section className="bg-[#FFFBF0] rounded-3xl p-4 border border-[#e4e2e1] shadow-xs flex flex-col space-y-2.5">
        <h4 className="font-headline-sm text-xs font-bold text-[#1b1c1c]">
          Invitar directamente por Celular
        </h4>
        <form onSubmit={handleSendDirectInvite} className="flex gap-2">
          <input
            type="tel"
            placeholder="+57 300 123 4567"
            value={directPhone}
            onChange={(e) => setDirectPhone(e.target.value)}
            className="flex-1 h-11 px-3.5 rounded-2xl bg-white border border-[#bfc9c5] text-xs font-body-md text-[#1b1c1c] focus:outline-none focus:border-[#2a685e]"
          />
          <button
            type="submit"
            className="px-4 h-11 rounded-2xl bg-[#fc8a40] text-white font-headline-sm text-xs font-bold shrink-0 hover:brightness-105 active:scale-95 shadow-xs transition-all"
          >
            Invitar
          </button>
        </form>
        {invitedFeedback && (
          <span className="font-caption text-xs text-[#2a685e] font-bold animate-in fade-in">
            En este prototipo no se envía el mensaje. El número no sale de esta pantalla.
          </span>
        )}
      </section>

      {/* 7. Bottom Action */}
      <button
        onClick={onOpenInvite}
        className="w-full py-3.5 rounded-2xl bg-[#2a685e] text-white font-headline-sm text-sm font-bold shadow-md hover:bg-[#23584f] active:scale-[0.99] transition-all flex items-center justify-center gap-2"
      >
        <UserPlus size={18} />
        <span>Invitar al parche</span>
      </button>
    </div>
  );
};
