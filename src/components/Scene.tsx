import { Canvas } from '@react-three/fiber'
import Terrain from './World/Terrain'
import WorldFog from './World/Fog'
import WorldSky from './World/Sky'

const FOG_COLOR = '#C8D4D0'

function Scene() {
  return (
    <Canvas camera={{ position: [0, 6, 16], fov: 55 }}>
      <color attach="background" args={[FOG_COLOR]} />
      <WorldFog color={FOG_COLOR} near={18} far={70} />
      <WorldSky />
      <Terrain />
    </Canvas>
  )
}

export default Scene
