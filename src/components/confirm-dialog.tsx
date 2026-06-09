import { cn } from '@/lib/utils'
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'

type ConfirmDialogProps = {
  // 是否打开
  open: boolean
  // 关闭
  onOpenChange: (open: boolean) => void
  // 标题
  title: React.ReactNode
  // 是否禁用
  disabled?: boolean
  // 描述
  desc: React.JSX.Element | string
  // 取消文本
  cancelBtnText?: string
  // 确认文本
  confirmText?: React.ReactNode
  // 确认按钮警告
  destructive?: boolean
  // 是否加载中
  isLoading?: boolean
  className?: string
  children?: React.ReactNode
} & (
    | { form: string; handleConfirm?: undefined }
    | { form?: undefined; handleConfirm: () => void }
  )

export function ConfirmDialog(props: ConfirmDialogProps) {
  const {
    title,
    desc,
    children,
    className,
    confirmText,
    cancelBtnText,
    destructive,
    isLoading,
    disabled = false,
    form,
    handleConfirm,
    ...actions
  } = props
  return (
    <AlertDialog {...actions}>
      <AlertDialogContent className={cn(className && className)}>
        {/* Dialog 头部 */}
        <AlertDialogHeader className='text-start'>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription asChild>
            <div>{desc}</div>
          </AlertDialogDescription>
        </AlertDialogHeader>

        {/* Dialog 中间内容 */}
        {children}

        {/* Dialog 底部 */}
        <AlertDialogFooter>
          {/* 取消 */}
          <AlertDialogCancel disabled={isLoading}>
            {cancelBtnText ?? 'Cancel'}
          </AlertDialogCancel>
          {/* 确认按钮，支持 form */}
          <Button
            type={form ? 'submit' : 'button'}
            form={form}
            onClick={handleConfirm}
            variant={destructive ? 'destructive' : 'default'}
            disabled={disabled || isLoading}
          >
            {confirmText ?? 'Continue'}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
