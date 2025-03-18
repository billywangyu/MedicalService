/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [], // 配置允许的图片域名
  },
  // 如果需要静态导出
  // output: 'export',
  images: {
    unoptimized: true, // 静态导出时禁用图片优化
  },
  // 如果需要自定义环境变量
  env: {
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
  },
};

module.exports = nextConfig;
