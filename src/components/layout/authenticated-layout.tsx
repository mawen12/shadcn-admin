import { Outlet } from '@tanstack/react-router'
import { getCookie } from '@/lib/cookies'
import { cn } from '@/lib/utils'
import { LayoutProvider } from '@/context/layout-provider'
import { SearchProvider } from '@/context/search-provider'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/layout/app-sidebar'
import { SkipToMain } from '@/components/skip-to-main'

type AuthenticatedLayoutProps = {
  children?: React.ReactNode
}

export function AuthenticatedLayout({ children }: AuthenticatedLayoutProps) {
  // 从 cookie 中读取先前的状态
  const defaultOpen = getCookie('sidebar_state') !== 'false'
  return (
    // 搜索支持
    <SearchProvider>
      {/* 布局支持 */}
      <LayoutProvider>
        {/* Sidebar */}
        <SidebarProvider defaultOpen={defaultOpen}>
          {/* 无障碍访问组件 */}
          <SkipToMain />
          {/* 左侧的 Sideabr */}
          <AppSidebar />

          <SidebarInset
            className={cn(
              // Set content container, so we can use container queries
              // CSS 的容器查询设置，将 SidebarInset 声明为一个 content 容器，允许子组件使用 @container content (min-width: ...) 进行响应式适配，基于自身宽度而非视口宽度
              '@container/content',

              // If layout is fixed, set the height
              // to 100svh to prevent overflow
              // 匹配后代元素中 data-layout="fixed" 的属性，此处用于和 Layout -> Main 中的形成联动
              // 使用小视口高度，排除浏览器地址栏
              'has-data-[layout=fixed]:h-svh',

              // If layout is fixed and sidebar is inset,
              // set the height to 100svh - spacing (total margins) to prevent overflow
              // 当同级元素 sidebar 的 variant=inset 或当前容器内的 layout=fixed，使用高度减去间距
              // 即如果是 inset 样式，且布局为 fixed 时，主内容区两侧有外边距，总高度需要减去这些外边距，防止内容移除到视口之外
              'peer-data-[variant=inset]:has-data-[layout=fixed]:h-[calc(100svh-(var(--spacing)*4))]'
            )}
          >
            {children ?? <Outlet />}
          </SidebarInset>
        </SidebarProvider>
      </LayoutProvider>
    </SearchProvider>
  )
}
