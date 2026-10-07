import React, { useState } from 'react';
import { 
  User, 
  MapPin, 
  Share2, 
  QrCode, 
  Edit3, 
  Wallet, 
  Award, 
  Heart, 
  MessageSquare, 
  ChevronRight, 
  CreditCard, 
  Bell, 
  ShieldCheck, 
  LogOut, 
  Plus, 
  ArrowDownLeft, 
  CheckCircle,
  Sparkles
} from 'lucide-react';
import { PROFILE_DATA } from '../../data/mockData';
import { Trip } from '../../types/trip';
import { SIGN_IN_OPTIONS, SignInMethod } from '../signIn';

interface ProfileScreenProps {
  trip: Trip;
  account: SignInMethod | null;
  onNavigate: (screen: string) => void;
  onOpenContribute: () => void;
  onSignOut: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  trip,
  account,
  onNavigate,
  onOpenContribute,
  onSignOut,
}) => {
  const [activeTab, setActiveTab] = useState<'viajes' | 'insignias' | 'favoritos' | 'resenas'>('viajes');
  const [vaultBalance, setVaultBalance] = useState(PROFILE_DATA.vaultBalance);
  const [showToast, setShowToast] = useState<string | null>(null);

  const handleActionToast = (msg: string) => {
    setShowToast(msg);
    setTimeout(() => setShowToast(null), 2500);
  };

  return (
    <div className="flex flex-col w-full px-4 pt-2 pb-28 max-w-lg mx-auto space-y-6">
      {/* Toast Feedback */}
      {showToast && (
        <div className="bg-[#2a685e] text-white rounded-2xl p-3 shadow-md flex items-center gap-2 animate-in slide-in-from-top duration-200">
          <CheckCircle size={18} className="text-[#a8e6d9] shrink-0" />
          <span className="font-caption text-xs font-semibold">{showToast}</span>
        </div>
      )}

      {/* 1. Profile Header Card */}
      <section className="bg-white rounded-3xl p-5 shadow-sm border border-[#e4e2e1] flex flex-col space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3.5">
            <div className="relative">
              <img
                src={PROFILE_DATA.avatar}
                alt={PROFILE_DATA.name}
                className="w-18 h-18 rounded-full object-cover ring-4 ring-[#a8e6d9]"
              />
              <span className="absolute -bottom-1 -right-1 px-2 py-0.5 rounded-full bg-[#2a685e] text-white text-[9px] font-bold ring-2 ring-white">
                PRO
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-headline-sm text-base font-bold text-[#1b1c1c]">
                  {PROFILE_DATA.name}
                </h1>
                <span className="px-2 py-0.5 rounded-full bg-[#ffdbc9] text-[#9b4500] font-caption text-[10px] font-bold">
                  {PROFILE_DATA.role}
                </span>
              </div>
              <span className="font-caption text-xs text-[#707976] block">
                {PROFILE_DATA.handle}
              </span>
              {account && (
                <span className="font-caption text-xs text-[#2a685e] font-semibold block mt-0.5">
                  Con {SIGN_IN_OPTIONS[account].label} · {SIGN_IN_OPTIONS[account].detail}
                </span>
              )}
              <span className="font-caption text-xs text-[#3f4946] flex items-center gap-1 mt-0.5">
                <MapPin size={12} className="text-[#2a685e]" />
                <span>{PROFILE_DATA.location}</span>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => handleActionToast('Enlace de perfil copiado')}
              aria-label="Compartir perfil"
              className="w-8 h-8 rounded-full bg-[#f0eded] hover:bg-[#eae7e7] flex items-center justify-center text-[#3f4946] transition-colors"
            >
              <Share2 size={15} />
            </button>
            <button
              onClick={() => handleActionToast('QR de viajero generado')}
              aria-label="Mostrar QR de viajero"
              className="w-8 h-8 rounded-full bg-[#f0eded] hover:bg-[#eae7e7] flex items-center justify-center text-[#3f4946] transition-colors"
            >
              <QrCode size={15} />
            </button>
          </div>
        </div>

        <p className="text-xs text-[#3f4946] font-body-sm leading-relaxed">
          {PROFILE_DATA.bio}
        </p>

        {/* Edit profile button */}
        <button
          onClick={() => handleActionToast('Modo edición de perfil')}
          className="w-full py-2 px-3 rounded-xl bg-[#f6f3f2] hover:bg-[#f0eded] text-xs font-bold text-[#1b1c1c] flex items-center justify-center gap-1.5 transition-colors"
        >
          <Edit3 size={14} />
          <span>Editar perfil</span>
        </button>
      </section>

      {/* 2. Stats Grid */}
      <section className="grid grid-cols-4 gap-2 text-center">
        <div className="bg-white p-2.5 rounded-2xl border border-[#e4e2e1] shadow-2xs">
          <span className="font-headline-sm text-sm font-extrabold text-[#2a685e] block">
            {PROFILE_DATA.stats.trips}
          </span>
          <span className="font-caption text-[10px] text-[#707976]">Viajes</span>
        </div>
        <div className="bg-white p-2.5 rounded-2xl border border-[#e4e2e1] shadow-2xs">
          <span className="font-headline-sm text-sm font-extrabold text-[#fc8a40] block">
            {PROFILE_DATA.stats.friends}
          </span>
          <span className="font-caption text-[10px] text-[#707976]">Del parche</span>
        </div>
        <div className="bg-white p-2.5 rounded-2xl border border-[#e4e2e1] shadow-2xs">
          <span className="font-mono text-xs font-extrabold text-[#1b1c1c] block truncate">
            {PROFILE_DATA.stats.managedCOP}
          </span>
          <span className="font-caption text-[10px] text-[#707976]">Alcancías COP</span>
        </div>
        <div className="bg-white p-2.5 rounded-2xl border border-[#e4e2e1] shadow-2xs">
          <span className="font-headline-sm text-sm font-extrabold text-[#68548e] block">
            {PROFILE_DATA.stats.reliability}
          </span>
          <span className="font-caption text-[10px] text-[#707976]">Puntualidad</span>
        </div>
      </section>

      {/* 3. TripVibe Vault (Bóveda Personal) */}
      <section className="bg-gradient-to-br from-[#e3d2ff]/40 via-white to-[#a8e6d9]/30 rounded-3xl p-4 shadow-sm border border-[#e4e2e1] flex flex-col space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-2xl bg-[#68548e] text-white flex items-center justify-center shadow-xs">
              <Wallet size={18} />
            </div>
            <div>
              <h3 className="font-headline-sm text-sm font-bold text-[#1b1c1c]">
                Tu saldo
              </h3>
              <p className="font-caption text-[11px] text-[#707976]">Plata tuya, no de la alcancía</p>
            </div>
          </div>
          <span className="font-mono text-base font-extrabold text-[#2a685e]">
            ${vaultBalance.toLocaleString('es-CO')} COP
          </span>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => {
              setVaultBalance((prev) => prev + 100000);
              handleActionToast('+$100.000 COP anotados en esta pantalla. No salió plata de una cuenta.');
            }}
            className="flex-1 py-2 rounded-xl bg-[#2a685e] text-white font-headline-sm text-xs font-bold flex items-center justify-center gap-1 active:scale-95 transition-all shadow-xs"
          >
            <Plus size={14} />
            <span>Recargar</span>
          </button>
          <button
            onClick={() => handleActionToast('En este prototipo el retiro no mueve plata.')}
            className="flex-1 py-2 rounded-xl bg-white text-[#1b1c1c] font-headline-sm text-xs font-bold border border-[#e4e2e1] flex items-center justify-center gap-1 active:scale-95 transition-all"
          >
            <ArrowDownLeft size={14} />
            <span>Retirar</span>
          </button>
        </div>
      </section>

      {/* 4. Tabs Section */}
      <section>
        <div className="grid grid-cols-4 p-1 bg-[#f0eded] rounded-2xl text-center">
          {[
            { id: 'viajes', label: 'Viajes' },
            { id: 'insignias', label: 'Insignias' },
            { id: 'favoritos', label: 'Favoritos' },
            { id: 'resenas', label: 'Reseñas' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-2 text-[11px] font-bold rounded-xl transition-all ${
                activeTab === tab.id
                  ? 'bg-white text-[#2a685e] shadow-xs'
                  : 'text-[#3f4946] hover:text-[#1b1c1c]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </section>

      {/* TAB CONTENT: Mis Viajes */}
      {activeTab === 'viajes' && (
        <section className="flex flex-col space-y-2.5">
          {/* Active Trip 1 */}
          <div
            onClick={() => onNavigate('detalle-viaje')}
            className="p-3.5 bg-white rounded-2xl border border-[#e4e2e1] shadow-xs flex items-center justify-between gap-3 cursor-pointer hover:shadow-md transition-all active:scale-[0.99]"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-[#a8e6d9] text-[#2a685e] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[20px]">beach_access</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-headline-sm text-xs font-bold text-[#1b1c1c] truncate">
                  Costa Brava &amp; Barcelona
                </span>
                <span className="font-caption text-[11px] text-[#707976]">
                  15 - 22 Jul 2025 • 6 miembros
                </span>
                <span className="font-mono text-[11px] text-[#2a685e] font-semibold">
                  Alcancía 78% ($6.24M COP)
                </span>
              </div>
            </div>
            <ChevronRight size={18} className="text-[#707976] shrink-0" />
          </div>

          {/* Active Trip 2 */}
          <div
            onClick={() => onNavigate('detalle-viaje')}
            className="p-3.5 bg-white rounded-2xl border border-[#e4e2e1] shadow-xs flex items-center justify-between gap-3 cursor-pointer hover:shadow-md transition-all active:scale-[0.99]"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-[#ffdbc9] text-[#9b4500] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[20px]">cabin</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-headline-sm text-xs font-bold text-[#1b1c1c] truncate">
                  Fin de Año Barichara
                </span>
                <span className="font-caption text-[11px] text-[#707976]">
                  28 Dic - 03 Ene • Votaciones activas
                </span>
                <span className="font-mono text-[11px] text-[#fc8a40] font-semibold">
                  Alcancía 45% ($2.1M COP)
                </span>
              </div>
            </div>
            <ChevronRight size={18} className="text-[#707976] shrink-0" />
          </div>

          {/* Past Trip 3 */}
          <div className="p-3.5 bg-white/70 rounded-2xl border border-[#e4e2e1] shadow-2xs flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-[#f0eded] text-[#707976] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[20px]">coffee</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-headline-sm text-xs font-bold text-[#1b1c1c] truncate">
                  Eje Cafetero &amp; Salento
                </span>
                <span className="font-caption text-[11px] text-[#707976]">
                  Completado Nov 2024 • 6 panas
                </span>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-[#f0eded] text-[10px] font-bold text-[#707976]">
              Finalizado
            </span>
          </div>
        </section>
      )}

      {/* TAB CONTENT: Insignias */}
      {activeTab === 'insignias' && (
        <section className="grid grid-cols-2 gap-2.5">
          {PROFILE_DATA.badges.map((b, i) => (
            <div
              key={i}
              className="p-3 bg-white rounded-2xl border border-[#e4e2e1] flex flex-col justify-between gap-2 shadow-2xs"
            >
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${b.color}`}>
                  <span className="material-symbols-outlined text-[18px]">{b.icon}</span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-[#f0eded] text-[9px] font-bold text-[#3f4946]">
                  {b.tag}
                </span>
              </div>
              <div>
                <span className="font-caption text-xs font-bold text-[#1b1c1c] block">
                  {b.title}
                </span>
                <span className="text-[10px] text-[#707976] leading-tight block mt-0.5">
                  {b.description}
                </span>
              </div>
            </div>
          ))}
        </section>
      )}

      {/* TAB CONTENT: Favoritos */}
      {activeTab === 'favoritos' && (
        <section className="p-4 bg-white rounded-2xl border border-[#e4e2e1] text-xs text-[#3f4946] flex flex-col gap-2">
          <span className="font-bold text-[#1b1c1c]">12 Destinos guardados para futuros parches:</span>
          <p className="text-[11px] text-[#707976]">
            Canggu Bali, Parque Tayrona, Villa de Leyva, Oaxaca Mágica, San Andrés &amp; Cayos, Tokyo Street...
          </p>
          <button
            onClick={() => onNavigate('buscar')}
            className="w-max px-3 py-1.5 rounded-xl bg-[#2a685e] text-white font-bold text-[11px] mt-1"
          >
            Explorar más parches
          </button>
        </section>
      )}

      {/* TAB CONTENT: Reseñas */}
      {activeTab === 'resenas' && (
        <section className="flex flex-col gap-2">
          <div className="p-3 bg-white rounded-2xl border border-[#e4e2e1] text-xs">
            <div className="flex items-center justify-between mb-1">
              <span className="font-bold text-[#1b1c1c]">Camila R. (Líder Costa Brava)</span>
              <span className="text-[#FFD93D] font-bold">★★★★★</span>
            </div>
            <p className="text-[#3f4946]">
              "El mejor tesorero que un parche puede tener. Las cuentas quedaron al centavo y nunca hubo discusiones por dinero."
            </p>
          </div>
          <div className="p-3 bg-white rounded-2xl border border-[#e4e2e1] text-xs">
            <div className="flex items-center justify-between mb-1">
              <span className="font-bold text-[#1b1c1c]">Santi M. (Eje Cafetero)</span>
              <span className="text-[#FFD93D] font-bold">★★★★★</span>
            </div>
            <p className="text-[#3f4946]">
              "Siempre puntual con las reservas y las rutas. 10/10 para viajar en combo."
            </p>
          </div>
        </section>
      )}

      {/* 5. Quick Settings */}
      <section className="bg-white rounded-3xl p-4 shadow-sm border border-[#e4e2e1] flex flex-col divide-y divide-[#f0eded]">
        <button
          onClick={() => handleActionToast('Métodos de pago vinculados: Bancolombia ***8291, Nequi')}
          className="py-2.5 flex items-center justify-between text-left hover:text-[#2a685e] transition-colors"
        >
          <div className="flex items-center gap-2.5">
            <CreditCard size={18} className="text-[#2a685e]" />
            <span className="font-body-md text-xs font-bold text-[#1b1c1c]">
              Métodos de Pago &amp; Cuentas COP
            </span>
          </div>
          <span className="font-caption text-xs text-[#707976]">Nequi / Bancolombia →</span>
        </button>

        <button
          onClick={() => handleActionToast('Moneda predeterminada fijada en Pesos Colombianos (COP)')}
          className="py-2.5 flex items-center justify-between text-left hover:text-[#2a685e] transition-colors"
        >
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-[18px] text-[#2a685e]">payments</span>
            <span className="font-body-md text-xs font-bold text-[#1b1c1c]">
              Moneda Predeterminada
            </span>
          </div>
          <span className="font-caption text-xs font-bold text-[#2a685e]">COP (🇨🇴) →</span>
        </button>

        <button
          onClick={() => handleActionToast('Notificaciones push y WhatsApp activas')}
          className="py-2.5 flex items-center justify-between text-left hover:text-[#2a685e] transition-colors"
        >
          <div className="flex items-center gap-2.5">
            <Bell size={18} className="text-[#2a685e]" />
            <span className="font-body-md text-xs font-bold text-[#1b1c1c]">
              Notificaciones de Votación &amp; Cuotas
            </span>
          </div>
          <span className="font-caption text-xs text-[#707976]">Activas →</span>
        </button>

        <button
          onClick={() => handleActionToast('Autenticación biométrica y encriptación activada')}
          className="py-2.5 flex items-center justify-between text-left hover:text-[#2a685e] transition-colors"
        >
          <div className="flex items-center gap-2.5">
            <ShieldCheck size={18} className="text-[#2a685e]" />
            <span className="font-body-md text-xs font-bold text-[#1b1c1c]">
              Seguridad
            </span>
          </div>
          <span className="font-caption text-xs text-[#2a685e] font-bold">Verificado ✓</span>
        </button>
      </section>

      {/* 6. Referral Card */}
      <section className="bg-gradient-to-r from-[#ffdbc9] to-[#FFFBF0] rounded-3xl p-4 border border-[#e4e2e1] shadow-xs flex items-center justify-between gap-3">
        <div className="flex flex-col gap-0.5">
          <span className="font-caption text-[10px] font-bold text-[#9b4500] uppercase">
            Invita a otros amigos
          </span>
          <h4 className="font-headline-sm text-sm font-bold text-[#1b1c1c]">
            Gana $50.000 COP en tu próxima alcancía
          </h4>
          <p className="font-caption text-[11px] text-[#3f4946]">
            Por cada amigo que arme su primer parche y llegue al 50% de la meta.
          </p>
        </div>
        <button
          onClick={() => handleActionToast('Enlace de referido copiado')}
          className="px-3 py-2 rounded-xl bg-[#fc8a40] text-white font-headline-sm text-xs font-bold shrink-0 shadow-xs active:scale-95"
        >
          Compartir
        </button>
      </section>

      {/* 7. Bottom Switch to Guest / Landing View */}
      <div className="pt-2 flex flex-col gap-2">
        <button
          onClick={onSignOut}
          className="w-full py-3 rounded-2xl bg-white border border-[#e4e2e1] text-[#707976] hover:text-[#ba1a1a] font-headline-sm text-xs font-bold flex items-center justify-center gap-2 transition-colors active:scale-95"
        >
          <LogOut size={16} />
          <span>Ver landing / Salir</span>
        </button>
      </div>
    </div>
  );
};
