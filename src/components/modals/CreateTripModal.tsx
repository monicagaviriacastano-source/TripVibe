import React, { useState } from 'react';
import { X, MapPin, Calendar, Users, DollarSign, Sparkles } from 'lucide-react';

interface CreateTripModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (newTripData: {
    title: string;
    squadName: string;
    dates: string;
    goal: number;
    initialMembers: number;
  }) => void;
  currentTripTitle: string;
}

export const CreateTripModal: React.FC<CreateTripModalProps> = ({
  isOpen,
  onClose,
  onCreate,
  currentTripTitle,
}) => {
  const [title, setTitle] = useState('');
  const [squadName, setSquadName] = useState('Los Trotamundos');
  const [dates, setDates] = useState('02 - 08 Diciembre 2025');
  const [goal, setGoal] = useState<number>(5000000);
  const [initialMembers, setInitialMembers] = useState<number>(4);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onCreate({
      title: title.trim(),
      squadName: squadName.trim(),
      dates: dates.trim(),
      goal,
      initialMembers,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm transition-opacity">
      <div className="w-full max-w-md bg-[#FFFBF0] sm:rounded-3xl rounded-t-3xl shadow-2xl p-6 flex flex-col gap-4 max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom duration-200">
        <div className="flex items-center justify-between pb-2 border-b border-[#e4e2e1]">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-2xl bg-[#fc8a40] text-white flex items-center justify-center shadow-md">
              <Sparkles size={20} />
            </div>
            <div>
              <h3 className="font-headline-sm text-lg font-bold text-[#1b1c1c]">Arma el parche</h3>
              <p className="font-caption text-xs text-[#3f4946]">El viaje, la gente y la meta de la alcancía</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-[#f0eded] hover:bg-[#e4e2e1] flex items-center justify-center text-[#3f4946] transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
          <div>
            <label className="block font-caption text-xs font-semibold text-[#3f4946] mb-1">
              Destino o nombre del viaje
            </label>
            <div className="relative flex items-center">
              <MapPin size={18} className="absolute left-3 text-[#2a685e]" />
              <input
                type="text"
                placeholder="Ej. Roadtrip Barichara & Cañón"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full h-11 pl-10 pr-3 rounded-xl bg-white border border-[#bfc9c5] font-body-md text-sm text-[#1b1c1c] focus:outline-none focus:border-[#2a685e]"
                required
              />
            </div>
          </div>

          <div>
            <label className="block font-caption text-xs font-semibold text-[#3f4946] mb-1">
              Nombre del parche
            </label>
            <div className="relative flex items-center">
              <Users size={18} className="absolute left-3 text-[#2a685e]" />
              <input
                type="text"
                placeholder="Ej. Los Trotamundos"
                value={squadName}
                onChange={(e) => setSquadName(e.target.value)}
                className="w-full h-11 pl-10 pr-3 rounded-xl bg-white border border-[#bfc9c5] font-body-md text-sm text-[#1b1c1c] focus:outline-none focus:border-[#2a685e]"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block font-caption text-xs font-semibold text-[#3f4946] mb-1">
                Fechas tentativas
              </label>
              <div className="relative flex items-center">
                <Calendar size={16} className="absolute left-3 text-[#707976]" />
                <input
                  type="text"
                  value={dates}
                  onChange={(e) => setDates(e.target.value)}
                  className="w-full h-11 pl-9 pr-2 rounded-xl bg-white border border-[#bfc9c5] font-body-md text-xs text-[#1b1c1c] focus:outline-none focus:border-[#2a685e]"
                />
              </div>
            </div>

            <div>
              <label className="block font-caption text-xs font-semibold text-[#3f4946] mb-1">
                Cupos iniciales
              </label>
              <input
                type="number"
                min="2"
                max="20"
                value={initialMembers}
                onChange={(e) => setInitialMembers(Number(e.target.value))}
                className="w-full h-11 px-3 rounded-xl bg-white border border-[#bfc9c5] font-body-md text-sm text-[#1b1c1c] focus:outline-none focus:border-[#2a685e]"
              />
            </div>
          </div>

          <div>
            <label className="block font-caption text-xs font-semibold text-[#3f4946] mb-1">
              Meta de la alcancía
            </label>
            <div className="relative flex items-center">
              <DollarSign size={18} className="absolute left-3 text-[#2a685e]" />
              <input
                type="number"
                step="100000"
                value={goal}
                onChange={(e) => setGoal(Number(e.target.value))}
                className="w-full h-11 pl-9 pr-14 rounded-xl bg-white border border-[#bfc9c5] font-mono text-sm font-bold text-[#1b1c1c] focus:outline-none focus:border-[#2a685e]"
                required
              />
              <span className="absolute right-3 font-mono text-xs font-bold text-[#707976]">COP</span>
            </div>
            <p className="text-[11px] text-[#707976] mt-1 font-caption">
              Por persona: <strong>${Math.round(goal / (initialMembers || 1)).toLocaleString('es-CO')}</strong>. El parche nuevo empieza solo contigo.
            </p>
          </div>

          <div className="p-3 bg-[#ffdbc9]/60 rounded-2xl flex items-start gap-2 text-xs text-[#331200] font-medium">
            <span className="material-symbols-outlined text-[18px] text-[#9b4500]">info</span>
            <span>Este prototipo guarda un solo viaje. Crear reemplaza «{currentTripTitle}». Recargar vuelve al ejemplo.</span>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 px-4 rounded-2xl bg-[#fc8a40] text-white font-headline-sm text-base font-bold shadow-md hover:brightness-105 active:scale-[0.99] transition-all flex items-center justify-center gap-2 mt-1"
          >
            <span>Crear parche</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </form>
      </div>
    </div>
  );
};
