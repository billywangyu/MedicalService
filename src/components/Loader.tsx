// components/Loader.tsx
export default function Loader() {
  return (
    <div className="flex flex-wrap gap-4">
      {[1, 2, 3].map((_, index) => (
        <div key={index} className="flex-1 min-w-[250px] max-w-[350px] p-4 border rounded-lg animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      ))}
    </div>
  );
}
