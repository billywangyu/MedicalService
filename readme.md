medical-services-app/
├── public/                  # 静态资源
├── src/
│   ├── pages/               # Next.js 页面和 API 路由
│   │   ├── api/             # API 路由
│   │   │   └── data.ts      # 合并后的 API 路由文件
│   │   ├── _app_.tsx        # tailwindcss 配置文件
│   │   └── index.tsx        # 首页
│   ├── components/          # React 组件
│   │   ├── CityList.tsx     # 城市列表组件
│   │   ├── Loader.tsx       # 加载组件
│   │   └── ServiceList.tsx  # 医疗服务列表组件
│   ├── services/            # 数据服务
│   │   └── api.ts           # 数据获取函数
│   ├── types/               # 类型定义
│   │   └── neon.d.ts        # 扩展 @neondatabase/serverless 模块的类型定义
│   │   └── MedicalService.ts # 类型定义文件
│   └── styles/              # 样式文件
│       └── globals.css      # 全局样式文件
├── tailwind.config.js       # Tailwind CSS 配置文件
├── postcss.config.js        # PostCSS 配置文件
├── .env.local               # 环境变量
├── package.json             # 项目依赖
├── tsconfig.json            # TypeScript 配置
└── README.md                # 项目说明

### 项目说明

这是一个使用 Next.js 和 TypeScript 构建的医疗服务信息查询应用。应用包含以下主要部分：

1. **页面和 API 路由**：
   - `pages/index.tsx`：首页，展示城市列表和医疗服务列表。
   - `pages/api/data.ts`：合并后的 API 路由文件，用于获取城市列表和医疗服务列表。

2. **React 组件**：
   - `components/CityItem.tsx`：城市列表项组件，用于展示城市信息。
   - `components/ServiceItem.tsx`：医疗服务列表项组件，用于展示医疗服务信息。

3. **数据服务**：
   - `services/api.ts`：数据获取函数，用于从 API 获取城市列表和医疗服务列表。

4. **类型定义**：
   - `types/MedicalService.ts`：类型定义文件，定义了医疗服务信息的结构。

5. **样式文件**：
   - `styles/`：存放应用的样式文件。

6. **环境变量**：
   - `.env`：用于存储 API 密钥等敏感信息。