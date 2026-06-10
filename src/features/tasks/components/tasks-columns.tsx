import { type ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { DataTableColumnHeader } from '@/components/data-table'
import { labels, priorities, statuses } from '../data/data'
import { type Task } from '../data/schema'
import { DataTableRowActions } from './data-table-row-actions'

/**
 * 列定义
 */
export const tasksColumns: ColumnDef<Task>[] = [
  // 选择列
  {
    id: 'select',
    // header 部分的定义
    header: ({ table }) => (
      // 复选框
      <Checkbox
        checked={
          // 当前页的所有数据都已选中
          table.getIsAllPageRowsSelected() ||
          // 当前页的部分数据选中时，使用 indeterminate 状态
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        // 触发当前页所有记录选中/不选中
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
        className='translate-y-0.5'
      />
    ),
    // 数据列的定义
    cell: ({ row }) => (
      <Checkbox
        // 当前行数据被选中
        checked={row.getIsSelected()}
        // 触发当前行数据选中/不选中
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
        className='translate-y-0.5'
      />
    ),
    // 禁止排序
    enableSorting: false,
    // 禁止隐藏
    enableHiding: false,
  },
  // id 列
  {
    accessorKey: 'id',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Task' />
    ),
    // w-20: 宽度 80px
    cell: ({ row }) => <div className='w-20'>{row.getValue('id')}</div>,
    // 禁止排序
    enableSorting: false,
    // 禁止隐藏
    enableHiding: false,
  },
  // title 列
  {
    accessorKey: 'title',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Title' />
    ),
    meta: {
      // 应用与 thead 的 th + tbody 的 td
      // ps-1: 左侧内边距 4px
      // max-w-0 w-2/3: 最宽宽度 0，使用百分比，列占表格总宽的 2/3
      className: 'ps-1 max-w-0 w-2/3',
      // 仅应用于 tableCell 的 className
      // ps-4: 
      tdClassName: 'ps-4',
    },
    cell: ({ row }) => {
      // 匹配该行的 label
      const label = labels.find((label) => label.value === row.original.label)

      return (
        // flex: flexbox 布局
        // space-x-2: 子项 x 轴间距 8px
        <div className='flex space-x-2'>
          {/* 展示 label */}
          {label && <Badge variant='outline'>{label.label}</Badge>}
          {/* title */}
          {/* truncate: 长度超过便截断展示 */}
          <span className='truncate font-medium'>{row.getValue('title')}</span>
        </div>
      )
    },
  },
  // status 列
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Status' />
    ),
    meta: { className: 'ps-1', tdClassName: 'ps-4' },
    cell: ({ row }) => {
      const status = statuses.find(
        (status) => status.value === row.getValue('status')
      )

      if (!status) {
        return null
      }

      return (
        // flex items-center gap-2: flexbox 布局，垂直居中，子项间距 8px
        <div className='flex w-25 items-center gap-2'>
          {status.icon && (
            <status.icon className='size-4 text-muted-foreground' />
          )}
          <span>{status.label}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      // row.getValue(id) 读取该行的值
      // value.includes 判断是否在该行中
      return value.includes(row.getValue(id))
    },
  },
  // priority 列
  {
    accessorKey: 'priority',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Priority' />
    ),
    meta: { className: 'ps-1', tdClassName: 'ps-3' },
    cell: ({ row }) => {
      const priority = priorities.find(
        (priority) => priority.value === row.getValue('priority')
      )

      if (!priority) {
        return null
      }

      return (
        // flex items-center gap-2: flexbox 布局，垂直居中，子项间距 8px
        <div className='flex items-center gap-2'>
          {priority.icon && (
            <priority.icon className='size-4 text-muted-foreground' />
          )}
          <span>{priority.label}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  // actions 列
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]
