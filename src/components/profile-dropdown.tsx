import { Link } from '@tanstack/react-router'
import useDialogState from '@/hooks/use-dialog-state'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { SignOutDialog } from '@/components/sign-out-dialog'

export function ProfileDropdown() {
  // 独立的 dialog 状态维护
  const [open, setOpen] = useDialogState()

  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          {/* relative: 设置为相对定位，方便内部绝对定位元素参考它定位 */}
          {/* h-8 w-8: 宽度高度保持一致 */}
          {/* rounded-full: 圆角拉满，形成完全圆形/胶囊形轮廓 */}
          <Button variant='ghost' className='relative h-8 w-8 rounded-full'>
            <Avatar className='h-8 w-8'>
              <AvatarImage src='/avatars/01.png' alt='@shadcn' />
              <AvatarFallback>SN</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        {/* forceMount: 即使菜单关闭，也保持内容节点挂载在 DOM 中，这是为了保留内部状态/焦点相关行为，避免每次打开都重新挂载带来的闪动或状态丢失，便于动画或与外部状态联动时更稳定 */}
        <DropdownMenuContent className='w-56' align='end' forceMount>
          <DropdownMenuLabel className='font-normal'>
            <div className='flex flex-col gap-1.5'>
              {/* leading-none: 行高设为1 */}
              <p className='text-sm leading-none font-medium'>satnaing</p>
              {/* leading-none: 行高设为1 */}
              {/* text-muted-foreground: 弱化前景色文字 */}
              <p className='text-xs leading-none text-muted-foreground'>
                satnaingdev@gmail.com
              </p>
            </div>
          </DropdownMenuLabel>
          {/* 分隔符 */}
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem asChild>
              <Link to='/settings'>
                Profile
                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to='/settings'>
                Billing
                <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to='/settings'>
                Settings
                <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>New Team</DropdownMenuItem>
          </DropdownMenuGroup>
          {/* 分隔符 */}
          <DropdownMenuSeparator />
          {/* 退出登录按钮，点击后，底部的 SignOutDialog 显示 */}
          <DropdownMenuItem variant='destructive' onClick={() => setOpen(true)}>
            Sign out
            <DropdownMenuShortcut className='text-current'>
              ⇧⌘Q
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* 退出按钮提示框 */}
      <SignOutDialog open={!!open} onOpenChange={setOpen} />
    </>
  )
}
