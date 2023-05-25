import { create } from 'zustand'

type ConfirmDialogStore = {
  message: string
  onSubmit?: () => void
  close: () => void
}

export const useConfirmDialogStore = create<ConfirmDialogStore>((set) => ({
  message: '',
  onSubmit: undefined,
  close: () => set({ onSubmit: undefined }),
}))

export const confirmDiaglog = (message: string, onSubmit: () => void) => {
  useConfirmDialogStore.setState({
    message,
    onSubmit,
  })
}
