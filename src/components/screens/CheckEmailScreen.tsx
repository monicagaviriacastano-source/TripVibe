import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface CheckEmailScreenProps {
  email: string;
  onBack: () => void;
  onActivate: () => void;
}

export const CheckEmailScreen: React.FC<CheckEmailScreenProps> = ({ email, onBack, onActivate }) => {
  return (
    <div className="flex flex-col min-h-[100dvh] w-full max-w-lg mx-auto bg-[#fcf9f8]">
      <div className="flex-1 px-5 pt-safe pb-[max(2rem,env(safe-area-inset-bottom))]">
        <div className="pt-4">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-1 -ml-1 h-10 px-2 rounded-full font-caption font-semibold text-[#3f4946] hover:bg-[#f0eded] active:scale-95 transition-all"
          >
            <ArrowLeft aria-hidden />
            Volver
          </button>
        </div>

        <div className="pt-6 flex flex-col gap-6">
          <div>
            <h1 className="font-headline-md text-[#1b1c1c]">Revisar correo</h1>
            <p className="font-body-md text-[#3f4946] mt-2 max-w-[22rem]">
              Te enviamos un email a tu correo para que actives tu cuenta.
            </p>
          </div>

          <p className="font-body-md font-semibold text-[#2a685e] break-all">{email}</p>

          <p className="font-body-md text-[#707976] max-w-[22rem]">
            Es una simulación: el mensaje no sale de este celular.
          </p>

          <button
            type="button"
            onClick={onActivate}
            className="w-full h-12 rounded-2xl bg-[#fc8a40] text-white font-headline-sm text-sm font-bold shadow-md flex items-center justify-center hover:brightness-105 active:scale-[0.99] transition-all"
          >
            Ya activé mi cuenta
          </button>
        </div>
      </div>
    </div>
  );
};
