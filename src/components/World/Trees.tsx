type TreeType = 'palm' | 'broad'

type Tree = {
  type: TreeType
  position: [number, number, number]
}

// 25 coconut palms evenly around the road loop
const ROAD_PALMS: Tree[] = Array.from({ length: 25 }, (_, i) => {
  const angle = (i / 25) * Math.PI * 2
  return {
    type: 'palm' as TreeType,
    position: [Math.cos(angle) * 72, 0, Math.sin(angle) * 52] as [number, number, number],
  }
})

// 15 broad Kerala trees in north cluster (Munnar area)
const NORTH_CLUSTER: Tree[] = [
  { type: 'broad', position: [-80, 0, -20] },
  { type: 'broad', position: [-72, 0, -35] },
  { type: 'broad', position: [-60, 0, -50] },
  { type: 'broad', position: [-50, 0, -65] },
  { type: 'broad', position: [-38, 0, -72] },
  { type: 'broad', position: [-25, 0, -78] },
  { type: 'broad', position: [-65, 0, -30] },
  { type: 'broad', position: [-55, 0, -45] },
  { type: 'broad', position: [-42, 0, -58] },
  { type: 'broad', position: [-30, 0, -68] },
  { type: 'broad', position: [-20, 0, -75] },
  { type: 'broad', position: [-70, 0, -55] },
  { type: 'broad', position: [-48, 0, -78] },
  { type: 'broad', position: [-35, 0, -55] },
  { type: 'broad', position: [-22, 0, -42] },
]

// 10 mixed near buildings
const NEAR_BUILDINGS: Tree[] = [
  { type: 'palm', position: [-26, 0, 16] },
  { type: 'broad', position: [-16, 0, 30] },
  { type: 'palm', position: [-6, 0, 40] },
  { type: 'broad', position: [-34, 0, 24] },
  { type: 'palm', position: [50, 0, 24] },
  { type: 'broad', position: [60, 0, 14] },
  { type: 'palm', position: [58, 0, -26] },
  { type: 'broad', position: [48, 0, -34] },
  { type: 'palm', position: [16, 0, -50] },
  { type: 'broad', position: [24, 0, -58] },
]

const TREES: Tree[] = [...ROAD_PALMS, ...NORTH_CLUSTER, ...NEAR_BUILDINGS]

function Palm() {
  return (
    <group>
      <mesh position={[0, 4.5, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.35, 0.25, 9, 8]} />
        <meshStandardMaterial color="#A67C3A" emissive="#3A2010" emissiveIntensity={0.2} />
      </mesh>
      <mesh position={[0, 9.2, 0]} castShadow receiveShadow>
        <sphereGeometry args={[3, 10, 10]} />
        <meshStandardMaterial color="#2D7A1F" emissive="#0A3005" emissiveIntensity={0.3} />
      </mesh>
      <mesh position={[1.5, 8.7, 0.5]} castShadow receiveShadow>
        <sphereGeometry args={[2, 8, 8]} />
        <meshStandardMaterial color="#3A8F28" emissive="#0A3005" emissiveIntensity={0.3} />
      </mesh>
      <mesh position={[0.5, 8.4, 0.3]} castShadow>
        <sphereGeometry args={[0.4, 6, 6]} />
        <meshStandardMaterial color="#8B6520" />
      </mesh>
      <mesh position={[-0.6, 8.3, 0.2]} castShadow>
        <sphereGeometry args={[0.4, 6, 6]} />
        <meshStandardMaterial color="#8B6520" />
      </mesh>
      <mesh position={[0.1, 8.2, -0.7]} castShadow>
        <sphereGeometry args={[0.4, 6, 6]} />
        <meshStandardMaterial color="#8B6520" />
      </mesh>
    </group>
  )
}

function BroadTree() {
  return (
    <group>
      <mesh position={[0, 3, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.5, 0.4, 6, 8]} />
        <meshStandardMaterial color="#6B4A2A" emissive="#2A1A08" emissiveIntensity={0.2} />
      </mesh>
      <mesh position={[0, 7, 0]} castShadow receiveShadow>
        <sphereGeometry args={[5, 10, 10]} />
        <meshStandardMaterial color="#2A6B15" emissive="#0A2805" emissiveIntensity={0.3} />
      </mesh>
      <mesh position={[2, 7.5, 1]} castShadow receiveShadow>
        <sphereGeometry args={[3.5, 8, 8]} />
        <meshStandardMaterial color="#358020" emissive="#0A2805" emissiveIntensity={0.3} />
      </mesh>
      <mesh position={[-1.5, 6.5, 1.5]} castShadow receiveShadow>
        <sphereGeometry args={[3, 8, 8]} />
        <meshStandardMaterial color="#2D6B18" emissive="#0A2805" emissiveIntensity={0.3} />
      </mesh>
    </group>
  )
}

export default function Trees() {
  return (
    <group>
      {TREES.map((tree, index) => (
        <group key={`tree-${index}`} position={tree.position}>
          {tree.type === 'palm' ? <Palm /> : <BroadTree />}
        </group>
      ))}
    </group>
  )
}
