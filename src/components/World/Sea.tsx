import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

const vertexShader = /* glsl */ `
  uniform float uTime;
  varying float vWave;

  void main() {
    vec3 pos = position;
    float wave = sin(pos.x * 0.05 + uTime) * 0.5
               + cos(pos.y * 0.06 + uTime * 0.8) * 0.5;
    pos.z += wave;
    vWave = wave;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`

const fragmentShader = /* glsl */ `
  uniform float uSunset;
  varying float vWave;

  void main() {
    vec3 deep = vec3(0.039, 0.165, 0.290);    // #0A2A4A
    vec3 shallow = vec3(0.118, 0.353, 0.541); // #1E5A8A
    vec3 sunset = vec3(1.0, 0.420, 0.208);    // #FF6B35

    float t = clamp(vWave * 0.5 + 0.5, 0.0, 1.0);
    vec3 color = mix(deep, shallow, t);
    color = mix(color, sunset, 0.3 * uSunset);

    gl_FragColor = vec4(color, 0.9);
  }
`

type SeaPlaneProps = {
  position: [number, number, number]
  args: [number, number, number, number]
  sunset?: boolean
}

function SeaPlane({ position, args, sunset = false }: SeaPlaneProps) {
  const materialRef = useRef<THREE.ShaderMaterial>(null)

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uSunset: { value: sunset ? 1 : 0 },
    }),
    [sunset],
  )

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime
    }
  })

  return (
    <mesh position={position} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={args} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

export default function Sea() {
  return (
    <group>
      <SeaPlane position={[0, -5, -160]} args={[400, 120, 16, 8]} />
      <SeaPlane position={[0, -5, 160]} args={[400, 120, 16, 8]} />
      <SeaPlane position={[-180, -5, 0]} args={[120, 400, 8, 16]} sunset />
      <SeaPlane position={[180, -5, 0]} args={[120, 400, 8, 16]} />
    </group>
  )
}
