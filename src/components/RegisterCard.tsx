import React from 'react';
import { CheckCircle, Chromium, Facebook, MessageCircle, type LucideIcon } from 'lucide-react';
import { SIGN_IN_OPTIONS, SignInMethod } from './signIn';

const HOME_OPTIONS: { method: SignInMethod; label: string; icon: LucideIcon }[] = [
  { method: 'google', label: 'Ingresar con Google', icon: Chromium },
  { method: 'whatsapp', label: 'Ingresar con WhatsApp', icon: MessageCircle },
  { method: 'facebook', label: 'Ingresar con Facebook', icon: Facebook },
];

interface RegisterCardProps {
  method: SignInMethod | null;
  onSignIn: (method: SignInMethod) => void;
}

export const RegisterCard: React.FC<RegisterCardProps> = ({ method, onSignIn }) => {
  if (method) {
    const account = SIGN_IN_OPTIONS[method];
    return (
      <section className="rounded-3xl bg-[#a8e6d9]/50 border border-[#a8e6d9] px-4 py-3 flex items-center gap-3">
        <CheckCircle size={20} className="text-[#2a685e] shrink-0" />
        <div className="min-w-0">
          <p className="font-headline-sm text-sm font-bold text-[#00201b]">
            Listo, entraste con {account.label}
          </p>
          <p className="font-caption text-xs text-[#095047] truncate">{account.detail}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="rounded-3xl bg-white border border-[#e4e2e1] p-4 shadow-sm flex flex-col gap-3">
      <div>
        <p className="font-caption text-[11px] font-bold uppercase tracking-wider text-[#2a685e]">
          Tu cuenta
        </p>
        <h2 className="font-headline-sm text-base font-bold text-[#1b1c1c] mt-0.5">
          Entra en un toque
        </h2>
        <p className="font-body-md text-xs text-[#3f4946] mt-1 leading-relaxed">
          Regístrate o entra con la cuenta que ya usas. Sin formularios ni contraseñas.
        </p>
      </div>

      {HOME_OPTIONS.map((option) => {
        const Icon = option.icon;
        return (
          <button
            key={option.method}
            type="button"
            onClick={() => onSignIn(option.method)}
            className="relative flex h-12 w-full items-center justify-center rounded-full border border-[#e4e2e1] bg-white font-body-md font-medium text-[#1b1c1c] hover:bg-[#f6f3f2] active:scale-[0.99] transition-all"
          >
            <Icon aria-hidden className="absolute left-4" />
            <span>{option.label}</span>
          </button>
        );
      })}

      <p className="font-caption text-[11px] text-[#707976] text-center leading-snug">
        Demo: el toque entra directo. No abre Google, WhatsApp ni Facebook, y no pide clave.
      </p>
    </section>
  );
}
