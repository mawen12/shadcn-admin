import z from 'zod'
import { createFileRoute } from '@tanstack/react-router'
import { Apps } from '@/features/apps'

const appsSearchSchema = z.object({
  // 类型过滤
  type: z
    .enum(['all', 'connected', 'notConnected'])
    .optional()
    .catch(undefined),
  // 字段过滤
  filter: z.string().optional().catch(''),
  // 排序
  sort: z.enum(['asc', 'desc']).optional().catch(undefined),
})

/**
 * 路由为：/apps
 */
export const Route = createFileRoute('/_authenticated/apps/')({
  validateSearch: appsSearchSchema,
  component: Apps,
})
