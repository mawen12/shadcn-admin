import { type ChangeEvent, useState } from 'react'
import { getRouteApi } from '@tanstack/react-router'
import { SlidersHorizontal, ArrowUpAZ, ArrowDownAZ } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { ConfigDrawer } from '@/components/config-drawer'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { apps } from './data/apps'

const route = getRouteApi('/_authenticated/apps/')

type AppType = 'all' | 'connected' | 'notConnected'

const appText = new Map<AppType, string>([
  ['all', 'All Apps'],
  ['connected', 'Connected'],
  ['notConnected', 'Not Connected'],
])

export function Apps() {

  // 读取搜索参数
  const {
    filter = '',
    type = 'all',
    sort: initSort = 'asc',
  } = route.useSearch()

  const navigate = route.useNavigate()

  // 排序
  const [sort, setSort] = useState(initSort)
  // 应用类型
  const [appType, setAppType] = useState(type)
  // 搜索关键词
  const [searchTerm, setSearchTerm] = useState(filter)

  // 过滤应用
  const filteredApps = apps
    .sort((a, b) =>
      sort === 'asc'
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    )
    .filter((app) =>
      appType === 'connected'
        ? app.connected
        : appType === 'notConnected'
          ? !app.connected
          : true
    )
    .filter((app) => app.name.toLowerCase().includes(searchTerm.toLowerCase()))

  // 处理搜索
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    // 设置搜索值
    setSearchTerm(e.target.value)
    // 同步变更URL
    navigate({
      search: (prev) => ({
        ...prev,
        filter: e.target.value || undefined,
      }),
    })
  }

  // 处理类型变更
  const handleTypeChange = (value: AppType) => {
    // 设置类型变更
    setAppType(value)
    // 同步变更URL
    navigate({
      search: (prev) => ({
        ...prev,
        type: value === 'all' ? undefined : value,
      }),
    })
  }

  // 处理排序变更
  const handleSortChange = (sort: 'asc' | 'desc') => {
    // 设置排序
    setSort(sort)
    // 同步变更URL
    navigate({ search: (prev) => ({ ...prev, sort }) })
  }

  return (
    <>
      {/* ===== Top Heading ===== */}
      <Header>
        {/* 搜索 */}
        <Search className='me-auto' />
        {/* 主题切换 */}
        <ThemeSwitch />
        {/* 配置 */}
        <ConfigDrawer />
        {/* Profile */}
        <ProfileDropdown />
      </Header>

      {/* ===== Content ===== */}
      <Main fixed>
        {/* 名称 */}
        <div>
          {/* text-2xl: 24px 字号 */}
          {/* font-bold: 粗体 */}
          {/* tracking-tight: 字间距收紧2.5%，让大字号标题更紧筹、精致 */}
          <h1 className='text-2xl font-bold tracking-tight'>
            App Integrations
          </h1>
          {/* text-muted-foreground: 柔和灰色 */}
          <p className='text-muted-foreground'>
            Here&apos;s a list of your apps for the integration!
          </p>
        </div>

        {/* my-4 sm:my-0: 上下各 16px 间距，与上下内容隔开，当容器宽度 >= sm 时，上下无间距，适应桌面布局 */}
        {/* flex justify-between: 弹性盒子布局，两端对齐 */}
        {/* items-end sm:items-center: 底部对齐，子项贴在容器底部，当容器宽度 >= sm 时，垂直居中对齐 */}
        <div className='my-4 flex items-end justify-between '>
          {/* flex gap-4: 弹性盒子布局，子项间距 16px */}
          {/* flex-col sm:flex-row: 默认纵向堆叠，当容器宽度 >= sm 时，变为垂直居中对齐 */}
          <div className='flex flex-col gap-4 sm:my-4 sm:flex-row'>
            {/* 过滤输入框 */}
            <Input
              placeholder='Filter apps...'
              className='h-9 w-40 lg:w-62.5'
              value={searchTerm}
              onChange={handleSearch}
            />
            {/* 类型选择框 */}
            <Select value={appType} onValueChange={handleTypeChange}>
              <SelectTrigger className='w-36'>
                <SelectValue>{appText.get(appType)}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all'>All Apps</SelectItem>
                <SelectItem value='connected'>Connected</SelectItem>
                <SelectItem value='notConnected'>Not Connected</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* 排序选择框 */}
          <Select value={sort} onValueChange={handleSortChange}>
            <SelectTrigger className='w-16'>
              <SelectValue>
                <SlidersHorizontal size={18} />
              </SelectValue>
            </SelectTrigger>
            <SelectContent align='end'>
              {/* 正排序 */}
              <SelectItem value='asc'>
                <div className='flex items-center gap-4'>
                  <ArrowUpAZ size={16} />
                  <span>Ascending</span>
                </div>
              </SelectItem>
              {/* 倒排序 */}
              <SelectItem value='desc'>
                <div className='flex items-center gap-4'>
                  <ArrowDownAZ size={16} />
                  <span>Descending</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* 分隔符 */}
        <Separator className='shadow-sm' />

        {/* grid gap-4: 网格布局,网格间距 16px */}
        {/* overflow-auto: 内容超出时自动滚动  */}
        {/* pt-4 pb-16: 顶部内边距 16px，底部内边距 64px */}
        {/* md:grid-cols-2 lg:grid-cols-3: 当容器宽度 >= md 时，2列，当容器宽度 >= lg 时，3列 */}
        <ul className='faded-bottom no-scrollbar grid gap-4 overflow-auto pt-4 pb-16 md:grid-cols-2 lg:grid-cols-3'>
          {filteredApps.map((app) => (
            <li
              key={app.name}
              // rounded-lg: 12px 圆角 
              // border: 边框 
              // p-4: 内边距 16px
              // hover:shadow-md: 鼠标悬浮时，阴影
              className='rounded-lg border p-4 hover:shadow-md'
            >
              {/* 第一行 */}
              {/* flex items-center justify-between: 弹性布局，垂直居中，两端对齐 */}
              {/* mb-8: 底部外边距 32px，让 icon 和其他保持间距 */}
              <div className='mb-8 flex items-center justify-between'>
                {/* flex items-center justify-center: 弹性盒子布局，垂直居中，水平居中 */}
                {/* size-10: 40*40px */}
                {/* rounded-lg: 12px 圆角 */}
                {/* bg-muted: 背景 */}
                {/* p-2: 内边距 8px */}
                <div className={`flex items-center justify-center size-10 rounded-lg bg-muted p-2`} >
                  {app.logo}
                </div>
                {/* 按钮 */}
                <Button
                  variant='outline'
                  size='sm'
                  // bg-blue-50 dark:bg-blue-950: 提供light/dark模式下的不同背景
                  // border-blue-300 dark:border-blue-700: 提供light/dark模式下的不同边框
                  // hover:bg-blue-100   dark:hover:bg-blue-900: 提供light/dark模式下的悬浮背景 
                  // border 边框  
                  className={`${app.connected ? 'border border-blue-300 bg-blue-50 hover:bg-blue-100 dark:border-blue-700 dark:bg-blue-950 dark:hover:bg-blue-900' : ''}`}
                >
                  {app.connected ? 'Connected' : 'Connect'}
                </Button>
              </div>

              {/* 标题 + 描述 */}
              <div>
                <h2 className='mb-1 font-semibold'>{app.name}</h2>
                <p className='line-clamp-2 text-gray-500'>{app.desc}</p>
              </div>
            </li>
          ))}
        </ul>
      </Main>
    </>
  )
}
