import { Sky } from '@react-three/drei'

function WorldSky() {
  return (
    <Sky
      distance={450000}
      sunPosition={[-1, 0.05, 0.5]}
      turbidity={15}
      rayleigh={4}
      mieCoefficient={0.008}
      mieDirectionalG={0.95}
    />
  )
}

export default WorldSky
