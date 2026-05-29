import { Canvas } from '@react-three/fiber'
import { Physics } from '@react-three/rapier'
import { AnimatePresence } from 'framer-motion'
import { Suspense } from 'react'
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
import * as THREE from 'three'

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
      <Canvas style={{ width: '100vw', height: '100vh' }}>
        <color attach="background" args={[BACKGROUND_COLOR]} />
        <WorldFog />
        <Lighting />
        <WorldSky />
        <PostProcessing />
        <Physics timeStep="vary" updateLoop="follow">
          <Terrain />
          <Suspense fallback={null}>
            <Player />
          </Suspense>
          <Roads />
          <Trees />
          <Shops />
          <Sea />

          {/* Rocks */}
          {([[-20,0.2,-20],[30,0.2,-30],[-40,0.2,20],[50,0.2,-10],
             [-10,0.2,40],[20,0.2,50],[-60,0.2,10],[40,0.2,-50]] as [number,number,number][])
            .map((pos, i) => (
            <mesh key={`rock-${i}`} position={pos} castShadow receiveShadow>
              <sphereGeometry args={[0.5 + (i % 3) * 0.4, 5, 5]} />
              <meshStandardMaterial color="#8B7355" flatShading />
            </mesh>
          ))}

          {/* Bushes */}
          {([[-25,0,-15],[35,0,-20],[-45,0,15],[45,0,5],[-15,0,35],[25,0,45],
             [-55,0,5],[35,0,-45],[-5,0,-35],[55,0,-15],[-35,0,45],[15,0,55]] as [number,number,number][])
            .map((pos, i) => (
            <group key={`bush-${i}`} position={pos}>
              <mesh castShadow receiveShadow>
                <sphereGeometry args={[1.2, 6, 6]} />
                <meshStandardMaterial color="#1E5C10" flatShading />
              </mesh>
              <mesh position={[0.5, -0.2, 0.3]} castShadow>
                <sphereGeometry args={[0.8, 5, 5]} />
                <meshStandardMaterial color="#2D7A1F" flatShading />
              </mesh>
            </group>
          ))}

          {/* Flower patches */}
          {([[-18,0.05,-40],[28,0.05,18],[-42,0.05,-8],[48,0.05,28],[-8,0.05,-25],[18,0.05,-48]] as [number,number,number][])
            .map((pos, i) => (
            <mesh key={`flower-${i}`} position={pos} rotation={[-Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.8, 0.8, 0.1, 8]} />
              <meshStandardMaterial color={i % 2 === 0 ? '#FF6B6B' : '#FFD080'} />
            </mesh>
          ))}

          {/* Pond */}
          <group position={[10, 0.1, 10]}>
            <mesh receiveShadow>
              <cylinderGeometry args={[8, 8, 0.3, 24]} />
              <meshStandardMaterial color="#2E6B9A" />
            </mesh>
            {([[2,0.16,1],[-2,0.16,-1],[0,0.16,3]] as [number,number,number][]).map((lp, i) => (
              <mesh key={`lily-${i}`} position={lp} rotation={[-Math.PI / 2, 0, i * 1.2]}>
                <cylinderGeometry args={[1.5, 1.5, 0.1, 12]} />
                <meshStandardMaterial color="#2D7A1F" />
              </mesh>
            ))}
          </group>

          {/* Extra trees — 20 additional scattered across empty patches */}
          {([
            [-30,0,-40],[-15,0,-60],[10,0,-70],[35,0,-65],[60,0,-55],
            [70,0,-35],[75,0,-10],[70,0,15],[60,0,40],[40,0,60],
            [15,0,70],[-10,0,68],[-35,0,60],[-58,0,42],[-72,0,20],
            [-75,0,-5],[-68,0,-30],[-55,0,-55],[-30,0,-70],[5,0,-45],
          ] as [number,number,number][]).map((pos, i) => (
            <group key={`xt-${i}`} position={pos}>
              {i % 3 === 0 ? (
                <>
                  <mesh position={[0, 4.5, 0]} castShadow>
                    <cylinderGeometry args={[0.3, 0.2, 8, 7]} />
                    <meshStandardMaterial color="#A67C3A" />
                  </mesh>
                  <mesh position={[0, 9, 0]} castShadow>
                    <sphereGeometry args={[2.5, 8, 8]} />
                    <meshStandardMaterial color="#2D7A1F" />
                  </mesh>
                </>
              ) : (
                <>
                  <mesh position={[0, 3, 0]} castShadow>
                    <cylinderGeometry args={[0.45, 0.35, 6, 7]} />
                    <meshStandardMaterial color="#6B4A2A" />
                  </mesh>
                  <mesh position={[0, 7, 0]} castShadow>
                    <sphereGeometry args={[4, 8, 8]} />
                    <meshStandardMaterial color="#2A6B15" />
                  </mesh>
                </>
              )}
            </group>
          ))}

          {/* Basketball Court */}
          <group position={[-30, 0.2, 30]}>
            <mesh receiveShadow>
              <boxGeometry args={[14, 0.1, 8]} />
              <meshStandardMaterial color="#C4714A" />
            </mesh>
            <mesh position={[0, 0.06, 0]}>
              <boxGeometry args={[13.5, 0.05, 0.15]} />
              <meshStandardMaterial color="#FFFFFF" />
            </mesh>
            <mesh position={[0, 0.06, 0]} rotation={[0, Math.PI / 2, 0]}>
              <boxGeometry args={[7.5, 0.05, 0.15]} />
              <meshStandardMaterial color="#FFFFFF" />
            </mesh>
            <mesh position={[0, 0.06, 0]}>
              <cylinderGeometry args={[1.5, 1.5, 0.05, 16]} />
              <meshStandardMaterial color="#FFFFFF" />
            </mesh>
            <mesh position={[-6, 1.5, 0]}>
              <torusGeometry args={[0.45, 0.04, 8, 16]} />
              <meshStandardMaterial color="#FF6B00" />
            </mesh>
            <mesh position={[6, 1.5, 0]}>
              <torusGeometry args={[0.45, 0.04, 8, 16]} />
              <meshStandardMaterial color="#FF6B00" />
            </mesh>
            <mesh position={[-6.3, 2.2, 0]}>
              <boxGeometry args={[0.1, 1, 1.5]} />
              <meshStandardMaterial color="#FFFFFF" />
            </mesh>
            <mesh position={[6.3, 2.2, 0]}>
              <boxGeometry args={[0.1, 1, 1.5]} />
              <meshStandardMaterial color="#FFFFFF" />
            </mesh>
            <mesh position={[-7, 1.2, 0]}>
              <cylinderGeometry args={[0.08, 0.08, 2.4, 8]} />
              <meshStandardMaterial color="#888888" />
            </mesh>
            <mesh position={[7, 1.2, 0]}>
              <cylinderGeometry args={[0.08, 0.08, 2.4, 8]} />
              <meshStandardMaterial color="#888888" />
            </mesh>
          </group>

          {/* F1 Display Zone */}
          <group position={[30, 0.2, 30]}>
            <mesh receiveShadow>
              <cylinderGeometry args={[10, 10, 0.12, 32]} />
              <meshStandardMaterial color="#1a1a1a" />
            </mesh>
            <mesh position={[0, 0.1, 0]}>
              <cylinderGeometry args={[7, 7, 0.12, 32]} />
              <meshStandardMaterial color="#2D7A1F" />
            </mesh>
            {/* F1 car */}
            <group position={[0, 0.3, 0]}>
              <mesh>
                <boxGeometry args={[3.5, 0.3, 1.2]} />
                <meshStandardMaterial color="#FF0000" />
              </mesh>
              <mesh position={[0.2, 0.25, 0]}>
                <boxGeometry args={[0.8, 0.3, 0.7]} />
                <meshStandardMaterial color="#111111" />
              </mesh>
              <mesh position={[1.9, -0.05, 0]}>
                <boxGeometry args={[0.3, 0.08, 1.8]} />
                <meshStandardMaterial color="#FF0000" />
              </mesh>
              <mesh position={[-1.8, 0.4, 0]}>
                <boxGeometry args={[0.15, 0.35, 1.6]} />
                <meshStandardMaterial color="#FF0000" />
              </mesh>
              {(
                [[-1.2, -0.15, 0.7], [-1.2, -0.15, -0.7],
                  [1.0, -0.15, 0.7], [1.0, -0.15, -0.7]] as [number, number, number][]
              ).map((pos, i) => (
                <mesh key={i} position={pos} rotation={[Math.PI / 2, 0, 0]}>
                  <cylinderGeometry args={[0.28, 0.28, 0.3, 12]} />
                  <meshStandardMaterial color="#111111" />
                </mesh>
              ))}
            </group>
            {/* Checkered flag suggestion */}
            <mesh position={[0, 0.5, -8]}>
              <boxGeometry args={[2, 1.5, 0.1]} />
              <meshStandardMaterial color="#FFFFFF" />
            </mesh>
            <mesh position={[0.5, 0.8, -7.9]}>
              <boxGeometry args={[0.5, 0.5, 0.05]} />
              <meshStandardMaterial color="#000000" />
            </mesh>
          </group>

          {/* Station triggers for basketball and F1 */}
          <Station
            id="basketball"
            position={[-30, 0, 30]}
            radius={8}
            promptLabel="Basketball Court"
            onActivate={() => openPanel('basketball')}
          >
            <mesh visible={false}>
              <boxGeometry args={[1, 1, 1]} />
            </mesh>
          </Station>

          <Station
            id="f1-zone"
            position={[30, 0, 30]}
            radius={8}
            promptLabel="F1 Zone"
            onActivate={() => openPanel('f1-zone')}
          >
            <mesh visible={false}>
              <boxGeometry args={[1, 1, 1]} />
            </mesh>
          </Station>

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
