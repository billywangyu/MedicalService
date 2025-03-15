// components/SkeletonLoading.tsx
const SkeletonLoading = () => (
    <div className="animate-pulse">
      <div className="h-6 bg-gray-200 rounded mb-4"></div>
      <div className="h-4 bg-gray-200 rounded mb-2"></div>
      <div className="h-4 bg-gray-200 rounded mb-2"></div>
      <div className="h-4 bg-gray-200 rounded"></div>
    </div>
  );
  
  export default SkeletonLoading;
  