import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export function RecentSales() {
  return (
    // space-y-8: 子项之间竖向间距 2rem(32px)，提供视觉呼吸感
    <div className='space-y-8'>
      {/* flex items-center: 横向排列，垂直居中对齐 */}
      {/* gap-4: 子项间距1rem */}
      <div className='flex items-center gap-4'>
        {/* 左侧头像 */}
        <Avatar className='h-9 w-9'>
          <AvatarImage src='/avatars/01.png' alt='Avatar' />
          <AvatarFallback>OM</AvatarFallback>
        </Avatar>
        {/* 用户信息区 + 金额区 */}
        {/* flex-1: 撑满剩余空间，让金额靠右 */}
        {/* flex items-center: flex 布局，垂直居中  */}
        {/* flex-wrap: 空间不足时换行，防止溢出 */}
        {/* justify-between: 两端分布，姓名邮箱在左，金额在右 */}
        <div className='flex flex-1 flex-wrap items-center justify-between'>
          {/* 用户信息区位于左侧 */}
          <div className='space-y-1'>
            <p className='text-sm leading-none font-medium'>Olivia Martin</p>
            <p className='text-sm text-muted-foreground'>
              olivia.martin@email.com
            </p>
          </div>
          {/* 金额区位于右侧 */}
          <div className='font-medium'>+$1,999.00</div>
        </div>
      </div>

      {/* flex items-center: 横向排列，垂直居中对齐 */}
      {/* gap-4: 子项间距1rem */}
      <div className='flex items-center gap-4'>
        // TODO by mawen 此处可以仅保留 h-9 w-9
        <Avatar className='flex h-9 w-9 items-center justify-center space-y-0 border'>
          <AvatarImage src='/avatars/02.png' alt='Avatar' />
          <AvatarFallback>JL</AvatarFallback>
        </Avatar>
        {/* 用户信息区 + 金额区 */}
        {/* flex-1: 撑满剩余空间，让金额靠右 */}
        {/* flex items-center: flex 布局，垂直居中  */}
        {/* flex-wrap: 空间不足时换行，防止溢出 */}
        {/* justify-between: 两端分布，姓名邮箱在左，金额在右 */}
        <div className='flex flex-1 flex-wrap items-center justify-between'>
          <div className='space-y-1'>
            <p className='text-sm leading-none font-medium'>Jackson Lee</p>
            <p className='text-sm text-muted-foreground'>
              jackson.lee@email.com
            </p>
          </div>
          <div className='font-medium'>+$39.00</div>
        </div>
      </div>
      {/* flex items-center: 横向排列，垂直居中对齐 */}
      {/* gap-4: 子项间距1rem */}
      <div className='flex items-center gap-4'>
        <Avatar className='h-9 w-9'>
          <AvatarImage src='/avatars/03.png' alt='Avatar' />
          <AvatarFallback>IN</AvatarFallback>
        </Avatar>
        {/* 用户信息区 + 金额区 */}
        {/* flex-1: 撑满剩余空间，让金额靠右 */}
        {/* flex items-center: flex 布局，垂直居中  */}
        {/* flex-wrap: 空间不足时换行，防止溢出 */}
        {/* justify-between: 两端分布，姓名邮箱在左，金额在右 */}
        <div className='flex flex-1 flex-wrap items-center justify-between'>
          <div className='space-y-1'>
            <p className='text-sm leading-none font-medium'>Isabella Nguyen</p>
            <p className='text-sm text-muted-foreground'>
              isabella.nguyen@email.com
            </p>
          </div>
          <div className='font-medium'>+$299.00</div>
        </div>
      </div>

      {/* flex items-center: 横向排列，垂直居中对齐 */}
      {/* gap-4: 子项间距1rem */}
      <div className='flex items-center gap-4'>
        <Avatar className='h-9 w-9'>
          <AvatarImage src='/avatars/04.png' alt='Avatar' />
          <AvatarFallback>WK</AvatarFallback>
        </Avatar>
        {/* 用户信息区 + 金额区 */}
        {/* flex-1: 撑满剩余空间，让金额靠右 */}
        {/* flex items-center: flex 布局，垂直居中  */}
        {/* flex-wrap: 空间不足时换行，防止溢出 */}
        {/* justify-between: 两端分布，姓名邮箱在左，金额在右 */}
        <div className='flex flex-1 flex-wrap items-center justify-between'>
          <div className='space-y-1'>
            <p className='text-sm leading-none font-medium'>William Kim</p>
            <p className='text-sm text-muted-foreground'>will@email.com</p>
          </div>
          <div className='font-medium'>+$99.00</div>
        </div>
      </div>

      {/* flex items-center: 横向排列，垂直居中对齐 */}
      {/* gap-4: 子项间距1rem */}
      <div className='flex items-center gap-4'>
        <Avatar className='h-9 w-9'>
          <AvatarImage src='/avatars/05.png' alt='Avatar' />
          <AvatarFallback>SD</AvatarFallback>
        </Avatar>
        {/* 用户信息区 + 金额区 */}
        {/* flex-1: 撑满剩余空间，让金额靠右 */}
        {/* flex items-center: flex 布局，垂直居中  */}
        {/* flex-wrap: 空间不足时换行，防止溢出 */}
        {/* justify-between: 两端分布，姓名邮箱在左，金额在右 */}
        <div className='flex flex-1 flex-wrap items-center justify-between'>
          <div className='space-y-1'>
            <p className='text-sm leading-none font-medium'>Sofia Davis</p>
            <p className='text-sm text-muted-foreground'>
              sofia.davis@email.com
            </p>
          </div>
          <div className='font-medium'>+$39.00</div>
        </div>
      </div>
    </div>
  )
}
