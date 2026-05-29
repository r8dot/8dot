import { useFrame, useThree } from '@react-three/fiber'
import type { RapierRigidBody } from '@react-three/rapier'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { PLAYER } from '../../lib/constants'
import { usePlayerStore } from '../../store/playerStore'

type Props = {
  playerRef: { current: RapierRigidBody | null }
  meshRef: { current: THREE.Group | null }
  onAnimationChange: (type: 'idle' | 'walk' | 'run') => void
}

export default function DesktopControls({ playerRef, meshRef, onAnimationChange }: Props) {
  const { camera, gl } = useThree()
  const setPlayerPosition = usePlayerStore(s => s.setPlayerPosition)

  const keys = useRef({ w: false, s: false, a: false, d: false })
  const isShift = useRef(false)
  const orbitAngle = useRef(0)
  const orbitPitch = useRef(0.8)
  const zoomRef = useRef(20)
  const isDragging = useRef(false)
  const lastMouse = useRef({ x: 0, y: 0 })
  const camPos = useRef(new THREE.Vector3(0, 20, 20))
  const lookAt = useRef(new THREE.Vector3())

  useEffect(() => {
    camera.position.set(0, 20, 20)
    camera.lookAt(0, 0, 0)

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'KeyW' || e.code === 'ArrowUp') keys.current.w = true
      if (e.code === 'KeyS' || e.code === 'ArrowDown') keys.current.s = true
      if (e.code === 'KeyA' || e.code === 'ArrowLeft') keys.current.a = true
      if (e.code === 'KeyD' || e.code === 'ArrowRight') keys.current.d = true
      if (e.code === 'ShiftLeft') isShift.current = true
    }
    const onKeyUp = (e: KeyboardEvent) => {
      if (e.code === 'KeyW' || e.code === 'ArrowUp') keys.current.w = false
      if (e.code === 'KeyS' || e.code === 'ArrowDown') keys.current.s = false
      if (e.code === 'KeyA' || e.code === 'ArrowLeft') keys.current.a = false
      if (e.code === 'KeyD' || e.code === 'ArrowRight') keys.current.d = false
      if (e.code === 'ShiftLeft') isShift.current = false
    }
    const onMouseDown = (e: MouseEvent) => {
      isDragging.current = true
      lastMouse.current = { x: e.clientX, y: e.clientY }
    }
    const onMouseUp = () => {
      isDragging.current = false
    }
    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return
      const dx = e.clientX - lastMouse.current.x
      const dy = e.clientY - lastMouse.current.y
      orbitAngle.current -= dx * 0.008
      orbitPitch.current = Math.max(0.2,
        Math.min(1.4, orbitPitch.current + dy * 0.005))
      lastMouse.current = { x: e.clientX, y: e.clientY }
    }
    const onWheel = (e: WheelEvent) => {
      zoomRef.current = Math.max(8,
        Math.min(50, zoomRef.current + e.deltaY * 0.05))
    }
    const onContextMenu = (e: Event) => e.preventDefault()

    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('keyup', onKeyUp)
    gl.domElement.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mouseup', onMouseUp)
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('wheel', onWheel)
    window.addEventListener('contextmenu', onContextMenu)

    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('keyup', onKeyUp)
      gl.domElement.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mouseup', onMouseUp)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('contextmenu', onContextMenu)
    }
  }, [camera, gl])

  useFrame(() => {
    const body = playerRef.current
    if (!body) return

    const k = keys.current
    const angle = orbitAngle.current
    const moving = k.w || k.s || k.a || k.d

    const move = new THREE.Vector3()
    const forward = new THREE.Vector3(-Math.sin(angle), 0, -Math.cos(angle))
    const right = new THREE.Vector3(Math.cos(angle), 0, -Math.sin(angle))

    if (k.w) move.addScaledVector(forward, 1)
    if (k.s) move.addScaledVector(forward, -1)
    if (k.a) move.addScaledVector(right, -1)
    if (k.d) move.addScaledVector(right, 1)

    if (move.lengthSq() > 0) {
      const speed = isShift.current
        ? PLAYER.moveSpeed * 1.8
        : PLAYER.moveSpeed
      move.normalize().multiplyScalar(speed)
      if (meshRef.current) {
        const targetAngle = Math.atan2(move.x, move.z)
        meshRef.current.rotation.y = targetAngle
      }
      onAnimationChange(isShift.current ? 'run' : 'walk')
    } else {
      onAnimationChange('idle')
    }

    const vel = body.linvel()
    body.setLinvel({ x: move.x, y: vel.y, z: move.z }, true)

    const pos = body.translation()
    setPlayerPosition({ x: pos.x, y: pos.y, z: pos.z })

    const zoom = zoomRef.current
    const pitch = orbitPitch.current
    const camX = pos.x + zoom * Math.sin(angle) * Math.cos(pitch)
    const camY = pos.y + zoom * Math.sin(pitch)
    const camZ = pos.z + zoom * Math.cos(angle) * Math.cos(pitch)

    camPos.current.set(camX, camY, camZ)
    camera.position.lerp(camPos.current, 0.1)

    lookAt.current.set(pos.x, pos.y + 1, pos.z)
    camera.lookAt(lookAt.current)
  })

  return null
}
