import { cn } from '@/lib/utils'

type MainProps = React.HTMLAttributes<HTMLElement> & {
  // 是否为 fixed，控制主容器是否可伸展、可控溢出的固定布局模式
  fixed?: boolean
  // 是否为 fluid，控制内容宽度是否受最大宽度约束
  fluid?: boolean
  ref?: React.Ref<HTMLElement>
}

export function Main({ fixed, className, fluid, ...props }: MainProps) {
  return (
    <main
      data-layout={fixed ? 'fixed' : 'auto'}
      className={cn(
        // 基础样式
        // px-4: 水平 1rem
        // py-6: 垂直 1.5rem
        'px-4 py-6',

        // If layout is fixed, make the main container flex and grow
        // 仅在 fixed 时生效
        // flex flex-col: 主容器变为纵向 flex 布局
        // grow: 在父 flex 场景中可占满剩余空间 
        // overflow-hidden: 超出内容不外溢（常配合内部滚动区）
        fixed && 'flex grow flex-col overflow-hidden',

        // If layout is not fluid, set the max-width
        // 仅在非 fluid 时生效，非流式布局时，内容不要无限拉宽，保持阅读宽度
        !fluid &&
        // @7xl/content:mx-auto: 在这个容器查询条件下居中 
        // @7xl/content:w-full: 宽度拉满 
        // @7xl/content:max-w-7xl: 最大宽度限制为 max-w-7xl
        '@7xl/content:mx-auto @7xl/content:w-full @7xl/content:max-w-7xl',
        className
      )}
      {...props}
    />
  )
}
