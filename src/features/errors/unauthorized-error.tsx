import { useNavigate, useRouter } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'

/**
 * 提供 401 未授权的错误展示页
 */
export function UnauthorisedError() {
  // 导航到指定路径
  const navigate = useNavigate()
  // 回退到历史路径
  const { history } = useRouter()
  return (
    // 全高，提供全屏画布
    <div className='h-svh'>
      {/* 适合错误页、空状态页这种需要视觉聚焦点居中的场景 */}
      {/* m-auto: 外边距自动，在有可用空间时，可帮助容器在父级里居中 */}
      {/* h-full,w-full: 高度宽度100% */}
      {/* flex,flex-col: flex容器，主轴为纵向，元素从上到下排列 */}
      {/* items-center: 在纵向布局下，表示水平方向居中 */}
      {/* justify-center: 在纵向布局下，表示垂直方向居中 */}
      {/* gap-2: 子元素之间的间距，约为 0.5rem(8px) */}
      <div className='m-auto flex h-full w-full flex-col items-center justify-center gap-2'>
        {/* 大号 401 标题 */}
        {/* text-[7rem]: 字体 7rem，很大 */}
        {/* leading-tight: 较紧凑行高 */}
        {/* font-bold: 粗体 */}
        <h1 className='text-[7rem] leading-tight font-bold'>401</h1>
        {/* font-medium: 中级字体 */}
        <span className='font-medium'>Unauthorized Access</span>
        {/* 提供弱化的颜色 */}
        {/* text-center: 文本水平居中对齐 */}
        {/* text-muted-foreground: 使用主题里的弱化前景色的文字颜色 */}
        <p className='text-center text-muted-foreground'>
          Please log in with the appropriate credentials <br /> to access this
          resource.
        </p>
        {/* 让按钮横向布局，彼此有间距，并且整体与上方文本有明显分隔，视觉层次更清晰 */}
        {/* mt-6: 让这组按钮与上方说明文字拉开距离 */}
        {/* flex gap-4: flex 布局，按钮间间距为 1rem(16px) */}
        <div className='mt-6 flex gap-4'>
          {/* 回退到前一步历史 */}
          <Button variant='outline' onClick={() => history.go(-1)}>
            Go Back
          </Button>
          {/* 回到主页 */}
          <Button onClick={() => navigate({ to: '/' })}>Back to Home</Button>
        </div>
      </div>
    </div>
  )
}
