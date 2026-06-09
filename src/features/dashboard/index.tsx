import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ConfigDrawer } from '@/components/config-drawer'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { TopNav } from '@/components/layout/top-nav'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { Analytics } from './components/analytics'
import { Overview } from './components/overview'
import { RecentSales } from './components/recent-sales'

export function Dashboard() {
  return (
    <>
      {/* ===== Top Heading ===== */}
      <Header>
        {/* me-auto: 将行外边距设置为 auto，将将 TopNav 尽量推到起始侧，让后面的靠到另一侧 */}
        {/* mr-auto: 该方式不能适配 LTR/RTL */}
        <TopNav links={topNav} className='me-auto' />
        {/* 搜索框 */}
        <Search />
        {/* 主题切换 */}
        <ThemeSwitch />
        {/* 配置 */}
        <ConfigDrawer />
        {/* Profile 切换 */}
        <ProfileDropdown />
      </Header>

      {/* ===== Main ===== */}
      <Main>
        {/* 主内容区顶部标题+右侧操作按钮的一行工具栏 */}
        {/* mb-2: 下边距8px，与下面 Tabs 拉开 */}
        {/* flex items-center justify-between: 横向布局，垂直居中对齐，左右两端分布 */}
        {/* space-y-2: 给纵向堆叠的子项加间距 */}
        <div className='mb-2 flex items-center justify-between space-y-2'>
          {/* text-2xl: 加大的页面标题字号 */}
          {/* font-bold: 粗体强调主标题 */}
          {/* tracking-tight: 字间距略紧凑，让标题更有抬头感 */}
          <h1 className='text-2xl font-bold tracking-tight'>Dashboard</h1>
          {/* flex items-center: 横向，垂直居中 */}
          {/* space-x-2: 多个按钮保持 8px 间距 */}
          <div className='flex items-center space-x-2'>
            <Button>Download</Button>
          </div>
        </div>
        <Tabs
          orientation='vertical'
          defaultValue='overview'
          // space-y-4 tab 头与内容区间隔 4px
          className='space-y-4'
        >
          {/* w-full: 占满父容器宽度 pb-2 */}
          {/* overflow-x-auto: 内容超出时自动添加滚动条 */}
          {/* pb-2: 底部内边距2rem */}
          <div className='w-full overflow-x-auto pb-2'>
            <TabsList>
              <TabsTrigger value='overview'>Overview</TabsTrigger>
              <TabsTrigger value='analytics'>Analytics</TabsTrigger>
              <TabsTrigger value='reports' disabled>Reports</TabsTrigger>
              <TabsTrigger value='notifications' disabled>Notifications</TabsTrigger>
            </TabsList>
          </div>
          {/* space-y-4: 竖向子元素间隔 4px */}
          <TabsContent value='overview' className='space-y-4'>
            {/* grid: 网格布局 */}
            {/* gap-4: 元素间距 4rem */}
            {/* sm:grid-cols-2: sm 及以上时一行2列 */}
            {/* lg:grid-cols-4: lg 及以上时一行4列 */}
            <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
              <Card>
                {/* flex flex-row items-center justify-between: flex 布局，横向排列，垂直居中，左右两端分布，即 title 和 svg 分列两侧 */}
                {/* space-y-0: 竖向子元素间隔0 */}
                {/* pb-2: 底部内边距 2rem */}
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  {/* 左侧标题 */}
                  {/* text-sm: 小号字体标题 */}
                  {/* font-medium: 中等粗细 */}
                  <CardTitle className='text-sm font-medium'>
                    Total Revenue
                  </CardTitle>
                  {/* 右侧 svg */}
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    // h-4 w-4: 宽高一致,16*16px 小图标
                    // text-muted-foreground 次要文本颜色
                    className='h-4 w-4 text-muted-foreground'
                  >
                    <path d='M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6' />
                  </svg>
                </CardHeader>

                <CardContent>
                  {/* text-2xl font-bold: 24px粗体，突出数字 KPI */}
                  <div className='text-2xl font-bold'>$45,231.89</div>
                  {/* text-xs: 12px，极小字体 */}
                  {/* text-muted-foreground: 次要文本颜色 */}
                  <p className='text-xs text-muted-foreground'>
                    +20.1% from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                {/* flex flex-row items-center justify-between: flex 布局，横向排列，垂直居中，左右两端分布，即 title 和 svg 分列两侧 */}
                {/* space-y-0: 竖向子元素间隔0 */}
                {/* pb-2: 底部内边距 2rem */}
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  {/* 左侧标题 */}
                  {/* text-sm: 小号字体标题 */}
                  {/* font-medium: 中等粗细 */}
                  <CardTitle className='text-sm font-medium'>
                    Subscriptions
                  </CardTitle>
                  {/* 右侧 svg */}
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    // h-4 w-4: 宽高一致,16*16px 小图标
                    // text-muted-foreground 次要文本颜色
                    className='h-4 w-4 text-muted-foreground'
                  >
                    <path d='M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2' />
                    <circle cx='9' cy='7' r='4' />
                    <path d='M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75' />
                  </svg>
                </CardHeader>
                <CardContent>
                  {/* text-2xl font-bold: 24px粗体，突出数字 */}
                  <div className='text-2xl font-bold'>+2350</div>
                  {/* text-xs: 12px，极小字体 */}
                  {/* text-muted-foreground: 次要文本颜色 */}
                  <p className='text-xs text-muted-foreground'>
                    +180.1% from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                {/* flex flex-row items-center justify-between: flex 布局，横向排列，垂直居中，左右两端分布，即 title 和 svg 分列两侧 */}
                {/* space-y-0: 竖向子元素间隔0 */}
                {/* pb-2: 底部内边距 2rem */}
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  {/* 左侧标题 */}
                  {/* text-sm: 小号字体标题 */}
                  {/* font-medium: 中等粗细 */}
                  <CardTitle className='text-sm font-medium'>Sales</CardTitle>
                  {/* 右侧 svg */}
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    // h-4 w-4: 宽高一致,16*16px 小图标
                    // text-muted-foreground 次要文本颜色
                    className='h-4 w-4 text-muted-foreground'
                  >
                    <rect width='20' height='14' x='2' y='5' rx='2' />
                    <path d='M2 10h20' />
                  </svg>
                </CardHeader>
                <CardContent>
                  {/* text-2xl font-bold: 24px粗体，突出数字 */}
                  <div className='text-2xl font-bold'>+12,234</div>
                  {/* text-xs: 12px，极小字体 */}
                  {/* text-muted-foreground: 次要文本颜色 */}
                  <p className='text-xs text-muted-foreground'>
                    +19% from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                {/* flex flex-row items-center justify-between: flex 布局，横向排列，垂直居中，左右两端分布，即 title 和 svg 分列两侧 */}
                {/* space-y-0: 竖向子元素间隔0 */}
                {/* pb-2: 底部内边距 2rem */}
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  {/* 左侧标题 */}
                  {/* text-sm: 小号字体标题 */}
                  {/* font-medium: 中等粗细 */}
                  <CardTitle className='text-sm font-medium'>
                    Active Now
                  </CardTitle>
                  {/* 右侧 svg */}
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    // h-4 w-4: 宽高一致,16*16px 小图标
                    // text-muted-foreground 次要文本颜色
                    className='h-4 w-4 text-muted-foreground'
                  >
                    <path d='M22 12h-4l-3 9L9 3l-3 9H2' />
                  </svg>
                </CardHeader>
                <CardContent>
                  {/* text-2xl font-bold: 24px粗体，突出数字 */}
                  <div className='text-2xl font-bold'>+573</div>
                  {/* text-xs: 12px，极小字体 */}
                  {/* text-muted-foreground: 次要文本颜色 */}
                  <p className='text-xs text-muted-foreground'>
                    +201 since last hour
                  </p>
                </CardContent>
              </Card>
            </div>
            {/* grid grid-cols-1: 网格布局，移动端1列， */}
            {/* lg:grid-cols-7: lg 及以上分7列网格 */}
            {/* gap-4: 子元素间隔 1rem */}
            <div className='grid grid-cols-1 gap-4 lg:grid-cols-7'>
              {/* col-span-1: 默认占 1 列 */}
              {/* lg:col-span-4: lg 及以上占 4 列 */}
              <Card className='col-span-1 lg:col-span-4'>
                <CardHeader>
                  <CardTitle>Overview</CardTitle>
                </CardHeader>
                <CardContent className='ps-2'>
                  <Overview />
                </CardContent>
              </Card>
              {/* col-span-1: 默认占 1 列 */}
              {/* lg:col-span-3: lg 及以上占 3 列 */}
              <Card className='col-span-1 lg:col-span-3'>
                <CardHeader>
                  <CardTitle>Recent Sales</CardTitle>
                  <CardDescription>
                    You made 265 sales this month.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RecentSales />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value='analytics' className='space-y-4'>
            <Analytics />
          </TabsContent>
        </Tabs>
      </Main>
    </>
  )
}

const topNav = [
  {
    title: 'Overview',
    href: 'dashboard/overview',
    isActive: true,
    disabled: false,
  },
  {
    title: 'Customers',
    href: 'dashboard/customers',
    isActive: false,
    disabled: true,
  },
  {
    title: 'Products',
    href: 'dashboard/products',
    isActive: false,
    disabled: true,
  },
  {
    title: 'Settings',
    href: 'dashboard/settings',
    isActive: false,
    disabled: true,
  },
]
