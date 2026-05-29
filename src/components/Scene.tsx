import { Canvas } from '@react-three/fiber'
import { Physics } from '@react-three/rapier'
import { AnimatePresence } from 'framer-motion'
import Player from './Player/Player'
import SainikSchool from './Zones/SainikSchool'
import KochiUndergrad from './Zones/KochiUndergrad'
import Station from './Stations/Station'
import Panel from './UI/Panel'
import Lighting from './World/Lighting'
import Terrain from './World/Terrain'
import WorldFog from './World/Fog'
import WorldSky from './World/Sky'
import Roads from './World/Roads'
import Trees from './World/Trees'
import Shops from './World/Shops'
import Sea from './World/Sea'
import PostProcessing from './World/PostProcessing'
import zonesData from '../content/zones.json'
import { useUIStore } from '../store/uiStore'

const BACKGROUND_COLOR = '#2A1A3E'
const STATION_COLORS = ['#D4A84B', '#2D5016', '#C4714A', '#1A2744', '#7A9E5C', '#8BA3B5']

type Zone = {
  id: string
  title: string
  subtitle: string
  position: [number, number, number]
  content: string
}

function Scene() {
  const zones = zonesData.zones as Zone[]
  const activePanel = useUIStore((state) => state.activePanel)
  const openPanel = useUIStore((state) => state.openPanel)
  const closePanel = useUIStore((state) => state.closePanel)
  const activeZone = zones.find((zone) => zone.id === activePanel) ?? null

  return (
    <>
      <Canvas
        camera={{ position: [0, 15, 30], fov: 70, near: 0.1, far: 800 }}
        style={{ width: '100vw', height: '100vh' }}
      >
        <color attach="background" args={[BACKGROUND_COLOR]} />
        <WorldFog />
        <Lighting />
        <WorldSky />
        <PostProcessing />
        <Physics timeStep="vary" updateLoop="follow">
          <Terrain />
          <Player />
          <Roads />
          <Trees />
          <Shops />
          <Sea />
          {zones.map((zone, index) => (
            <Station
              key={zone.id}
              id={zone.id}
              position={zone.position}
              radius={5}
              promptLabel={zone.subtitle}
              onActivate={() => openPanel(zone.id)}
            >
              {zone.id === 'sainik-school' ? (
                <SainikSchool />
              ) : zone.id === 'kochi-undergrad' ? (
                <KochiUndergrad />
              ) : (
                <mesh position={[0, 1, 0]}>
                  <boxGeometry args={[1.5, 1.5, 1.5]} />
                  <meshStandardMaterial color={STATION_COLORS[index % STATION_COLORS.length]} />
                </mesh>
              )}
            </Station>
          ))}
        </Physics>
      </Canvas>
      <AnimatePresence>
        {activeZone ? (
          <Panel
            title={activeZone.title}
            content={activeZone.content}
            onClose={closePanel}
          />
        ) : null}
      </AnimatePresence>
    </>
  )
}

export default Scene
