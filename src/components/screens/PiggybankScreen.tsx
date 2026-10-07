import React, { useState } from 'react';
import { 
  PiggyBank, 
  Plus, 
  ArrowUpRight, 
  ArrowDownLeft, 
  ShieldCheck, 
  BellRing, 
  Clock, 
  CheckCircle,
} from 'lucide-react';
import { Trip } from '../../types/trip';
import { MemberAvatar } from '../MemberAvatar';

interface PiggybankScreenProps {
  trip: Trip;
  onOpenContribute: () => void;
  onNavigate: (screen: string) => void;
}

export const PiggybankScreen: React.FC<PiggybankScreenProps> = ({
  trip,
  onOpenContribute,
  onNavigate,
}) => {
  const [filterType, setFilterType] = useState<'all' | 'in' | 'out'>('all');
  const [notice, setNotice] = useState<string | null>(null);
  const [showRefundModal, setShowRefundModal] = useState(false);

  const showNotice = (message: string) => {
    setNotice(message);
    setTimeout(() => setNotice(null), 3200);
  };

  const filteredTransactions = trip.transactions.filter((tx) => {
    if (filterType === 'in') return tx.type === 'in';
    if (filterType === 'out') return tx.type === 'out';
    return true;
  });

  const remaining = Math.max(trip.totalGoal - trip.totalSaved, 0);

  return (
    <div className="flex flex-col w-full px-4 pt-2 pb-28 max-w-lg mx-auto space-y-6">
      {/* Reminder Toast */}
      {notice && (
        <div className="bg-[#a8e6d9] text-[#00201b] rounded-2xl p-3 shadow-md flex items-center gap-2 animate-in slide-in-from-top duration-200">
          <CheckCircle size={18} className="text-[#2a685e] shrink-0" />
          <span className="font-caption text-xs font-semibold">{notice}</span>
        </div>
      )}

      {/* 1. Top Hero Card: Fondo Común Asegurado */}
      <section className="bg-gradient-to-br from-[#FFFBF0] via-white to-[#a8e6d9]/30 rounded-3xl p-5 shadow-md border border-[#e4e2e1] flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-2xl bg-[#a8e6d9] text-[#2a685e] flex items-center justify-center shadow-xs">
              <PiggyBank size={24} />
            </div>
            <div>
              <span className="font-caption text-[11px] text-[#2a685e] font-extrabold uppercase tracking-wider block">
                Alcancía del parche
              </span>
              <h2 className="font-headline-sm text-sm font-bold text-[#1b1c1c]">
                {trip.squadName}
              </h2>
            </div>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-[#2a685e] text-white font-mono text-xs font-bold shadow-xs">
            {trip.progressPercentage}% Meta
          </span>
        </div>

        {/* Big Balance Display in COP */}
        <div className="flex flex-col">
          <span className="font-caption text-xs text-[#707976]">Saldo</span>
          <div className="flex items-baseline gap-2">
            <span className="font-headline-xl text-3xl font-extrabold text-[#1b1c1c] tracking-tight">
              ${trip.totalSaved.toLocaleString('es-CO')}
            </span>
            <span className="font-mono text-xs text-[#707976] font-bold">COP</span>
          </div>

          <div className="flex items-center justify-between text-xs text-[#3f4946] font-caption mt-1">
            <span>Meta: <strong>${trip.totalGoal.toLocaleString('es-CO')}</strong></span>
            <span className="text-[#fc8a40] font-bold">Faltan ${remaining.toLocaleString('es-CO')}</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-3 rounded-full bg-[#eae7e7] overflow-hidden p-0.5">
          <div
            className="h-full rounded-full bg-[#2a685e] transition-all duration-700 shadow-xs"
            style={{ width: `${trip.progressPercentage}%` }}
          />
        </div>

        <div className="flex items-center justify-between text-[11px] font-caption text-[#3f4946] pt-0.5">
          <span className="flex items-center gap-1">
            <Clock size={12} className="text-[#fc8a40]" />
            <span>Sin fecha límite fija</span>
          </span>
          <span>Cuota sugerida: <strong>${trip.estimatedPerPerson.toLocaleString('es-CO')} COP</strong></span>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            onClick={onOpenContribute}
            className="py-3 px-3 rounded-2xl bg-[#fc8a40] text-white font-headline-sm text-xs font-bold shadow-md active:translate-y-0.5 transition-all flex items-center justify-center gap-1.5 hover:brightness-105"
          >
            <Plus className="text-white" />
            <span>Aportar</span>
          </button>
          <button
            onClick={() => setShowRefundModal(true)}
            className="py-3 px-3 rounded-2xl bg-white text-[#1b1c1c] font-headline-sm text-xs font-bold border border-[#e4e2e1] hover:bg-[#f6f3f2] active:scale-95 transition-all flex items-center justify-center gap-1.5"
          >
            <span>Pedir retiro</span>
          </button>
        </div>
      </section>

      {/* 2. Gestión Rápida Atajos */}
      <section className="grid grid-cols-4 gap-2 text-center">
        {[
          { label: 'Aportar', icon: 'add_card', action: onOpenContribute },
          { label: 'Dividir', icon: 'call_split', action: () => showNotice('En este prototipo dividir un gasto no reparte plata.') },
          { label: 'Reglas', icon: 'gavel', action: () => onNavigate('parche') },
          { label: 'Descargar', icon: 'file_download', action: () => showNotice('En este prototipo no se descarga un archivo. El balance solo se ve en pantalla.') },
        ].map((item, idx) => (
          <button
            key={idx}
            onClick={item.action}
            className="p-2.5 rounded-2xl bg-white border border-[#e4e2e1] flex flex-col items-center justify-center gap-1 shadow-2xs hover:shadow-xs active:scale-95 transition-all"
          >
            <div className="w-8 h-8 rounded-full bg-[#f0eded] text-[#2a685e] flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px]">{item.icon}</span>
            </div>
            <span className="font-caption text-[10px] font-bold text-[#1b1c1c] leading-tight">
              {item.label}
            </span>
          </button>
        ))}
      </section>

      {/* 3. Aportes por Viajero */}
      <section className="bg-white rounded-3xl p-4 shadow-sm border border-[#e4e2e1] flex flex-col space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#a8e6d9] text-[#2a685e] flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px]">group</span>
            </div>
            <div>
              <h3 className="font-headline-sm text-sm font-bold text-[#1b1c1c]">Aportes del parche</h3>
              <p className="font-caption text-xs text-[#707976]">Cuánto lleva cada quien</p>
            </div>
          </div>
          <span className="font-mono text-xs font-bold text-[#2a685e]">
            {trip.members.filter((m) => m.percentage === 100).length} de {trip.members.length} al día
          </span>
        </div>

        <div className="flex flex-col divide-y divide-[#f0eded]">
          {trip.members.length === 0 && (
            <p className="font-body-md text-[#3f4946] py-2">Aún no hay integrantes.</p>
          )}
          {trip.members.map((member) => (
            <div key={member.id} className="py-2.5 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5 min-w-0">
                <MemberAvatar
                  name={member.name}
                  avatar={member.avatar}
                  className="w-10 h-10 rounded-full object-cover ring-1 ring-[#e4e2e1] bg-[#f0eded] text-xs"
                />
                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="font-body-md text-xs font-bold text-[#1b1c1c] truncate">
                      {member.name}
                    </span>
                    {member.isKeyRole && (
                      <span className="px-1.5 py-0.2 rounded-md bg-[#e3d2ff] text-[#68548e] font-caption text-[9px] font-bold">
                        {member.roleType}
                      </span>
                    )}
                  </div>
                  <span className="font-caption text-[11px] text-[#707976] truncate">
                    {member.statusText}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <div className="text-right">
                  <span className="font-mono text-xs font-bold text-[#1b1c1c] block">
                    ${member.contributionAmount.toLocaleString('es-CO')}
                  </span>
                  <span
                    className={`font-caption text-[10px] font-bold ${
                      member.percentage === 100 ? 'text-[#2a685e]' : 'text-[#fc8a40]'
                    }`}
                  >
                    {member.percentage}%
                  </span>
                </div>

                {member.percentage < 100 && (
                  <button
                    onClick={() => showNotice(`En este prototipo no se envía WhatsApp a ${member.name}.`)}
                    aria-label="Recordar cuota"
                    className="p-1.5 rounded-full bg-[#ffdbc9] text-[#9b4500] hover:bg-[#fc8a40] hover:text-white transition-colors active:scale-95"
                  >
                    <BellRing size={14} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Presupuesto Comprometido (Categorías de Gasto) */}
      <section className="bg-white rounded-3xl p-4 shadow-sm border border-[#e4e2e1] flex flex-col space-y-3">
        <h3 className="font-headline-sm text-sm font-bold text-[#1b1c1c]">
          Presupuesto comprometido
        </h3>

        {trip.expenses.length === 0 ? (
          <p className="font-caption text-xs text-[#707976]">Aún no hay gastos. El parche no ha comprometido plata.</p>
        ) : (
        <div className="grid grid-cols-2 gap-2">
          {trip.expenses.map((exp) => (
            <div
              key={exp.id}
              className="p-3 rounded-2xl bg-[#fcf9f8] border border-[#e4e2e1] flex flex-col justify-between gap-1 shadow-2xs"
            >
              <span className="font-caption text-xs font-bold text-[#1b1c1c] line-clamp-1">
                {exp.title}
              </span>
              <span className="font-mono text-xs font-bold text-[#2a685e]">
                ${exp.amount.toLocaleString('es-CO')} COP
              </span>
              <div className="flex items-center justify-between text-[10px] text-[#707976] pt-1 border-t border-[#f0eded]">
                <span className="capitalize">{exp.category}</span>
                <span className="font-bold text-[#9b4500]">{exp.status}</span>
              </div>
            </div>
          ))}
        </div>
        )}
      </section>

      {/* 5. Movimientos del Fondo (Ledger) */}
      <section className="bg-white rounded-3xl p-4 shadow-sm border border-[#e4e2e1] flex flex-col space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-headline-sm text-sm font-bold text-[#1b1c1c]">
            Movimientos
          </h3>

          {/* Filter Pills */}
          <div className="flex items-center gap-1 bg-[#f0eded] p-1 rounded-xl">
            {(['all', 'in', 'out'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setFilterType(t)}
                className={`px-2 py-0.5 text-[11px] font-bold rounded-lg capitalize transition-all ${
                  filterType === t
                    ? 'bg-white text-[#2a685e] shadow-2xs'
                    : 'text-[#707976] hover:text-[#1b1c1c]'
                }`}
              >
                {t === 'all' ? 'Todos' : t === 'in' ? 'Ingresos +' : 'Gastos -'}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col divide-y divide-[#f0eded]">
          {filteredTransactions.length === 0 && (
            <p className="font-caption text-xs text-[#707976] py-2">Aún no hay movimientos. El primero que aporte abre el round.</p>
          )}
          {filteredTransactions.map((tx) => (
            <div key={tx.id} className="py-2.5 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5 min-w-0">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                    tx.type === 'in'
                      ? 'bg-[#a8e6d9] text-[#2a685e]'
                      : 'bg-[#ffdad6] text-[#ba1a1a]'
                  }`}
                >
                  {tx.type === 'in' ? <ArrowDownLeft size={16} /> : <ArrowUpRight size={16} />}
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-body-md text-xs font-bold text-[#1b1c1c] truncate">
                    {tx.title}
                  </span>
                  <span className="font-caption text-[10px] text-[#707976]">
                    {tx.date} • {tx.method}
                  </span>
                </div>
              </div>

              <span
                className={`font-mono text-xs font-bold shrink-0 ${
                  tx.type === 'in' ? 'text-[#2a685e]' : 'text-[#ba1a1a]'
                }`}
              >
                {tx.type === 'in' ? '+' : '-'}${tx.amount.toLocaleString('es-CO')}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Blindaje y Votación TripVibe Security Notice */}
      <section className="bg-[#a8e6d9]/30 rounded-3xl p-4 border border-[#95d2c6]/60 flex items-start gap-3">
        <ShieldCheck size={22} className="text-[#2a685e] shrink-0 mt-0.5" />
        <div className="flex flex-col space-y-1">
          <h4 className="font-headline-sm text-xs font-bold text-[#00201b]">
            Cómo se gasta la alcancía
          </h4>
          <p className="font-body-sm text-[11px] text-[#095047] leading-relaxed">
            La idea del producto: un pago grande no sale sin voto del parche. En este prototipo esa regla no se aplica y la plata no se mueve.
          </p>
        </div>
      </section>

      {/* Refund Modal */}
      {showRefundModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-sm bg-white rounded-3xl p-6 flex flex-col gap-3 shadow-xl">
            <h4 className="font-headline-sm text-base font-bold text-[#1b1c1c]">Pedir retiro</h4>
            <p className="text-xs text-[#3f4946]">
              Puedes revisar el saldo, pero en este prototipo el retiro no descuenta plata.
            </p>
            <div className="p-3 bg-[#f6f3f2] rounded-xl text-xs">
              <span className="text-[#707976] block">Saldo de la alcancía en pantalla:</span>
              <span className="font-mono text-sm font-bold text-[#2a685e]">${trip.totalSaved.toLocaleString('es-CO')} COP</span>
            </div>
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setShowRefundModal(false)}
                className="flex-1 py-2 rounded-xl bg-[#f0eded] text-xs font-bold text-[#3f4946]"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  setShowRefundModal(false);
                  showNotice('En este prototipo el retiro no mueve plata. El saldo sigue igual.');
                }}
                className="flex-1 py-2 rounded-xl bg-[#fc8a40] text-xs font-bold text-white shadow-xs"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
