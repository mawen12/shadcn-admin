import * as React from 'react'
import { CheckIcon, PlusCircledIcon } from '@radix-ui/react-icons'
import { type Column } from '@tanstack/react-table'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'

type DataTableFacetedFilterProps<TData, TValue> = {
  // 列信息
  column?: Column<TData, TValue>
  // 标题
  title?: string
  // 列可选值
  options: {
    label: string
    value: string
    icon?: React.ComponentType<{ className?: string }>
  }[]
}

/**
 * 通过数据表单列的过滤
 * 基于提供的列和名称，提供多选、单选、取消选择的操作
 */
export function DataTableFacetedFilter<TData, TValue>({
  column,
  title,
  options,
}: DataTableFacetedFilterProps<TData, TValue>) {
  // 从列中提取唯一值
  const facets = column?.getFacetedUniqueValues()
  // 选中的值
  const selectedValues = new Set(column?.getFilterValue() as string[])

  return (
    // 使用 Popover，因此此处存在同时选择多个选项的可能
    // 如果换成 Dropdown，那么操作完一个之后就会默认关闭
    <Popover>
      <PopoverTrigger asChild>
        {/* h-8: 高度32px */}
        {/* border-dashed: 虚线边框 */}
        <Button variant='outline' size='sm' className='h-8 border-dashed'>
          {/* icon */}
          <PlusCircledIcon className='size-4' />
          {/* 标题 */}
          {title}
          {/* 选择已选择的值，适配 lg 以内和以上的展示方式，同时对于 lg 以上时，超过了 */}
          {selectedValues?.size > 0 && (
            <>
              {/* 分隔线 */}
              <Separator orientation='vertical' className='mx-2 h-4' />
              {/* 标记，显示选择的数量 */}
              <Badge
                variant='secondary'
                // rounded-sm: 小圆角
                // px-1: 元素内边距 4px
                // font-normal: 正常字体
                // lg:hidden:  lg 及以上隐藏，大屏空间充足，直接展示已选的标签文本；小屏空间有限，只显示选中的数量
                className='rounded-sm px-1 font-normal lg:hidden'
              >
                {selectedValues.size}
              </Badge>
              {/* hidden: 默认隐藏 */}
              {/* space-x-1: 子项 x 轴间距 4px */}
              {/* lg:flex: lg 及以上使用 flexbox 布局，展示出来 */}
              <div className='hidden space-x-1 lg:flex'>
                {/* 当选择数量超过 2 个时，仅展示数量 */}
                {selectedValues.size > 2 ? (
                  <Badge
                    variant='secondary'
                    // rounded-sm: 小圆角
                    // px-1: 元素内边距 4px
                    // font-normal: 正常字体
                    className='rounded-sm px-1 font-normal'
                  >
                    {selectedValues.size} selected
                  </Badge>
                ) : (
                  // 2个及以内时，展示标签名称
                  options
                    .filter((option) => selectedValues.has(option.value))
                    .map((option) => (
                      <Badge
                        variant='secondary'
                        key={option.value}
                        // rounded-sm: 小圆角
                        // px-1: 元素内边距 4px
                        // font-normal: 正常字体
                        className='rounded-sm px-1 font-normal'
                      >
                        {option.label}
                      </Badge>
                    ))
                )}
              </div>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-50 p-0' align='start'>
        {/* 使用 command 是为了带有搜索过滤功能 */}
        <Command>
          {/* 搜索过滤 */}
          <CommandInput placeholder={title} />
          {/* 选项列表 */}
          <CommandList>
            {/* 没有匹配结果时展示的内容 */}
            <CommandEmpty>No results found.</CommandEmpty>
            {/* 支持按分组展示，此处无需分组，仅有一个即可 */}
            <CommandGroup>
              {/* 展示选项 */}
              {options.map((option) => {
                // 判断是否勾选
                const isSelected = selectedValues.has(option.value)
                return (
                  <CommandItem
                    key={option.value}
                    onSelect={() => {
                      // 对于已勾选的值，操作表示为取消勾选
                      if (isSelected) {
                        selectedValues.delete(option.value)
                      } else { // 对于未勾选的值，操作表示为勾选
                        selectedValues.add(option.value)
                      }
                      // 将所有选择的值从 Set 转换为 Array
                      const filterValues = Array.from(selectedValues)
                      // 将过滤条件立即应用
                      column?.setFilterValue(
                        filterValues.length ? filterValues : undefined
                      )
                    }}
                  >
                    {/* 将图标模拟为勾选选项 */}
                    <div
                      className={cn(
                        // flex items-center justify-center: flexbox 布局，垂直居中，水平居中 
                        // size-4: icon 大小为 16px 
                        // rounded-sm: 小圆角 
                        // border border-primary: 主色的边框
                        'flex size-4 items-center justify-center rounded-sm border border-primary',
                        isSelected
                          // bg-primary text-primary-foreground：勾选状态，文本颜色主色
                          ? 'bg-primary text-primary-foreground'
                          // opacity-50: 半透明
                          // [&_svg]:invisible: 内部 CheckIcon 隐藏，使用 invisible 是为了保留占位空间，不触发重拍
                          : 'opacity-50 [&_svg]:invisible'
                      )}
                    >
                      <CheckIcon className={cn('h-4 w-4 text-background')} />
                    </div>
                    {/* icon */}
                    {option.icon && (
                      // size-4: 16*16px
                      // text-muted-foreground: 主题里的弱化前景色
                      <option.icon className='size-4 text-muted-foreground' />
                    )}
                    {/* label */}
                    <span>{option.label}</span>
                    {/* 读取值的数量 */}
                    {facets?.get(option.value) && (
                      // ms-auto: 把图标推到行内侧结束侧，作用是让 Light 文本在左，勾选图标贴右，形成标准菜单项布局
                      // h-4 w-4: 16*16px
                      // flex items-center justify-center: flexbox 布局，居中对齐，垂直居中
                      // font-mono 
                      // text-xs
                      <span className='ms-auto flex h-4 w-4 items-center justify-center font-mono text-xs'>
                        {facets.get(option.value)}
                      </span>
                    )}
                  </CommandItem>
                )
              })}
            </CommandGroup>
            {/* 有选择的值 */}
            {selectedValues.size > 0 && (
              <>
                {/* 分隔符 */}
                <CommandSeparator />
                {/* 新的分组 */}
                <CommandGroup>
                  {/* 点击清除 */}
                  <CommandItem
                    onSelect={() => column?.setFilterValue(undefined)}
                    className='justify-center text-center'
                  >
                    Clear filters
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
