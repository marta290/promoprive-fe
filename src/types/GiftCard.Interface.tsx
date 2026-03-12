export interface ICategory {
  id: string;
  value: string;
}

export interface IBrand {
  id: string;
  value: string;
}

export interface IGiftCard {
  id: string;
  name: string;
  image: string;
  minDenomination: string;
  maxDiscount: string;
  featured: boolean;
  status: string;
  unavailable: boolean;
  grayedMessage: string | null;
  categories?: ICategory[];
  brand?: IBrand;
}

// Interfaccia per i parametri della query
export interface IGiftCardParams {
  q?: string;
  name?: string;
  category?: string;
  brand?: string;
  onlyPromo?: boolean;
  priceFrom?: string;
  priceTo?: string;
}

export interface IGiftCardResponse {
  results: IGiftCard[];
  size: number;
}