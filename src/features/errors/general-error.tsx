import { useNavigate, useRouter } from '@tanstack/react-router'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

type GeneralErrorProps = React.HTMLAttributes<HTMLDivElement> & {
  // 是否最小化
  minimal?: boolean
}

/**
 * 提供通用的 500 错误页展示页
 * 适配小屏场景，小屏时，不展示 500 标题和操作按钮，仅展示错误内容
 */
export function GeneralError({
  className,
  minimal = false,
}: GeneralErrorProps) {
  // 导航到指定路径
  const navigate = useNavigate()
  // 回退到历史路径
  const { history } = useRouter()

  return (
    // 提供全屏画布
    // h-svh: 占满小视口高度，相比传统 100vh 更稳定，不容易出现内容被遮挡或抖动
    // w-full: 占满父容器宽度
    <div className={cn('h-svh w-full', className)}>
      {/* 适合错误页、空状态页这种需要视觉聚焦点居中的场景 */}
      {/* m-auto: 外边距自动，在有可用空间时，可帮助容器在父级里居中 */}
      {/* h-full,w-full: 高度宽度100% */}
      {/* flex,flex-col: flex容器，主轴为纵向，元素从上到下排列 */}
      {/* items-center: 在纵向布局下，表示水平方向居中 */}
      {/* justify-center: 在纵向布局下，表示垂直方向居中 */}
      {/* gap-2: 子元素之间的间距，约为 0.5rem(8px) */}
      <div className='m-auto flex h-full w-full flex-col items-center justify-center gap-2'>
        {/* 当 minimal = false 时，显示；当 minimal = true 时，不显示 */}
        {!minimal && (
          // 大号 500 标题
          // text-[7rem]: 字体 7rem，很大
          // leading-tight: 较紧凑行高
          // font-bold: 粗体
          <h1 className='text-[7rem] leading-tight font-bold'>500</h1>
        )}
        {/* font-medium: 中级字体 */}
        <span className='font-medium'>Oops! Something went wrong {`:')`}</span>
        {/* 提供弱化的颜色 */}
        {/* text-center: 文本水平居中对齐 */}
        {/* text-muted-foreground: 使用主题里的弱化前景色的文字颜色 */}
        <p className='text-center text-muted-foreground'>
          We apologize for the inconvenience. <br /> Please try again later.
        </p>

        {/* 当 minimal = false 时，显示；当 minimal = true 时，不显示 */}
        {!minimal && (
          // 让按钮横向布局，彼此有间距，并且整体与上方文本有明显分隔，视觉层次更清晰
          // mt-6: 让这组按钮与上方说明文字拉开距离
          // flex gap-4: flex 布局，按钮间间距为 1rem(16px)
          <div className='mt-6 flex gap-4'>
            {/* 回退到前一步历史 */}
            <Button variant='outline' onClick={() => history.go(-1)}>
              Go Back
            </Button>
            {/* 回到主页 */}
            <Button onClick={() => navigate({ to: '/' })}>Back to Home</Button>
          </div>
        )}
      </div>
    </div>
  )
}
