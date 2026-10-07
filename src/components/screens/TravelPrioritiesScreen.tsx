import React from 'react';
import {
  Armchair,
  CalendarCheck,
  Trees,
  Landmark,
  Mountain,
  Sofa,
  Sunrise,
  ArrowLeft,
  ArrowRight,
  type LucideIcon,
} from 'lucide-react';

export const TRAVEL_PRIORITIES = [
  { id: 'comodidad', label: 'Comodidad', icon: Armchair },
  { id: 'planeacion', label: 'Planeación', icon: CalendarCheck },
  { id: 'naturaleza', label: 'Naturaleza', icon: Trees },
  { id: 'cultura', label: 'Cultura', icon: Landmark },
  { id: 'aventura', label: 'Aventura', icon: Mountain },
  { id: 'confort', label: 'Confort', icon: Sofa },
  { id: 'amaneceres', label: 'Amaneceres', icon: Sunrise },
] as const;

export type TravelPriorityId = (typeof TRAVEL_PRIORITIES)[number]['id'];
export type PriorityScore = 1 | 2 | 3 | 4 | 5;
export type PriorityScores = Partial<Record<TravelPriorityId, PriorityScore>>;

interface TravelPrioritiesScreenProps {
  scores: PriorityScores;
  onChange: (id: TravelPriorityId, score: PriorityScore) => void;
  onBack: () => void;
  onContinue: () => void;
  onSkip: () => void;
}

export const TravelPrioritiesScreen: React.FC<TravelPrioritiesScreenProps> = ({
  scores,
  onChange,
  onBack,
  onContinue,
  onSkip,
}) => {
  const answered = TRAVEL_PRIORITIES.filter((item) => scores[item.id] != null).length;
  const canContinue = answered >= 1;

  return (
    <div className="flex flex-col min-h-[100dvh] w-full max-w-lg mx-auto">
      <div className="flex-1 px-5 pt-safe pb-40">
        <div className="pt-4">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={onBack}
              className="inline-flex items-center gap-1 -ml-1 h-10 px-2 rounded-full font-caption font-semibold text-[#3f4946] hover:bg-[#f0eded] active:scale-95 transition-all"
            >
              <ArrowLeft size={16} />
              Volver
            </button>
            <p className="font-caption text-[11px] font-bold uppercase tracking-[0.14em] text-[#2a685e]">
              2 de 2
            </p>
          </div>

          <h1 className="font-headline-lg text-[#1b1c1c] mt-3">
            ¿Qué tan importante es para ti?
          </h1>
          <p className="font-body-md text-[#3f4946] mt-2 max-w-[22rem]">
            Desliza de menos a más. Así entendemos qué te mueve al armar el parche.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-[#e4e2e1] shadow-2xs divide-y divide-[#f0eded] mt-6">
          {TRAVEL_PRIORITIES.map((item) => (
            <PriorityRow
              key={item.id}
              label={item.label}
              icon={item.icon}
              value={scores[item.id]}
              onSelect={(score) => onChange(item.id, score)}
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
          <span>Entrar</span>
          <ArrowRight size={18} />
        </button>
        <p className="font-caption text-center text-[#707976] mt-2 min-h-4">
          {answered === 0 ? 'Elige al menos una' : `${answered} de ${TRAVEL_PRIORITIES.length}`}
        </p>
        <button
          type="button"
          onClick={onSkip}
          className="w-full mt-1 bg-transparent border-0 shadow-none font-caption text-[#2a685e] font-semibold! underline underline-offset-2 hover:opacity-80"
        >
          Saltar por ahora
        </button>
      </div>
    </div>
  );
};

function PriorityRow({
  label,
  icon: Icon,
  value,
  onSelect,
}: {
  label: string;
  icon: LucideIcon;
  value?: PriorityScore;
  onSelect: (score: PriorityScore) => void;
}) {
  return (
    <div className="px-3.5 py-3">
      <div className="flex items-center justify-between gap-3">
        <h2 className="flex items-center gap-2 min-w-0 font-headline-sm text-base leading-5 font-semibold text-[#1b1c1c]">
          <Icon aria-hidden="true" />
          {label}
        </h2>
        <span className="font-label-numeric-sm text-[#2a685e] tabular-nums">
          {value ? `${value}/5` : '—'}
        </span>
      </div>
      <PrioritySlider label={label} value={value} onSelect={onSelect} />
      <div className="flex items-center justify-between mt-0.5">
        <span className="font-caption text-[#707976]">Menos</span>
        <span className="font-caption text-[#707976]">Más</span>
      </div>
    </div>
  );
}

function scoreFromPointer(input: HTMLInputElement, clientX: number): PriorityScore {
  const rect = input.getBoundingClientRect();
  const ratio = rect.width === 0 ? 0 : (clientX - rect.left) / rect.width;
  const clamped = Math.min(1, Math.max(0, ratio));
  return (Math.round(clamped * 4) + 1) as PriorityScore;
}

function PrioritySlider({
  label,
  value,
  onSelect,
}: {
  label: string;
  value?: PriorityScore;
  onSelect: (score: PriorityScore) => void;
}) {
  const fill = value == null ? '0%' : `${((value - 1) / 4) * 100}%`;

  return (
    <input
      type="range"
      min={1}
      max={5}
      step={1}
      value={value ?? 1}
      aria-label={label}
      aria-valuetext={value == null ? 'Sin marcar, de menos a más' : `${value} de 5`}
      onPointerDown={(event) => onSelect(scoreFromPointer(event.currentTarget, event.clientX))}
      onInput={(event) => onSelect(Number(event.currentTarget.value) as PriorityScore)}
      className={`priority-slider mt-1 ${value == null ? 'is-empty' : ''}`}
      style={{ ['--fill' as string]: fill }}
    />
  );
}
