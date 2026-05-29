import { RigidBody } from '@react-three/rapier'

function Terrain() {
  return (
    <RigidBody type="fixed" colliders="cuboid">
      <mesh position={[44, -1, -20]} castShadow={false} receiveShadow={true}>
        <boxGeometry args={[600, 2, 600]} />
        <meshStandardMaterial color="#5C8A3C" />
      </mesh>
    </RigidBody>
  )
}

export default Terrain
