import { lazy, Suspense, useState, useEffect, useRef } from 'react';
import Layout from '../components/Layout';
import { MacButton } from '../components/MacButton';
import { RotateLoader } from 'react-spinners';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// 懒加载组件
const CityHome = lazy(() => import('./city'));

// 菜单项配置
const menuItems = [
  { key: 'home', label: '首页', component: () => <div>这里是首页的内容。</div> },
  { key: 'about', label: '关于', component: () => <div>这里是关于我们页面的内容。</div> },
  { key: 'services', label: '服务', component: () => <CityHome /> },
  { key: 'contact', label: '联系我们', component: () => <div>这里是联系我们页面的内容。</div> },
];

// 轮播图图片
const carouselImages = [
  '/images/slide1.jpg',
  '/images/slide2.jpg',
  '/images/slide3.jpg',
];

export default function Index() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitionEnabled, setIsTransitionEnabled] = useState(true);
  const [showCarousel, setShowCarousel] = useState(true);
  const carouselRef = useRef<HTMLDivElement>(null);
  const totalSlides = carouselImages.length;

  // 处理菜单点击事件
  const handleMenuClick = (key: string) => {
    setActiveMenu(key);
    setShowCarousel(false); // 点击菜单时隐藏轮播图
  };

  // 自动切换轮播图
  useEffect(() => {
    if (!showCarousel) return; // 如果轮播图隐藏，不执行切换逻辑
    const intervalId = setInterval(nextSlide, 3000);
    return () => clearInterval(intervalId);
  }, [currentSlide, showCarousel]);

  // 下一张图片逻辑
  const nextSlide = () => {
    if (currentSlide === totalSlides) {
      setIsTransitionEnabled(false);
      setCurrentSlide(0);
      requestAnimationFrame(() => {
        setIsTransitionEnabled(true);
        setCurrentSlide(1);
      });
    } else {
      setCurrentSlide((prev) => prev + 1);
    }
  };

  // 上一张图片逻辑
  const prevSlide = () => {
    if (currentSlide === 0) {
      setIsTransitionEnabled(false);
      setCurrentSlide(totalSlides);
      requestAnimationFrame(() => {
        setIsTransitionEnabled(true);
        setCurrentSlide(totalSlides - 1);
      });
    } else {
      setCurrentSlide((prev) => prev - 1);
    }
  };

  // 处理触摸滑动事件
  const handleTouchStart = (e: React.TouchEvent) => {
    const touchStartX = e.touches[0].clientX;

    const handleTouchEnd = (e: TouchEvent) => {
      const touchEndX = e.changedTouches[0].clientX;
      if (touchEndX - touchStartX > 50) prevSlide();
      if (touchStartX - touchEndX > 50) nextSlide();
    };

    carouselRef.current?.addEventListener('touchend', handleTouchEnd, { once: true });
  };

  return (
    <Layout>
      <div className="flex flex-col items-center">
        {/* 固定导航栏 */}
        <nav className="fixed top-0 left-0 right-0 bg-white bg-opacity-90 z-50 flex justify-center space-x-4 py-4 shadow-md">
          {menuItems.map((item) => (
            <MacButton
              key={item.key}
              onClick={() => handleMenuClick(item.key)}
              isActive={activeMenu === item.key}
            >
              {item.label}
            </MacButton>
          ))}
        </nav>

        {/* 条件渲染轮播图 */}
        {showCarousel && (
          <div
            className="relative w-full mt-20 overflow-hidden"
            style={{ height: '550px' }} // 固定高度
            ref={carouselRef}
            onTouchStart={handleTouchStart}
          >
            <div
              className="flex transition-transform duration-700"
              style={{
                transform: `translateX(-${currentSlide * 100}%)`,
                transition: isTransitionEnabled ? 'transform 0.7s ease' : 'none',
                height: '100%',
              }}
            >
              {/* 轮播图内容 */}
              {[...carouselImages, carouselImages[0]].map((src, index) => (
                <div key={index} className="min-w-full flex justify-center">
                  <Image
                    src={src}
                    alt={`轮播图 ${index + 1}`}
                    width={1200}
                    height={600}
                    className="w-full h-full object-cover rounded-2xl shadow-lg"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>

            {/* 左右导航按钮 */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100"
            >
              <ChevronLeft />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-part  hover:bg-gray-100 rounded-full shadow-lg"
            >
              <ChevronRight />
            </button>

            {/* 轮播图指示器 */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {carouselImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full ${
                    index === (currentSlide % totalSlides) ? 'bg-blue-500' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        )}

        {/* 动态加载内容 */}
        <div className="w-full mt-10">
          {activeMenu && (
            <Suspense fallback={<RotateLoader color="#3B82F6" />}>
              {menuItems.find((item) => item.key === activeMenu)?.component()}
            </Suspense>
          )}
        </div>
      </div>
    </Layout>
  );
}
