import { useState, useEffect, useRef } from 'react'
import { type Table } from '@tanstack/react-table'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'

type DataTableBulkActionsProps<TData> = {
  table: Table<TData>
  entityName: string
  children: React.ReactNode
}

/**
 * 通用的批量操作，当选择表中的行记录时
 * 
 * A modular toolbar for displaying bulk actions when table rows are selected.
 *
 * @template TData The type of data in the table.
 * @param {object} props The component props.
 * @param {Table<TData>} props.table The react-table instance.
 * @param {string} props.entityName The name of the entity being acted upon (e.g., "task", "user").
 * @param {React.ReactNode} props.children The action buttons to be rendered inside the toolbar.
 * @returns {React.ReactNode | null} The rendered component or null if no rows are selected.
 */
export function DataTableBulkActions<TData>({
  table,
  entityName,
  children,
}: DataTableBulkActionsProps<TData>): React.ReactNode | null {
  // 选择的行记录
  const selectedRows = table.getFilteredSelectedRowModel().rows
  // 选择总数
  const selectedCount = selectedRows.length
  const toolbarRef = useRef<HTMLDivElement>(null)
  const [announcement, setAnnouncement] = useState('')

  // Announce selection changes to screen readers
  // 向屏幕阅读器用户展示内容
  useEffect(() => {
    if (selectedCount > 0) {
      const message = `${selectedCount} ${entityName}${selectedCount > 1 ? 's' : ''} selected. Bulk actions toolbar is available.`

      // Use queueMicrotask to defer state update and avoid cascading renders
      queueMicrotask(() => {
        setAnnouncement(message)
      })

      // Clear announcement after a delay
      const timer = setTimeout(() => setAnnouncement(''), 3000)
      return () => clearTimeout(timer)
    }
  }, [selectedCount, entityName])

  // 清空选择的行记录
  const handleClearSelection = () => {
    table.resetRowSelection()
  }

  // 处理按键
  const handleKeyDown = (event: React.KeyboardEvent) => {
    // 读取 toolbar 下的所有按钮
    const buttons = toolbarRef.current?.querySelectorAll('button')
    if (!buttons) return

    // 遍历找到当前焦点在按钮列表中的位置
    const currentIndex = Array.from(buttons).findIndex(
      // document.activeElement 当前文档中获得焦点的 DOM 元素
      (button) => button === document.activeElement
    )

    switch (event.key) {
      case 'ArrowRight': { // currentIndex + 1，使用循环取模确保在范围内
        event.preventDefault()
        const nextIndex = (currentIndex + 1) % buttons.length
        buttons[nextIndex]?.focus()
        break
      }
      case 'ArrowLeft': { // currentIndex - 1，首尾循环
        event.preventDefault()
        const prevIndex =
          currentIndex === 0 ? buttons.length - 1 : currentIndex - 1
        buttons[prevIndex]?.focus()
        break
      }
      case 'Home': // 第一个按钮
        event.preventDefault()
        buttons[0]?.focus()
        break
      case 'End': // 最后一个按钮
        event.preventDefault()
        buttons[buttons.length - 1]?.focus()
        break
      case 'Escape': { // 
        // Check if the Escape key came from a dropdown trigger or content
        // We can't check dropdown state because Radix UI closes it before our handler runs
        const target = event.target as HTMLElement
        const activeElement = document.activeElement as HTMLElement

        // Check if the event target or currently focused element is a dropdown trigger
        // 判断当前已经触发了 Dropdown
        const isFromDropdownTrigger =
          target?.getAttribute('data-slot') === 'dropdown-menu-trigger' ||
          activeElement?.getAttribute('data-slot') === 'dropdown-menu-trigger' ||
          target?.closest('[data-slot="dropdown-menu-trigger"]') ||
          activeElement?.closest('[data-slot="dropdown-menu-trigger"]')

        // Check if the focused element is inside dropdown content (which is portaled)
        // 判断当前是否位于 dropdown 内容区中
        const isFromDropdownContent =
          activeElement?.closest('[data-slot="dropdown-menu-content"]') ||
          target?.closest('[data-slot="dropdown-menu-content"]')

        // 如果是的话，则结束此处，然后有 dropdown 进行处理
        if (isFromDropdownTrigger || isFromDropdownContent) {
          // Escape was meant for the dropdown - don't clear selection
          return
        }

        // Escape was meant for the toolbar - clear selection
        event.preventDefault()
        // 清除选择的
        handleClearSelection()
        break
      }
    }
  }

  // 选择的记录数为0，不展示内容
  if (selectedCount === 0) {
    return null
  }

  return (
    <>
      {/* Live region for screen reader announcements */}
      <div
        aria-live='polite'
        aria-atomic='true'
        className='sr-only'
        role='status'
      >
        {announcement}
      </div>

      <div
        ref={toolbarRef}
        role='toolbar'
        aria-label={`Bulk actions for ${selectedCount} selected ${entityName}${selectedCount > 1 ? 's' : ''}`}
        aria-describedby='bulk-actions-description'
        tabIndex={-1}
        onKeyDown={handleKeyDown}
        className={cn(
          // 确保工具栏浮在页面底部正中央
          // fixed: 固定位置，相对于视口，不随页面滚动
          // bottom-6: 距离视口底部 24px
          // left-1/2: 水平居中起点
          // -translate-x-1/2: 向左偏移自身宽度 50%，与 left-1/2 配合实现完美水平居中
          // z-50: 层叠优先级，确保浮在其他内容之上
          // rounded-xl: 大圆角 12px
          'fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-xl',
          // transition-all: 所有属性变化都参与过渡动画
          // delay-100: 延迟 100ms 后开始动画
          // duration-300: 动画持续 300ms
          // ease-out: 缓出，开始快，结束慢，自然停下
          // hover:scale-105: 鼠标悬停时放大 5%
          'transition-all delay-100 duration-300 ease-out hover:scale-105',
          // focus-visible 确保使用键盘的导航到元素时生效，点击鼠标不会触发
          // focus-visible:ring-2: 键盘聚焦显示 2px 的 outline 环
          // focus-visible:ring-ring/50: 环的颜色为主色 ring 的 50% 的透明度
          // focus-visible:outline-none: 移除浏览器默认的 outline
          'focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none'
        )}
      >
        <div
          className={cn(
            // p-2: 内边距 8px
            // shadow-xl: 大阴影 
            'p-2 shadow-xl',
            // rounded-xl: 大圆角
            // border: 1px 实线边框
            'rounded-xl border',
            // 毛玻璃效果
            // bg-background/95: 95% 不透明度  
            // backdrop-blur-lg: 背景模糊 16px
            // supports-backdrop-filter:bg-background/60: 渐进增强，仅浏览器支持backdrop-filter时降低不透明度到60%
            'bg-background/95 backdrop-blur-lg supports-backdrop-filter:bg-background/60',
            // 弹性盒子布局，垂直居中，子项水平间距 8px
            'flex items-center gap-x-2'
          )}
        >
          {/* 清除选项按钮 */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant='outline'
                size='icon'
                onClick={handleClearSelection}
                className='size-6 rounded-full'
                aria-label='Clear selection'
                title='Clear selection (Escape)'
              >
                <X />
                <span className='sr-only'>Clear selection</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Clear selection (Escape)</p>
            </TooltipContent>
          </Tooltip>

          {/* 分隔线 */}
          <Separator
            className='h-5'
            orientation='vertical'
            aria-hidden='true'
          />

          {/* 展示选择的记录数 */}
          <div
            className='flex items-center gap-x-1 text-sm'
            id='bulk-actions-description'
          >
            {/* 徽标展示数量 */}
            <Badge
              variant='default'
              className='min-w-8 rounded-lg'
              aria-label={`${selectedCount} selected`}
            >
              {selectedCount}
            </Badge>{' '}
            {/* 选择的对象名称 */}
            <span className='hidden sm:inline'>
              {entityName}
              {selectedCount > 1 ? 's' : ''}
            </span>{' '}
            selected
          </div>

          {/* 分隔线 */}
          <Separator
            className='h-5'
            orientation='vertical'
            aria-hidden='true'
          />

          {/* 支持的批量操作 */}
          {children}
        </div>
      </div>
    </>
  )
}
