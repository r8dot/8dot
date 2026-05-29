function Lighting() {
  return (
    <>
      <ambientLight color="#FFD4A0" intensity={0.3} />
      <directionalLight
        color="#FF9F45"
        intensity={1.8}
        position={[30, 25, 50]}
        castShadow
        shadow-camera-near={0.1}
        shadow-camera-far={100}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
    </>
  )
}

export default Lighting
