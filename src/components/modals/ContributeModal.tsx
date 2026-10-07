import React, { useState } from 'react';
import { X, CheckCircle, ShieldCheck } from 'lucide-react';

interface ContributeMember {
  id: string;
  name: string;
  role: string;
}

interface ContributeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (amount: number, memberId: string) => void;
  currentSaved: number;
  totalGoal: number;
  tripTitle: string;
  members: ContributeMember[];
}

export const ContributeModal: React.FC<ContributeModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  currentSaved,
  totalGoal,
  tripTitle,
  members,
}) => {
  const [amount, setAmount] = useState<number>(250000);
  const [selectedMethod, setSelectedMethod] = useState<'nequi' | 'bancolombia' | 'pse' | 'card'>('nequi');
  const [donorId, setDonorId] = useState(members[0]?.id ?? '');
  const [isSuccess, setIsSuccess] = useState(false);
  const activeDonorId = members.some((m) => m.id === donorId) ? donorId : (members[0]?.id ?? '');

  if (!isOpen) return null;

  const quickAmounts = [100000, 250000, 520000, 1040000];

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    if (amount <= 0 || !activeDonorId) return;
    setIsSuccess(true);
    onSuccess(amount, activeDonorId);

    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 1600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm transition-opacity">
      <div className="w-full max-w-md bg-[#FFFBF0] sm:rounded-3xl rounded-t-3xl shadow-2xl p-6 flex flex-col gap-4 max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom duration-200">
        <div className="flex items-center justify-between pb-2 border-b border-[#e4e2e1]">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-[#a8e6d9] text-[#2a685e] flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">savings</span>
            </div>
            <div>
              <h3 className="font-headline-sm text-lg font-bold text-[#1b1c1c]">Aportar a la alcancía</h3>
              <p className="font-caption text-xs text-[#3f4946]">{tripTitle} • Simulación</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-[#f0eded] hover:bg-[#e4e2e1] flex items-center justify-center text-[#3f4946] transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {isSuccess ? (
          <div className="py-8 flex flex-col items-center justify-center text-center gap-3">
            <div className="w-16 h-16 rounded-full bg-[#a8e6d9] text-[#2a685e] flex items-center justify-center animate-bounce">
              <CheckCircle size={36} />
            </div>
            <h4 className="font-headline-md text-xl font-bold text-[#1b1c1c]">¡Aporte listo!</h4>
            <p className="font-body-md text-sm text-[#3f4946] max-w-xs">
              Quedaron anotados <strong>${amount.toLocaleString('es-CO')} COP</strong> en este prototipo. No salió plata de ninguna cuenta.
            </p>
          </div>
        ) : (
          <form onSubmit={handlePay} className="flex flex-col gap-4">
            <div>
              <label className="block font-caption text-xs font-semibold text-[#3f4946] mb-1">
                ¿Quién aporta?
              </label>
              <select
                value={activeDonorId}
                onChange={(e) => setDonorId(e.target.value)}
                className="w-full h-11 px-3 rounded-xl bg-white border border-[#bfc9c5] font-body-md text-sm text-[#1b1c1c] focus:outline-none focus:border-[#2a685e]"
              >
                {members.map((member) => (
                  <option key={member.id} value={member.id}>
                    {member.name} ({member.role})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-caption text-xs font-semibold text-[#3f4946] mb-1">
                Monto
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-3 font-mono font-bold text-[#2a685e]">$</span>
                <input
                  type="number"
                  min="10000"
                  step="10000"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full h-12 pl-8 pr-16 rounded-xl bg-white border border-[#bfc9c5] font-mono text-lg font-bold text-[#1b1c1c] focus:outline-none focus:border-[#2a685e]"
                  placeholder="0"
                  required
                />
                <span className="absolute right-3 font-mono text-xs font-bold text-[#707976]">COP</span>
              </div>
            </div>

            {/* Quick Amount Chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
              {quickAmounts.map((q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => setAmount(q)}
                  className={`px-3 py-1.5 rounded-full text-xs font-mono font-bold shrink-0 transition-all ${
                    amount === q
                      ? 'bg-[#2a685e] text-white shadow-sm'
                      : 'bg-[#f0eded] text-[#3f4946] hover:bg-[#e4e2e1]'
                  }`}
                >
                  +${(q / 1000).toLocaleString('es-CO')}k
                </button>
              ))}
            </div>

            {/* Payment Method */}
            <div>
              <label className="block font-caption text-xs font-semibold text-[#3f4946] mb-1.5">
                Método de pago (simulado)
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'nequi', name: 'Nequi', icon: 'account_balance_wallet', desc: 'Al toque' },
                  { id: 'bancolombia', name: 'Bancolombia', icon: 'account_balance', desc: 'Transferencia' },
                  { id: 'pse', name: 'PSE', icon: 'credit_card', desc: 'Cualquier banco' },
                  { id: 'card', name: 'Tarjeta', icon: 'payments', desc: 'Visa o Mastercard' },
                ].map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setSelectedMethod(m.id as any)}
                    className={`p-2.5 rounded-xl border text-left flex items-start gap-2 transition-all ${
                      selectedMethod === m.id
                        ? 'bg-white border-[#2a685e] shadow-sm ring-1 ring-[#2a685e]'
                        : 'bg-white/60 border-[#e4e2e1] hover:bg-white'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[18px] text-[#2a685e] mt-0.5">{m.icon}</span>
                    <div className="min-w-0">
                      <span className="block text-xs font-bold text-[#1b1c1c] truncate">{m.name}</span>
                      <span className="block text-[10px] text-[#707976] truncate">{m.desc}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Security Note */}
            <div className="p-2.5 rounded-xl bg-[#a8e6d9]/30 flex items-center gap-2 text-xs text-[#095047]">
              <ShieldCheck size={18} className="shrink-0 text-[#2a685e]" />
              <span>Prototipo: elegir Nequi, banco o tarjeta no mueve plata.</span>
            </div>

            <button
              type="submit"
              disabled={amount <= 0 || !activeDonorId}
              className="w-full py-3.5 px-4 rounded-2xl bg-[#fc8a40] text-white font-headline-sm text-base font-bold shadow-[0_4px_12px_rgba(252,138,64,0.35)] active:translate-y-0.5 transition-all flex items-center justify-center gap-2 hover:brightness-105 disabled:opacity-50"
            >
              <span>Aportar ${amount.toLocaleString('es-CO')}</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
