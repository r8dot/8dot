import { Sky } from '@react-three/drei'

function WorldSky() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[8, 12, 4]} intensity={1.15} />
      <Sky distance={450000} sunPosition={[10, 8, 3]} turbidity={8} rayleigh={2} />
    </>
  )
}

export default WorldSky
