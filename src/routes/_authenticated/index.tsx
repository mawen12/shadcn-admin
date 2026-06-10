import { createFileRoute } from '@tanstack/react-router'
import { Dashboard } from '@/features/dashboard'

// 路由为：/
export const Route = createFileRoute('/_authenticated/')({
  component: Dashboard,
})
