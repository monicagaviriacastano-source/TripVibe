import React, { useState } from 'react';
import { ArrowLeft, Bell, Share2, X } from 'lucide-react';
import tripvibeLogo from '../assets/tripvibe-logo.jpg';

interface HeaderProps {
  currentScreen: string;
  onNavigate: (screen: string) => void;
  onBack?: () => void;
  tripTitle?: string;
  tripSubtitle?: string;
  featuredTitle?: string;
  onShare?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentScreen,
  onNavigate,
  onBack,
  tripTitle,
  tripSubtitle,
  featuredTitle,
  onShare,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadNotifications, setUnreadNotifications] = useState(2);

  const notificationsList = [
    { id: 1, title: '¡Sofi aportó $250.000!', desc: 'La alcancía de EuroTrip llegó al 68%.', time: 'Hace 10m' },
    { id: 2, title: 'Nuevo voto abierto', desc: 'Camila propuso catamarán en Costa Brava.', time: 'Hace 1h' },
    { id: 3, title: 'Aporte pendiente', desc: 'Valentina tiene la mitad de su cuota.', time: 'Ayer' },
  ];

  const isStackScreen = currentScreen === 'detalle-viaje' || currentScreen === 'parche' || currentScreen === 'alcancia';
  const showsBack = isStackScreen || currentScreen === 'filtros' || currentScreen === 'viaje-destacado';

  return (
    <header className="fixed top-0 inset-x-0 w-full z-40 bg-[#fcf9f8]/90 backdrop-blur-xl border-b border-[#f0eded] shadow-xs pt-safe">
      <div className="h-16 px-4 max-w-lg mx-auto flex items-center justify-between gap-2">
        {/* Left Slot: Back or Logo */}
        <div className="flex items-center gap-2.5 min-w-0 flex-1">
          {showsBack ? (
            <button
              onClick={onBack || (() => onNavigate('inicio'))}
              aria-label="Volver"
              className="w-10 h-10 -ml-1 rounded-full flex items-center justify-center text-[#1b1c1c] hover:bg-[#f0eded] active:scale-95 transition-all"
            >
              <ArrowLeft size={22} />
            </button>
          ) : (
            <button
              onClick={() => onNavigate('inicio')}
              className="flex items-center text-left focus:outline-none shrink-0"
            >
              <img
                src={tripvibeLogo}
                alt="TripVibe"
                className="h-10 w-auto object-contain object-left"
              />
            </button>
          )}

          <div className="flex flex-col min-w-0">
            {currentScreen === 'filtros' && (
              <>
                <span className="font-headline-md text-[#1b1c1c] font-bold">Filtros</span>
                <span className="font-caption text-[11px] text-[#3f4946]">Destino, fechas y personas</span>
              </>
            )}

            {currentScreen === 'buscar' && (
              <>
                <span className="font-headline-md text-[#1b1c1c] font-bold">Explorar</span>
                <span className="font-caption text-[11px] text-[#3f4946]">Parches y destinos</span>
              </>
            )}

            {currentScreen === 'viaje-destacado' && (
              <>
                <h1 className="font-headline-sm text-[#1b1c1c] leading-tight font-bold truncate">
                  {featuredTitle || 'Viaje'}
                </h1>
              </>
            )}

            {currentScreen === 'detalle-viaje' && (
              <>
                <h1 className="font-headline-sm text-sm text-[#1b1c1c] leading-tight font-bold truncate">
                  {tripTitle || 'Detalle del viaje'}
                </h1>
                <span className="font-caption text-[11px] text-[#9b4500] font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#fc8a40] animate-pulse"></span>
                  En votación
                </span>
              </>
            )}

            {currentScreen === 'alcancia' && (
              <>
                <h1 className="font-headline-sm text-sm text-[#1b1c1c] leading-tight font-bold truncate">
                  Alcancía del parche
                </h1>
                <span className="font-caption text-[11px] text-[#3f4946] truncate">
                  {tripSubtitle || 'Aventura Costa Brava'}
                </span>
              </>
            )}

            {currentScreen === 'parche' && (
              <>
                <h1 className="font-headline-sm text-sm text-[#1b1c1c] leading-tight font-bold truncate">
                  El parche
                </h1>
                <span className="font-caption text-[11px] text-[#9b4500] font-semibold">
                  Aventura Costa Brava • 6 viajeros
                </span>
              </>
            )}

            {currentScreen === 'perfil' && (
              <>
                <span className="font-headline-md text-[#1b1c1c] font-bold">Tu perfil</span>
                <span className="font-caption text-[11px] text-[#2a685e] font-semibold">Tesorero Pro</span>
              </>
            )}

            {currentScreen === 'favoritos' && (
              <h1 className="font-headline-md text-[#1b1c1c] font-bold">Favoritos</h1>
            )}

            {currentScreen === 'ofertas' && (
              <h1 className="font-headline-md text-[#1b1c1c] font-bold">Ofertas</h1>
            )}

            {currentScreen === 'landing' && (
              <span className="font-caption text-[11px] text-[#3f4946]">Vista de invitado</span>
            )}
          </div>
        </div>

        {/* Right Slot: Currency, share and notifications */}
        <div className="flex items-center gap-1.5 shrink-0">
          {/* COP Currency Tag */}
          <div className="flex items-center gap-1 bg-[#FFFBF0] border border-[#e4e2e1] px-2 py-1 rounded-full text-xs shadow-2xs">
            <span className="font-mono text-[11px] font-bold text-[#2a685e]">COP</span>
            <span className="text-[12px]">🇨🇴</span>
          </div>

          {isStackScreen && onShare && (
            <button
              onClick={onShare}
              aria-label="Compartir"
              className="w-9 h-9 rounded-full flex items-center justify-center text-[#1b1c1c] hover:bg-[#f0eded] active:scale-95 transition-all"
            >
              <Share2 size={18} />
            </button>
          )}

          {/* Notifications Button */}
          <div className="relative">
            <button
              onClick={() => {
                setShowNotifications(!showNotifications);
                if (unreadNotifications > 0) setUnreadNotifications(0);
              }}
              aria-label="Notificaciones"
              className="relative w-9 h-9 rounded-full flex items-center justify-center text-[#3f4946] hover:text-[#1b1c1c] hover:bg-[#f0eded] active:scale-95 transition-all"
            >
              <Bell size={20} />
              {unreadNotifications > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-[#fc8a40] rounded-full ring-2 ring-white"></span>
              )}
            </button>

            {/* Notification Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 top-11 w-72 bg-white rounded-2xl shadow-xl border border-[#e4e2e1] p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="flex items-center justify-between pb-2 border-b border-[#f0eded] mb-2">
                  <span className="font-headline-sm text-xs font-bold text-[#1b1c1c]">Notificaciones</span>
                  <button
                    onClick={() => setShowNotifications(false)}
                    className="text-[#707976] hover:text-[#1b1c1c]"
                  >
                    <X size={14} />
                  </button>
                </div>
                <div className="flex flex-col gap-2">
                  {notificationsList.map((n) => (
                    <div key={n.id} className="p-2 rounded-xl bg-[#f6f3f2] hover:bg-[#f0eded] text-left transition-colors">
                      <div className="flex items-center justify-between text-[11px] mb-0.5">
                        <span className="font-bold text-[#2a685e]">{n.title}</span>
                        <span className="text-[10px] text-[#707976]">{n.time}</span>
                      </div>
                      <p className="text-[11px] text-[#3f4946]">{n.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
