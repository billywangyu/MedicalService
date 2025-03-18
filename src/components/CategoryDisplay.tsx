import { useState, useEffect } from 'react';
import { BounceLoader } from 'react-spinners';
import { motion } from 'framer-motion';
import CategoryButtons from './CategoryButtons';
import CategoryDataList from './CategoryDataList';
import { fetchCategoryData } from '../services/api';

interface CategoryDisplayProps {
  cityId: string | null;
  defaultCategory?: string;
}

export default function CategoryDisplay({ cityId, defaultCategory = '医疗服务' }: CategoryDisplayProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>(defaultCategory);
  const [categoryLoading, setCategoryLoading] = useState(false);
  const [categoryError, setCategoryError] = useState<string | null>(null);
  const [categoryData, setCategoryData] = useState<any[]>([]);


  useEffect(() => {


    if (!cityId || !selectedCategory) {
      console.log('cityId or selectedCategory is null/undefined, skipping fetch.');
      return;
    }

    const loadCategoryData = async () => {

      setCategoryLoading(true);
      setCategoryError(null);
      try {
        const data = await fetchCategoryData(cityId, selectedCategory);


        const updatedData = Array.isArray(data) ? data : [];

        setCategoryData(updatedData);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : '发生错误';
        console.error('Error fetching category data:', errorMessage);
        setCategoryError(errorMessage);
        setCategoryData([]);
      } finally {
        setCategoryLoading(false);
      }
    };

    loadCategoryData();
  }, [cityId, selectedCategory]);

  const handleCategoryChange = (category: string) => {

    setSelectedCategory(category);
  };

  return (
    <div>
      <CategoryButtons selectedCategory={selectedCategory} onSelectCategory={handleCategoryChange} />

      <div className="mt-1">
        {categoryLoading ? (
          <div className="flex justify-center items-center">
            <BounceLoader color="#4A90E2" loading={true} size={40} />
          </div>
        ) : categoryError ? (
          <div className="bg-red-500 text-white p-0 rounded-lg">错误: {categoryError}</div>
        ) : categoryData.length ? (
          <motion.div
            className="flex space-x-4 flex-nowrap overflow-x-auto font"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            {categoryData.map((item, index) => {

              return (
                <motion.div
                  key={index}
                  className="min-w-[300px] h-23 flex-shrink-0 p-0 border rounded-lg shadow-md bg-white"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 1, y: 20 }} // 添加退出动画，向上消失
                  transition={{ duration: 0.5, delay: index * 0.8 }}
                >
                  <CategoryDataList category={selectedCategory} data={item} />
                </motion.div>
              );
            })}
          </motion.div>
        ) : (
          <div className="text-gray-600">暂无数据。</div>
        )}
      </div>
    </div>
  );
}
