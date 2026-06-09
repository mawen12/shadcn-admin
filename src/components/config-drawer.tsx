import { type SVGProps } from 'react'
import { Root as Radio, Item } from '@radix-ui/react-radio-group'
import { CircleCheck, RotateCcw, Settings } from 'lucide-react'
import { IconDir } from '@/assets/custom/icon-dir'
import { IconLayoutCompact } from '@/assets/custom/icon-layout-compact'
import { IconLayoutDefault } from '@/assets/custom/icon-layout-default'
import { IconLayoutFull } from '@/assets/custom/icon-layout-full'
import { IconSidebarFloating } from '@/assets/custom/icon-sidebar-floating'
import { IconSidebarInset } from '@/assets/custom/icon-sidebar-inset'
import { IconSidebarSidebar } from '@/assets/custom/icon-sidebar-sidebar'
import { IconThemeDark } from '@/assets/custom/icon-theme-dark'
import { IconThemeLight } from '@/assets/custom/icon-theme-light'
import { IconThemeSystem } from '@/assets/custom/icon-theme-system'
import { cn } from '@/lib/utils'
import { useDirection } from '@/context/direction-provider'
import { type Collapsible, useLayout } from '@/context/layout-provider'
import { useTheme } from '@/context/theme-provider'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { useSidebar } from './ui/sidebar'

export function ConfigDrawer() {
  const { setOpen } = useSidebar()
  const { resetDir } = useDirection()
  const { resetTheme } = useTheme()
  const { resetLayout } = useLayout()

  const handleReset = () => {
    setOpen(true)
    resetDir()
    resetTheme()
    resetLayout()
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size='icon'
          variant='ghost'
          aria-label='Open theme settings'
          // rounded-full: 圆角拉满，形成完全圆形/胶囊形轮廓
          className='rounded-full'
        >
          <Settings aria-hidden='true' />
        </Button>
      </SheetTrigger>
      {/* flex 布局 */}
      <SheetContent className='flex flex-col'>
        {/* 顶部标题 */}
        {/* pb-0: 把底部内边距清零 */}
        {/* text-start: 文本按行内起始方式对齐，相比 text-left 更加友好，支持 LTR/RTL */}
        <SheetHeader className='pb-0 text-start'>
          <SheetTitle>Theme Settings</SheetTitle>
          <SheetDescription>
            Adjust the appearance and layout to suit your preferences.
          </SheetDescription>
        </SheetHeader>
        {/* pace-y-6: 让直接子元素直接有垂直间距 1.5rem(24px) */}
        {/* overflow-y-auto: 纵向内容超出时显示滚动 */}
        {/* px-4: 左右内边距 1rem(16px)，避免内容贴边 */}
        <div className='space-y-6 overflow-y-auto px-4'>
          <ThemeConfig />
          <SidebarConfig />
          <LayoutConfig />
          <DirConfig />
        </div>

        {/* 底部 Reset 区域 */}
        <SheetFooter className='gap-2'>
          {/* 重置按钮 */}
          <Button
            variant='destructive'
            onClick={handleReset}
            aria-label='Reset all settings to default values'
          >
            Reset
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

function SectionTitle({
  title,
  showReset = false,
  onReset,
  resetAriaLabel,
  className,
}: {
  // 展示标题
  title: string
  // 是否展示 reset
  showReset?: boolean
  // reset 触发事件
  onReset?: () => void
  /** Shown on the small per-section reset (RotateCcw) for accessibility and tests. */
  resetAriaLabel?: string
  className?: string
}) {
  return (
    <div
      // mb-2: 下边距 0.5rem(8px)，让标题和下面的配置项拉开间距 
      // flex items-center gap-2: Flex 布局，让标题和右侧 reset 一起排列，保证垂直对齐
      //  text-sm font-semibold text-muted-foreground: 小字号、半粗体、主题里的弱化前景色
      className={cn(
        'mb-2 flex items-center gap-2 text-sm font-semibold text-muted-foreground',
        className
      )}
    >
      {title}
      {showReset && onReset && (
        <Button
          type='button'
          size='icon'
          variant='secondary'
          // rounded-full 圆角拉满，形成完全圆形/胶囊形轮廓
          className='size-4 rounded-full'
          onClick={onReset}
          aria-label={resetAriaLabel}
        >
          <RotateCcw className='size-3' />
        </Button>
      )}
    </div>
  )
}

function RadioGroupItem({
  item,
  isTheme = false,
}: {
  // 
  item: {
    // 值
    value: string
    // 标签名
    label: string
    // 图标
    icon: (props: SVGProps<SVGSVGElement>) => React.ReactElement
  }
  isTheme?: boolean
}) {
  return (
    // 使用 Item 来实现
    <Item
      value={item.value}
      // group: 标记为一个 group，之后子元素就可以用 group-* 或 group-data-* 来根据父元素状态联动样式
      // outline-none: 去掉默认轮廓
      // transition duration-200 ease-in: 开启动画过渡，过渡时长 200ms，动画开始时较慢，后面加速的缓动曲线
      className={cn('group outline-none', 'transition duration-200 ease-in')}
      aria-label={`Select ${item.label.toLowerCase()}`}
      aria-describedby={`${item.value}-description`}
    >
      <div
        className={cn(
          // relative: 设置为相对定位，方便内部绝对定位元素参考它定位，比如之后的勾选图标 
          // rounded-[6px]: 圆角6px，让预览卡片边缘更柔和
          // ring-[1px] ring-border: 外围加 1px ring，并使用主题里的 border 颜色，相当于基础边框效果
          'relative rounded-[6px] ring-[1px] ring-border',
          // group-data-[state=checked]:shadow-2xl: 当父级 Item 处于选中状态时，加较强阴影，用来增强当前选项的层级感和被选中感
          // group-data-[state=checked]:ring-primary: 当父级 Item 处于选中状态时，把 ring 颜色切换到主题主色，让选中态更加明确
          'group-data-[state=checked]:shadow-2xl group-data-[state=checked]:ring-primary',
          // 当父级获得可见焦点时，把 ring 加粗到 2px
          'group-focus-visible:ring-2'
        )}
        role='img'
        aria-hidden='false'
        aria-label={`${item.label} option preview`}
      >
        {/* 勾选标记不是贴在卡片内部，而是半悬浮在右上角边缘 */}
        {/* 只有当前选中的选项才显示，视觉上像卡片角上的状态徽章 */}
        <CircleCheck
          className={cn(
            // size-6: 宽高都是 1.5rem(24px)，保证标记足够醒目
            // fill-primary: 圆形主题填充色为主题主色，让选中状态更醒目
            // stroke-white: 图标线条为白色
            'size-6 fill-primary stroke-white',
            // 当父级单选框是未选中状态时隐藏
            'group-data-[state=unchecked]:hidden',
            // absolute: 绝对定位
            // top-0 right-0: 锚定到预览卡片右上角
            // translate-x-1/2: 在向右平移自身宽度的一半
            // -translate-y-1/2: 在向上平移自身高度的一半
            'absolute top-0 right-0 translate-x-1/2 -translate-y-1/2'
          )}
          aria-hidden='true'
        />
        <item.icon
          className={cn(
            // 非主题参与选中/非选中的配色切换
            !isTheme &&
            // fill-primary: 默认填充色为主题主色
            // stroke-primary: 默认描边色也为主题主色
            // group-data-[state=unchecked]:fill-muted-foreground: 当父级单选项未被选中时，填充色改成弱化前景色
            // group-data-[state=unchecked]:stroke-muted-foreground: 当父级单选项未被选中时，描边色改成弱化前景色
            'fill-primary stroke-primary group-data-[state=unchecked]:fill-muted-foreground group-data-[state=unchecked]:stroke-muted-foreground'
          )}
          aria-hidden='true'
        />
      </div>

      <div
        // mt-1: 顶部外边距 1rem，与上方的 icon 保持一定距离
        // text-xs: 文本大小
        className='mt-1 text-xs'
        id={`${item.value}-description`}
        aria-live='polite'
      >
        {item.label}
      </div>
    </Item>
  )
}

function ThemeConfig() {
  // 从 context 中读取 theme
  const { defaultTheme, theme, setTheme } = useTheme()
  return (
    <div>
      <SectionTitle
        title='Theme'
        // 非默认选项显示 reset 按钮
        showReset={theme !== defaultTheme}
        onReset={() => setTheme(defaultTheme)}
        resetAriaLabel='Reset theme preference to default'
      />
      <Radio
        value={theme}
        onValueChange={setTheme}
        // grid: 网格布局 
        // w-full: 宽度撑满父容器可用空间
        // max-w-md: 最大宽度限制为 md，即使父容器再宽，这块选项区也不会无限拉长 
        // grid-cols-3: 网格固定3列 
        // gap-4: 网格间距 1rem
        className='grid w-full max-w-md grid-cols-3 gap-4'
        aria-label='Select theme preference'
        aria-describedby='theme-description'
      >
        {[
          {
            value: 'system',
            label: 'System',
            icon: IconThemeSystem,
          },
          {
            value: 'light',
            label: 'Light',
            icon: IconThemeLight,
          },
          {
            value: 'dark',
            label: 'Dark',
            icon: IconThemeDark,
          },
        ].map((item) => (
          <RadioGroupItem key={item.value} item={item} isTheme />
        ))}
      </Radio>
      <div id='theme-description' className='sr-only'>
        Choose between system preference, light mode, or dark mode
      </div>
    </div>
  )
}

function SidebarConfig() {
  const { defaultVariant, variant, setVariant } = useLayout()
  return (
    // max-md:hidden: 在 md 及以下断点时隐藏元素(最大到 md)
    <div className='max-md:hidden'>
      <SectionTitle
        title='Sidebar'
        showReset={defaultVariant !== variant}
        onReset={() => setVariant(defaultVariant)}
        resetAriaLabel='Reset sidebar style to default'
      />
      <Radio
        value={variant}
        onValueChange={setVariant}
        // grid: 网格布局 
        // w-full: 宽度撑满父容器可用空间
        // max-w-md: 最大宽度限制为 md，即使父容器再宽，这块选项区也不会无限拉长 
        // grid-cols-3: 网格固定3列 
        // gap-4: 网格间距 1rem
        className='grid w-full max-w-md grid-cols-3 gap-4'
        aria-label='Select sidebar style'
        aria-describedby='sidebar-description'
      >
        {[
          {
            value: 'inset',
            label: 'Inset',
            icon: IconSidebarInset,
          },
          {
            value: 'floating',
            label: 'Floating',
            icon: IconSidebarFloating,
          },
          {
            value: 'sidebar',
            label: 'Sidebar',
            icon: IconSidebarSidebar,
          },
        ].map((item) => (
          <RadioGroupItem key={item.value} item={item} />
        ))}
      </Radio>
      <div id='sidebar-description' className='sr-only'>
        Choose between inset, floating, or standard sidebar layout
      </div>
    </div>
  )
}

function LayoutConfig() {
  const { open, setOpen } = useSidebar()
  const { defaultCollapsible, collapsible, setCollapsible } = useLayout()

  const radioState = open ? 'default' : collapsible

  return (
    // max-md:hidden: 在 md 及以下断点时隐藏元素(最大到 md)
    <div className='max-md:hidden'>
      {/* title 部分 */}
      <SectionTitle
        title='Layout'
        showReset={radioState !== 'default'}
        onReset={() => {
          setOpen(true)
          setCollapsible(defaultCollapsible)
        }}
        resetAriaLabel='Reset layout options to default'
      />
      <Radio
        value={radioState}
        onValueChange={(v) => {
          if (v === 'default') {
            setOpen(true)
            return
          }
          setOpen(false)
          setCollapsible(v as Collapsible)
        }}
        // grid: 网格布局 
        // w-full: 宽度撑满父容器可用空间
        // max-w-md: 最大宽度限制为 md，即使父容器再宽，这块选项区也不会无限拉长 
        // grid-cols-3: 网格固定3列 
        // gap-4: 网格间距 1rem
        className='grid w-full max-w-md grid-cols-3 gap-4'
        aria-label='Select layout style'
        aria-describedby='layout-description'
      >
        {[
          {
            value: 'default',
            label: 'Default',
            icon: IconLayoutDefault,
          },
          {
            value: 'icon',
            label: 'Compact',
            icon: IconLayoutCompact,
          },
          {
            value: 'offcanvas',
            label: 'Full layout',
            icon: IconLayoutFull,
          },
        ].map((item) => (
          <RadioGroupItem key={item.value} item={item} />
        ))}
      </Radio>
      <div id='layout-description' className='sr-only'>
        Choose between default expanded, compact icon-only, or full layout mode
      </div>
    </div>
  )
}

function DirConfig() {
  const { defaultDir, dir, setDir } = useDirection()
  return (
    <div>
      <SectionTitle
        title='Direction'
        showReset={defaultDir !== dir}
        onReset={() => setDir(defaultDir)}
        resetAriaLabel='Reset text direction to default'
      />
      <Radio
        value={dir}
        onValueChange={setDir}
        // grid: 网格布局 
        // w-full: 宽度撑满父容器可用空间
        // max-w-md: 最大宽度限制为 md，即使父容器再宽，这块选项区也不会无限拉长 
        // grid-cols-3: 网格固定3列 
        // gap-4: 网格间距 1rem
        className='grid w-full max-w-md grid-cols-3 gap-4'
        aria-label='Select site direction'
        aria-describedby='direction-description'
      >
        {[
          {
            value: 'ltr',
            label: 'Left to Right',
            icon: (props: SVGProps<SVGSVGElement>) => (
              <IconDir dir='ltr' {...props} />
            ),
          },
          {
            value: 'rtl',
            label: 'Right to Left',
            icon: (props: SVGProps<SVGSVGElement>) => (
              <IconDir dir='rtl' {...props} />
            ),
          },
        ].map((item) => (
          <RadioGroupItem key={item.value} item={item} />
        ))}
      </Radio>
      <div id='direction-description' className='sr-only'>
        Choose between left-to-right or right-to-left site direction
      </div>
    </div>
  )
}
