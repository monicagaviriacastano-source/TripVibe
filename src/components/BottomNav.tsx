import React, { useState } from 'react';
import { BadgePercent, Compass, Heart, Home, LayoutGrid, Luggage, PiggyBank, User, X } from 'lucide-react';
import { PROFILE_DATA } from '../data/mockData';
import type { SignInMethod } from './signIn';

interface BottomNavProps {
  activeScreen: string;
  onNavigate: (screen: string) => void;
  account: SignInMethod | null;
}

const MENU = [
  { id: 'detalle-viaje', label: 'Mis viajes', Icon: Luggage },
  { id: 'ofertas', label: 'Ofertas', Icon: BadgePercent },
  { id: 'alcancia', label: 'Alcancía', Icon: PiggyBank },
] as const;

export const BottomNav: React.FC<BottomNavProps> = ({ activeScreen, onNavigate, account }) => {
  const profileAvatar = account ? PROFILE_DATA.avatar : '';
  const [menuOpen, setMenuOpen] = useState(false);

  const go = (screen: string) => {
    setMenuOpen(false);
    onNavigate(screen);
  };

  const tabClass = (active: boolean) =>
    `flex flex-col items-center justify-center min-w-[48px] min-h-[44px] px-1.5 py-1 rounded-full transition-all ${
      active
        ? 'bg-[#a8e6d9] text-[#2b695f] font-bold'
        : 'text-[#3f4946] hover:text-[#1b1c1c]'
    }`;

  return (
    <nav className="fixed bottom-0 inset-x-0 w-full z-40 pb-safe px-4 pointer-events-none">
      {menuOpen && (
        <button
          type="button"
          aria-label="Cerrar menú"
          className="fixed inset-0 pointer-events-auto bg-transparent"
          onClick={() => setMenuOpen(false)}
        />
      )}

      <div className="relative max-w-md mx-auto mb-2 pointer-events-none">
      {menuOpen && (
        <div
          role="menu"
          aria-label="Más"
          className="absolute bottom-full left-0 right-0 z-20 mb-6 rounded-3xl border border-[#e4e2e1] bg-white px-5 pt-5 pb-6 shadow-xl pointer-events-auto"
        >
          <h2 className="font-headline-sm font-bold text-center text-[#1b1c1c]">Más</h2>
          <div className="mt-6 flex items-start justify-between gap-3">
            {MENU.map(({ id, label, Icon }) => (
              <button
                key={id}
                type="button"
                role="menuitem"
                onClick={() => go(id)}
                className="flex flex-1 flex-col items-center gap-2 bg-transparent px-1 text-[#1b1c1c]"
              >
                <span className="flex size-16 items-center justify-center rounded-2xl border border-[#e4e2e1] bg-[#fcf9f8]">
                  <Icon size={24} strokeWidth={1.5} />
                </span>
                <span className="block max-w-[4.5rem] min-h-[2.25rem] text-center text-[14px] leading-[18px] text-[#1b1c1c]">
                  {label}
                </span>
              </button>
            ))}
          </div>
          <div className="mt-8 flex justify-center">
            <button
              type="button"
              aria-label="Cerrar"
              onClick={() => setMenuOpen(false)}
              className="flex size-12 items-center justify-center rounded-full bg-[#a8e6d9] p-0 text-[#2a685e]"
            >
              <X size={24} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      )}

      <div className="bg-white/90 backdrop-blur-xl border border-[#e4e2e1]/80 rounded-full shadow-[0_12px_28px_-4px_rgba(44,44,44,0.12),0_4px_10px_-2px_rgba(255,140,66,0.14)] px-2 py-1.5 flex items-center justify-between pointer-events-auto">
        <button type="button" onClick={() => go('inicio')} className={tabClass(activeScreen === 'inicio')}>
          <Home size={24} strokeWidth={1.5} />
          <span className="font-caption text-[10px] mt-0.5">Inicio</span>
        </button>

        <button type="button" onClick={() => go('buscar')} className={tabClass(activeScreen === 'buscar')}>
          <Compass size={24} strokeWidth={1.5} />
          <span className="font-caption text-[10px] mt-0.5">Buscar</span>
        </button>

        <div className="relative">
          <button
            type="button"
            aria-label="Más"
            aria-expanded={menuOpen}
            aria-haspopup="menu"
            onClick={() => setMenuOpen((open) => !open)}
            className="flex flex-col items-center justify-center w-14 h-14 rounded-full bg-[#fc8a40] text-white shadow-[0_6px_16px_rgba(252,138,64,0.4)] -mt-5 transition-transform active:translate-y-0.5 hover:scale-105 active:scale-95"
          >
            <LayoutGrid size={24} strokeWidth={1.5} className="text-white" />
            <span className="font-caption text-[10px] leading-none text-white">Más</span>
          </button>
        </div>

        <button type="button" onClick={() => go('favoritos')} className={tabClass(activeScreen === 'favoritos')}>
          <Heart size={24} strokeWidth={1.5} />
          <span className="font-caption text-[10px] mt-0.5">Favoritos</span>
        </button>

        <button type="button" onClick={() => go('perfil')} className={tabClass(activeScreen === 'perfil')}>
          {profileAvatar ? (
            <img src={profileAvatar} alt="" className="block w-6 h-6 shrink-0 rounded-full object-cover" />
          ) : (
            <User size={24} strokeWidth={1.5} />
          )}
          <span className="font-caption text-[10px] mt-0.5">Perfil</span>
        </button>
      </div>
      </div>
    </nav>
  );
};
