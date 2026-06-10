import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { AnalyticsChart } from './analytics-chart'

export function Analytics() {
  return (
    // TODO by mawen 此处的 space-y-4 是否可以省略，因为外层的 TabsContent 已经有了
    <div className='space-y-4'>
      <Card>
        {/* 卡片头 */}
        <CardHeader>
          <CardTitle>Traffic Overview</CardTitle>
          <CardDescription>Weekly clicks and unique visitors</CardDescription>
        </CardHeader>
        <CardContent className='px-6'>
          {/* 图标 */}
          <AnalyticsChart />
        </CardContent>
      </Card>
      {/* grid gap-4: 网格布局，子项间距 16px */}
      {/* sm:grid-cols-2: sm 及以上时，每行 2 列 */}
      {/* lg:grid-cols-4: lg 及以上时，每行 4 列 */}
      <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
        <Card>
          {/* flex flex-row items-center justify-between: flex 横向布局，子项垂直居中，分列两侧 */}
          {/* space-y-0: 竖向元素间距为0 */}
          {/* pb-2: 底部内边距 8px */}
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            {/* 左侧标题 */}
            <CardTitle className='text-sm font-medium'>Total Clicks</CardTitle>
            {/* 右侧svg */}
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              className='h-4 w-4 text-muted-foreground'
            >
              <path d='M3 3v18h18' />
              <path d='M7 15l4-4 4 4 4-6' />
            </svg>
          </CardHeader>
          <CardContent>
            {/* text-2xl font-bold: 24px粗体，突出数字 KPI */}
            <div className='text-2xl font-bold'>1,248</div>
            {/* text-xs: 12px，极小字体 */}
            {/* text-muted-foreground: 次要文本颜色 */}
            <p className='text-xs text-muted-foreground'>+12.4% vs last week</p>
          </CardContent>
        </Card>
        <Card>
          {/* flex flex-row items-center justify-between: flex 横向布局，子项垂直居中，分列两侧 */}
          {/* space-y-0: 竖向元素间距为0 */}
          {/* pb-2: 底部内边距 8px */}
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            {/* 左侧标题 */}
            <CardTitle className='text-sm font-medium'>
              Unique Visitors
            </CardTitle>
            {/* 右侧svg */}
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              className='h-4 w-4 text-muted-foreground'
            >
              <circle cx='12' cy='7' r='4' />
              <path d='M6 21v-2a6 6 0 0 1 12 0v2' />
            </svg>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>832</div>
            <p className='text-xs text-muted-foreground'>+5.8% vs last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Bounce Rate</CardTitle>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              className='h-4 w-4 text-muted-foreground'
            >
              <path d='M3 12h6l3 6 3-6h6' />
            </svg>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>42%</div>
            <p className='text-xs text-muted-foreground'>-3.2% vs last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Avg. Session</CardTitle>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              className='h-4 w-4 text-muted-foreground'
            >
              <circle cx='12' cy='12' r='10' />
              <path d='M12 6v6l4 2' />
            </svg>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>3m 24s</div>
            <p className='text-xs text-muted-foreground'>+18s vs last week</p>
          </CardContent>
        </Card>
      </div>

      {/* grid gap-4: 网格布局，子项间距 16px */}
      {/* grid-cols-1: 默认每行 1 列 */}
      {/* lg:grid-cols-7: lg 及以上时，每行 7 列 */}
      <div className='grid grid-cols-1 gap-4 lg:grid-cols-7'>
        {/* col-span-1: 默认该子项占据 1 列 */}
        {/* lg:col-span-4: log 及以上，子项占据 4 列 */}
        <Card className='col-span-1 lg:col-span-4'>
          <CardHeader>
            <CardTitle>Referrers</CardTitle>
            <CardDescription>Top sources driving traffic</CardDescription>
          </CardHeader>
          <CardContent>
            {/* 图表区域 */}
            <SimpleBarList
              items={[
                { name: 'Direct', value: 512 },
                { name: 'Product Hunt', value: 238 },
                { name: 'Twitter', value: 174 },
                { name: 'Blog', value: 104 },
              ]}
              barClass='bg-primary'
              valueFormatter={(n) => `${n}`}
            />
          </CardContent>
        </Card>
        {/* lg:col-span-4: log 及以上，子项占据 3 列 */}
        <Card className='col-span-1 lg:col-span-3'>
          <CardHeader>
            <CardTitle>Devices</CardTitle>
            <CardDescription>How users access your app</CardDescription>
          </CardHeader>
          <CardContent>
            <SimpleBarList
              items={[
                { name: 'Desktop', value: 74 },
                { name: 'Mobile', value: 22 },
                { name: 'Tablet', value: 4 },
              ]}
              barClass='bg-muted-foreground'
              valueFormatter={(n) => `${n}%`}
            />
          </CardContent>
        </Card>
      </div>
    </div >
  )
}

function SimpleBarList({
  items,
  valueFormatter,
  barClass,
}: {
  items: { name: string; value: number }[]
  valueFormatter: (n: number) => string
  barClass: string
}) {
  // 计算最大值
  const max = Math.max(...items.map((i) => i.value), 1)

  return (
    // 竖向子项间隔 12px，为多行记录间提供间距
    <ul className='space-y-3'>
      {items.map((i) => {
        // 根据值/max，计算比例
        const width = `${Math.round((i.value / max) * 100)}%`

        return (
          // flex items-center justify-between: flex 布局，垂直居中，分列两侧
          // gap-3: 间距 12px
          <li key={i.name} className='flex items-center justify-between gap-3'>
            {/* 名称 + 线条 */}
            {/* min-w-0: 允许宽度收缩到比内容更窄 */}
            {/* flex-1: 占用剩余的所有可用空间 */}
            <div className='min-w-0 flex-1'>
              {/* 名称 */}
              {/* truncate: 配合 min-w-0，长文本会被截断 */}
              <div className='mb-1 truncate text-xs text-muted-foreground'>
                {i.name}
              </div>
              {/* 线条 */}
              {/* h-2.5 w-full: 高度10px，宽度占满 */}
              {/* rounded-full: 大圆角，此处显示为胶囊形状 */}
              <div className='h-2.5 w-full rounded-full bg-muted'>
                <div
                  className={`h-2.5 rounded-full ${barClass}`}
                  // 展示其占比
                  style={{ width }}
                />
              </div>
            </div>
            {/* 值 */}
            {/* ps-2: 左侧内边距，为数字与左侧进度条之间留出间距 */}
            {/* text-xs font-medium: 字号 12px，字重 500 */}
            {/* tabular-nums: 等宽数字 */}
            <div className='ps-2 text-xs font-medium tabular-nums'>
              {valueFormatter(i.value)}
            </div>
          </li>
        )
      })}
    </ul>
  )
}
