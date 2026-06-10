import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { showSubmittedData } from '@/lib/show-submitted-data'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { SelectDropdown } from '@/components/select-dropdown'
import { type Task } from '../data/schema'

type TaskMutateDrawerProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow?: Task
}

const formSchema = z.object({
  // title 必填
  title: z.string().min(1, 'Title is required.'),
  // status 必选
  status: z.string().min(1, 'Please select a status.'),
  // label 必选
  label: z.string().min(1, 'Please select a label.'),
  // priority 必选
  priority: z.string().min(1, 'Please choose a priority.'),
})
type TaskForm = z.infer<typeof formSchema>

/**
 * Create 与 Update 共享同一个 Dialog
 */
export function TasksMutateDrawer({
  open,
  onOpenChange,
  currentRow,
}: TaskMutateDrawerProps) {
  // 根据当前是否选中记录，判断是否为 Update
  const isUpdate = !!currentRow

  // 保存表单值和校验规则
  const form = useForm<TaskForm>({
    resolver: zodResolver(formSchema),
    // 如果选中了行记录，则取行记录的，否则使用默认值进行初始化
    defaultValues: currentRow ?? {
      title: '',
      status: '',
      label: '',
      priority: '',
    },
  })

  // 表单提交操作
  const onSubmit = (data: TaskForm) => {
    // do something with the form data
    // 关闭 Dialog
    onOpenChange(false)
    // 重置 form
    form.reset()
    // 以 toast 展示提交的数据
    showSubmittedData(data)
  }

  return (
    <Sheet
      open={open}
      // 表单关闭操作
      onOpenChange={(v) => {
        // 关闭 Dialog
        onOpenChange(v)
        // 重置 form
        form.reset()
      }}
    >
      <SheetContent className='flex flex-col'>
        {/* 表头 */}
        <SheetHeader className='text-start'>
          {/* Title */}
          <SheetTitle>{isUpdate ? 'Update' : 'Create'} Task</SheetTitle>
          {/* 描述 */}
          <SheetDescription>
            {isUpdate
              ? 'Update the task by providing necessary info.'
              : 'Add a new task by providing necessary info.'}
            Click save when you&apos;re done.
          </SheetDescription>
        </SheetHeader>

        {/* 表单项 */}
        <Form {...form}>
          <form
            id='tasks-form'
            // 表单提交
            onSubmit={form.handleSubmit(onSubmit)}
            // flex-1: 占用所有可用空间
            // space-y-6: 子项的竖向间距 24px
            // overflow-y-auto: 当子项排列不下时，使用滚动条
            // px-4: 内边距 16px
            className='flex-1 space-y-6 overflow-y-auto px-4'
          >
            {/* Title 字段 */}
            <FormField
              control={form.control}
              name='title'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder='Enter a title' />
                  </FormControl>
                  {/* 错误消息展示 */}
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Status 字段 */}
            <FormField
              control={form.control}
              name='status'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  {/* 下拉框选项 */}
                  <SelectDropdown
                    // 默认值
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                    placeholder='Select dropdown'
                    items={[
                      { label: 'In Progress', value: 'in progress' },
                      { label: 'Backlog', value: 'backlog' },
                      { label: 'Todo', value: 'todo' },
                      { label: 'Canceled', value: 'canceled' },
                      { label: 'Done', value: 'done' },
                    ]}
                  />
                  {/* 错误消息展示 */}
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Label 字段 */}
            <FormField
              control={form.control}
              name='label'
              render={({ field }) => (
                <FormItem className='relative'>
                  <FormLabel>Label</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      // flex 布局，竖向排列，子项间隔 4px
                      className='flex flex-col space-y-1'
                    >
                      <FormItem className='flex items-center'>
                        <FormControl>
                          <RadioGroupItem value='documentation' />
                        </FormControl>
                        <FormLabel className='font-normal'>Documentation</FormLabel>
                      </FormItem>
                      <FormItem className='flex items-center'>
                        <FormControl>
                          <RadioGroupItem value='feature' />
                        </FormControl>
                        <FormLabel className='font-normal'>Feature</FormLabel>
                      </FormItem>
                      <FormItem className='flex items-center'>
                        <FormControl>
                          <RadioGroupItem value='bug' />
                        </FormControl>
                        <FormLabel className='font-normal'>Bug</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Priority 字段 */}
            <FormField
              control={form.control}
              name='priority'
              render={({ field }) => (
                <FormItem className='relative'>
                  <FormLabel>Priority</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      // flex 布局，竖向排列，子项间隔 4px
                      className='flex flex-col space-y-1'
                    >
                      <FormItem className='flex items-center'>
                        <FormControl>
                          <RadioGroupItem value='high' />
                        </FormControl>
                        <FormLabel className='font-normal'>High</FormLabel>
                      </FormItem>
                      <FormItem className='flex items-center'>
                        <FormControl>
                          <RadioGroupItem value='medium' />
                        </FormControl>
                        <FormLabel className='font-normal'>Medium</FormLabel>
                      </FormItem>
                      <FormItem className='flex items-center'>
                        <FormControl>
                          <RadioGroupItem value='low' />
                        </FormControl>
                        <FormLabel className='font-normal'>Low</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>

        {/* 底部 */}
        <SheetFooter className='gap-2'>
          {/* 关闭按钮 */}
          <SheetClose asChild>
            <Button variant='outline'>Close</Button>
          </SheetClose>
          {/* 提交按钮，绑定 form */}
          <Button form='tasks-form' type='submit'>
            Save changes
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
