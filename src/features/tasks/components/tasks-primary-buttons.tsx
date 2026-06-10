import { Download, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTasks } from './tasks-provider'

/**
 * 提供 Create 和 Import 按钮组
 */
export function TasksPrimaryButtons() {
  // 从 task context 读取
  const { setOpen } = useTasks()
  return (
    <div className='flex gap-2'>
      {/* import 按钮，点击打开 Import Dialog */}
      <Button
        variant='outline'
        className='space-x-1'
        onClick={() => setOpen('import')}
      >
        <span>Import</span> <Download size={18} />
      </Button>
      {/* Create 按钮，点击打开 Create Dialog */}
      <Button className='space-x-1' onClick={() => setOpen('create')}>
        <span>Create</span> <Plus size={18} />
      </Button>
    </div>
  )
}
