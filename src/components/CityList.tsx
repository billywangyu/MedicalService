//components/CityList.tsx
import { useEffect, useState } from 'react';
import { City } from '../types/MedicalService';

type CityListProps = {
  cities: City[];
  selectedCityId: string | null;
  onSelectCity: (cityId: string) => void;
};

type CityImageMap = {
  [cityId: string]: string;
};

const UNSPLASH_ACCESS_KEY = 'F3V6vblivio_nd9R9Rmz7itZhQrM7rD_TkNXOokQxqA';

export default function CityList({ cities, selectedCityId, onSelectCity }: CityListProps) {
  const [cityImages, setCityImages] = useState<CityImageMap>({});

  // 调用 Unsplash API 获取图片
  const fetchCityImage = async (city: City) => {
    try {
      const response = await fetch(
        `https://api.unsplash.com/search/photos?query=${encodeURIComponent(city.name)}&client_id=${UNSPLASH_ACCESS_KEY}&per_page=1`
      );
      const data = await response.json();
      if (data.results.length > 0) {
        setCityImages((prev) => ({ ...prev, [city.id]: data.results[0].urls.regular }));
      } else {
        // 如果没有找到图片，使用备用图片
        setCityImages((prev) => ({
          ...prev,
          [city.id]: 'https://source.unsplash.com/random/800x600/?city',
        }));
      }
    } catch (error) {
      console.error('加载图片失败:', error);
      setCityImages((prev) => ({
        ...prev,
        [city.id]: 'https://source.unsplash.com/random/800x600/?city',
      }));
    }
  };

  // 组件加载时，为每个城市获取图片
  useEffect(() => {
    cities.forEach((city) => {
      if (!cityImages[city.id]) {
        fetchCityImage(city);
      }
    });
  }, [cities]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {cities.map((city) => (
        <div
          key={city.id}
          className={`relative p-4 rounded-lg overflow-hidden cursor-pointer transition-all duration-200 transform hover:scale-105
            ${
              selectedCityId === city.id
                ? 'bg-gradient-blue p-4 rounded-lg'
                : 'border border-gray-200'
            }`}
          onClick={() => onSelectCity(city.id)}
        >
          <img
            src={cityImages[city.id] || 'https://source.unsplash.com/random/800x600/?city'}
            alt={city.name}
            className="absolute inset-0 w-full h-full object-cover z-0"
          />
          <div className="relative z-10 bg-black bg-opacity-50 p-4 rounded-lg">
            <h2 className="text-white text-lg font-semibold">{city.name}</h2>
            <p className="text-gray-200">{city.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
