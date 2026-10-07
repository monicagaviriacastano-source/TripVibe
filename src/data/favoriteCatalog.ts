import { RECOMMENDATIONS, TRENDING_HEROES } from './mockData';

export type FavoriteTrip = {
  id: string;
  name: string;
  cost: string;
};

export const FAVORITE_CATALOG: FavoriteTrip[] = [
  ...TRENDING_HEROES.map((slide) => ({
    id: slide.id,
    name: slide.title,
    cost: slide.costCOP,
  })),
  ...RECOMMENDATIONS.map((item) => ({
    id: item.id,
    name: item.title,
    cost: item.price,
  })),
];
