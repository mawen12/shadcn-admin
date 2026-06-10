import z from 'zod'
import { createFileRoute } from '@tanstack/react-router'
import { Tasks } from '@/features/tasks'
import { priorities, statuses } from '@/features/tasks/data/data'

const taskSearchSchema = z.object({
  // 当前页码：数字，值可空，默认1
  page: z.number().optional().catch(1),
  // 每页条数：数字，值可空，默认10
  pageSize: z.number().optional().catch(10),
  // 状态筛选数组：值可空，值必须来自 statuses 枚举
  status: z
    .array(z.enum(statuses.map((status) => status.value)))
    .optional()
    .catch([]),
  // 优先级筛选数组：值可空，值必须来自 priorities 枚举
  priority: z
    .array(z.enum(priorities.map((priority) => priority.value)))
    .optional()
    .catch([]),
  // 搜索关键字：值可空，默认 ''
  filter: z.string().optional().catch(''),
})

/**
 * 路由为：/tasks
 */
export const Route = createFileRoute('/_authenticated/tasks/')({
  validateSearch: taskSearchSchema,
  component: Tasks,
})
