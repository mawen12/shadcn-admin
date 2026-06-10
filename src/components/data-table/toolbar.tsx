import { Cross2Icon } from '@radix-ui/react-icons'
import { type Table } from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { DataTableFacetedFilter } from './faceted-filter'
import { DataTableViewOptions } from './view-options'

type DataTableToolbarProps<TData> = {
  // tanstack 表格对象
  table: Table<TData>
  // 搜索框占位
  searchPlaceholder?: string
  // 搜索键
  searchKey?: string
  // 过滤
  filters?: {
    columnId: string
    title: string
    options: {
      label: string
      value: string
      icon?: React.ComponentType<{ className?: string }>
    }[]
  }[]
}

export function DataTableToolbar<TData>({
  table,
  searchPlaceholder = 'Filter...',
  searchKey,
  filters = [],
}: DataTableToolbarProps<TData>) {
  // 是否选择了过滤，search或者是列过滤都算
  const isFiltered =
    table.getState().columnFilters.length > 0 || table.getState().globalFilter

  return (
    // flex items-center justify-between: flexbox 布局，垂直居中，内容分两侧
    <div className='flex items-center justify-between'>
      {/* 左侧 */}
      {/* flex gap-y-2: flexbox 布局，y 轴间隔 8px */}
      {/* items-start sm:items-center: 顶部对齐，sm 及以上时，改为垂直居中 */}
      {/* flex-col-reverse sm:flex-row: 纵向排列，子元素顺序反转，sm 及以上时，改为横向排列 */}
      {/* sm:space-x-2: sm 及以上时，x 轴间距 8px */}
      <div className='flex flex-1 flex-col-reverse items-start gap-y-2 sm:flex-row sm:items-center sm:space-x-2'>
        {/* 如果指定了 search key，则从对应字段上取值，否则使用全局过滤 */}
        {searchKey ? (
          <Input
            placeholder={searchPlaceholder}
            value={
              (table.getColumn(searchKey)?.getFilterValue() as string) ?? ''
            }
            onChange={(event) =>
              table.getColumn(searchKey)?.setFilterValue(event.target.value)
            }
            // h-8: 高度 32px 
            // w-37.5: 宽度150px 
            // lg:w-62.5: lg 及以上时，宽度为 250px
            className='h-8 w-37.5 lg:w-62.5'
          />
        ) : (
          <Input
            placeholder={searchPlaceholder}
            value={table.getState().globalFilter ?? ''}
            onChange={(event) => table.setGlobalFilter(event.target.value)}
            // h-8: 高度 32px 
            // w-37.5: 宽度150px 
            // lg:w-62.5: lg 及以上时，宽度为 250px
            className='h-8 w-37.5 lg:w-62.5'
          />
        )}

        <div className='flex gap-x-2'>
          {/* 展示可过滤的列 */}
          {filters.map((filter) => {
            const column = table.getColumn(filter.columnId)
            if (!column) return null
            return (
              <DataTableFacetedFilter
                key={filter.columnId}
                column={column}
                title={filter.title}
                options={filter.options}
              />
            )
          })}
        </div>
        {/* 如果有了过滤，便会在之后展示 Reset 按钮 */}
        {isFiltered && (
          <Button
            variant='ghost'
            onClick={() => {
              // 清除列过滤
              table.resetColumnFilters()
              // 清除查询关键字
              table.setGlobalFilter('')
            }}
            // h-8: 高度 32px 
            // px-2 lg:px-3: x轴内边距 16px，lg 及以上展开到 24px
            className='h-8 px-2 lg:px-3'
          >
            Reset
            {/* 关闭按钮 */}
            <Cross2Icon className='ms-2 h-4 w-4' />
          </Button>
        )}
      </div>
      {/* 右侧 View */}
      <DataTableViewOptions table={table} />
    </div>
  )
}
