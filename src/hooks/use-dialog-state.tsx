import { useState } from 'react'

/**
 * 可切换式(toggle)打开状态
 * 
 * Custom hook for confirm dialog
 * @param initialState string | null
 * @returns A stateful value, and a function to update it.
 * @example const [open, setOpen] = useDialogState<"approve" | "reject">()
 */
export default function useDialogState<T extends string | boolean>(
  initialState: T | null = null
) {
  const [open, _setOpen] = useState<T | null>(initialState)

  const setOpen = (str: T | null) =>
    // 拿到上一次的状态，比如和之前一致，则设置为 null，否则设置为 str
    _setOpen((prev) => (prev === str ? null : str))

  return [open, setOpen] as const
}
