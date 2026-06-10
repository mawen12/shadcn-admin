import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { showSubmittedData } from '@/lib/show-submitted-data'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

const formSchema = z.object({
  // 导入的文件，文件大小必须 > 0，并且格式只能是 text/csv
  file: z
    .instanceof(FileList)
    .refine((files) => files.length > 0, {
      message: 'Please upload a file.',
    })
    .refine(
      (files) => ['text/csv'].includes(files?.[0]?.type),
      'Please upload csv format.'
    ),
})

type TaskImportDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

/**
 * 文件导入 Dialog
 */
export function TasksImportDialog({
  open,
  onOpenChange,
}: TaskImportDialogProps) {
  // 构造表单对象
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { file: undefined },
  })

  const fileRef = form.register('file')

  const onSubmit = () => {
    // 读取文件
    const file = form.getValues('file')

    // 仅处理首个文件
    if (file && file[0]) {
      // 提取文件信息
      const fileDetails = {
        name: file[0].name,
        size: file[0].size,
        type: file[0].type,
      }
      // 展示上传的文件信息
      showSubmittedData(fileDetails, 'You have imported the following file:')
    }
    // 关闭
    onOpenChange(false)
  }

  return (
    <Dialog
      open={open}
      // 手动关闭
      onOpenChange={(val) => {
        onOpenChange(val)
        form.reset()
      }}
    >
      {/* gap-2: 子项间距 8px */}
      {/* sm:max-w-sm: sm 及以上时，最大宽度为 sm */}
      <DialogContent className='gap-2 sm:max-w-sm'>
        {/* 标题 */}
        <DialogHeader className='text-start'>
          <DialogTitle>Import Tasks</DialogTitle>
          <DialogDescription>
            Import tasks quickly from a CSV file.
          </DialogDescription>
        </DialogHeader>

        {/*  */}
        <Form {...form}>
          <form id='task-import-form' onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name='file'
              render={() => (
                <FormItem className='my-2'>
                  <FormLabel>File</FormLabel>
                  <FormControl>
                    {/* 文件选择 */}
                    <Input
                      type='file'
                      accept='text/csv'
                      {...fileRef}
                      // TODO by mawen 应该移除 py-0,因为会造成 placholder 上移，没有居中
                      className='h-8 py-0'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>

        {/* 操作按钮 */}
        <DialogFooter className='gap-2'>
          {/* 关闭按钮 */}
          <DialogClose asChild>
            <Button variant='outline'>Close</Button>
          </DialogClose>
          {/* 提交按钮，绑定 form */}
          <Button type='submit' form='task-import-form'>
            Import
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
