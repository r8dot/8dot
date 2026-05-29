import { CapsuleCollider, RigidBody, type RapierRigidBody } from '@react-three/rapier'
import { useRef } from 'react'
import { PLAYER } from '../../lib/constants'
import DesktopControls from './DesktopControls'

function Player() {
  const playerRef = useRef<RapierRigidBody | null>(null)

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
      <DesktopControls playerRef={playerRef} />
    </>
  )
}

export default Player
