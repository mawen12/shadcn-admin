import React, { useState } from 'react'
import useDialogState from '@/hooks/use-dialog-state'
import { type Task } from '../data/schema'

type TasksDialogType = 'create' | 'update' | 'delete' | 'import'

type TasksContextType = {
  // 打开的 Dialog 类型，支持 create/update/delete/import 四种类型
  open: TasksDialogType | null
  setOpen: (str: TasksDialogType | null) => void
  // 当前行
  currentRow: Task | null
  setCurrentRow: React.Dispatch<React.SetStateAction<Task | null>>
}

const TasksContext = React.createContext<TasksContextType | null>(null)

export function TasksProvider({ children }: { children: React.ReactNode }) {
  // 是否打开的状态
  const [open, setOpen] = useDialogState<TasksDialogType>(null)
  // 跟踪当前行
  const [currentRow, setCurrentRow] = useState<Task | null>(null)

  return (
    <TasksContext value={{ open, setOpen, currentRow, setCurrentRow }}>
      {children}
    </TasksContext>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useTasks = () => {
  const tasksContext = React.useContext(TasksContext)

  if (!tasksContext) {
    throw new Error('useTasks has to be used within <TasksContext>')
  }

  return tasksContext
}
