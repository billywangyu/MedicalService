// pages/index.tsx
import { useState, useEffect } from 'react';
import { City } from '../types/MedicalService';
import { fetchCities } from '../services/api';
import CityList from '../components/CityList';
import ServiceList from '../components/ServiceList';
import { BounceLoader } from 'react-spinners';

export default function Home() {
  const [cities, setCities] = useState<City[]>([]);
  const [selectedCityId, setSelectedCityId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCities = async () => {
      try {
        const data = await fetchCities();
        setCities(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    loadCities();
  }, []);

  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <BounceLoader color="#4A90E2" loading={true} size={60} />
    </div>
  );

  if (error) return (
    <div className="flex justify-center items-center h-screen bg-red-500 text-white p-4">
      Error: {error}
    </div>
  );

  return (
    <div className="flex items-center flex-col h-screen">
      <div className="flex-grow-0 p-4 bg-white shadow-md">
        <h1 className="text-2xl font-bold mb-4">Medical Services</h1>
        {selectedCityId ? (
          <ServiceList cityId={selectedCityId} />
        ) : (
          <p className="text-gray-600">Please select a city to view medical services.</p>
        )}
      </div>

      <div className="flex-grow overflow-y-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Cities</h1>
        <CityList cities={cities} selectedCityId={selectedCityId} onSelectCity={setSelectedCityId} />
      </div>

      <footer className="p-1 bg-gray-800 text-white text-center">
        <p>&copy; 2023 Medical Services App. All rights reserved.</p>
      </footer>
    </div>
  );
}

