// components/Layout.tsx
import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode; // 主内容
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* 主内容区域 */}
      <main className="flex-grow p-4 overflow-y-auto">{children}</main>
    </div>
  );
}
// 在这个布局组件中，我们使用了 Tailwind CSS 的类来设置样式。我们使用了 flex 布局来使主内容区域占据剩余的空间，并使用了 p-4 类来设置内边距。我们还使用了 overflow-y-auto 类来使主内容区域在内容超出视口高度时可以滚动。