const PALM_POSITIONS: Array<[number, number, number]> = [
  [-8, 0, 3],
  [-4, 0, 4],
  [0, 0, 5],
  [8, 0, 2],
  [10, 0, 4],
  [-10, 0, 2],
]

type MatProps = { color: string }

function Mat({ color }: MatProps) {
  return <meshStandardMaterial color={color} flatShading={true} />
}

export default function KochiUndergrad() {
  return (
    <group>
      {/* Sandy ground near water */}
      <mesh position={[0, 0.06, 0]} castShadow receiveShadow>
        <boxGeometry args={[15, 0.12, 6]} />
        <Mat color="#D4A84B" />
      </mesh>

      {/* Stone path to dock */}
      <mesh position={[-6, 0.07, 2]} castShadow receiveShadow>
        <boxGeometry args={[3, 0.12, 8]} />
        <Mat color="#B8A890" />
      </mesh>

      {/* Backwater */}
      <mesh position={[0, 0.08, -5]} castShadow receiveShadow>
        <boxGeometry args={[30, 0.15, 10]} />
        <Mat color="#3A7BD5" />
      </mesh>

      {/* Water reflection strip */}
      <mesh position={[0, 0.1, -3]} castShadow receiveShadow>
        <boxGeometry args={[30, 0.05, 2]} />
        <Mat color="#5A9BE5" />
      </mesh>

      {/* Houseboat hull */}
      <mesh position={[3, 0.6, -4]} castShadow receiveShadow>
        <boxGeometry args={[10, 1.2, 4]} />
        <Mat color="#6B4A14" />
      </mesh>

      {/* Cabin */}
      <mesh position={[3, 2.35, -4]} castShadow receiveShadow>
        <boxGeometry args={[8, 2.5, 3.5]} />
        <Mat color="#FFFAF2" />
      </mesh>

      {/* Cabin roof */}
      <mesh position={[3, 3.65, -4]} rotation={[0.1, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[9, 0.4, 4]} />
        <Mat color="#7B2D1F" />
      </mesh>

      {/* Roof ridge */}
      <mesh position={[3, 3.85, -4]} castShadow receiveShadow>
        <boxGeometry args={[9, 0.25, 0.4]} />
        <Mat color="#5A1E10" />
      </mesh>

      {/* Cabin windows */}
      <mesh position={[0, 2.5, -2.05]} castShadow receiveShadow>
        <boxGeometry args={[0.8, 0.8, 0.1]} />
        <Mat color="#8BA3B5" />
      </mesh>
      <mesh position={[3, 2.5, -2.05]} castShadow receiveShadow>
        <boxGeometry args={[0.8, 0.8, 0.1]} />
        <Mat color="#8BA3B5" />
      </mesh>
      <mesh position={[6, 2.5, -2.05]} castShadow receiveShadow>
        <boxGeometry args={[0.8, 0.8, 0.1]} />
        <Mat color="#8BA3B5" />
      </mesh>

      {/* Ferry dock */}
      <mesh position={[-6, 0.25, -2]} castShadow receiveShadow>
        <boxGeometry args={[8, 0.5, 4]} />
        <Mat color="#8B6914" />
      </mesh>

      {/* Dock posts */}
      <mesh position={[-9, 1.5, -3]} castShadow receiveShadow>
        <cylinderGeometry args={[0.2, 0.2, 3, 6]} />
        <Mat color="#5C4A1E" />
      </mesh>
      <mesh position={[-3, 1.5, -3]} castShadow receiveShadow>
        <cylinderGeometry args={[0.2, 0.2, 3, 6]} />
        <Mat color="#5C4A1E" />
      </mesh>
      <mesh position={[-9, 1.5, -1]} castShadow receiveShadow>
        <cylinderGeometry args={[0.2, 0.2, 3, 6]} />
        <Mat color="#5C4A1E" />
      </mesh>
      <mesh position={[-3, 1.5, -1]} castShadow receiveShadow>
        <cylinderGeometry args={[0.2, 0.2, 3, 6]} />
        <Mat color="#5C4A1E" />
      </mesh>

      {/* Small boat at dock */}
      <mesh position={[-6, 0.35, -3]} castShadow receiveShadow>
        <boxGeometry args={[5, 0.7, 2]} />
        <Mat color="#5C3A0E" />
      </mesh>

      {/* Coconut palms */}
      {PALM_POSITIONS.map(([x, y, z], index) => (
        <group key={`palm-${index}`}>
          {/* Trunk */}
          <mesh position={[x, y + 3.5, z]} castShadow receiveShadow>
            <cylinderGeometry args={[0.25, 0.15, 7, 7]} />
            <Mat color="#8B6520" />
          </mesh>
          {/* Canopy */}
          <mesh position={[x, y + 7.5, z]} castShadow receiveShadow>
            <sphereGeometry args={[1.8, 7, 7]} />
            <Mat color="#1E5C10" />
          </mesh>
          {/* Coconuts */}
          <mesh position={[x + 0.3, y + 6.8, z]} castShadow receiveShadow>
            <sphereGeometry args={[0.3, 5, 5]} />
            <Mat color="#8B6520" />
          </mesh>
          <mesh position={[x - 0.3, y + 6.8, z]} castShadow receiveShadow>
            <sphereGeometry args={[0.3, 5, 5]} />
            <Mat color="#8B6520" />
          </mesh>
        </group>
      ))}

      {/* Chai stall body */}
      <mesh position={[-10, 1.5, 3]} castShadow receiveShadow>
        <boxGeometry args={[4, 3, 3]} />
        <Mat color="#C4714A" />
      </mesh>

      {/* Chai stall roof */}
      <mesh position={[-10, 3.15, 3]} rotation={[0.1, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[5, 0.3, 4]} />
        <Mat color="#7B2D1F" />
      </mesh>

      {/* Stall counter */}
      <mesh position={[-10, 1.2, 4.6]} castShadow receiveShadow>
        <boxGeometry args={[3, 0.8, 0.2]} />
        <Mat color="#8B6914" />
      </mesh>

      {/* Stall sign */}
      <mesh position={[-10, 2.8, 4.7]} castShadow receiveShadow>
        <boxGeometry args={[2, 0.6, 0.1]} />
        <Mat color="#D4A84B" />
      </mesh>
    </group>
  )
}
