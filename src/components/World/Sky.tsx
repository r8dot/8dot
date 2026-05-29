import { Sky } from '@react-three/drei'

function WorldSky() {
  return (
    <Sky
      distance={450000}
      sunPosition={[0.3, 0.08, -1]}
      turbidity={12}
      rayleigh={3}
      mieCoefficient={0.005}
      mieDirectionalG={0.9}
    />
  )
}

export default WorldSky
