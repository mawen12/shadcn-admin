# Analyze

## CSS

1. 对于不同级别的文字，使用文字大小、颜色、字重进行区分
```html
<DropdownMenuLabel className='font-normal'>
    <div className='flex flex-col gap-1.5'>
        <!-- 主要 -->
        <p className='text-sm leading-none font-medium'>satnaing</p>
        <!-- 次要 -->
        <!-- text-xs: 相比上方更小一号的字体 -->
        <!-- text-muted-foreground: 相比上方采用弱化前景色 -->
        <p className='text-xs leading-none text-muted-foreground'>satnaingdev@gmail.com</p>
    </div>
</DropdownMenuLabel>
```

2. 对于依赖于父组件的子组件，采用 group 来实现状态的同步
```html
<Button
    {...props}
    variant='outline'
    <!-- group: 给子元素提供 group-hover 联动条件 -->
    className={cn(
    'group relative h-8 w-full flex-1 justify-start rounded-md bg-muted/25 text-sm font-normal text-muted-foreground shadow-none hover:bg-accent sm:w-40 sm:pe-12 md:flex-none lg:w-52 xl:w-64', className )}
    aria-keyshortcuts='Meta+K Control+K'
    onClick={() => setOpen(true)}
>
    <SearchIcon aria-hidden='true' className='absolute inset-s-1.5 top-1/2 -translate-y-1/2' size={16} />
    <span className='ms-4'>{placeholder}</span>
    {/* group-hover:bg-accent: 当 group 处于鼠标悬浮时，kbd 背景颜色同步变为 accent */}
    <kbd className='pointer-events-none absolute inset-e-[0.3rem] top-[0.3rem] hidden h-5 items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 select-none group-hover:bg-accent sm:flex'>
    <span className='text-xs'>⌘</span>K
    </kbd>
</Button>
```

3. 对于操作过程中的错误页面，不仅提供出错信息，还要提供返回上一页/返回根路径的操作

```tsx
<div className={cn('h-svh w-full', className)}>
    <div className='m-auto flex h-full w-full flex-col items-center justify-center gap-2'>
    {!minimal && (
        <h1 className='text-[7rem] leading-tight font-bold'>500</h1>
    )}
    <span className='font-medium'>Oops! Something went wrong {`:')`}</span>
    <p className='text-center text-muted-foreground'>
        We apologize for the inconvenience. <br /> Please try again later.
    </p>

    {!minimal && (
        <div className='mt-6 flex gap-4'>
        {/* 回退到前一步历史 */}
        <Button variant='outline' onClick={() => history.go(-1)}>
            Go Back
        </Button>
        {/* 回到主页 */}
        <Button onClick={() => navigate({ to: '/' })}>Back to Home</Button>
        </div>
    )}
    </div>
</div>
```

4. 考虑不同容器宽度下的展示效果，使用基于断点的展示方式
```tsx
<Button
    {...props}
    variant='outline'
    className={cn(
    {/* sm:w-40 sm:pe-12 md:flex-none lg:w-52 xl:w-64 不同断点下展示不同的样式 */}
    'group relative h-8 w-full hover:bg-accent sm:w-40 sm:pe-12 md:flex-none lg:w-52 xl:w-64', className )}
    aria-keyshortcuts='Meta+K Control+K'
    onClick={() => setOpen(true)}
>
</Button>
```

5. 基于 TailwindCSS 的后代选择器来实现状态同步

```tsx
<SidebarInset
className={cn(
    '@container/content',
    // 匹配后代元素中 data-layout="fixed" 的属性，此处用于和 Layout -> Main 中的形成联动
    // 使用小视口高度，排除浏览器地址栏
    'has-data-[layout=fixed]:h-svh',

    // 当同级元素 sidebar 的 variant=inset 或当前容器内的 layout=fixed，使用高度减去间距
    // 即如果是 inset 样式，且布局为 fixed 时，主内容区两侧有外边距，总高度需要减去这些外边距，防止内容移除到视口之外
    'peer-data-[variant=inset]:has-data-[layout=fixed]:h-[calc(100svh-(var(--spacing)*4))]'
)}
>
    {children ?? <Outlet />}
</SidebarInset>
```



## State

1. 全局状态采用 `配置 > cookie -> 默认值` 的顺序处理
```tsx
const [theme, _setTheme] = useState<Theme>(
    // 尝试从 cookie 中读取，如果没有就使用默认值
    () => (getCookie(storageKey) as Theme) || defaultTheme
  )
```

2. 需要依赖外部的值，比如系统主题、按键、滚动等操作，注册监听事件，并在结束时注销该事件。
```tsx
const [open, setOpen] = useState(false)

useEffect(() => {
const down = (e: KeyboardEvent) => {
    if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
    e.preventDefault()
    setOpen((open) => !open)
    }
}
// 按下 keydown + meta/ctrl 键，更新状态
// 注册事件
document.addEventListener('keydown', down)

// 注销事件
return () => document.removeEventListener('keydown', down)
}, [])
```

## API

5. API 请求基于响应的 http status 进行全局处理
```tsx
onError: (error) => {
    if (error instanceof AxiosError) {
        // 401
        if (error.response?.status === 401) {
            toast.error('Session expired!')
            useAuthStore.getState().auth.reset()
            const redirect = `${router.history.location.href}`
            router.navigate({ to: '/sign-in', search: { redirect } })
        }
        // 500
        if (error.response?.status === 500) {
            toast.error('Internal Server Error!')
            if (import.meta.env.PROD) {
            router.navigate({ to: '/500' })
            }
        }
        // 403
        if (error.response?.status === 403) {
        }
    }
},
```

6.