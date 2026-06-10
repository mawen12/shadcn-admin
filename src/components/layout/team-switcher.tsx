import * as React from 'react'
import { ChevronsUpDown, Plus } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar'

type TeamSwitcherProps = {
  teams: {
    name: string
    logo: React.ElementType
    plan: string
  }[]
}

/**
 * 团队切换器，用于切换不同的团队或新增新的团队
 */
export function TeamSwitcher({ teams }: TeamSwitcherProps) {
  const { isMobile } = useSidebar()
  // 默认使用第一个
  const [activeTeam, setActiveTeam] = React.useState(teams[0])

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            {/* 下拉菜单打开时，按钮的背景和文字颜色会变化，给用户一个视觉反馈 */}
            <SidebarMenuButton
              size='lg'
              // data-[state=open]:bg-sidebar-accent: 当 DropdownMenu 处于展开状态时，背景色切换为侧边栏的 accent 色
              // data-[state=open]:text-sidebar-accent-foreground: 当 DropdownMenu 处于展开状态时，文字颜色切换为 accent 的前景色
              className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
            >
              {/* Logo */}
              {/* flex size-8 items-center justify-center: flex 布局，固定尺寸 32*32px，子项垂直居中、水平居中 */}
              {/* aspect-square: 强制宽高比为 1:1 */}
              {/* rounded-lg: 大圆角 */}
              {/* bg-sidebar-primary: 使用侧边栏主色作为背景 */}
              {/* text-sidebar-primary-foreground: 文字使用主色的前景色 */}
              <div className='flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground'>
                <activeTeam.logo className='size-4' />
              </div>
              {/* 信息区 */}
              {/* grid: 网格布局，让两个 span 垂直堆叠 */}
              {/* flex-1: 撑满剩余空间，确保文字区域占据 Logo 右侧的所有可用宽度 */}
              {/* text-start: 文字左对齐 */}
              {/* text-sm: 字体大小 0.875rem */}
              {/* leading-tight: 行高 1.25，文字更紧凑 */}
              <div className='grid flex-1 text-start text-sm leading-tight'>
                {/* truncate: 文本过长时，使用省略号...截断，防止撑破按钮 */}
                <span className='truncate font-semibold'>
                  {activeTeam.name}
                </span>
                {/* truncate: 文本过长时，使用省略号...截断，防止撑破按钮 */}
                <span className='truncate text-xs'>{activeTeam.plan}</span>
              </div>
              {/* 图标 */}
              <ChevronsUpDown className='ms-auto' />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            // w-(--radix-dropdown-menu-trigger-width): 宽度动态匹配触发器按钮的宽度
            // min-w-56: 最小宽度 14rem
            // rounded-lg: 大圆角
            className='w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg'
            align='start'
            // 手机端位于底部，PC 端位于右侧
            side={isMobile ? 'bottom' : 'right'}
            sideOffset={4}
          >
            {/* text-muted-foreground: 文字使用主色的前景色 */}
            <DropdownMenuLabel className='text-xs text-muted-foreground'>
              Teams
            </DropdownMenuLabel>
            {teams.map((team, index) => (
              <DropdownMenuItem
                key={team.name}
                onClick={() => setActiveTeam(team)}
                className='gap-2 p-2'
              >
                {/* flex items-center justify-center: flex 布局，子项垂直居中，水平居中 */}
                {/* size-6: 固定尺寸，24*24px */}
                {/* rounded-sm: 小圆角 */}
                {/* border: 添加边框 */}
                <div className='flex size-6 items-center justify-center rounded-sm border'>
                  <team.logo className='size-4 shrink-0' />
                </div>
                {team.name}
                <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
              </DropdownMenuItem>
            ))}
            {/* 分隔符 */}
            <DropdownMenuSeparator />
            {/* gap-2: 子项间距 8px  */}
            {/* p-2：内边距 8px */}
            <DropdownMenuItem className='gap-2 p-2'>
              <div className='flex size-6 items-center justify-center rounded-md border bg-background'>
                <Plus className='size-4' />
              </div>
              <div className='font-medium text-muted-foreground'>Add team</div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
