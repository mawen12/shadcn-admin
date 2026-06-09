import { useEffect, useRef } from 'react'
import { useRouterState } from '@tanstack/react-router'
import LoadingBar, { type LoadingBarRef } from 'react-top-loading-bar'

// 使用 react-top-loading-bar 实现一个进度条的效果
// 根据路由的状态来决定是否持续加载
export function NavigationProgress() {
  const ref = useRef<LoadingBarRef>(null)
  const state = useRouterState()

  useEffect(() => {
    // 如果是 pending，则
    if (state.status === 'pending') {
      ref.current?.continuousStart()
    } else {
      ref.current?.complete()
    }
    // 监听 router 的状态
  }, [state.status])

  return (
    <LoadingBar
      color='var(--muted-foreground)'
      ref={ref}
      shadow={true}
      height={2}
    />
  )
}
