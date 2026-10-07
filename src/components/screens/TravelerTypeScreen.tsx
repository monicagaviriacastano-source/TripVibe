import React from 'react';
import {
  Heart,
  Users,
  Laptop,
  Backpack,
  User,
  GraduationCap,
  Briefcase,
  Ellipsis,
  ArrowRight,
  type LucideIcon,
} from 'lucide-react';

export const TRAVELER_TYPES = [
  { id: 'pareja', label: 'En pareja', icon: Heart },
  { id: 'amigos', label: 'Con amigos', icon: Users },
  { id: 'nomada', label: 'Nómada digital', icon: Laptop },
  { id: 'mochilero', label: 'Mochilero', icon: Backpack },
  { id: 'solo', label: 'Viajo solo', icon: User },
  { id: 'estudio', label: 'Estudio', icon: GraduationCap },
  { id: 'trabajo', label: 'Trabajo', icon: Briefcase },
  { id: 'otros', label: 'Otros', icon: Ellipsis },
] as const;

export type TravelerTypeId = (typeof TRAVELER_TYPES)[number]['id'];

interface TravelerTypeScreenProps {
  selected: TravelerTypeId[];
  onChange: (next: TravelerTypeId[]) => void;
  onContinue: () => void;
  onSkip: () => void;
}

export const TravelerTypeScreen: React.FC<TravelerTypeScreenProps> = ({
  selected,
  onChange,
  onContinue,
  onSkip,
}) => {
  const canContinue = selected.length > 0;

  const toggle = (id: TravelerTypeId) => {
    onChange(
      selected.includes(id) ? selected.filter((item) => item !== id) : [...selected, id],
    );
  };

  return (
    <div className="flex flex-col min-h-[100dvh] w-full max-w-lg mx-auto">
      <div className="flex-1 px-5 pt-safe">
        <div className="pt-6 pb-6">
          <div className="flex items-center justify-between">
            <p className="font-caption text-[11px] font-bold uppercase tracking-[0.14em] text-[#2a685e]">
              Cuéntanos de ti
            </p>
            <p className="font-caption text-[11px] font-bold uppercase tracking-[0.14em] text-[#2a685e]">
              1 de 2
            </p>
          </div>
          <h1 className="font-headline-lg text-[#1b1c1c] mt-2">
            ¿Qué tipo de viajero eres?
          </h1>
          <p className="font-body-md text-[#3f4946] mt-2 max-w-[22rem]">
            Así armamos parches que sí te cuadren.{' '}
            {canContinue
              ? `Llevas ${selected.length} ${selected.length === 1 ? 'opción' : 'opciones'} y puedes marcar más.`
              : 'Elige al menos una. Puedes marcar más de uno.'}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3" role="group" aria-label="Tipo de viajero">
          {TRAVELER_TYPES.map((type) => (
            <TypeCard
              key={type.id}
              label={type.label}
              icon={type.icon}
              selected={selected.includes(type.id)}
              onToggle={() => toggle(type.id)}
            />
          ))}
        </div>
      </div>

      <div className="sticky bottom-0 px-5 pt-4 pb-[max(1.5rem,env(safe-area-inset-bottom))] bg-gradient-to-t from-[#fcf9f8] from-70% to-transparent">
        <button
          type="button"
          onClick={onContinue}
          disabled={!canContinue}
          className="w-full h-12 rounded-2xl bg-[#fc8a40] text-white font-headline-sm text-sm font-bold shadow-md flex items-center justify-center gap-2 hover:brightness-105 active:scale-[0.99] transition-all disabled:bg-[#e4e2e1] disabled:text-[#707976] disabled:shadow-none disabled:hover:brightness-100"
        >
          <span>Continuar</span>
          <ArrowRight size={18} />
        </button>
        <button
          type="button"
          onClick={onSkip}
          className="w-full mt-3 bg-transparent border-0 shadow-none font-caption text-[#2a685e] font-semibold! underline underline-offset-2 hover:opacity-80"
        >
          Saltar por ahora
        </button>
      </div>
    </div>
  );
};

function TypeCard({
  label,
  icon: Icon,
  selected,
  onToggle,
}: {
  label: string;
  icon: LucideIcon;
  selected: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={selected}
      className={`flex flex-col items-start gap-3 p-3.5 rounded-2xl border text-left shadow-2xs active:scale-[0.98] transition-all ${
        selected
          ? 'bg-[#a8e6d9] border-[#a8e6d9] text-[#00201b]'
          : 'bg-white border-[#e4e2e1] text-[#1b1c1c] hover:border-[#bfc9c5]'
      }`}
    >
      <span
        className={`w-10 h-10 rounded-2xl flex items-center justify-center ${
          selected ? 'bg-[#00201b] text-[#a8e6d9]' : 'bg-[#f6f3f2] text-[#2a685e]'
        }`}
      >
        <Icon size={20} strokeWidth={2} />
      </span>
      <span className="font-headline-sm text-base leading-5 font-semibold">{label}</span>
    </button>
  );
}
