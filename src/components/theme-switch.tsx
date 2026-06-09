import { useEffect } from 'react'
import { Check, Moon, Sun } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useTheme } from '@/context/theme-provider'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

/**
 * 主题及其颜色切换
 */
export function ThemeSwitch() {
  // 从 context 读取
  const { theme, setTheme } = useTheme()

  /* Update theme-color meta tag
   * when theme is updated */
  // 在主题变化时，同步更新页面的 <meta name="theme-color">
  useEffect(() => {
    // 将主题映射到对应颜色
    const themeColor = theme === 'dark' ? '#020817' : '#fff'

    const metaThemeColor = document.querySelector("meta[name='theme-color']")
    // 写入颜色
    if (metaThemeColor) metaThemeColor.setAttribute('content', themeColor)
    // 监听当前主题 
    // TODO by mawen 此处应该监听 resolvedTheme，因为 theme 取值范围为：[light/dark/system]，而 resolvedTheme 为[light/dark]，
    // 也就是说，如果当前是 system，被解析为 light，此时在页面上从 system 切换到 light，也会触发此处事件
  }, [theme])

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        {/* scale-95: 元素显示为原来的 95%，让图标按钮视觉上更紧凑，不显得太顶满 */}
        {/* rounded-full: 圆角拉满，形成完全圆形/胶囊形轮廓 */}
        <Button variant='ghost' size='icon' className='scale-95 rounded-full'>
          {/* size-[1.2rem]: 宽高都设置 1.2rem，让图标大小统一 */}
          {/* scale-100: 默认缩放100%,正常展示 */}
          {/* rotate-0: 默认不旋转 */}
          {/* transition-all: 所有可过渡属性都带动画，所以下面的缩放、旋转切换会更平滑 */}
          {/* dark:scale-0: 当页面处于 dark 模式时，缩放到 0，视觉上相当于隐藏 */}
          {/* dark:-rotate-90: 当页面处于 dark 模式时，逆时针旋转90度，配合缩放一起形成退出动画 */}
          <Sun className='size-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90' />
          {/* absolute: 绝对定位，让月亮和太阳图标叠在同一位置，不额外占布局空间 */}
          {/* size-[1.2rem]: 宽高都设置 1.2rem，让图标大小统一 */}
          {/* scale-0: 默认缩放0,及非 dark 模式下默认看不见 */}
          {/* rotate-90: 默认顺时针旋转 90 度，为后续动画进场准备初始姿态 */}
          {/* transition-all: 所有可过渡属性带动画效果 */}
          {/* dark:scale-100: dark 模式下恢复到正常大小，图标显示出来 */}
          {/* dark:rotate-0: dark 模式下旋转回正，配合缩放形成进入动画 */}
          <Moon className='absolute size-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0' />
          <span className='sr-only'>Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        {/* 设置 theme = light */}
        <DropdownMenuItem onClick={() => setTheme('light')}>
          Light{' '}
          <Check
            size={14}
            // ms-auto 把图标推到行内侧结束侧，作用是让 Light 文本在左，勾选图标贴右，形成标准菜单项布局
            // 当当前 theme 不是 light 时，图标隐藏
            className={cn('ms-auto', theme !== 'light' && 'hidden')}
          />
        </DropdownMenuItem>
        {/* 设置 theme = dark */}
        <DropdownMenuItem onClick={() => setTheme('dark')}>
          Dark
          <Check
            size={14}
            className={cn('ms-auto', theme !== 'dark' && 'hidden')}
          />
        </DropdownMenuItem>
        {/* 设置 theme = system */}
        <DropdownMenuItem onClick={() => setTheme('system')}>
          System
          <Check
            size={14}
            className={cn('ms-auto', theme !== 'system' && 'hidden')}
          />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
