import { RigidBody } from '@react-three/rapier'
import * as THREE from 'three'

function Terrain() {
  return (
    <group>
      {/* Ocean floor — blocks the view through the island edge */}
      <mesh position={[0, -2, 0]} receiveShadow>
        <boxGeometry args={[400, 2, 400]} />
        <meshStandardMaterial color="#1A4A7A" />
      </mesh>

      {/* Beach ring */}
      <mesh position={[0, -0.1, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <ringGeometry args={[108, 125, 64]} />
        <meshStandardMaterial color="#D4A84B" side={THREE.DoubleSide} />
      </mesh>

      {/* Main island surface — walkable */}
      <RigidBody type="fixed" colliders="cuboid">
        <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow castShadow>
          <circleGeometry args={[110, 64]} />
          <meshStandardMaterial color="#4a7c2f" />
        </mesh>
      </RigidBody>
    </group>
  )
}

export default Terrain
