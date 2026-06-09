import { type QueryClient } from '@tanstack/react-query'
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { Toaster } from '@/components/ui/sonner'
import { NavigationProgress } from '@/components/navigation-progress'
import { GeneralError } from '@/features/errors/general-error'
import { NotFoundError } from '@/features/errors/not-found-error'

// 创建根路由
export const Route = createRootRouteWithContext<{
  queryClient: QueryClient
}>()({
  component: () => {
    return (
      <>
        {/* 顶部进度条 */}
        <NavigationProgress />
        {/* 动态路由的子页面挂载点 */}
        <Outlet />
        {/* 通知框,展示时间：5s */}
        <Toaster duration={5000} />
        {/* 开发环境下，展示 ReactQuery + TanStackRouter */}
        {import.meta.env.MODE === 'development' && (
          <>
            {/* 底部左侧 */}
            <ReactQueryDevtools buttonPosition='bottom-left' />
            {/* 底部右侧 */}
            <TanStackRouterDevtools position='bottom-right' />
          </>
        )}
      </>
    )
  },
  // 未知组件：404 报错
  notFoundComponent: NotFoundError,
  // 组件渲染错误，通用报错
  errorComponent: GeneralError,
})
