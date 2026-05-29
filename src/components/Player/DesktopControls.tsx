import { useFrame, useThree } from '@react-three/fiber'
import type { RapierRigidBody } from '@react-three/rapier'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { PLAYER } from '../../lib/constants'
import { usePlayerStore } from '../../store/playerStore'

type Props = {
  playerRef: { current: RapierRigidBody | null }
  meshRef: { current: THREE.Group | null }
}

const CAM_LERP = 0.08

export default function DesktopControls({ playerRef, meshRef }: Props) {
  const { camera } = useThree()
  const setPlayerPosition = usePlayerStore(s => s.setPlayerPosition)
  const keys = useRef({ w: false, s: false, a: false, d: false })
  const camTarget = useRef(new THREE.Vector3(0, 18, 14))
  const lookTarget = useRef(new THREE.Vector3())
  const zoomRef = useRef(1.0)
  const isRightDragging = useRef(false)
  const orbitAngle = useRef(0)
  const lastMouseX = useRef(0)

  useEffect(() => {
    camera.position.set(0, 18, 14)
    camera.lookAt(0, 0, 0)

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'KeyW' || e.code === 'ArrowUp') keys.current.w = true
      if (e.code === 'KeyS' || e.code === 'ArrowDown') keys.current.s = true
      if (e.code === 'KeyA' || e.code === 'ArrowLeft') keys.current.a = true
      if (e.code === 'KeyD' || e.code === 'ArrowRight') keys.current.d = true
    }
    const onKeyUp = (e: KeyboardEvent) => {
      if (e.code === 'KeyW' || e.code === 'ArrowUp') keys.current.w = false
      if (e.code === 'KeyS' || e.code === 'ArrowDown') keys.current.s = false
      if (e.code === 'KeyA' || e.code === 'ArrowLeft') keys.current.a = false
      if (e.code === 'KeyD' || e.code === 'ArrowRight') keys.current.d = false
    }
    const onWheel = (e: WheelEvent) => {
      zoomRef.current = Math.max(0.5, Math.min(2.5, zoomRef.current + e.deltaY * 0.001))
    }
    const onMouseDown = (e: MouseEvent) => {
      if (e.button === 2) {
        isRightDragging.current = true
        lastMouseX.current = e.clientX
      }
    }
    const onMouseUp = (e: MouseEvent) => {
      if (e.button === 2) isRightDragging.current = false
    }
    const onMouseMove = (e: MouseEvent) => {
      if (!isRightDragging.current) return
      const delta = e.clientX - lastMouseX.current
      orbitAngle.current += delta * 0.01
      lastMouseX.current = e.clientX
    }
    const onContextMenu = (e: Event) => e.preventDefault()

    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('keyup', onKeyUp)
    window.addEventListener('wheel', onWheel)
    window.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mouseup', onMouseUp)
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('contextmenu', onContextMenu)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('keyup', onKeyUp)
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mouseup', onMouseUp)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('contextmenu', onContextMenu)
    }
  }, [camera])

  useFrame(() => {
    const body = playerRef.current
    if (!body) return

    const move = new THREE.Vector3()
    if (keys.current.w) move.z -= 1
    if (keys.current.s) move.z += 1
    if (keys.current.a) move.x -= 1
    if (keys.current.d) move.x += 1

    if (move.lengthSq() > 0) {
      move.normalize().multiplyScalar(PLAYER.moveSpeed)
      if (meshRef.current) {
        const targetAngle = Math.atan2(move.x, move.z)
        meshRef.current.rotation.y = targetAngle
      }
    }

    const vel = body.linvel()
    body.setLinvel({ x: move.x, y: vel.y, z: move.z }, true)

    const pos = body.translation()
    const zoom = zoomRef.current
    const angle = orbitAngle.current

    const offsetX = Math.sin(angle) * 14 * zoom
    const offsetZ = Math.cos(angle) * 14 * zoom
    const offsetY = 18 * zoom

    camTarget.current.set(pos.x + offsetX, pos.y + offsetY, pos.z + offsetZ)
    camera.position.lerp(camTarget.current, CAM_LERP)

    lookTarget.current.set(pos.x, pos.y + 1, pos.z)
    camera.lookAt(lookTarget.current)

    setPlayerPosition({ x: pos.x, y: pos.y, z: pos.z })
  })

  return null
}
