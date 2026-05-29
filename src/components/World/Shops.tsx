import { Html } from '@react-three/drei'

const SIGN_STYLE: React.CSSProperties = {
  background: '#2a1a0a',
  color: '#FFD080',
  padding: '4px 10px',
  borderRadius: '4px',
  fontSize: '14px',
  fontFamily: 'serif',
  whiteSpace: 'nowrap',
  border: '1px solid #FFD080',
}

function ChaiKadai() {
  return (
    <group position={[-30, 0, 20]}>
      <mesh position={[0, 1.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[4, 3, 3]} />
        <meshStandardMaterial color="#C4714A" flatShading />
      </mesh>
      <mesh position={[0, 3.15, 0]} rotation={[0.1, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[5, 0.3, 4]} />
        <meshStandardMaterial color="#7B2D1F" flatShading />
      </mesh>
      <mesh position={[0, 0.8, 1.6]} castShadow receiveShadow>
        <boxGeometry args={[3, 0.8, 0.2]} />
        <meshStandardMaterial color="#8B6914" flatShading />
      </mesh>
      <mesh position={[0, 0.4, 2.6]} castShadow receiveShadow>
        <boxGeometry args={[2, 0.4, 0.5]} />
        <meshStandardMaterial color="#6B4A14" flatShading />
      </mesh>
      <mesh position={[0, 2.4, 1.55]} castShadow>
        <boxGeometry args={[2, 0.7, 0.1]} />
        <meshStandardMaterial color="#D4A84B" flatShading />
      </mesh>
      <pointLight position={[0, 3.6, 1.5]} color="#FFD080" intensity={2} distance={12} />
      <Html position={[0, 4.5, 0]} center distanceFactor={20}>
        <div style={SIGN_STYLE}>☕ Rajan's Tea Stall</div>
      </Html>
    </group>
  )
}

function BarberShop() {
  return (
    <group position={[-20, 0, 35]}>
      <mesh position={[0, 1.75, 0]} castShadow receiveShadow>
        <boxGeometry args={[3, 3.5, 3]} />
        <meshStandardMaterial color="#FFFAF2" flatShading />
      </mesh>
      <mesh position={[0, 3.65, 0]} castShadow receiveShadow>
        <boxGeometry args={[4, 0.3, 4]} />
        <meshStandardMaterial color="#7B2D1F" flatShading />
      </mesh>
      <mesh position={[1.7, 1.5, 1.6]} castShadow receiveShadow>
        <cylinderGeometry args={[0.1, 0.1, 3, 8]} />
        <meshStandardMaterial color="#FFFAF2" flatShading />
      </mesh>
      <mesh position={[1.7, 1.5, 1.66]} rotation={[0, 0, 0.5]} castShadow>
        <boxGeometry args={[0.12, 0.05, 2]} />
        <meshStandardMaterial color="#CC2222" flatShading />
      </mesh>
      <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.8, 0.8, 0.8]} />
        <meshStandardMaterial color="#4444AA" flatShading />
      </mesh>
      <pointLight position={[0, 3.4, 1.7]} color="#FFD080" intensity={2} distance={12} />
      <Html position={[0, 4.5, 0]} center distanceFactor={20}>
        <div style={SIGN_STYLE}>✂ Shaji's Saloon</div>
      </Html>
    </group>
  )
}

function PettiKadai() {
  return (
    <group position={[-10, 0, 45]}>
      <mesh position={[0, 1.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[5, 3, 4]} />
        <meshStandardMaterial color="#E8D5B0" flatShading />
      </mesh>
      <mesh position={[0, 3.15, 0]} castShadow receiveShadow>
        <boxGeometry args={[6, 0.3, 5]} />
        <meshStandardMaterial color="#8B3A2A" flatShading />
      </mesh>
      <mesh position={[0, 1, 2.2]} castShadow receiveShadow>
        <boxGeometry args={[4, 1, 0.5]} />
        <meshStandardMaterial color="#8B6914" flatShading />
      </mesh>
      <mesh position={[-1.3, 1.75, 2.2]} castShadow>
        <boxGeometry args={[0.6, 0.6, 0.6]} />
        <meshStandardMaterial color="#CC4444" flatShading />
      </mesh>
      <mesh position={[0, 1.75, 2.2]} castShadow>
        <boxGeometry args={[0.6, 0.6, 0.6]} />
        <meshStandardMaterial color="#44AA44" flatShading />
      </mesh>
      <mesh position={[1.3, 1.75, 2.2]} castShadow>
        <boxGeometry args={[0.6, 0.6, 0.6]} />
        <meshStandardMaterial color="#4444CC" flatShading />
      </mesh>
      <pointLight position={[0, 3.4, 2]} color="#FFD080" intensity={2} distance={12} />
      <Html position={[0, 4.5, 0]} center distanceFactor={20}>
        <div style={SIGN_STYLE}>🛒 Kerala Stores</div>
      </Html>
    </group>
  )
}

export default function Shops() {
  return (
    <group>
      <ChaiKadai />
      <BarberShop />
      <PettiKadai />
    </group>
  )
}
