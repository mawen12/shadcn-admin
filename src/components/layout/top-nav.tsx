import { Link } from '@tanstack/react-router'
import { Menu } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

type TopNavProps = React.HTMLAttributes<HTMLElement> & {
  // 连接
  links: {
    // 标题
    title: string
    // 地址
    href: string
    // 是否位于当前
    isActive: boolean
    // 是否禁用
    disabled?: boolean
  }[]
}

/**
 * header 路由，小屏模式下展示 Menu 按钮，非小屏时展示 Nav 列表
 */
export function TopNav({ className, links, ...props }: TopNavProps) {
  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button
            size='icon'
            variant='outline'
            // md:size-7: 当超过了 md 时，大小设置为 7
            // lg:hidden: 当超过了 lg 时，隐藏按钮
            className={cn('md:size-7 lg:hidden', className)}
          >
            <Menu />
            <span className='sr-only'>Toggle navigation menu</span>
          </Button>
        </DropdownMenuTrigger>
        {/* 展示位于底部 */}
        <DropdownMenuContent side='bottom' align='start'>
          {/* 以列表方式显示 link */}
          {links.map(({ title, href, isActive, disabled }) => (
            <DropdownMenuItem key={`${title}-${href}`} asChild>
              {/* 采用 tanstack router 封装，实现点击时的页面跳转 */}
              <Link
                // 跳转的目标路径
                to={href}
                // 非激活时，使用主题里的弱化前景色的文字颜色
                className={!isActive ? 'text-muted-foreground' : ''}
                // 禁用状态，无法点击
                disabled={disabled}
              >
                {title}
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* 以 nav 布局排列 */}
      <nav
        className={cn(
          // hidden: 默认隐藏，小屏先不展示这段 nav，当达到 lg 时展示为 flex
          // items-center: 仅在变成 flex 布局时生效，垂直居中
          // space-x-4: 子项很想间距 1rem
          // lg:flex: 到 lg 端点及以上时，显示为 flex
          // lg:space-x-4: 在 lg 及以上明确保持 1rem 间距
          // xl:space-x-6: 在 xl 及以上时，间距增大到 1.5rem，让大屏更舒展
          'hidden items-center space-x-4 lg:flex lg:space-x-4 xl:space-x-6',
          className
        )}
        {...props}
      >
        {/*  */}
        {links.map(({ title, href, isActive, disabled }) => (
          <Link
            key={`${title}-${href}`}
            to={href}
            disabled={disabled}
            // text-sm: 字体小一档，越 14px
            // font-medium: 中等字重，较普通文本更醒目
            // transition-colors: 颜色变化带过渡动画（hover 时不突兀）
            // hover:text-primary: 鼠标悬停时切换到主题主色
            // isActive 时，不追加弱化色，保持默认
            // !isActive 时，追加 text-muted-foreground，显示为次要文字色（更淡）
            className={`text-sm font-medium transition-colors hover:text-primary ${isActive ? '' : 'text-muted-foreground'}`}
          >
            {title}
          </Link>
        ))}
      </nav>
    </>
  )
}
