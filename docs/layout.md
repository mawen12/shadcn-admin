# Layout

```markdown
.github  # Github 协作规范
.vscode  # VS Code 工作区扩展与本地编辑器设置
node_modules  # 本地安装依赖目录
public  # 静态资源目录，构建时原样拷贝，含图片和 favicon
src  # 业务源代码，页面、组件、状态、路由、样式等核心代码
.env.example  # 环境变量模版（示例包含 Clerk 公钥变量名）
.gitignore  # Git 忽略规则
.prettierignore  # 指定格式化忽略规则
.prettierrc  # Prettier 格式化配置，含导入顺序和 Tailwind class 排序插件
CHANGELOG.md  # 版本变更记录
components.json  # Shadcn CLI 配置，定义样式方案、Tailwind 入口、路径别名、图标库
cs.yaml  # Commitizen 语义化提交与版本号/Changelog 升级策略
eslint.config.js  # ESLint 规则配置，含 TS、React Hooks、TanStack Query 规则
index.html  # Vite 的 HTML 入口模版，挂载点为 root，并配置 SEO/社媒信息
knip.config.js  # Knip 配置
LICENSE  # 开源协议
netlify.yaml  # Netlify 部署配置，设置 SPA 路由回退到 index.html
package.json  # 项目元信息、脚本、依赖清单，包含 dev/build/test/lint/format/knip 脚本
pnpm-lock.json  # 依赖锁定文件，确保团队安装版本一致
pnpm-workspace.yaml # pnpm 工作区与构建白名单相关配置
README.md  # 项目说明
tsconfig.app.json # 浏览器端 TS 配置，覆盖 src 编译和严格检查策略
tsconfig.json  # TypeScript 顶层配置，应用 app 与 node 两套配置
tsconfig.node.json # Node 侧 TS 配置，主要用于 Vite 配置文件类型检查
vite.config.ts  # Vite 配置：集成 React/Tailwind/TanStack Router 插件，并配置 Vite browser 样式
```