import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

type SharePiece = {
  name: string;
  amountLabel: string;
};

interface ShareParcheModalProps {
  isOpen: boolean;
  onClose: () => void;
  tripTitle: string;
  place: string;
  dateFrom: string;
  dateTo: string;
  hotel: SharePiece;
  flight: SharePiece;
  pack: SharePiece;
  separateLabel: string;
  packageLabel: string;
  cheaperLabel: string;
}

const GROUPS = ['El parche', 'Amigos de la U', 'Los del finde'];

function formatDay(iso: string) {
  if (!iso) return '';
  const [year, month, day] = iso.split('-').map(Number);
  return new Date(year, month - 1, day).toLocaleDateString('es-CO', {
    day: 'numeric',
    month: 'short',
  });
}

export const ShareParcheModal: React.FC<ShareParcheModalProps> = ({
  isOpen,
  onClose,
  tripTitle,
  place,
  dateFrom,
  dateTo,
  hotel,
  flight,
  pack,
  separateLabel,
  packageLabel,
  cheaperLabel,
}) => {
  const [group, setGroup] = useState(GROUPS[0]);

  if (!isOpen) return null;

  const dates =
    dateFrom && dateTo ? `${formatDay(dateFrom)} – ${formatDay(dateTo)}` : 'Fechas por definir';

  const message = [
    `Hola, ${group}. Miren este plan de ejemplo: ${tripTitle} (${place}).`,
    `Fechas: ${dates}.`,
    `Hotel: ${hotel.name} · ${hotel.amountLabel}.`,
    `Vuelo: ${flight.name} · ${flight.amountLabel}.`,
    `Todo incluido: ${pack.name} · ${pack.amountLabel}.`,
    `Hotel + vuelo: ${separateLabel}. Todo incluido: ${packageLabel}.`,
    `Queda más bajo: ${cheaperLabel} por persona.`,
    'Es un ejemplo de TripVibe. No reserva vuelos, hotel ni mueve la alcancía.',
  ].join('\n');

  const sendWhatsApp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 p-0 backdrop-blur-sm sm:items-center sm:p-4">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="share-parche-title"
        className="flex max-h-[90vh] w-full max-w-md flex-col gap-4 overflow-y-auto rounded-t-3xl bg-[#FFFBF0] p-6 shadow-2xl sm:rounded-3xl"
      >
        <div className="flex items-center justify-between border-b border-[#e4e2e1] pb-2">
          <div>
            <h3 id="share-parche-title" className="font-headline-sm font-bold text-[#1b1c1c]">
              Compartir con el parche
            </h3>
            <p className="text-[#3f4946]">{tripTitle}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="flex items-center justify-center rounded-full bg-[#f0eded] text-[#3f4946]"
          >
            <X aria-hidden />
          </button>
        </div>

        <div className="flex flex-col gap-2">
          <p className="font-bold text-[#1b1c1c]">Grupo de amigos</p>
          <div className="flex flex-col gap-2" role="radiogroup" aria-label="Grupo de amigos">
            {GROUPS.map((name) => {
              const selected = name === group;
              return (
                <button
                  key={name}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  onClick={() => setGroup(name)}
                  className={`rounded-2xl px-4 text-left font-bold ${
                    selected
                      ? 'border-2 border-[#2a685e] bg-[#a8e6d9]/40 text-[#1b1c1c]'
                      : 'border border-[#e4e2e1] bg-white text-[#1b1c1c]'
                  }`}
                >
                  {name}
                </button>
              );
            })}
          </div>
        </div>

        <p className="whitespace-pre-line rounded-2xl border border-[#e4e2e1] bg-white p-4 text-[#1b1c1c]">
          {message}
        </p>

        <button
          type="button"
          onClick={sendWhatsApp}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#2a685e] px-4 font-bold text-white"
        >
          <MessageCircle className="text-white" aria-hidden />
          Enviar por WhatsApp
        </button>
        <p className="text-[#3f4946]">
          Abre WhatsApp con el mensaje listo para el grupo. No reserva ni mueve la alcancía.
        </p>
      </div>
    </div>
  );
};
