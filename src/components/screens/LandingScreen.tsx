import React from 'react';
import { 
  ArrowRight, 
  Users, 
  PiggyBank, 
  Vote, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle, 
  MapPin, 
  Heart,
  ChevronRight
} from 'lucide-react';

interface LandingScreenProps {
  onEnterApp: () => void;
  onContinueWithGoogle: () => void;
}

export const LandingScreen: React.FC<LandingScreenProps> = ({ onEnterApp, onContinueWithGoogle }) => {
  return (
    <div className="flex flex-col w-full px-4 pt-3 pb-28 max-w-lg mx-auto space-y-6">
      {/* 1. Hero Landing Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#FFFBF0] via-white to-[#a8e6d9]/30 p-6 border border-[#e4e2e1] shadow-md flex flex-col space-y-4 text-center items-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#a8e6d9] text-[#00201b] font-caption text-xs font-bold shadow-2xs">
          <Sparkles size={14} className="text-[#2a685e]" />
          <span>+45.000 viajeros armando rutas</span>
        </div>

        <h1 className="font-headline-xl text-3xl font-extrabold text-[#1b1c1c] leading-tight tracking-tight">
          El parche perfecto para tus viajes grupales
        </h1>

        <p className="font-body-md text-sm text-[#3f4946] leading-relaxed max-w-xs">
          Vota el rumbo, arma el parche y mete COP en la alcancía. Sin cobros escondidos ni peleas por plata.
        </p>

        <div className="w-full flex flex-col gap-2 pt-2">
          <button
            onClick={onEnterApp}
            className="w-full py-3.5 px-4 rounded-2xl bg-[#fc8a40] text-white font-headline-sm text-sm font-bold shadow-md hover:brightness-105 active:scale-[0.99] transition-all flex items-center justify-center gap-2"
          >
            <span>Entrar a la demo</span>
            <ArrowRight size={18} />
          </button>
          <button
            onClick={onContinueWithGoogle}
            className="w-full py-2.5 px-4 rounded-2xl bg-white border border-[#e4e2e1] text-[#1b1c1c] font-headline-sm text-xs font-bold hover:bg-[#f6f3f2] active:scale-95 transition-all"
          >
            Continuar con Google
          </button>
        </div>

        <div className="flex items-center justify-center gap-4 text-[11px] text-[#707976] pt-1">
          <span className="flex items-center gap-1">
            <CheckCircle size={13} className="text-[#2a685e]" /> Sin comisiones
          </span>
          <span className="flex items-center gap-1">
            <CheckCircle size={13} className="text-[#2a685e]" /> Plata en COP
          </span>
          <span className="flex items-center gap-1">
            <CheckCircle size={13} className="text-[#2a685e]" /> Todos ven la alcancía
          </span>
        </div>
      </section>

      {/* 2. Interactive Live Preview Card */}
      <section className="bg-white rounded-3xl p-4 shadow-sm border border-[#e4e2e1] flex flex-col space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-2xl bg-[#a8e6d9] text-[#2a685e] flex items-center justify-center">
              <PiggyBank size={20} />
            </div>
            <div>
              <span className="font-caption text-[10px] text-[#2a685e] font-extrabold uppercase tracking-wider block">
                Alcancía en vivo
              </span>
              <h3 className="font-headline-sm text-sm font-bold text-[#1b1c1c]">
                EuroTrip 2025 • 6 panas
              </h3>
            </div>
          </div>
          <span className="px-2.5 py-0.5 rounded-full bg-[#fc8a40] text-white font-mono text-xs font-bold">
            78%
          </span>
        </div>

        {/* Live progress */}
        <div className="p-3 bg-[#f6f3f2] rounded-2xl flex flex-col gap-2">
          <div className="flex items-baseline justify-between">
            <span className="font-mono text-sm font-bold text-[#2a685e]">$6.240.000 COP</span>
            <span className="text-xs text-[#707976]">Meta: $8.000.000 COP</span>
          </div>
          <div className="w-full bg-[#eae7e7] h-2.5 rounded-full overflow-hidden">
            <div className="bg-[#2a685e] h-full rounded-full w-[78%]" />
          </div>
          <div className="flex items-center justify-between text-[11px] text-[#3f4946] pt-0.5">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#2a685e] animate-ping" />
              <span>Sofi aportó <strong>+$250.000 COP</strong> hace 2 min</span>
            </span>
            <span className="text-[#9b4500] font-bold">PSE Nequi</span>
          </div>
        </div>
      </section>

      {/* 3. Viajar juntos en 3 pasos */}
      <section className="flex flex-col space-y-3">
        <div className="text-center">
          <span className="font-caption text-xs text-[#9b4500] font-bold uppercase tracking-wider">
            Fácil y transparente
          </span>
          <h2 className="font-headline-sm text-lg font-bold text-[#1b1c1c]">
            Viajar juntos en 3 pasos
          </h2>
        </div>

        <div className="flex flex-col gap-3">
          {[
            {
              step: '1',
              title: 'Arma el parche',
              desc: 'Invita por enlace o WhatsApp. Eliges líder, tesorero y demás roles.',
              icon: 'group_add',
              bg: 'bg-[#ffdbc9] text-[#9b4500]',
            },
            {
              step: '2',
              title: 'Vota destinos y planes',
              desc: 'Hoteles, rutas y planes: el parche vota. Nadie impone el rumbo.',
              icon: 'how_to_vote',
              bg: 'bg-[#e3d2ff] text-[#68548e]',
            },
            {
              step: '3',
              title: 'Aporta a la alcancía',
              desc: 'Meta en COP y cada aporte a la vista. El gasto grande se vota. Esta demo no mueve plata de verdad.',
              icon: 'savings',
              bg: 'bg-[#a8e6d9] text-[#00201b]',
            },
          ].map((item) => (
            <div
              key={item.step}
              className="p-4 bg-white rounded-3xl border border-[#e4e2e1] shadow-2xs flex items-start gap-3.5"
            >
              <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${item.bg}`}>
                <span className="material-symbols-outlined text-[22px]">{item.icon}</span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="font-headline-sm text-sm font-bold text-[#1b1c1c]">
                  {item.step}. {item.title}
                </span>
                <p className="font-body-sm text-xs text-[#3f4946] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Rutas favoritas para grupos */}
      <section className="flex flex-col space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-headline-sm text-sm font-bold text-[#1b1c1c]">
            Rutas favoritas de los parches
          </h3>
          <button
            onClick={onEnterApp}
            className="text-xs text-[#2a685e] font-bold hover:underline"
          >
            Ver catálogo →
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          <div
            onClick={onEnterApp}
            className="p-3 bg-white rounded-2xl border border-[#e4e2e1] flex flex-col gap-2 cursor-pointer hover:shadow-sm"
          >
            <span className="font-bold text-xs text-[#1b1c1c]">Cartagena &amp; Barú</span>
            <span className="text-[11px] text-[#707976]">Lancha privada &amp; islas</span>
            <span className="font-mono text-xs font-bold text-[#2a685e]">Desde $750.000 COP</span>
          </div>
          <div
            onClick={onEnterApp}
            className="p-3 bg-white rounded-2xl border border-[#e4e2e1] flex flex-col gap-2 cursor-pointer hover:shadow-sm"
          >
            <span className="font-bold text-xs text-[#1b1c1c]">San Gil &amp; Barichara</span>
            <span className="text-[11px] text-[#707976]">Rafting &amp; pueblito lindo</span>
            <span className="font-mono text-xs font-bold text-[#2a685e]">Desde $480.000 COP</span>
          </div>
        </div>
      </section>

      {/* 5. Welcome Bonus */}
      <section className="bg-gradient-to-r from-[#fc8a40] to-[#9b4500] text-white p-4 rounded-3xl shadow-md flex items-center justify-between gap-3">
        <div className="flex flex-col gap-0.5">
          <span className="font-caption text-[10px] uppercase font-bold text-[#ffdbc9]">
            Bono de bienvenida
          </span>
          <h4 className="font-headline-sm text-sm font-bold leading-tight">
            $50.000 COP para tu primer parche
          </h4>
          <p className="font-caption text-[11px] text-white/90">
            Abre la alcancía y llama al parche.
          </p>
        </div>
        <button
          onClick={onEnterApp}
          className="px-3.5 py-2 rounded-xl bg-white text-[#9b4500] font-headline-sm text-xs font-bold shrink-0 shadow-xs active:scale-95 transition-all"
        >
          Probar
        </button>
      </section>
    </div>
  );
};
