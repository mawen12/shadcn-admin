import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'

const data = [
  {
    name: 'Mon',
    clicks: Math.floor(Math.random() * 900) + 100,
    uniques: Math.floor(Math.random() * 700) + 80,
  },
  {
    name: 'Tue',
    clicks: Math.floor(Math.random() * 900) + 100,
    uniques: Math.floor(Math.random() * 700) + 80,
  },
  {
    name: 'Wed',
    clicks: Math.floor(Math.random() * 900) + 100,
    uniques: Math.floor(Math.random() * 700) + 80,
  },
  {
    name: 'Thu',
    clicks: Math.floor(Math.random() * 900) + 100,
    uniques: Math.floor(Math.random() * 700) + 80,
  },
  {
    name: 'Fri',
    clicks: Math.floor(Math.random() * 900) + 100,
    uniques: Math.floor(Math.random() * 700) + 80,
  },
  {
    name: 'Sat',
    clicks: Math.floor(Math.random() * 900) + 100,
    uniques: Math.floor(Math.random() * 700) + 80,
  },
  {
    name: 'Sun',
    clicks: Math.floor(Math.random() * 900) + 100,
    uniques: Math.floor(Math.random() * 700) + 80,
  },
]

/**
 * 用于展示用户点击、访问数的图标
 */
export function AnalyticsChart() {
  return (
    // 全宽，高度 300px
    <ResponsiveContainer width='100%' height={300}>
      <AreaChart data={data}>
        {/* X轴，取 name */}
        <XAxis
          dataKey='name'
          stroke='#888888'
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        {/* Y轴 */}
        <YAxis
          stroke='#888888'
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        {/* 数据线条1，取 clicks */}
        <Area
          type='monotone'
          dataKey='clicks'
          stroke='currentColor'
          className='text-primary'
          fill='currentColor'
          fillOpacity={0.15}
        />
        {/* 数据线条2，取 uniques */}
        <Area
          type='monotone'
          dataKey='uniques'
          stroke='currentColor'
          className='text-muted-foreground'
          fill='currentColor'
          fillOpacity={0.1}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}
