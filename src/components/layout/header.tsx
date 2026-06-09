import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { Separator } from '@/components/ui/separator'
import { SidebarTrigger } from '@/components/ui/sidebar'

type HeaderProps = React.HTMLAttributes<HTMLElement> & {
  fixed?: boolean
  ref?: React.Ref<HTMLElement>
}

export function Header({ className, fixed, children, ...props }: HeaderProps) {
  // 保存页面垂直滚动值（顶部偏移）
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      // 实时读取页面滚动距离并写入状态
      setOffset(document.body.scrollTop || document.documentElement.scrollTop)
    }

    // Add scroll listener to the body
    // 注册 scroll 事件
    document.addEventListener('scroll', onScroll, { passive: true })

    // Clean up the event listener on unmount
    // 
    return () => document.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        // z-50: 层级高，避免被内容盖住
        // h-16: 高度4rem(64px)  
        'z-50 h-16',
        // 仅在固定时才添加以下属性
        //    header-fixed: 
        //    peer/header: 给同级或后续元素做基于 peer 的样式联动
        //    sticky, top-0: 固定顶部，即吸顶
        //    w-[inherit]: 集成父级宽度
        fixed && 'header-fixed peer/header sticky top-0 w-[inherit]',
        // 当页面下滚超过 10px，且是固定头部时，加阴影
        offset > 10 && fixed ? 'shadow' : 'shadow-none',
        className
      )}
      {...props}
    >
      <div
        className={cn(
          // relative: 给伪元素提供定位参照
          // flex,items-center,gap-3: flex布局，横向布局，垂直居中，子项间距
          // h-full: 占满父容器高度
          // p-4: 内边距为 4
          // sm:gap-4: 小屏子项间距稍大
          'relative flex h-full items-center gap-3 p-4 sm:gap-4',
          // 当页面下滚超过 10px，且是固定头部时，生效
          offset > 10 &&
          fixed &&
          // 视觉效果：未滚动时，只是普通透明 header 内容层，滚动超过阈值且 fixed；
          // after:absolute: 创建 ::after 伪元素并绝对定位
          // after:inset-0: 伪元素铺满整个容器
          // after:-z-10: 放到内容层后面，不遮挡按钮和文字，此处相对于 header 的 z-50
          // after:bg-background/20: 使用主题背景色的 20% 透明度
          // after:backdrop-blur-lg: 对伪元素背后的内容做较强模糊（毛玻璃感）
          'after:absolute after:inset-0 after:-z-10 after:bg-background/20 after:backdrop-blur-lg'
        )}
      >
        {/* max-md:scale-125：表示在 md 及以下屏幕宽度时生效，将元素放大到原来的 125% */}
        <SidebarTrigger variant='outline' className='max-md:scale-125' />
        {/* 竖向分隔符，高度为 6 */}
        <Separator orientation='vertical' className='h-6' />
        {/* 不同页面上展示的内容不同 */}
        {children}
      </div>
    </header>
  )
}
