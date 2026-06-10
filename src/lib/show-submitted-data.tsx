import { toast } from 'sonner'

export function showSubmittedData(
  data: unknown,
  title: string = 'You submitted the following values:'
) {
  // 使用 toast 展示消息
  toast.message(title, {
    description: (
      // mt-2: 底部外边距 8px 
      // w-full: 全宽
      // overflow-x-auto: 当内容长度太多时，显示滚动条
      // rounded-md: 圆角 
      // bg-slate-950: 背景色
      // p-4: 内边距 16px
      <pre className='mt-2 w-full overflow-x-auto rounded-md bg-slate-950 p-4'>
        <code className='text-white'>{JSON.stringify(data, null, 2)}</code>
      </pre>
    ),
  })
}
