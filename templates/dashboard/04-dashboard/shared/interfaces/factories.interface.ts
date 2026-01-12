export interface Production {
  year: number;
  units: number;
}

export interface Model {
  name: string;
  category: string;
  engine: string;
  basePriceUSD: number;
  production: Production[];
}

export interface Factory {
  id: number;
  name: string;
  country: string;
  employees: number;
  models: Model[];
}