// pages/city.tsx
import { useState, useEffect } from 'react';
import { fetchCities } from '../services/api';
import CityList from '../components/CityList';
import CategoryDisplay from '../components/CategoryDisplay';
import { BounceLoader } from 'react-spinners';
import Layout from '../components/Layout';
import { City } from '../types/MedicalService';

export default function CityHome() {
  const [cities, setCities] = useState<City[]>([]);
  const [selectedCityId, setSelectedCityId] = useState<string | null>(null);

  // 加载城市数据
  useEffect(() => {
    const loadCities = async () => {
      try {
        const data = await fetchCities();
        setCities(data);
      } catch (err) {
        console.error('获取城市数据时出错:', err);
      }
    };

    loadCities();
  }, []);

  // 如果城市数据未加载完，显示加载动画
  if (!cities.length) {
    return (
      <div>
                <Layout>
          <div className="flex justify-center items-center h-screen">
            <BounceLoader color="#4A90E2" loading={true} size={60} />
          </div>
        </Layout>
      </div>
    );
  }

  return (
    <div>
      {/* 顶部导航栏 */}
      
      {/* 固定的服务列表区域 */}
      {selectedCityId ? (
        <div className="fixed top-7 mt-10 left-0 right-0 z-40 bg-white bg-opacity-90 p-1 shadow-md">
          <CategoryDisplay cityId={selectedCityId} />
        </div>
      ) : (
        <div className="fixed top-5 mt-20 left-0 right-0 z-40 bg-white bg-opacity-90 p-3 shadow-md">
          <p className="h-5 text-center text-gray-800">请选择一个城市</p>
        </div>
      )}

      {/* 主内容区域 */}
      <Layout>
        {/* 城市列表 */}
        <div className="flex flex-col items-center mb-1 mt-32">
          <CityList
            cities={cities}
            selectedCityId={selectedCityId}
            onSelectCity={setSelectedCityId}
          />
        </div>
      </Layout>
    </div>
  );
}
