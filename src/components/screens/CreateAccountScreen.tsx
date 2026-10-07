import React, { useState } from 'react';
import { ArrowLeft, Check, Eye, EyeOff } from 'lucide-react';

interface CreateAccountScreenProps {
  initialEmail?: string;
  onBack: () => void;
  onSubmit: (email: string) => void;
}

const RULES = [
  { id: 'length', label: '8 caracteres', met: (password: string) => password.length >= 8 },
  { id: 'lower', label: 'Una minúscula', met: (password: string) => /[a-z]/.test(password) },
  { id: 'upper', label: 'Una mayúscula', met: (password: string) => /[A-Z]/.test(password) },
  { id: 'number', label: 'Un número', met: (password: string) => /[0-9]/.test(password) },
  {
    id: 'special',
    label: 'Un carácter especial',
    met: (password: string) => /[^\p{L}\p{N}]/u.test(password),
  },
] as const;

export function emailLooksValid(value: string) {
  const trimmed = value.trim();
  const at = trimmed.indexOf('@');
  return at !== -1 && trimmed.indexOf('.', at + 1) !== -1;
}

export const CreateAccountScreen: React.FC<CreateAccountScreenProps> = ({
  initialEmail = '',
  onBack,
  onSubmit,
}) => {
  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const rules = RULES.map((rule) => ({ ...rule, ok: rule.met(password) }));
  const passwordOk = rules.every((rule) => rule.ok);
  const canSubmit = emailLooksValid(email) && passwordOk;

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!canSubmit) return;
    onSubmit(email.trim());
  };

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

        <form onSubmit={handleSubmit} className="pt-6 flex flex-col gap-6">
          <div>
            <h1 className="font-headline-md text-[#1b1c1c]">Crear cuenta</h1>
            <p className="font-body-md text-[#3f4946] mt-2 max-w-[22rem]">
              Con tu correo armas el parche. La clave se queda en esta pantalla: no la guardamos.
            </p>
          </div>

          <div>
            <label htmlFor="crear-email" className="font-body-md font-medium text-[#1b1c1c] block mb-2">
              Email
            </label>
            <input
              id="crear-email"
              type="email"
              inputMode="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full h-11 px-3 rounded-xl bg-white border border-[#bfc9c5] font-body-md text-[#1b1c1c] focus:outline-none focus:border-[#2a685e]"
            />
          </div>

          <div>
            <label htmlFor="crear-clave" className="font-body-md font-medium text-[#1b1c1c] block mb-2">
              Contraseña
            </label>
            <div className="relative">
              <input
                id="crear-clave"
                type={showPassword ? 'text' : 'password'}
                autoComplete="new-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full h-11 pl-3 pr-12 rounded-xl bg-white border border-[#bfc9c5] font-body-md text-[#1b1c1c] focus:outline-none focus:border-[#2a685e]"
              />
              <button
                type="button"
                onClick={() => setShowPassword((visible) => !visible)}
                aria-label={showPassword ? 'Ocultar contraseña' : 'Ver contraseña'}
                className="absolute right-1 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full hover:bg-[#f6f3f2] active:scale-95"
              >
                {showPassword ? <EyeOff aria-hidden /> : <Eye aria-hidden />}
              </button>
            </div>

            <ul className="mt-3 flex flex-col gap-2" aria-label="Reglas de la contraseña">
              {rules.map((rule) => (
                <li
                  key={rule.id}
                  className={`flex items-center gap-2 font-body-md ${rule.ok ? 'text-[#2a685e]' : 'text-[#707976]'}`}
                >
                  {rule.ok ? (
                    <Check aria-hidden />
                  ) : (
                    <span
                      aria-hidden
                      className="h-6 w-6 shrink-0 rounded-full border-[1.5px] border-[#707976]"
                    />
                  )}
                  <span>{rule.label}</span>
                </li>
              ))}
            </ul>
          </div>

          <button
            type="submit"
            disabled={!canSubmit}
            className="w-full h-12 rounded-2xl bg-[#fc8a40] text-white font-headline-sm text-sm font-bold shadow-md flex items-center justify-center hover:brightness-105 active:scale-[0.99] transition-all disabled:bg-[#e4e2e1] disabled:text-[#707976] disabled:shadow-none disabled:hover:brightness-100"
          >
            Crear cuenta
          </button>
        </form>
      </div>
    </div>
  );
};
