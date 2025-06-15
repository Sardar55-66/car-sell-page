'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import CarCard from '@/components/CarCard';
import { Car, SortOrder } from '@/types/car';
import { fetchCars } from '@/utils/api';

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [cars, setCars] = useState<Car[]>([]);
  const [meta, setMeta] = useState({ total: 0, page: 1, totalPages: 1 });
  const [loading, setLoading] = useState(true);

  const currentPage = Number(searchParams.get('page')) || 1;
  const currentSort = searchParams.get('sort') as SortOrder;

  useEffect(() => {
    const loadCars = async () => {
      setLoading(true);
      try {
        const response = await fetchCars(currentPage, currentSort);
        console.log('API Response:', response); // Debug log
        setCars(response.data);
        setMeta(response.meta);
      } catch (error) {
        console.error('Error loading cars:', error);
      }
      setLoading(false);
    };

    loadCars();
  }, [currentPage, currentSort]);

  const handleSortChange = (sort: SortOrder) => {
    const params = new URLSearchParams(searchParams.toString());
    if (sort) {
      params.set('sort', sort);
    } else {
      params.delete('sort');
    }
    params.set('page', '1');
    router.push(`/?${params.toString()}`);
  };

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    router.push(`/?${params.toString()}`);
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Автомобили</h1>
        <div className="flex gap-4">
          <button
            onClick={() => handleSortChange(null)}
            className={`px-4 py-2 rounded transition-colors ${
              !currentSort 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
          >
            Без сортировки
          </button>
          <button
            onClick={() => handleSortChange('asc')}
            className={`px-4 py-2 rounded transition-colors ${
              currentSort === 'asc' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
          >
            По возрастанию цены
          </button>
          <button
            onClick={() => handleSortChange('desc')}
            className={`px-4 py-2 rounded transition-colors ${
              currentSort === 'desc' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
          >
            По убыванию цены
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-8">Загрузка...</div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {cars.map((car, index) => (
              <CarCard key={`${car.mark_id}-${car.folder_id}-${index}`} car={car} />
            ))}
          </div>

          <div className="mt-8 flex justify-center gap-2">
            {Array.from({ length: meta.totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-4 py-2 rounded transition-colors ${
                  page === currentPage 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
              >
                {page}
              </button>
            ))}
          </div>
        </>
      )}
    </main>
  );
}
