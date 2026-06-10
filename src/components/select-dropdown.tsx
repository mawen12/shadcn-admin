import { Loader } from 'lucide-react'
import { cn } from '@/lib/utils'
import { FormControl } from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

type SelectDropdownProps = {
  onValueChange?: (value: string) => void
  // 默认值
  defaultValue: string | undefined
  // 占位符
  placeholder?: string
  // 是否加载中，处于加载中时，展示 Loading 效果，并禁用选项
  isPending?: boolean
  // 要展示的选择项
  items: { label: string; value: string }[] | undefined
  // 是否禁用
  disabled?: boolean
  className?: string
  // 是否处于受控模式
  isControlled?: boolean
}

/**
 * 
 */
export function SelectDropdown({
  defaultValue,
  onValueChange,
  isPending,
  items,
  placeholder,
  disabled,
  className = '',
  isControlled = false,
}: SelectDropdownProps) {
  const defaultState = isControlled
    // 受控时，外部控制值
    ? { value: defaultValue, onValueChange }
    // 非受控，内部管理状态
    : { defaultValue, onValueChange }


  return (
    <Select {...defaultState}>
      <FormControl>
        {/* Select 组件 */}
        <SelectTrigger disabled={disabled} className={cn(className)}>
          <SelectValue placeholder={placeholder ?? 'Select'} />
        </SelectTrigger>
      </FormControl>
      {/* 可选项 */}
      <SelectContent>
        {/* 支持动态加载中 */}
        {isPending ? (
          // 展示 Loading 的状态，禁用选项
          <SelectItem disabled value='loading' className='h-14'>
            <div className='flex items-center justify-center gap-2'>
              {/* animate-spin: 旋转 */}
              <Loader className='h-5 w-5 animate-spin' />
              {'  '}
              Loading...
            </div>
          </SelectItem>
        ) : (
          items?.map(({ label, value }) => (
            <SelectItem key={value} value={value}>
              {label}
            </SelectItem>
          ))
        )}
      </SelectContent>
    </Select>
  )
}
