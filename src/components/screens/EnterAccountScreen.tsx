import React from 'react';
import { Chromium, Facebook, MessageCircle, X, type LucideIcon } from 'lucide-react';
import { SignInMethod } from '../signIn';
import tripvibeLogo from '../../assets/tripvibe-logo.jpg';

interface EnterAccountScreenProps {
  onSignIn: (method: SignInMethod) => void;
  onCreateAccount: () => void;
  onSkip: () => void;
}

const ENTER_OPTIONS: { method: SignInMethod; label: string; icon: LucideIcon }[] = [
  { method: 'google', label: 'Ingresar con Google', icon: Chromium },
  { method: 'whatsapp', label: 'Ingresar con WhatsApp', icon: MessageCircle },
  { method: 'facebook', label: 'Ingresar con Facebook', icon: Facebook },
];

export const EnterAccountScreen: React.FC<EnterAccountScreenProps> = ({
  onSignIn,
  onCreateAccount,
  onSkip,
}) => {
  return (
    <div className="flex flex-col min-h-[100dvh] w-full max-w-lg mx-auto bg-[#fcf9f8]">
      <div className="relative h-[42vh] min-h-[240px] max-h-[360px] shrink-0 overflow-hidden bg-gradient-to-b from-[#2a685e] to-[#a8e6d9]">
        <button
          type="button"
          onClick={onSkip}
          aria-label="Cerrar"
          className="absolute right-4 top-[max(1rem,env(safe-area-inset-top))] z-10 flex h-10 w-10 items-center justify-center rounded-full text-white hover:bg-white/15 active:scale-95 transition-all"
        >
          <X aria-hidden />
        </button>

      </div>

      <div className="relative -mt-8 flex flex-1 flex-col rounded-t-[32px] bg-[#fcf9f8] px-5 pb-[max(2rem,env(safe-area-inset-bottom))] pt-8">
        <div className="flex flex-col items-center gap-6 text-center">
          <img
            src={tripvibeLogo}
            alt="TripVibe"
            className="h-auto w-[200px] max-w-full object-contain"
          />
          <div className="max-w-[22rem]">
            <h1 className="font-headline-md text-[#1b1c1c]">Entra o crea tu cuenta</h1>
            <p className="font-body-md mt-2 text-[#3f4946]">
              Un toque y listo. Es una demo: no abre Google, WhatsApp ni Facebook, y no pide clave.
            </p>
          </div>

          <div className="flex w-full flex-col gap-3">
            {ENTER_OPTIONS.map((option) => {
              const Icon = option.icon;
              return (
                <button
                  key={option.method}
                  type="button"
                  onClick={() => onSignIn(option.method)}
                  className="relative flex h-14 w-full items-center justify-center rounded-full border border-[#e4e2e1] bg-white font-body-md font-medium text-[#1b1c1c] hover:bg-[#f6f3f2] active:scale-[0.99] transition-all"
                >
                  <Icon aria-hidden className="absolute left-4" />
                  <span>{option.label}</span>
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={onCreateAccount}
            className="font-body-md font-semibold text-[#2a685e] hover:text-[#095047] active:scale-[0.99] transition-all"
          >
            Crear cuenta
          </button>
        </div>
      </div>
    </div>
  );
};
