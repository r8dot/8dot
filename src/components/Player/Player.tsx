import { useRef, useEffect } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { CapsuleCollider, RigidBody, type RapierRigidBody } from '@react-three/rapier'
import * as THREE from 'three'
import { PLAYER } from '../../lib/constants'
import DesktopControls from './DesktopControls'

useGLTF.preload('/models/Walking.glb')

export default function Player() {
  const playerRef = useRef<RapierRigidBody | null>(null)
  const groupRef = useRef<THREE.Group>(null)

  const { scene, animations } = useGLTF('/models/Walking.glb')
  const { actions } = useAnimations(animations, groupRef)

  useEffect(() => {
    const anim = Object.values(actions)[0]
    if (anim) anim.reset().fadeIn(0.3).play()
  }, [actions])

  return (
    <>
      <RigidBody
        ref={playerRef}
        colliders={false}
        position={PLAYER.spawn}
        enabledRotations={[false, false, false]}
        canSleep={false}
        linearDamping={8}
      >
        <CapsuleCollider args={[PLAYER.capsuleHalfHeight, PLAYER.capsuleRadius]} />
      </RigidBody>
      <group ref={groupRef} scale={[0.01, 0.01, 0.01]}>
        <primitive object={scene} />
      </group>
      <DesktopControls
        playerRef={playerRef}
        meshRef={groupRef}
        onAnimationChange={() => {}}
      />
    </>
  )
}
