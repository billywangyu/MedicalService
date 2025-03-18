// components/ui/carousel.tsx
import { ReactNode, useState, Children, cloneElement } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function Carousel({ children }: { children: ReactNode }) {
  const items = Children.toArray(children); // 确保子元素为数组
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
  };

  return (
    <div className="relative overflow-hidden">
      <div
        className="flex transition-transform duration-500"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {items.map((item, index) => (
          <div key={index} className="w-full flex-shrink-0">
            {item}
          </div>
        ))}
      </div>
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg"
      >
        <ChevronLeft />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg"
      >
        <ChevronRight />
      </button>
    </div>
  );
}

export function CarouselContent({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export function CarouselItem({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={`w-full ${className}`}>{children}</div>;
}
