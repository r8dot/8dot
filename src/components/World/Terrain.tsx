function Terrain() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]}>
      <planeGeometry args={[200, 200]} />
      <meshStandardMaterial color="#2D5016" />
    </mesh>
  )
}

export default Terrain
