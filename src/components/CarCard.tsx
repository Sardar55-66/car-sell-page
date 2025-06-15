'use client';
import Image from 'next/image';
import { Car } from '@/types/car';
import { useState } from 'react';

interface CarCardProps {
  car: Car;
}

export default function CarCard({ car }: CarCardProps) {
  const images = car.images.image;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageError, setImageError] = useState(false);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48 w-full">
        {!imageError && (
          <Image
            src={images[currentIndex]}
            alt={`${car.mark_id} ${car.folder_id}`}
            fill
            className="object-cover"
            onError={handleImageError}
          />
        )}
        {/* Кнопки */}
        <button
          onClick={handlePrev}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-1 rounded-full"
        >
          ‹
        </button>
        <button
          onClick={handleNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-1 rounded-full"
        >
          ›
        </button>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2 text-black">
          {car.mark_id} {car.folder_id}
        </h3>
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold text-blue-600">
            {car.price?.toLocaleString() || '0'} ₽
          </span>
          <span className="text-sm text-gray-600">{car.year || 'Н/Д'}</span>
        </div>
        <div className="mt-2 text-sm text-gray-600">
          <p>
            {car.run?.toLocaleString() || '0'} км • {car.engine_power || '0'} л.с.
          </p>
          <p>
            {car.gearbox || 'Н/Д'} • {car.engine_type || 'Н/Д'}
          </p>
        </div>
      </div>
    </div>
  );
}