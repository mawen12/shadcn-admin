import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import { MixerHorizontalIcon } from '@radix-ui/react-icons'
import { type Table } from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'

type DataTableViewOptionsProps<TData> = {
  table: Table<TData>
}

/**
 * 操作列可见性的按钮
 */
export function DataTableViewOptions<TData>({
  table,
}: DataTableViewOptionsProps<TData>) {
  return (
    // TODO by mawen 此处可以考虑换成 Popover，因为用户可能需要同时进行多次操作
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        {/* view 操作按钮 */}
        <Button
          variant='outline'
          size='sm'
          // ms-auto: 在内联起始方向上设置自动外边距，效果是将右箭头图标推到容器的最右侧
          // hidden lg:flex: 默认隐藏，lg 及其以上使用 flexbox 布局
          // h-8: 高度 32px 
          className='ms-auto hidden h-8 lg:flex'
        >
          {/* size-4: 高度 16px，占据 button 整体高度的一般 */}
          <MixerHorizontalIcon className='size-4' />
          View
        </Button>
      </DropdownMenuTrigger>
      {/* 宽度 150px */}
      <DropdownMenuContent align='end' className='w-37.5'>
        <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
        {/* 分隔符 */}
        <DropdownMenuSeparator />

        {table
          // 读取所有列
          .getAllColumns()
          // 过滤出可以 hide 的列
          .filter(
            (column) =>
              typeof column.accessorFn !== 'undefined' && column.getCanHide()
          )
          .map((column) => {
            return (
              // 
              <DropdownMenuCheckboxItem
                key={column.id}
                className='capitalize'
                // 如果列可见，则展示勾选框
                checked={column.getIsVisible()}
                // 修改列可见性
                onCheckedChange={(value) => column.toggleVisibility(!!value)}
              >
                {column.id}
              </DropdownMenuCheckboxItem>
            )
          })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
