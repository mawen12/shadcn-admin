import { useEffect, useState } from 'react'
import { getRouteApi } from '@tanstack/react-router'
import {
  ColumnFiltersState,
  PaginationState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { cn } from '@/lib/utils'
import { useTableUrlState } from '@/hooks/use-table-url-state'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { DataTablePagination, DataTableToolbar } from '@/components/data-table'
import { priorities, statuses } from '../data/data'
import { type Task } from '../data/schema'
import { DataTableBulkActions } from './data-table-bulk-actions'
import { tasksColumns as columns } from './tasks-columns'

const route = getRouteApi('/_authenticated/tasks/')

type DataTableProps = {
  // 展示的表格数据
  data: Task[]
}

export function TasksTable({ data }: DataTableProps) {
  // Local UI-only states
  // 选择的行记录
  const [rowSelection, setRowSelection] = useState({})
  // 排序状态
  const [sorting, setSorting] = useState<SortingState>([])
  // 列可见性
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})

  // Local state management for table (uncomment to use local-only state, not synced with URL)
  // const [globalFilter, onGlobalFilterChange] = useState('')
  // const [columnFilters, onColumnFiltersChange] = useState<ColumnFiltersState>([])
  // const [pagination, onPaginationChange] = useState<PaginationState>({ pageIndex: 0, pageSize: 10 })

  // Synced with URL states (updated to match route search schema defaults)
  // 与 URL 状态同步的状态管理方案，对于相关状态的任何操作，都会修改URL，然后触发router变化
  // 分页信息：访问不同的页数，和每条条数，数据会展示在 URL 上
  // 查询：输入的查询条件，会实时同步到URL上
  const {
    globalFilter,
    onGlobalFilterChange,
    columnFilters,
    onColumnFiltersChange,
    pagination,
    onPaginationChange,
    ensurePageInRange,
  } = useTableUrlState({
    search: route.useSearch(),
    navigate: route.useNavigate(),
    pagination: { defaultPage: 1, defaultPageSize: 10 },
    globalFilter: { enabled: true, key: 'filter' },
    columnFilters: [
      { columnId: 'status', searchKey: 'status', type: 'array' },
      { columnId: 'priority', searchKey: 'priority', type: 'array' },
    ],
  })

  // 使用 tanstack table 构造
  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    // 定义的数据
    data,
    // 列定义
    columns,
    // 支持排序、列隐藏、行选择、列过滤、全局过滤、分页
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      globalFilter,
      pagination,
    },
    // 开启行选择
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    // 查询条件过滤
    globalFilterFn: (row, _columnId, filterValue) => {
      const id = String(row.getValue('id')).toLowerCase()
      const title = String(row.getValue('title')).toLowerCase()
      const searchValue = String(filterValue).toLowerCase()

      return id.includes(searchValue) || title.includes(searchValue)
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    onPaginationChange,
    onGlobalFilterChange,
    onColumnFiltersChange,
  })

  // 计算页总数
  const pageCount = table.getPageCount()
  useEffect(() => {
    ensurePageInRange(pageCount)
  }, [pageCount, ensurePageInRange])

  return (
    <div
      className={cn(
        // 当小于 sm 时，且内部存在 <div role="toolbar"> 时，底部外间距 64px
        'max-sm:has-[div[role="toolbar"]]:mb-16', // Add margin bottom to the table on mobile when the toolbar is visible
        // flex flex-col: flexbox 布局，主轴垂直
        // flex-1: 弹性增长，占满父容器剩余高度
        // gap-4: 子项间距 16px
        'flex flex-1 flex-col gap-4'
      )}
    >
      {/* 工具栏 */}
      <DataTableToolbar
        table={table}
        searchPlaceholder='Filter by title or ID...'
        // 可过滤的列
        filters={[
          // status 列
          {
            columnId: 'status',
            title: 'Status',
            options: statuses,
          },
          // priority 列
          {
            columnId: 'priority',
            title: 'Priority',
            options: priorities,
          },
        ]}
      />
      {/* 表格 */}
      {/* overflow-hidden: 内容超出时，隐藏超出的内容 */}
      {/* rounded-md: 圆角 */}
      {/* border: 边框 */}
      <div className='overflow-hidden rounded-md border'>
        {/* min-w-xl: 最大宽度 xl */}
        <Table className='min-w-xl'>
          {/* 表头 */}
          <TableHeader>
            {/* 读取 header */}
            {table.getHeaderGroups().map((headerGroup) => (
              // 行记录
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      colSpan={header.colSpan}
                      className={cn(
                        // 应用通用的样式
                        header.column.columnDef.meta?.className,
                        // 应用特定的样式
                        header.column.columnDef.meta?.thClassName
                      )}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          {/* 表体 */}
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                // 行记录
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {/* 仅展示未隐藏的列 */}
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className={cn(
                        // 应用通用的样式
                        cell.column.columnDef.meta?.className,
                        // 应用特定的样式
                        cell.column.columnDef.meta?.tdClassName
                      )}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              // 展示无结果
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  // h-24: 高度 96px
                  // text-center: 文本居中
                  className='h-24 text-center'
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {/* 分页 */}
      {/* mt-auto: 在弹性盒子布局中，此属性会将元素推到容器的底部，占据所有可用的上方空间，这是为了确保无论上方的Table内容高度是多少，分页都是被固定推到底部的 */}
      <DataTablePagination table={table} className='mt-auto' />
      {/* 批量操作 */}
      <DataTableBulkActions table={table} />
    </div>
  )
}
