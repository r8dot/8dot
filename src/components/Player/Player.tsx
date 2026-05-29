import { useRef, useEffect } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { CapsuleCollider, RigidBody, type RapierRigidBody } from '@react-three/rapier'
import * as THREE from 'three'
import { PLAYER } from '../../lib/constants'
import DesktopControls from './DesktopControls'

useGLTF.preload('/models/Remy.glb')
useGLTF.preload('/models/idle.glb')
useGLTF.preload('/models/Walking.glb')
useGLTF.preload('/models/standard_run.glb')

export default function Player() {
  const playerRef = useRef<RapierRigidBody | null>(null)
  const groupRef = useRef<THREE.Group>(null)
  const currentAnim = useRef<string>('idle')

  const { scene } = useGLTF('/models/Remy.glb')
  const { animations: idleAnims } = useGLTF('/models/idle.glb')
  const { animations: walkAnims } = useGLTF('/models/Walking.glb')
  const { animations: runAnims } = useGLTF('/models/standard_run.glb')

  const allAnimations = [...idleAnims, ...walkAnims, ...runAnims]

  const { actions } = useAnimations(allAnimations, groupRef)

  useEffect(() => {
    const action = actions[idleAnims[0]?.name]
    if (action) {
      action.reset().fadeIn(0.3).play()
      currentAnim.current = idleAnims[0]?.name
    }
  }, [actions])

  const switchAnimation = (type: 'idle' | 'walk' | 'run') => {
    const nameMap = {
      idle: idleAnims[0]?.name,
      walk: walkAnims[0]?.name,
      run: runAnims[0]?.name,
    }
    const newName = nameMap[type]
    if (!newName || currentAnim.current === newName) return

    const current = actions[currentAnim.current]
    const next = actions[newName]
    if (!next) return

    current?.fadeOut(0.2)
    next.reset().fadeIn(0.2).play()
    currentAnim.current = newName
  }

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
        onAnimationChange={switchAnimation}
      />
    </>
  )
}
