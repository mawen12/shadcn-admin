import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { type Row } from '@tanstack/react-table'
import { Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { labels } from '../data/data'
import { taskSchema } from '../data/schema'
import { useTasks } from './tasks-provider'

type DataTableRowActionsProps<TData> = {
  row: Row<TData>
}

/**
 * 通用的行操作
 */
export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  // 解析 task 对象
  const task = taskSchema.parse(row.original)

  const { setOpen, setCurrentRow } = useTasks()

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>

        <Button
          variant='ghost'
          // flex: flexbox 布局 
          // h-8 w-8: 32*32px 
          // p-0: 无边框
          // data-[state=open]:bg-muted: 当 dropdown 点开时，背景色切换为 muted
          className='flex h-8 w-8 p-0 data-[state=open]:bg-muted'
        >
          <DotsHorizontalIcon className='h-4 w-4' />
          <span className='sr-only'>Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      {/* 宽度固定 160px */}
      <DropdownMenuContent align='end' className='w-40'>
        {/* Edit */}
        <DropdownMenuItem
          onClick={() => {
            setCurrentRow(task)
            setOpen('update')
          }}
        >
          Edit
        </DropdownMenuItem>
        {/* Copy */}
        <DropdownMenuItem disabled>Make a copy</DropdownMenuItem>
        {/* Favorite */}
        <DropdownMenuItem disabled>Favorite</DropdownMenuItem>
        {/* 分隔符 */}
        <DropdownMenuSeparator />
        {/* 二级子目录 */}
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Labels</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            {/* Labels 选项卡 */}
            <DropdownMenuRadioGroup value={task.label}>
              {labels.map((label) => (
                <DropdownMenuRadioItem key={label.value} value={label.value}>
                  {label.label}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        {/* 分隔符 */}
        <DropdownMenuSeparator />
        {/* 删除 */}
        <DropdownMenuItem
          // TODO by mawen 此处应该使用 variant="destructive"，以做区分
          onClick={() => {
            setCurrentRow(task)
            setOpen('delete')
          }}
        >
          Delete
          <DropdownMenuShortcut>
            <Trash2 size={16} />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
