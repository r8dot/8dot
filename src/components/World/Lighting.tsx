function Lighting() {
  return (
    <>
      <directionalLight
        color="#FF6B35"
        intensity={1.5}
        position={[-80, 20, 30]}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={200}
      />
      <directionalLight
        color="#FF9B6B"
        intensity={0.6}
        position={[80, 40, -30]}
        castShadow={false}
      />
      <ambientLight color="#8B6DB5" intensity={0.8} />
      <hemisphereLight color="#FF8B6B" groundColor="#4a7c2f" intensity={0.6} />
    </>
  )
}

export default Lighting
