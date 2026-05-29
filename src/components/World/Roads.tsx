import * as THREE from 'three'

type Segment = {
  position: [number, number, number]
  rotation?: [number, number, number]
  scale: [number, number, number]
}

// Oval loop (8 segments) + 4 branch roads only
const ROADS: Segment[] = [
  { position: [0, 0.1, -60], scale: [80, 1, 7] },                             // north
  { position: [0, 0.1, 60], scale: [80, 1, 7] },                              // south
  { position: [-80, 0.1, 0], scale: [7, 1, 80] },                             // west
  { position: [80, 0.1, 0], scale: [7, 1, 80] },                              // east
  { position: [-55, 0.1, -45], rotation: [0, 0.6, 0], scale: [40, 1, 7] },   // NW
  { position: [55, 0.1, -45], rotation: [0, -0.6, 0], scale: [40, 1, 7] },   // NE
  { position: [-55, 0.1, 45], rotation: [0, -0.6, 0], scale: [40, 1, 7] },   // SW
  { position: [55, 0.1, 45], rotation: [0, 0.6, 0], scale: [40, 1, 7] },     // SE
  { position: [-60, 0.1, -20], scale: [20, 1, 7] },                           // -> Sainik School
  { position: [60, 0.1, 20], scale: [20, 1, 7] },                             // -> Kochi Now
  { position: [0, 0.1, -40], scale: [7, 1, 30] },                             // -> Kochi UG
  { position: [-50, 0.1, -50], rotation: [0, 0.7, 0], scale: [40, 1, 7] },   // -> Munnar
]

// Center-line stripes on 4 main straight sections
const STRIPES: Segment[] = [
  { position: [0, 0.11, -60], scale: [80, 1, 0.4] },
  { position: [0, 0.11, 60], scale: [80, 1, 0.4] },
  { position: [-80, 0.11, 0], scale: [0.4, 1, 80] },
  { position: [80, 0.11, 0], scale: [0.4, 1, 80] },
]

// Sandy edges alongside the 4 straight cardinal roads
const EDGES: Array<{ position: [number, number, number]; scale: [number, number, number] }> = [
  // north road edges (z = -60 ± 3.75)
  { position: [0, 0.09, -63.5], scale: [80, 1, 0.5] },
  { position: [0, 0.09, -56.5], scale: [80, 1, 0.5] },
  // south road edges
  { position: [0, 0.09, 63.5], scale: [80, 1, 0.5] },
  { position: [0, 0.09, 56.5], scale: [80, 1, 0.5] },
  // west road edges
  { position: [-83.5, 0.09, 0], scale: [0.5, 1, 80] },
  { position: [-76.5, 0.09, 0], scale: [0.5, 1, 80] },
  // east road edges
  { position: [83.5, 0.09, 0], scale: [0.5, 1, 80] },
  { position: [76.5, 0.09, 0], scale: [0.5, 1, 80] },
]

export default function Roads() {
  return (
    <group>
      {ROADS.map((road, index) => (
        <mesh
          key={`road-${index}`}
          position={road.position}
          rotation={road.rotation ? new THREE.Euler(...road.rotation) : undefined}
          scale={road.scale}
          receiveShadow
        >
          <boxGeometry args={[1, 0.15, 1]} />
          <meshStandardMaterial color="#3D2E1E" />
        </mesh>
      ))}

      {STRIPES.map((stripe, index) => (
        <mesh key={`stripe-${index}`} position={stripe.position} scale={stripe.scale}>
          <boxGeometry args={[1, 0.16, 1]} />
          <meshStandardMaterial color="#FFD080" />
        </mesh>
      ))}

      {EDGES.map((edge, index) => (
        <mesh key={`edge-${index}`} position={edge.position} scale={edge.scale}>
          <boxGeometry args={[1, 0.12, 1]} />
          <meshStandardMaterial color="#8B7355" />
        </mesh>
      ))}
    </group>
  )
}
