import { ConfigDrawer } from '@/components/config-drawer'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { TasksDialogs } from './components/tasks-dialogs'
import { TasksPrimaryButtons } from './components/tasks-primary-buttons'
import { TasksProvider } from './components/tasks-provider'
import { TasksTable } from './components/tasks-table'
import { tasks } from './data/tasks'

export function Tasks() {
  return (

    <TasksProvider>
      {/* 顶部 */}
      <Header fixed>
        {/* me-auto: 撑满剩余空间，相当于把后面的三个同级元素全部推到右侧 */}
        <Search className='me-auto' />
        {/* 主题切换 */}
        <ThemeSwitch />
        {/* 配置 */}
        <ConfigDrawer />
        {/* Profile */}
        <ProfileDropdown />
      </Header>

      {/* 主内容区 */}
      <Main className='flex flex-1 flex-col gap-4 sm:gap-6'>
        {/* 内容头部 */}
        {/* flex-wrap: 允许子项在一行排不下时，自动换到下一行 */}
        <div className='flex flex-wrap items-end justify-between gap-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>Tasks</h2>
            <p className='text-muted-foreground'>
              Here&apos;s a list of your tasks for this month!
            </p>
          </div>
          {/* Create 和 Import 按钮组 */}
          <TasksPrimaryButtons />
        </div>

        {/* 任务表格 */}
        <TasksTable data={tasks} />
      </Main>

      <TasksDialogs />
    </TasksProvider>
  )
}
