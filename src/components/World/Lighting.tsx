export default function Lighting() {
  return (
    <>
      {/* Main sun — low western horizon, warm but not overpowering */}
      <directionalLight
        color="#FFB347"
        intensity={0.9}
        position={[-100, 30, 50]}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={300}
        shadow-camera-left={-150}
        shadow-camera-right={150}
        shadow-camera-top={150}
        shadow-camera-bottom={-150}
      />
      {/* Strong ambient so nothing goes fully dark */}
      <ambientLight color="#C8B8A8" intensity={1.0} />
      {/* Cool blue fill from east — balances warm sun */}
      <directionalLight
        color="#7090B0"
        intensity={0.5}
        position={[100, 40, -50]}
        castShadow={false}
      />
    </>
  )
}
