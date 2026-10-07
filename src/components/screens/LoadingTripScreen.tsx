import React from 'react';
import tripvibeLogo from '../../assets/tripvibe-logo.png';

export const LoadingTripScreen: React.FC = () => {
  return (
    <div
      className="flex min-h-[100dvh] w-full max-w-lg mx-auto flex-col items-center justify-center bg-[#fcf9f8] px-6 text-center"
      role="status"
      aria-live="polite"
    >
      <img
        src={tripvibeLogo}
        alt="TripVibe"
        className="tripvibe-plane mb-8 h-auto w-[200px] max-w-full object-contain"
      />
      <h1 className="font-headline-md max-w-[18rem] text-[#1b1c1c]">
        Espera unos segundos mientras cargamos tu próximo viaje
      </h1>
      <div className="mt-6 h-1.5 w-40 overflow-hidden rounded-full bg-[#e4e2e1]">
        <div className="tripvibe-load h-full rounded-full bg-[#2a685e]" />
      </div>
    </div>
  );
};
