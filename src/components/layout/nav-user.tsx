import { Link } from '@tanstack/react-router'
import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Sparkles,
} from 'lucide-react'
import useDialogState from '@/hooks/use-dialog-state'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar'
import { SignOutDialog } from '@/components/sign-out-dialog'

type NavUserProps = {
  user: {
    name: string
    email: string
    avatar: string
  }
}

/**
 * Sidebar 的底部用户信息及操作区
 * 设计上类似于 TeamSwitcher
 */
export function NavUser({ user }: NavUserProps) {
  const { isMobile } = useSidebar()
  const [open, setOpen] = useDialogState()

  return (
    <>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size='lg'
                // data-[state=open]:bg-sidebar-accent: 当 DropdownMenu 处于展开状态时，背景色切换为侧边栏的 accent 色
                // data-[state=open]:text-sidebar-accent-foreground: 当 DropdownMenu 处于展开状态时，文字颜色切换为 accent 的前景色
                className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
              >
                {/* h-8 w-8: 等价于 size-8，32*32px */}
                {/* rounded-lg: 大圆角 */}
                <Avatar className='h-8 w-8 rounded-lg'>
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className='rounded-lg'>SN</AvatarFallback>
                </Avatar>
                {/* 信息区 */}
                {/* grid: 网格布局，让两个 span 垂直堆叠 */}
                {/* flex-1: 撑满剩余空间，确保文字区域占据 Logo 右侧的所有可用宽度 */}
                {/* text-start: 文字左对齐 */}
                {/* text-sm: 字体大小 0.875rem */}
                {/* leading-tight: 行高 1.25，文字更紧凑 */}
                <div className='grid flex-1 text-start text-sm leading-tight'>
                  {/* truncate: 文本过长时，使用省略号...截断，防止撑破按钮 */}
                  <span className='truncate font-semibold'>{user.name}</span>
                  {/* truncate: 文本过长时，使用省略号...截断，防止撑破按钮 */}
                  <span className='truncate text-xs'>{user.email}</span>
                </div>
                {/* ms-auto: 在内联起始方向上设置自动外边距，效果是将右箭头图标推到容器的最右侧 */}
                <ChevronsUpDown className='ms-auto size-4' />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              // w-(--radix-dropdown-menu-trigger-width): 宽度动态匹配触发器按钮的宽度
              // min-w-56: 最小宽度 14rem
              // rounded-lg: 大圆角
              className='w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg'
              side={isMobile ? 'bottom' : 'right'}
              align='end'
              sideOffset={4}
            >
              {/* 顶部一行 */}
              {/* p-0: 无内边距 */}
              <DropdownMenuLabel className='p-0 font-normal'>
                {/* flex items-center gap-2: flex 布局，垂直居中，子项保持 8px */}
                {/* px-1 py-1.5: 横轴内边距 4px，纵轴内边距 6px */}
                {/* text-start: 文本位于开始处，支持 RTL */}
                {/* text-sm: 小字体 */}
                <div className='flex items-center gap-2 px-1 py-1.5 text-start text-sm'>
                  <Avatar className='h-8 w-8 rounded-lg'>
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className='rounded-lg'>SN</AvatarFallback>
                  </Avatar>
                  <div className='grid flex-1 text-start text-sm leading-tight'>
                    <span className='truncate font-semibold'>{user.name}</span>
                    <span className='truncate text-xs'>{user.email}</span>
                  </div>
                </div>
              </DropdownMenuLabel>
              {/* 分割线 */}
              <DropdownMenuSeparator />
              {/* 第二区域 */}
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <Sparkles />
                  Upgrade to Pro
                </DropdownMenuItem>
              </DropdownMenuGroup>
              {/* 分割线 */}
              <DropdownMenuSeparator />
              {/* 信息区 */}
              <DropdownMenuGroup>
                <DropdownMenuItem asChild>
                  {/* 跳转到 /settings/accout */}
                  <Link to='/settings/account'>
                    <BadgeCheck />
                    Account
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  {/* 跳转到 /settings，实际上会到默认值，及 /settings/profile */}
                  <Link to='/settings'>
                    <CreditCard />
                    Billing
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  {/* 跳转到 /settings/notifications */}
                  <Link to='/settings/notifications'>
                    <Bell />
                    Notifications
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              {/* 分隔符 */}
              <DropdownMenuSeparator />
              {/* 退出登录区 */}
              <DropdownMenuItem
                variant='destructive'
                onClick={() => setOpen(true)}
              >
                <LogOut />
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>

      {/* 点击退出登录的弹出框 */}
      <SignOutDialog open={!!open} onOpenChange={setOpen} />
    </>
  )
}
