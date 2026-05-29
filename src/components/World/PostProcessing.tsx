import { EffectComposer, Bloom, Vignette, HueSaturation } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'

export default function PostProcessing() {
  return (
    <EffectComposer>
      <Bloom
        intensity={0.4}
        luminanceThreshold={0.7}
        luminanceSmoothing={0.9}
      />
      <Vignette
        darkness={0.4}
        offset={0.3}
        blendFunction={BlendFunction.NORMAL}
      />
      <HueSaturation
        saturation={0.2}
        hue={0}
      />
    </EffectComposer>
  )
}
