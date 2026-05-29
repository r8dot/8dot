import { create } from 'zustand'

type PlayerPosition = {
  x: number
  y: number
  z: number
  0: number
  1: number
  2: number
}

type PlayerStore = {
  position: PlayerPosition
  setPlayerPosition: (position: { x: number; y: number; z: number }) => void
}

const toPlayerPosition = ({ x, y, z }: { x: number; y: number; z: number }): PlayerPosition => ({
  x,
  y,
  z,
  0: x,
  1: y,
  2: z,
})

export const usePlayerStore = create<PlayerStore>((set) => ({
  position: toPlayerPosition({ x: 0, y: 0, z: 0 }),
  setPlayerPosition: (position) => {
    set({ position: toPlayerPosition(position) })
  },
}))

