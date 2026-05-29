const TREE_POSITIONS: Array<[number, number]> = [
  [-4, 10],
  [-4, 14],
  [-4, 18],
  [4, 10],
  [4, 14],
  [4, 18],
  [-8, 6],
  [8, 6],
  [-8, 10],
  [8, 10],
]

const COLUMN_X: number[] = [-16, -13.5, -11, -8.5, -6, 6, 8.5, 11, 13.5, 16]

type MatProps = { color: string }

function Mat({ color }: MatProps) {
  return <meshStandardMaterial color={color} flatShading={true} />
}

export default function SainikSchool() {
  return (
    <group>
      {/* Ground detail */}
      <mesh position={[0, 0.06, 7]} castShadow={true} receiveShadow={true}>
        <boxGeometry args={[22, 0.12, 14]} />
        <Mat color="#C1440E" />
      </mesh>

      <mesh position={[0, 0.07, 13]} castShadow={true} receiveShadow={true}>
        <boxGeometry args={[3, 0.13, 8]} />
        <Mat color="#D46A2A" />
      </mesh>

      <mesh position={[-3.5, 0.07, 13]} castShadow={true} receiveShadow={true}>
        <boxGeometry args={[4, 0.13, 8]} />
        <Mat color="#3a6b1a" />
      </mesh>

      <mesh position={[3.5, 0.07, 13]} castShadow={true} receiveShadow={true}>
        <boxGeometry args={[4, 0.13, 8]} />
        <Mat color="#3a6b1a" />
      </mesh>

      {/* Perimeter wall */}
      <mesh position={[-7, 0.4, 14]} castShadow={true} receiveShadow={true}>
        <boxGeometry args={[8, 0.8, 0.3]} />
        <Mat color="#FFFAF2" />
      </mesh>

      <mesh position={[7, 0.4, 14]} castShadow={true} receiveShadow={true}>
        <boxGeometry args={[8, 0.8, 0.3]} />
        <Mat color="#FFFAF2" />
      </mesh>

      {/* Left wing */}
      <mesh position={[-11, 2, 0]} castShadow={true} receiveShadow={true}>
        <boxGeometry args={[16, 4, 3.5]} />
        <Mat color="#FFFAF2" />
      </mesh>

      <mesh position={[-10, 3.7, 0]} rotation={[0.2, 0, 0]} castShadow={true} receiveShadow={true}>
        <boxGeometry args={[17, 0.5, 4.5]} />
        <Mat color="#7B2D1F" />
      </mesh>

      <mesh position={[-10, 3.85, 0]} castShadow={true} receiveShadow={true}>
        <boxGeometry args={[14, 0.3, 0.4]} />
        <Mat color="#6B2A1A" />
      </mesh>

      {/* Right wing */}
      <mesh position={[11, 2, 0]} castShadow={true} receiveShadow={true}>
        <boxGeometry args={[16, 4, 3.5]} />
        <Mat color="#FFFAF2" />
      </mesh>

      <mesh position={[10, 3.7, 0]} rotation={[0.2, 0, 0]} castShadow={true} receiveShadow={true}>
        <boxGeometry args={[17, 0.5, 4.5]} />
        <Mat color="#7B2D1F" />
      </mesh>

      <mesh position={[10, 3.85, 0]} castShadow={true} receiveShadow={true}>
        <boxGeometry args={[14, 0.3, 0.4]} />
        <Mat color="#6B2A1A" />
      </mesh>

      {/* Wing windows */}
      <mesh position={[-10, 2.2, 1.55]} castShadow={true} receiveShadow={true}>
        <boxGeometry args={[12, 0.6, 0.1]} />
        <Mat color="#C8D8E8" />
      </mesh>

      <mesh position={[10, 2.2, 1.55]} castShadow={true} receiveShadow={true}>
        <boxGeometry args={[12, 0.6, 0.1]} />
        <Mat color="#C8D8E8" />
      </mesh>

      {/* Central tower */}
      <mesh position={[0, 2, 0]} castShadow={true} receiveShadow={true}>
        <boxGeometry args={[4.5, 5, 4.5]} />
        <Mat color="#FFFAF2" />
      </mesh>

      <mesh position={[0, 5, 0]} castShadow={true} receiveShadow={true}>
        <boxGeometry args={[3, 2, 3]} />
        <Mat color="#FFFAF2" />
      </mesh>

      <mesh position={[0, 6.75, 0]} castShadow={true} receiveShadow={true}>
        <boxGeometry args={[2.2, 1.5, 2.2]} />
        <Mat color="#FFFAF2" />
      </mesh>

      <mesh position={[0, 9, 0]} castShadow={true} receiveShadow={true}>
        <coneGeometry args={[3, 4, 4]} />
        <Mat color="#7B2D1F" />
      </mesh>

      <mesh position={[0, 6.5, 1.15]} castShadow={true} receiveShadow={true}>
        <boxGeometry args={[0.9, 0.9, 0.1]} />
        <Mat color="#1A2744" />
      </mesh>

      <mesh position={[0, 6.5, -1.15]} castShadow={true} receiveShadow={true}>
        <boxGeometry args={[0.9, 0.9, 0.1]} />
        <Mat color="#1A2744" />
      </mesh>

      {/* Corner towers */}
      <mesh position={[-17, 2.25, 0]} castShadow={true} receiveShadow={true}>
        <cylinderGeometry args={[1.3, 1.3, 4.5, 8]} />
        <Mat color="#FFFAF2" />
      </mesh>

      <mesh position={[-17, 5.5, 0]} castShadow={true} receiveShadow={true}>
        <coneGeometry args={[1.8, 3, 8]} />
        <Mat color="#B85C35" />
      </mesh>

      <mesh position={[17, 2.25, 0]} castShadow={true} receiveShadow={true}>
        <cylinderGeometry args={[1.3, 1.3, 4.5, 8]} />
        <Mat color="#FFFAF2" />
      </mesh>

      <mesh position={[17, 5.5, 0]} castShadow={true} receiveShadow={true}>
        <coneGeometry args={[1.8, 3, 8]} />
        <Mat color="#B85C35" />
      </mesh>

      {/* Mid-wing towers */}
      <mesh position={[-10, 2, -1.8]} castShadow={true} receiveShadow={true}>
        <cylinderGeometry args={[1.1, 1.1, 4, 8]} />
        <Mat color="#FFFAF2" />
      </mesh>

      <mesh position={[-10, 5, -1.8]} castShadow={true} receiveShadow={true}>
        <coneGeometry args={[1.5, 2.5, 8]} />
        <Mat color="#B85C35" />
      </mesh>

      <mesh position={[10, 2, -1.8]} castShadow={true} receiveShadow={true}>
        <cylinderGeometry args={[1.1, 1.1, 4, 8]} />
        <Mat color="#FFFAF2" />
      </mesh>

      <mesh position={[10, 5, -1.8]} castShadow={true} receiveShadow={true}>
        <coneGeometry args={[1.5, 2.5, 8]} />
        <Mat color="#B85C35" />
      </mesh>

      {/* Flagpole */}
      <mesh position={[-5, 4.5, 10]} castShadow={true} receiveShadow={true}>
        <cylinderGeometry args={[0.06, 0.06, 9, 8]} />
        <Mat color="#D4A84B" />
      </mesh>

      <mesh position={[-4, 8.5, 10]} castShadow={true} receiveShadow={true}>
        <boxGeometry args={[1.8, 1, 0.06]} />
        <Mat color="#C4714A" />
      </mesh>

      {/* Entrance pillars */}
      <mesh position={[-1.8, 1.25, 17]} castShadow={true} receiveShadow={true}>
        <cylinderGeometry args={[0.2, 0.2, 2.5, 8]} />
        <Mat color="#FFFAF2" />
      </mesh>

      <mesh position={[1.8, 1.25, 17]} castShadow={true} receiveShadow={true}>
        <cylinderGeometry args={[0.2, 0.2, 2.5, 8]} />
        <Mat color="#FFFAF2" />
      </mesh>

      {/* Roof overhang strips */}
      <mesh position={[-11, 3.5, 1.8]} castShadow={true} receiveShadow={true}>
        <boxGeometry args={[16, 0.2, 0.4]} />
        <Mat color="#5A1E10" />
      </mesh>

      <mesh position={[11, 3.5, 1.8]} castShadow={true} receiveShadow={true}>
        <boxGeometry args={[16, 0.2, 0.4]} />
        <Mat color="#5A1E10" />
      </mesh>

      {/* Wing front column strips */}
      {COLUMN_X.map((x, index) => (
        <mesh key={`col-${index}`} position={[x, 2, 1.76]} castShadow={true} receiveShadow={true}>
          <boxGeometry args={[0.2, 3.5, 0.15]} />
          <Mat color="#E8E0D0" />
        </mesh>
      ))}

      {/* Connecting block between tower and wings */}
      <mesh position={[0, 1.75, 0]} castShadow={true} receiveShadow={true}>
        <boxGeometry args={[6, 3.5, 3]} />
        <Mat color="#FFFAF2" />
      </mesh>

      {/* Red parade ground border strip */}
      <mesh position={[0, 0.08, 14.2]} castShadow={true} receiveShadow={true}>
        <boxGeometry args={[24, 0.15, 0.4]} />
        <Mat color="#8B1A00" />
      </mesh>

      {/* Parade center monument */}
      <mesh position={[0, 1, 7]} castShadow={true} receiveShadow={true}>
        <cylinderGeometry args={[0.3, 0.3, 2, 8]} />
        <Mat color="#8BA3B5" />
      </mesh>

      <mesh position={[0, 0.1, 7]} castShadow={true} receiveShadow={true}>
        <boxGeometry args={[0.8, 0.2, 0.8]} />
        <Mat color="#4a4a4a" />
      </mesh>

      {/* Trees */}
      {TREE_POSITIONS.map(([x, z], index) => (
        <group key={`tree-${index}`} position={[x, 0, z]}>
          <mesh position={[0, 0.9, 0]} castShadow={true} receiveShadow={true}>
            <cylinderGeometry args={[0.18, 0.18, 1.8, 6]} />
            <Mat color="#4a3728" />
          </mesh>
          <mesh position={[0, 2.8, 0]} castShadow={true} receiveShadow={true}>
            <coneGeometry args={[1.1, 2.5, 7]} />
            <Mat color="#1E4010" />
          </mesh>
        </group>
      ))}
    </group>
  )
}
