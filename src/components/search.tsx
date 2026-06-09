import { SearchIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useSearch } from '@/context/search-provider'
import { Button } from './ui/button'

/**
 * 使用 Button 模拟一个 Search Input
 * 点击按钮时，将 SearchContext 中设置为 open
 */
export function Search({
  className = '',
  placeholder = 'Search',
  ...props
}: React.ComponentProps<'button'> & { placeholder?: string }) {
  // 从 context 读取
  const { setOpen } = useSearch()
  return (
    // 使用按钮模拟 search input
    <Button
      {...props}
      variant='outline'
      // group: 给子元素提供 group-hover 联动条件
      // relative: 让内部元素绝对定位元素（搜索图标、快捷键提示）以它为定位参照
      // h-8: 高度 2rem(32px)
      // w-full: 默认宽度占满可用空间（小屏优先）
      // flex-1: 在 felx 容器中可伸展，占剩余空间
      // justify-start: 内容从起始侧对齐
      // rounded-md: 中等圆角
      // bg-muted/25: 使用 muted 色，25% 透明度背景
      // text-sm: 小字号
      // font-normal: 常规字重
      // text-muted-foreground: 弱化前景色文字
      // shadow-none: 去掉阴影
      // hover:bg-accent: 悬停时背景切到 accent 色
      // sm:w-40: sm 及以上固定宽度 10rem(160px) ，为右侧 kbd 留空间
      // sm:pe-12: sm 及以上在行内结束侧加内边距 3rem
      // md:flex-none: md 及以上不再 flex 拉伸，按自身宽度显示 
      // lg:w-52: lg 及以上宽度变 13rem(208px) 
      // xl:w-64: xl 及以上宽度变 16rem(256px)
      className={cn(
        'group relative h-8 w-full flex-1 justify-start rounded-md bg-muted/25 text-sm font-normal text-muted-foreground shadow-none hover:bg-accent sm:w-40 sm:pe-12 md:flex-none lg:w-52 xl:w-64',
        className
      )}
      aria-keyshortcuts='Meta+K Control+K'
      // 点击按钮时，更新 context search 为打开
      onClick={() => setOpen(true)}
    >
      {/* 搜索图标 */}
      <SearchIcon
        aria-hidden='true'
        // absolute: 绝对定位图标，不占普通文档流位置
        // inset-s-1.5: 贴近行内起始侧偏移 0.375rem(6px)
        // top-1/2: 图标上边缘放到容器 50% 高度处
        // -translate-y-1/2: 在向上平移自身高度的一半
        className='absolute inset-s-1.5 top-1/2 -translate-y-1/2'
        size={16}
      />
      {/* 文字占位符 */}
      <span className='ms-4'>{placeholder}</span>
      {/* kbd */}
      {/* pointer-events-none: 不接收鼠标事件，点击会穿透到下面按钮，不影响按钮触发 */}
      {/* absolute: 绝对定位到父容器 */}
      {/* inset-e-[0.3rem]: 贴近行内结束侧偏移 0.3rem(约4.8px) */}
      {/* top-[0.3rem]: 距顶部 0.3rem */}
      {/* hidden: 默认隐藏 */}
      {/* sm:flex items-center gap-1: sm 端点及以上显示为 flex，居中对齐，子项间距0.25rem */}
      {/* h-5: 高度 1.25rem */}
      {/* rounded border bg-muted: 圆角 + 边框 + muted 背景，形成键帽视觉 */}
      {/* px-1.5: 左右内边距 0.375rem */}
      {/* font-mono text-[10px] font-medium: 等宽字体，小字号，中等字重，贴近真实键盘键帽风格 */}
      {/* opacity-100: 完全不透明 */}
      {/* select-none: 文本不可选中，避免误选中影响体验 */}
      {/* group-hover:bg-accent: 父按钮 hover 时，键帽背景同步变为 */}
      <kbd className='pointer-events-none absolute inset-e-[0.3rem] top-[0.3rem] hidden h-5 items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 select-none group-hover:bg-accent sm:flex'>
        <span className='text-xs'>⌘</span>K
      </kbd>
    </Button>
  )
}
