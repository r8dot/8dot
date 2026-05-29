import { useFrame, useThree } from '@react-three/fiber'
import type { RapierRigidBody } from '@react-three/rapier'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { PLAYER } from '../../lib/constants'
import { usePlayerStore } from '../../store/playerStore'

type Props = { playerRef: { current: RapierRigidBody | null } }

const KEYS: Record<string, string> = {
  KeyW: 'f', KeyS: 'b', KeyA: 'l', KeyD: 'r'
}

export default function DesktopControls({ playerRef }: Props) {
  const { camera, gl } = useThree()
  const setPlayerPosition = usePlayerStore(s => s.setPlayerPosition)
  const locked = useRef(false)
  const yaw = useRef(0)
  const pitch = useRef(0)
  const keys = useRef({ f: false, b: false, l: false, r: false })
  const euler = useRef(new THREE.Euler(0, 0, 0, 'YXZ'))
  const fwd = useRef(new THREE.Vector3())
  const rgt = useRef(new THREE.Vector3())
  const vel = useRef(new THREE.Vector3())

  useEffect(() => {
    // Set camera to spawn position looking forward
    camera.position.set(
      PLAYER.spawn[0],
      PLAYER.spawn[1] + PLAYER.eyeHeight,
      PLAYER.spawn[2]
    )
    camera.rotation.set(0, Math.PI, 0) // face negative Z
    yaw.current = Math.PI
    pitch.current = 0

    const lock = () => gl.domElement.requestPointerLock()
    const onLockChange = () => {
      locked.current = document.pointerLockElement === gl.domElement
    }
    const onMouse = (e: MouseEvent) => {
      if (!locked.current) return
      yaw.current -= e.movementX * 0.002
      pitch.current = Math.max(-1.2, Math.min(1.2,
        pitch.current - e.movementY * 0.002))
    }
    const onKeyDown = (e: KeyboardEvent) => {
      const k = KEYS[e.code]
      if (k) keys.current[k as keyof typeof keys.current] = true
    }
    const onKeyUp = (e: KeyboardEvent) => {
      const k = KEYS[e.code]
      if (k) keys.current[k as keyof typeof keys.current] = false
    }

    gl.domElement.addEventListener('click', lock)
    document.addEventListener('pointerlockchange', onLockChange)
    document.addEventListener('mousemove', onMouse)
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('keyup', onKeyUp)

    return () => {
      gl.domElement.removeEventListener('click', lock)
      document.removeEventListener('pointerlockchange', onLockChange)
      document.removeEventListener('mousemove', onMouse)
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('keyup', onKeyUp)
    }
  }, [camera, gl])

  useFrame(() => {
    const body = playerRef.current
    if (!body) return

    // Apply rotation
    euler.current.set(pitch.current, yaw.current, 0)
    camera.quaternion.setFromEuler(euler.current)

    // Get directions
    camera.getWorldDirection(fwd.current)
    fwd.current.y = 0
    fwd.current.normalize()
    rgt.current.crossVectors(new THREE.Vector3(0,1,0), fwd.current)

    // Build move vector
    vel.current.set(0, 0, 0)
    const k = keys.current
    if (k.f) vel.current.addScaledVector(fwd.current, 1)
    if (k.b) vel.current.addScaledVector(fwd.current, -1)
    if (k.r) vel.current.addScaledVector(rgt.current, -1)
    if (k.l) vel.current.addScaledVector(rgt.current, 1)

    if (vel.current.lengthSq() > 0) {
      vel.current.normalize().multiplyScalar(PLAYER.moveSpeed)
    }

    const current = body.linvel()
    body.setLinvel(
      { x: vel.current.x, y: current.y, z: vel.current.z },
      true
    )

    // Sync camera to body
    const pos = body.translation()
    camera.position.set(pos.x, pos.y + PLAYER.eyeHeight, pos.z)
    setPlayerPosition({ x: pos.x, y: pos.y, z: pos.z })
  })

  return null
}

