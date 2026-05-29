import { Html } from '@react-three/drei'
import type { ReactNode } from 'react'
import { useEffect } from 'react'
import { useProximity } from '../../hooks/useProximity'

type Vec3 = [number, number, number]

type StationProps = {
  id: string
  position: Vec3
  radius: number
  promptLabel: string
  onActivate: () => void
  children: ReactNode
}

function StationPrompt() {
  return (
    <Html center>
      <div
        style={{
          padding: '0.35rem 0.6rem',
          borderRadius: '0.4rem',
          background: 'rgba(17, 24, 39, 0.85)',
          color: '#ffffff',
          fontSize: '0.85rem',
          fontWeight: 600,
          letterSpacing: '0.03em',
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
        }}
      >
        Press E
      </div>
    </Html>
  )
}

function Station({ id, position, radius, promptLabel, onActivate, children }: StationProps) {
  const isNear = useProximity(position, radius)

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (!isNear) return
      if (event.code === 'KeyE') {
        onActivate()
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [isNear, onActivate])

  return (
    <group position={position} userData={{ stationId: id, promptLabel }}>
      {children}
      {isNear ? (
        <group position={[0, 1.8, 0]}>
          <StationPrompt />
        </group>
      ) : null}
    </group>
  )
}

export default Station

