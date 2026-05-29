type Segment = {
  position: [number, number, number]
  rotation?: [number, number, number]
  scale: [number, number, number]
}

// Main oval loop (8 segments) + branch roads + inner cross
const ROADS: Segment[] = [
  { position: [0, 0.1, -60], scale: [80, 1, 10] },           // north
  { position: [0, 0.1, 60], scale: [80, 1, 10] },            // south
  { position: [-80, 0.1, 0], scale: [10, 1, 80] },           // west
  { position: [80, 0.1, 0], scale: [10, 1, 80] },            // east
  { position: [-55, 0.1, -45], rotation: [0, 0.6, 0], scale: [40, 1, 10] },  // NW
  { position: [55, 0.1, -45], rotation: [0, -0.6, 0], scale: [40, 1, 10] },  // NE
  { position: [-55, 0.1, 45], rotation: [0, -0.6, 0], scale: [40, 1, 10] },  // SW
  { position: [55, 0.1, 45], rotation: [0, 0.6, 0], scale: [40, 1, 10] },    // SE
  { position: [-60, 0.1, -20], scale: [20, 1, 10] },         // branch -> Sainik School
  { position: [60, 0.1, 20], scale: [20, 1, 10] },           // branch -> Axis Bank
  { position: [0, 0.1, -40], scale: [10, 1, 30] },           // branch -> St Paul's
  // Inner cross roads
  { position: [0, 0.12, 0], scale: [160, 1, 8] },            // inner east-west
  { position: [0, 0.12, 0], scale: [8, 1, 120] },            // inner north-south
  // Zone branches
  { position: [-50, 0.12, -50], rotation: [0, 0.7, 0], scale: [40, 1, 7] }, // -> Munnar
  { position: [30, 0.12, -50], scale: [7, 1, 40] },          // -> college
  { position: [60, 0.12, 20], scale: [7, 1, 30] },           // -> Pune zone
]

// Center-line stripes on the 4 main straight sections
const STRIPES: Segment[] = [
  { position: [0, 0.1, -60], scale: [80, 1, 0.5] },
  { position: [0, 0.1, 60], scale: [80, 1, 0.5] },
  { position: [-80, 0.1, 0], scale: [0.5, 1, 80] },
  { position: [80, 0.1, 0], scale: [0.5, 1, 80] },
]

export default function Roads() {
  return (
    <group>
      {ROADS.map((road, index) => (
        <mesh
          key={`road-${index}`}
          position={road.position}
          rotation={road.rotation ?? [0, 0, 0]}
          scale={road.scale}
          receiveShadow
        >
          <boxGeometry args={[1, 0.15, 1]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>
      ))}

      {STRIPES.map((stripe, index) => (
        <mesh
          key={`stripe-${index}`}
          position={[stripe.position[0], 0.1, stripe.position[2]]}
          scale={stripe.scale}
        >
          <boxGeometry args={[1, 0.16, 1]} />
          <meshStandardMaterial color="#FFD080" />
        </mesh>
      ))}
    </group>
  )
}
