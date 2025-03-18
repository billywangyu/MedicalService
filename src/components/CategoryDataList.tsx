import React, { memo, useMemo } from 'react';

// 通用数据项类型
interface CategoryItem {
  id: string;
  name: string;
  description?: string;
  type?: string;
  [key: string]: any; // 允许额外的动态字段
}

// 通用列表组件
interface GenericListProps {
  data: CategoryItem[];
  fields: { label: string; key: string }[];
}

const GenericList: React.FC<GenericListProps> = ({ data, fields }) => {
  if (!data || data.length === 0) {
    console.warn('GenericList received empty data:', data);
    return <div className="text-gray-600">暂无数据。</div>;
  }

  return (
    <ul>
      {data.map((item) => (
        <li key={item.id} className="p-0 border-b text-sm">
          {fields.map((field) => (
            <p key={field.key}>
              <strong>{field.label}：</strong>
              {item[field.key] ?? '未提供'}
            </p>
          ))}
        </li>
      ))}
    </ul>
  );
};

// 类别字段映射
const categoryFieldsMap: Record<string, { label: string; key: string }[]> = {
  医疗服务: [
    { label: '名称', key: 'name' },
    { label: '地址', key: 'address' },
    { label: '电话', key: 'contact_info' },
    { label: '等级', key: 'type' },
  ],
  景点: [
    { label: '名称', key: 'name' },
    { label: '描述', key: 'description' },
    { label: '类型', key: 'type' },
  ],
  美食: [
    { label: '名称', key: 'name' },
    { label: '描述', key: 'description' },
    { label: '类型', key: 'type' },
  ],
  酒店: [
    { label: '名称', key: 'name' },
    { label: '地址', key: 'address' },
    { label: '类别', key: 'type' },
  ],
  交通: [
    { label: '交通方式', key: 'type' },
    { label: '价格区间', key: 'price_range' },
    { label: '描述', key: 'description' },
  ],
  特产: [
    { label: '名称', key: 'name' },
    { label: '描述', key: 'description' },
    { label: '类型', key: 'type' },
  ],
  节日活动: [
    { label: '名称', key: 'name' },
    { label: '主要活动', key: 'main_activities' },
    { label: '描述', key: 'description' },
  ],
  天气: [
    { label: '温度', key: 'temperature' },
    { label: '湿度', key: 'humidity' },
    { label: '风速', key: 'wind_speed' },
  ],
};

// 组件 Props 类型
interface CategoryDataListProps {
  category: string;
  data: CategoryItem[];
}

// 类别数据列表组件
const CategoryDataList: React.FC<CategoryDataListProps> = ({ category, data }) => {
  // 使用 useMemo 缓存 normalizedData，避免每次渲染都重新计算
  const normalizedData = useMemo(() => {
    return Array.isArray(data) ? data : data ? [data] : [];
  }, [data]);

  // 如果数据为空，显示暂无数据
  if (normalizedData.length === 0) {
    return <div className="text-red-500">暂无数据</div>;
  }

  // 只在 category 变化时重新计算 fields
  const fields = useMemo(() => categoryFieldsMap[category] ?? [], [category]);

    return <GenericList data={normalizedData} fields={fields} />;
};

// 深度比较函数，避免不必要的重新渲染
const arePropsEqual = (prevProps: CategoryDataListProps, nextProps: CategoryDataListProps) => {
  // 比较 category 是否变化
  if (prevProps.category !== nextProps.category) return false;

  // 比较 data 是否变化（深度比较）
  return JSON.stringify(prevProps.data) === JSON.stringify(nextProps.data);
};

export default memo(CategoryDataList, arePropsEqual);
