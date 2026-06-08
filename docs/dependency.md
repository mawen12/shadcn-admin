# Dependency


## 业务能力

| 依赖 | 用途 |
| --- | --- |
| `@clerk/react` | 登录、注册、会话管理和受保护路由，说明项目带有认证体系 |
| `@tanstack/react-router` | 前端路由，负责页面切换和嵌套路由 |
| `@tanstack/react-query` | 服务端状态管理，适合请求列表、详情、缓存和刷新 |
| `@tanstack/react-table` | 表格能力，说明项目有大量数据表、筛选、排序、分页场景 |
| `axios` | HTTP 请求封装，用来调用后端 API |
| `zustand` | 轻量全局状态管理，适合保存 UI 状态、用户信息、侧边栏状态等 |
| `react-hook-form`, `@hookform/resolvers`, `zod` | 表单处理与校验三件套，常用于登录、用户编辑、配置表单 |
| `date-fns` | 日期处理和格式化 |
| `recharts` | 图标渲染，说明后台有统计面板或分析页面 |
| `sonner` | Toast 提示，常用于提交成功、失败反馈 |
| `react-top-loading-bar` | 页面切换或请求加载时的顶部进度条 |
| `react-day-picker` | 日期选择器、适合筛选、日历、时间区间 |
| `input-otp` | 验证码或一次性密码输入 |
| `cmdk` | 命令面板/全局搜索，和 README 里提到的 global search 对应 |

## UI 组件与设计系统 

| 依赖 | 用途 |
| --- | --- |
| `react`, `react-dom` | React 应用基础 |
| `@radix-ui/*` | 无样式但可访问性强的基础组件 |
| `lucide-react` | 图标库 |
| `class-variance-authority` | 管理组件变体样式，常用于按钮、标签、卡片等可配置组件 |
| `clsx` | 动态拼接 className |
| `tailwindcss`, `@tailwindcss/vite` | Tailwind 样式体系和 Vite 集成 |
| `tailwind-merge` | 合并冲突的 Tailwind class |
| `tw-animate-css` | 动画辅助样式 |
| `@radix-ui/react-direction` | RTL 支持 |

## 工程开发与依赖构建 

| 依赖 | 用途 |
| --- | --- |
| `vite` | 开发服务器与生产构建工具 |
| `@vitejs/plugin-react` | React JSX/热更新支持 |
| `typescript` | 类型系统 |
| `@tanstack/router-plugin` | 为 TanStack Router 生成路由代码，配合 `routeTree.gen.ts` |
| `globals` | 提供浏览器/Node 全局变量类型 |
| `@types/node`, `@types/react`, `@types/react-dom` | 类型声明补充 |
| `@eslint/js`, `eslint`, `typescript-eslint`, `eslint-plugin-react-fresh`, `@tanstack/eslint-plugin-query` | 代码规范与 React/Query 专项检查 |
| `prettier`, `@trivago/prettier-plugin-sort-imports`, `prettier-plugin-tailwindcss` | 格式化 |
| `knip` | 检查无用文件、无用导出、无用依赖 |

## 测试相关依赖

| 依赖 | 用途 |
| --- | --- |
| `vitest` | 测试框架 |
| `@vitest/browser-playright` | 在真实浏览器环境跑测试 |
| `vitest-browser-react` | 在浏览器测试中渲染 React 组件 |
| `@vitest/coverage-v8` | 覆盖率统计 |
| `@vitest/ui` | 测试可视化界面 |
| `playwright` | 浏览器自动化底层能力 |