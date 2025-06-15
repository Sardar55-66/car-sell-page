export interface Car {
  id: number;
  mark_id: string;
  folder_id: string;
  price: number;
  images: {
    image: string[];
  };
  year: number;
  run: number;
  engine_power: number;
  engine_volume: number;
  gearbox: string;
  engine_type: string;
  color: string;
  body: string;
  drive: string;
}

export interface Meta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface CarsResponse {
  data: Car[];
  meta: Meta;
}

export type SortOrder = 'asc' | 'desc' | null; 