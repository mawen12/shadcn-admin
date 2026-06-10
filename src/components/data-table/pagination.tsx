import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from '@radix-ui/react-icons'
import { type Table } from '@tanstack/react-table'
import { cn, getPageNumbers } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

type DataTablePaginationProps<TData> = {
  table: Table<TData>
  className?: string
}

/**
 * 
 */
export function DataTablePagination<TData>({
  table,
  className,
}: DataTablePaginationProps<TData>) {
  // 当前第几页
  const currentPage = table.getState().pagination.pageIndex + 1
  // 总页数
  const totalPages = table.getPageCount()
  // 带有省略号的智能页码范围算法
  const pageNumbers = getPageNumbers(currentPage, totalPages)

  return (
    <div
      className={cn(
        // flex items-center justify-between: 弹性布局，垂直居中，首尾元素贴边，中间留空
        // overflow-clip: 超出容器内容被裁剪，且不允许程序滚动
        // px-2: 左右内边距 8px
        'flex items-center justify-between overflow-clip px-2',
        // @max-2xl/content:flex-col-reverse @max-2xl/content:gap-4: 容器查询响应式，但容器宽度 <= 2xl 时生效，作用域为 content 命名空间，此时垂直反向排列，子元素顺序颠倒，子元素之间间距为 16px
        '@max-2xl/content:flex-col-reverse @max-2xl/content:gap-4',
        className
      )}
      // 定义裁剪边距为 1px
      style={{ overflowClipMargin: 1 }}
    >
      {/* 第一部分：展示当前所在页，以及可选择的每页数量 */}
      <div className='flex w-full items-center justify-between'>
        {/* 每页记录数量 */}
        {/* flex items-center justify-center: 弹性布局，垂直居中，水平居中 */}
        {/* w-25: 宽度 100px */}
        {/* @2xl/content:hidden: 容器宽度 >= 2xl 时隐藏 */}
        <div className='flex w-25 items-center justify-center text-sm font-medium @2xl/content:hidden'>
          Page {currentPage} of {totalPages}
        </div>
        {/* flex items-center gap-2: 弹性布局，垂直居中，子项间隔 8px */}
        {/* @max-2xl/content:flex-row-reverse: 容器宽度 <= 2xl 时生效，水平方向颠倒 */}
        <div className='flex items-center gap-2 @max-2xl/content:flex-row-reverse'>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value))
            }}
          >
            <SelectTrigger className='h-8 w-17.5'>
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side='top'>
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {/*  */}
          <p className='hidden text-sm font-medium sm:block'>Rows per page</p>
        </div>
      </div>

      {/*  */}
      <div className='flex items-center sm:space-x-6 lg:space-x-8'>
        <div className='flex w-25 items-center justify-center text-sm font-medium @max-3xl/content:hidden'>
          Page {currentPage} of {totalPages}
        </div>
        <div className='flex items-center space-x-2'>
          <Button
            variant='outline'
            className='size-8 p-0 @max-md/content:hidden'
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <span className='sr-only'>Go to first page</span>
            <DoubleArrowLeftIcon className='h-4 w-4' />
          </Button>
          <Button
            variant='outline'
            className='size-8 p-0'
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className='sr-only'>Go to previous page</span>
            <ChevronLeftIcon className='h-4 w-4' />
          </Button>

          {/* Page number buttons */}
          {pageNumbers.map((pageNumber, index) => (
            <div key={`${pageNumber}-${index}`} className='flex items-center'>
              {pageNumber === '...' ? (
                <span className='px-1 text-sm text-muted-foreground'>...</span>
              ) : (
                <Button
                  variant={currentPage === pageNumber ? 'default' : 'outline'}
                  className='h-8 min-w-8 px-2'
                  onClick={() => table.setPageIndex((pageNumber as number) - 1)}
                >
                  <span className='sr-only'>Go to page {pageNumber}</span>
                  {pageNumber}
                </Button>
              )}
            </div>
          ))}

          <Button
            variant='outline'
            className='size-8 p-0'
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className='sr-only'>Go to next page</span>
            <ChevronRightIcon className='h-4 w-4' />
          </Button>
          <Button
            variant='outline'
            className='size-8 p-0 @max-md/content:hidden'
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <span className='sr-only'>Go to last page</span>
            <DoubleArrowRightIcon className='h-4 w-4' />
          </Button>
        </div>
      </div>
    </div>
  )
}
