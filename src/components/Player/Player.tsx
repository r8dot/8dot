import { CapsuleCollider, RigidBody, type RapierRigidBody } from '@react-three/rapier'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'
import { PLAYER } from '../../lib/constants'
import DesktopControls from './DesktopControls'

function Player() {
  const playerRef = useRef<RapierRigidBody | null>(null)
  const meshRef = useRef<THREE.Group>(null)

  useFrame(() => {
    const body = playerRef.current
    if (!body || !meshRef.current) return
    const pos = body.translation()
    meshRef.current.position.set(pos.x, pos.y, pos.z)
  })

  return (
    <>
      <RigidBody
        ref={playerRef}
        colliders={false}
        position={PLAYER.spawn}
        enabledRotations={[false, false, false]}
        canSleep={false}
      >
        <CapsuleCollider args={[PLAYER.capsuleHalfHeight, PLAYER.capsuleRadius]} />
      </RigidBody>

      <group ref={meshRef} scale={[2, 2, 2]}>
        {/* Legs — white mundu */}
        <mesh position={[0, -0.5, 0]} castShadow>
          <cylinderGeometry args={[0.22, 0.18, 0.9, 8]} />
          <meshStandardMaterial color="#F0EEE8" />
        </mesh>
        {/* Body — white shirt */}
        <mesh position={[0, 0.3, 0]} castShadow>
          <boxGeometry args={[0.45, 0.7, 0.28]} />
          <meshStandardMaterial color="#F5F0E8" />
        </mesh>
        {/* Head */}
        <mesh position={[0, 0.85, 0]} castShadow>
          <sphereGeometry args={[0.22, 10, 10]} />
          <meshStandardMaterial color="#C68642" />
        </mesh>
        {/* Hair */}
        <mesh position={[0, 1.0, 0]} castShadow>
          <sphereGeometry args={[0.23, 10, 10]} />
          <meshStandardMaterial color="#1A0A00" />
        </mesh>
        {/* Left arm */}
        <mesh position={[-0.3, 0.25, 0]} rotation={[0, 0, 0.3]} castShadow>
          <capsuleGeometry args={[0.07, 0.4, 4, 6]} />
          <meshStandardMaterial color="#C68642" />
        </mesh>
        {/* Right arm */}
        <mesh position={[0.3, 0.25, 0]} rotation={[0, 0, -0.3]} castShadow>
          <capsuleGeometry args={[0.07, 0.4, 4, 6]} />
          <meshStandardMaterial color="#C68642" />
        </mesh>
      </group>

      <DesktopControls playerRef={playerRef} meshRef={meshRef} />
    </>
  )
}

export default Player
