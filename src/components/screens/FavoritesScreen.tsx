import React from 'react';
import { Heart } from 'lucide-react';
import { FAVORITE_CATALOG } from '../../data/favoriteCatalog';

interface FavoritesScreenProps {
  likedCards: Record<string, boolean>;
  onToggleLike: (id: string) => void;
  onNavigate: (screen: string) => void;
}

export const FavoritesScreen: React.FC<FavoritesScreenProps> = ({
  likedCards,
  onToggleLike,
  onNavigate,
}) => {
  const favorites = FAVORITE_CATALOG.filter((item) => likedCards[item.id]);

  return (
    <div className="flex flex-col w-full px-4 pt-4 pb-28 max-w-lg mx-auto space-y-6">
      {favorites.length === 0 ? (
        <p className="text-[#3f4946]">
          Todavía no marcas ninguno. Toca el corazón para guardarlo.
        </p>
      ) : (
        <ul className="flex flex-col gap-3">
          {favorites.map((item) => (
            <li
              key={item.id}
              className="bg-white rounded-2xl border border-[#e4e2e1] shadow-xs flex items-center"
            >
              <button
                type="button"
                onClick={() => onNavigate('buscar')}
                className="flex-1 min-w-0 text-left p-4"
              >
                <span className="font-body-md font-bold text-[#1b1c1c] block truncate">
                  {item.name}
                </span>
                <span className="font-label-numeric-sm font-bold text-[#2a685e] block mt-0.5">
                  {item.cost}
                </span>
              </button>
              <button
                type="button"
                onClick={() => onToggleLike(item.id)}
                aria-label={`Quitar ${item.name} de favoritos`}
                className="w-9 h-9 mr-3 rounded-full bg-[#fcf9f8] flex items-center justify-center shrink-0 active:scale-90"
              >
                <Heart className="fill-[#FF6B6B] text-[#FF6B6B]" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
