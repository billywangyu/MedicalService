// components/ServiceList.tsx
import { useEffect, useState } from 'react';
import { fetchMedicalServices } from '../services/api';
import { MedicalService } from '../types/MedicalService';
import Loader from '../components/Loader'; // 加载动画组件

type ServiceListProps = {
  cityId: string;
};

export default function ServiceList({ cityId }: ServiceListProps) {
  const [services, setServices] = useState<MedicalService[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadServices = async () => {
      try {
        const data = await fetchMedicalServices(cityId);
        setServices(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    loadServices();
  }, [cityId]);

  if (loading) return <div className="flex justify-center items-center p-4"><Loader /></div>;
  if (error) return <div className="bg-red-500 text-white p-4">Error: {error}</div>;

  return (
    <div className="grid grid-cols-1 transition-all sm:grid-cols-2 md:grid-cols-3 gap-4 ">
      {services.map((service) => (
        <div
          key={service.id}
          className="p-4 border rounded-lg transition-all duration-200 hover:shadow-md hover:border-blue-300 bg-gradient-blue"
        >
          <h2 className="text-lg font-semibold">{service.name}</h2>
          <p className="text-gray-600">{service.description}</p>
          <p className="text-gray-500">Address: {service.address}</p>
          
        </div>
      ))}
    </div>
  );
}
