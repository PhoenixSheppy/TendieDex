export interface TendieReview {
  name: string;
  logo: string;
  flavor: string;
  size: string;
  breading: string;
  individuality: string;
  rating: number;
  price: string;
  priceRange: 'low' | 'medium' | 'high';
}

export interface TendieData {
  frozen: TendieReview[];
  fastFood: TendieReview[];
  restaurants: TendieReview[];
}