import React, { useState } from 'react';
import { X, Check, ThumbsUp, Send } from 'lucide-react';
import { Poll } from '../../types/trip';

interface VoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  poll: Poll;
  onVote: (optionId: string) => void;
  onAddOption?: (title: string) => void;
}

export const VoteModal: React.FC<VoteModalProps> = ({
  isOpen,
  onClose,
  poll,
  onVote,
  onAddOption,
}) => {
  const [activeTab, setActiveTab] = useState<'votacion' | 'chat'>('votacion');
  const [newOptionTitle, setNewOptionTitle] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { sender: 'Camila R.', text: 'El catamarán incluye cava y picada catalana, ¡imperdible!', time: 'hace 20m' },
    { sender: 'Mateo V.', text: 'Revisé los números del fondo y nos alcanza perfecto.', time: 'hace 14m' },
    { sender: 'Valentina P.', text: '¡Voté por el catamarán para hacer fotos del sunset! 📸', time: 'hace 5m' },
  ]);
  const [newMsg, setNewMsg] = useState('');

  if (!isOpen) return null;

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMsg.trim()) return;
    setChatMessages([
      ...chatMessages,
      { sender: 'Tú (Sofía T.)', text: newMsg.trim(), time: 'ahora mismo' },
    ]);
    setNewMsg('');
  };

  const handleCreateOption = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newOptionTitle.trim()) return;
    if (onAddOption) onAddOption(newOptionTitle.trim());
    setNewOptionTitle('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm transition-opacity">
      <div className="w-full max-w-md bg-[#FFFBF0] sm:rounded-3xl rounded-t-3xl shadow-2xl p-5 flex flex-col gap-3 max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom duration-200">
        <div className="flex items-center justify-between pb-2 border-b border-[#e4e2e1]">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-[#e3d2ff] text-[#68548e] flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">how_to_vote</span>
            </div>
            <div>
              <h3 className="font-headline-sm text-lg font-bold text-[#1b1c1c]">Votar</h3>
              <p className="font-caption text-xs text-[#3f4946]">{poll.dayLabel}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-[#f0eded] hover:bg-[#e4e2e1] flex items-center justify-center text-[#3f4946] transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Tab switchers */}
        <div className="grid grid-cols-2 p-1 bg-[#f0eded] rounded-xl text-center">
          <button
            onClick={() => setActiveTab('votacion')}
            className={`py-2 text-xs font-bold rounded-lg transition-all ${
              activeTab === 'votacion'
                ? 'bg-white text-[#2a685e] shadow-sm'
                : 'text-[#3f4946] hover:text-[#1b1c1c]'
            }`}
          >
            Encuesta
          </button>
          <button
            onClick={() => setActiveTab('chat')}
            className={`py-2 text-xs font-bold rounded-lg transition-all ${
              activeTab === 'chat'
                ? 'bg-white text-[#2a685e] shadow-sm'
                : 'text-[#3f4946] hover:text-[#1b1c1c]'
            }`}
          >
            Chat del parche ({chatMessages.length})
          </button>
        </div>

        {activeTab === 'votacion' ? (
          <div className="flex flex-col gap-3">
            <div className="bg-white p-3.5 rounded-2xl border border-[#e4e2e1] shadow-xs">
              <span className="font-caption text-xs text-[#fc8a40] font-bold uppercase tracking-wide">
                Pregunta del parche
              </span>
              <p className="font-body-md text-sm font-semibold text-[#1b1c1c] mt-1 leading-snug">
                {poll.question}
              </p>
              <div className="flex items-center gap-1.5 mt-2 text-xs text-[#68548e] font-semibold">
                <span className="material-symbols-outlined text-[14px]">timer</span>
                <span>{poll.closesIn}</span>
              </div>
            </div>

            <div className="flex flex-col gap-2.5">
              {poll.options.length === 0 && (
                <p className="font-caption text-xs text-[#707976]">
                  Aún no hay opciones. Propón la primera abajo.
                </p>
              )}
              {poll.options.map((opt) => {
                const isSelected = poll.userVotedOptionId === opt.id;
                return (
                  <div
                    key={opt.id}
                    onClick={() => onVote(opt.id)}
                    className={`relative overflow-hidden rounded-2xl p-3.5 border cursor-pointer active:scale-[0.99] transition-all ${
                      isSelected
                        ? 'border-[#2a685e] bg-white shadow-sm ring-1 ring-[#2a685e]'
                        : 'border-[#e4e2e1] bg-white hover:border-[#95d2c6]'
                    }`}
                  >
                    {/* Background Progress Tint */}
                    <div
                      className={`absolute inset-0 transition-all duration-500 ${
                        isSelected ? 'bg-[#a8e6d9]/35' : 'bg-[#f0eded]/60'
                      }`}
                      style={{ width: `${opt.percentage}%` }}
                    />
                    <div className="relative z-10 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div
                          className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all ${
                            isSelected ? 'bg-[#2a685e] text-white shadow-xs' : 'bg-[#e4e2e1] text-[#707976]'
                          }`}
                        >
                          {isSelected ? <Check size={14} strokeWidth={3} /> : <ThumbsUp size={12} />}
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="font-body-md text-sm font-bold text-[#1b1c1c] truncate">
                            {opt.title}
                          </span>
                          <span className="font-caption text-xs text-[#3f4946]">
                            {opt.subtitle}
                          </span>
                        </div>
                      </div>
                      <span className="font-mono text-sm font-bold text-[#2a685e]">
                        {opt.percentage}%
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Add custom option */}
            <form onSubmit={handleCreateOption} className="pt-2 flex gap-2">
              <input
                type="text"
                placeholder="Ej. Cena en el pueblo"
                value={newOptionTitle}
                onChange={(e) => setNewOptionTitle(e.target.value)}
                className="flex-1 h-10 px-3 rounded-xl bg-white border border-[#bfc9c5] text-xs font-body-md text-[#1b1c1c] focus:outline-none focus:border-[#2a685e]"
              />
              <button
                type="submit"
                className="h-10 px-3 rounded-xl bg-[#2a685e] text-white text-xs font-bold shrink-0 hover:bg-[#23584f] transition-colors"
              >
                Agregar
              </button>
            </form>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-2 max-h-60 overflow-y-auto pr-1">
              {chatMessages.map((msg, i) => (
                <div key={i} className="p-2.5 rounded-xl bg-white border border-[#e4e2e1] text-xs">
                  <div className="flex items-center justify-between text-[#707976] mb-0.5">
                    <span className="font-bold text-[#2a685e]">{msg.sender}</span>
                    <span className="text-[10px]">{msg.time}</span>
                  </div>
                  <p className="text-[#1b1c1c] font-body-sm">{msg.text}</p>
                </div>
              ))}
            </div>

            <form onSubmit={handleSendChat} className="flex gap-2 pt-1 border-t border-[#e4e2e1]">
              <input
                type="text"
                placeholder="Escribe al parche..."
                value={newMsg}
                onChange={(e) => setNewMsg(e.target.value)}
                className="flex-1 h-10 px-3 rounded-xl bg-white border border-[#bfc9c5] text-xs font-body-md text-[#1b1c1c] focus:outline-none focus:border-[#2a685e]"
              />
              <button
                type="submit"
                className="w-10 h-10 rounded-xl bg-[#fc8a40] text-white flex items-center justify-center shrink-0 hover:brightness-105 active:scale-95 transition-all shadow-xs"
              >
                <Send size={16} />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
