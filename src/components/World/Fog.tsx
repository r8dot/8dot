type FogProps = {
  color: string
  near: number
  far: number
}

function WorldFog({ color, near, far }: FogProps) {
  return <fog attach="fog" args={[color, near, far]} />
}

export default WorldFog
