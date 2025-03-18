// components/CategoryButtons.tsx
import React from 'react';
import {MacButton} from './MacButton';


interface CategoryButtonsProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
 }
 

const categories = [
  '医疗服务',
  '景点',
  '美食',
  '酒店',
  '交通',
  '特产',
  '节日活动',
  '天气',
];

const CategoryButtons: React.FC<CategoryButtonsProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <div className="flex flex-wrap gap-4">
      {categories.map((category) => (
        <MacButton
          key={category}
          onClick={() => onSelectCategory(category)}
          isActive={selectedCategory === category}
        >
          {category}
        </MacButton>
      ))}
    </div>
  );
};

export default CategoryButtons;
