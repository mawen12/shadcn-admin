import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { AxiosError } from 'axios'
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { toast } from 'sonner'
import { useAuthStore } from '@/stores/auth-store'
import { handleServerError } from '@/lib/handle-server-error'
import { DirectionProvider } from './context/direction-provider'
import { FontProvider } from './context/font-provider'
import { ThemeProvider } from './context/theme-provider'
// Generated Routes
import { routeTree } from './routeTree.gen'
// Styles
import './styles/index.css'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // 是否重试，true 重试，false 停止重试
      retry: (failureCount, error) => {
        // dev 环境下输出重试次数和错误信息
        // eslint-disable-next-line no-console
        if (import.meta.env.DEV) console.log({ failureCount, error })

        // dev 环境下不重试
        if (failureCount >= 0 && import.meta.env.DEV) return false
        // prod 环境下至多重试 3 次
        if (failureCount > 3 && import.meta.env.PROD) return false

        // 若错误是 AxiosError 且状态码是 401/403，则不可重试
        return !(
          error instanceof AxiosError &&
          [401, 403].includes(error.response?.status ?? 0)
        )
      },
      // 窗口聚焦时是否重拉
      refetchOnWindowFocus: import.meta.env.PROD,
      staleTime: 10 * 1000, // 10s
    },
    // 全局错误处理
    mutations: {
      onError: (error) => {
        // 调用统一错误处理
        handleServerError(error)

        if (error instanceof AxiosError) {
          // 对于 304 给 toast
          if (error.response?.status === 304) {
            toast.error('Content not modified!')
          }
        }
      },
    },
  },
  // 查询缓存，全局错误处理
  queryCache: new QueryCache({
    onError: (error) => {
      if (error instanceof AxiosError) {
        // 401
        if (error.response?.status === 401) {
          toast.error('Session expired!')
          // 清理登录状态
          useAuthStore.getState().auth.reset()
          const redirect = `${router.history.location.href}`
          // 跳转登陆页
          router.navigate({ to: '/sign-in', search: { redirect } })
        }
        // 500
        if (error.response?.status === 500) {
          toast.error('Internal Server Error!')
          // Only navigate to error page in production to avoid disrupting HMR in development
          // 跳转 500 错误页面
          if (import.meta.env.PROD) {
            router.navigate({ to: '/500' })
          }
        }
        // 403
        if (error.response?.status === 403) {
          // router.navigate("/forbidden", { replace: true });
        }
      }
    },
  }),
})

// Create a new router instance
const router = createRouter({
  routeTree,
  context: { queryClient },
  defaultPreload: 'intent',
  defaultPreloadStaleTime: 0,
})

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

// Render the app
const rootElement = document.getElementById('root')!

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    // 严格模式
    <StrictMode>
      {/* tanstack query */}
      <QueryClientProvider client={queryClient}>
        {/* 主题 */}
        <ThemeProvider>
          {/* 字体 */}
          <FontProvider>
            {/* RTL */}
            <DirectionProvider>
              {/* 将路由挂载到根节点 */}
              <RouterProvider router={router} />
            </DirectionProvider>
          </FontProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </StrictMode>
  )
}
