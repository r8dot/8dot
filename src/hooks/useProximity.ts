import { useMemo } from 'react'
import * as playerStoreModule from '../store/playerStore'

type Vec3 = [number, number, number]

type PlayerStoreHook = <T>(selector: (state: { position?: Vec3 }) => T) => T

const maybeUsePlayerStore = (playerStoreModule as Record<string, unknown>)[
  'usePlayerStore'
] as PlayerStoreHook | undefined

export function useProximity(position: Vec3, radius: number): boolean {
  const playerPosition =
    typeof maybeUsePlayerStore === 'function'
      ? maybeUsePlayerStore((state) => state.position ?? [0, 0, 0])
      : ([0, 0, 0] as Vec3)

  return useMemo(() => {
    const dx = playerPosition[0] - position[0]
    const dy = playerPosition[1] - position[1]
    const dz = playerPosition[2] - position[2]
    const distance = Math.sqrt(dx * dx + dy * dy + dz * dz)
    return distance <= radius
  }, [playerPosition, position, radius])
}

