import React, { useState } from 'react';
import { X, Copy, Check, MessageCircle, QrCode } from 'lucide-react';

interface InviteModalProps {
  isOpen: boolean;
  onClose: () => void;
  tripTitle: string;
}

export const InviteModal: React.FC<InviteModalProps> = ({
  isOpen,
  onClose,
  tripTitle,
}) => {
  const [copied, setCopied] = useState(false);
  const [showQr, setShowQr] = useState(false);
  const inviteLink = 'tripvibe.app/join/costa-brava-7x9';

  if (!isOpen) return null;

  const handleCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(inviteLink);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(
      `¡Hola! Súmate al parche de "${tripTitle}" en TripVibe. Vota y aporta a la alcancía: https://${inviteLink}`
    );
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm transition-opacity">
      <div className="w-full max-w-md bg-[#FFFBF0] sm:rounded-3xl rounded-t-3xl shadow-2xl p-6 flex flex-col gap-4 max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom duration-200">
        <div className="flex items-center justify-between pb-2 border-b border-[#e4e2e1]">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-[#ffdbc9] text-[#9b4500] flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">person_add</span>
            </div>
            <div>
              <h3 className="font-headline-sm text-lg font-bold text-[#1b1c1c]">Invitar al parche</h3>
              <p className="font-caption text-xs text-[#3f4946]">{tripTitle}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-[#f0eded] hover:bg-[#e4e2e1] flex items-center justify-center text-[#3f4946] transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <p className="text-xs text-[#3f4946] font-body-sm leading-relaxed">
          Te sale un enlace para que el parche vote y aporte.
        </p>

        {/* Link Copy Box */}
        <div className="flex items-center gap-2 bg-white rounded-2xl p-2 border border-[#bfc9c5]">
          <input
            type="text"
            readOnly
            value={inviteLink}
            className="flex-1 bg-transparent px-2 font-mono text-xs font-semibold text-[#1b1c1c] outline-none truncate"
          />
          <button
            onClick={handleCopy}
            className="px-3 py-1.5 rounded-xl bg-[#a8e6d9] text-[#00201b] font-headline-sm text-xs font-bold flex items-center gap-1 active:scale-95 transition-transform"
          >
            {copied ? <Check size={14} className="text-[#2a685e]" /> : <Copy size={14} />}
            <span>{copied ? '¡Copiado!' : 'Copiar'}</span>
          </button>
        </div>

        {/* Quick Send Buttons */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={handleShareWhatsApp}
            className="h-11 rounded-xl bg-[#2a685e] text-white flex items-center justify-center gap-2 text-xs font-bold shadow-sm active:scale-95 transition-all hover:bg-[#23584f]"
          >
            <MessageCircle size={18} />
            <span>Mandar WhatsApp</span>
          </button>
          <button
            onClick={() => setShowQr(!showQr)}
            className="h-11 rounded-xl bg-[#f0eded] hover:bg-[#e4e2e1] text-[#1b1c1c] flex items-center justify-center gap-2 text-xs font-bold transition-all"
          >
            <QrCode size={18} />
            <span>{showQr ? 'Ocultar QR' : 'Mostrar QR'}</span>
          </button>
        </div>

        {showQr && (
          <div className="p-4 bg-white rounded-2xl border border-[#e4e2e1] flex flex-col items-center justify-center gap-2 text-center animate-in fade-in">
            <div className="w-32 h-32 p-2 bg-[#fcf9f8] rounded-xl flex items-center justify-center shadow-inner">
              <svg className="w-full h-full text-[#1b1c1c]" viewBox="0 0 100 100" fill="none" stroke="currentColor">
                <rect x="5" y="5" width="30" height="30" rx="4" strokeWidth="4" />
                <rect x="13" y="13" width="14" height="14" fill="currentColor" />
                <rect x="65" y="5" width="30" height="30" rx="4" strokeWidth="4" />
                <rect x="73" y="13" width="14" height="14" fill="currentColor" />
                <rect x="5" y="65" width="30" height="30" rx="4" strokeWidth="4" />
                <rect x="13" y="73" width="14" height="14" fill="currentColor" />
                <path d="M45 10v20M45 45h20M70 45v15M50 70h15M75 75h15M75 90v-5M90 70v10" strokeWidth="4" />
              </svg>
            </div>
            <span className="font-caption text-xs text-[#707976]">Escanea desde la cámara de tu pana</span>
          </div>
        )}
      </div>
    </div>
  );
};
