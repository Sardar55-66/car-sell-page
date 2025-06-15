import { CarsResponse, SortOrder } from '@/types/car';

const API_BASE_URL = 'https://testing-api.ru-rating.ru';

export async function fetchCars(page: number, sortOrder: SortOrder): Promise<CarsResponse> {
  const params = new URLSearchParams({
    _limit: '12',
    _page: page.toString(),
  });

  if (sortOrder) {
    params.append('_sort', 'price');
    params.append('_order', sortOrder);
  }

  const response = await fetch(`${API_BASE_URL}/cars?${params.toString()}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch cars');
  }

  return response.json();
} 