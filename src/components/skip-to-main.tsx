/**
 * 无障碍访问组件，实现了经典的 Skip to Main Content 模式
 * 此处用于一键跳过所有导航，直接接入主内容
 * 纯 HTML 方案，无需 JavaScript，即使 JS 加载失败也能工作
 */
export function SkipToMain() {
  return (
    <a
      // fixed inset-s-44: 固定在页面顶部
      // z-999: 层级最高确保不会被遮挡
      // -translate-y-52: 默认状态下向上平移 52，移出屏幕，不可见，不干扰正常布局 
      // bg-primary: 使用主题色，确保高对比度可读
      // px-4: 横向内边距 1rem 
      // py-2: 纵向内边距 0.5rem
      // text-sm font-medium: 小字，中等字重
      // whitespace-nowrap: 
      // text-primary-foreground: 使用主题色，确保高对比度可读
      // opacity-95 shadow-sm: 轻微半透明，带有阴影，视觉色精致不突兀 
      // transition: 开启平滑过渡动画
      // hover:bg-primary/90: 悬浮时 90% 背景色 
      // focus:translate-y-3: 获得焦点时，向下移动 3 单位
      // focus:transform: 开启位移转换
      // focus-visible:ring-1: 聚焦时显示焦点环，提供视觉反馈 
      // focus-visible:ring-ring: 键盘聚焦的焦点指示器
      className={`fixed inset-s-44 z-999 -translate-y-52 bg-primary px-4 py-2 text-sm font-medium whitespace-nowrap text-primary-foreground opacity-95 shadow-sm transition hover:bg-primary/90 focus:translate-y-3 focus:transform focus-visible:ring-1 focus-visible:ring-ring`}
      // 点击跳转到 id="content" 
      href='#content'
    >
      Skip to Main
    </a>
  )
}
