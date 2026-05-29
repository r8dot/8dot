import { create } from 'zustand'

type UIStore = {
  activePanel: string | null
  openPanel: (id: string) => void
  closePanel: () => void
}

export const useUIStore = create<UIStore>((set) => ({
  activePanel: null,
  openPanel: (id) => set({ activePanel: id }),
  closePanel: () => set({ activePanel: null }),
}))

