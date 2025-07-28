"use client"

import { useRef, Suspense } from "react"
import { useFrame } from "@react-three/fiber"
import { useGLTF, Html, Environment, ContactShadows } from "@react-three/drei"
import * as THREE from "three"

interface Laptop3DProps {
  scale?: number
  position?: [number, number, number]
  rotation?: [number, number, number]
}

function LaptopModel(props: Laptop3DProps) {
  const group = useRef<THREE.Group>(null)
  
  // Load model - using the same syntax as the working version
  const gltf = useGLTF('/models/mac-draco.glb') as any
  const { nodes, materials } = gltf
  
  // Make it float - exact same animation
  useFrame((state) => {
    if (group.current) {
      const t = state.clock.getElapsedTime()
      group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, Math.cos(t / 2) / 20 + 0.25, 0.1)
      group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, Math.sin(t / 4) / 20, 0.1)
      group.current.rotation.z = THREE.MathUtils.lerp(group.current.rotation.z, Math.sin(t / 8) / 20, 0.1)
      group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, (-2 + Math.sin(t / 2)) / 2, 0.1)
    }
  })

  return (
    <group ref={group} {...props} dispose={null}>
      <group rotation-x={-0.425} position={[0, -0.04, 0.41]}>
        <group position={[0, 2.96, -0.13]} rotation={[Math.PI / 2, 0, 0]}>
          <mesh material={materials.aluminium} geometry={(nodes as any)['Cube008'].geometry} />
          <mesh material={materials['matte.001']} geometry={(nodes as any)['Cube008_1'].geometry} />
          <mesh geometry={(nodes as any)['Cube008_2'].geometry}>
            <Html className="content" rotation-x={-Math.PI / 2} position={[0, 0.05, -0.09]} transform occlude>
              <div className="wrapper" onPointerDown={(e) => e.stopPropagation()}>
                <div className="w-80 h-52 bg-gray-900 rounded-lg border border-gray-700 overflow-hidden relative">
                  <div className="h-8 bg-gray-800 border-b border-gray-700 flex items-center px-3 gap-2">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <div className="flex-1 flex items-center text-xs text-gray-300">
                      <span className="ml-2">portfolio.tsx - Bilal's Workspace</span>
                    </div>
                    <div className="text-xs text-gray-400">VS Code</div>
                  </div>
                  
                  <div className="flex h-full">
                    <div className="w-12 bg-gray-800 border-r border-gray-700 flex flex-col items-center py-2 gap-2">
                      <div className="w-6 h-6 flex items-center justify-center text-blue-400">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                        </svg>
                      </div>
                      <div className="w-6 h-6 flex items-center justify-center text-gray-500">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    
                    <div className="flex-1 bg-gray-900 p-3 font-mono text-xs">
                      <div className="space-y-1">
                        <div className="text-purple-400">
                          <span className="text-blue-400">import</span> <span className="text-white">React</span> <span className="text-blue-400">from</span> <span className="text-green-400">'react'</span>
                        </div>
                        <div className="text-purple-400">
                          <span className="text-blue-400">import</span> <span className="text-white">{'{ NextPage }'}</span> <span className="text-blue-400">from</span> <span className="text-green-400">'next'</span>
                        </div>
                        <div className="h-1"></div>
                        <div className="text-gray-500">// Welcome to my portfolio! 👋</div>
                        <div className="text-blue-400">
                          <span className="text-blue-400">const</span> <span className="text-yellow-400">Portfolio</span><span className="text-white">:</span> <span className="text-blue-300">NextPage</span> <span className="text-white">=</span> <span className="text-white">() {'=> {'}</span>
                        </div>
                        <div className="text-blue-400 ml-2">
                          <span className="text-blue-400">return</span> <span className="text-white">(</span>
                        </div>
                        <div className="ml-4">
                          <span className="text-gray-400">&lt;</span><span className="text-red-400">div</span> <span className="text-blue-300">className</span><span className="text-white">=</span><span className="text-green-400">"hero"</span><span className="text-gray-400">&gt;</span>
                        </div>
                        <div className="ml-6">
                          <span className="text-gray-400">&lt;</span><span className="text-red-400">h1</span><span className="text-gray-400">&gt;</span><span className="text-white">Bilal EL AZZAM</span><span className="text-gray-400">&lt;/</span><span className="text-red-400">h1</span><span className="text-gray-400">&gt;</span>
                        </div>
                        <div className="ml-6">
                          <span className="text-gray-400">&lt;</span><span className="text-red-400">p</span><span className="text-gray-400">&gt;</span><span className="text-white">Full-Stack Developer</span><span className="text-gray-400">&lt;/</span><span className="text-red-400">p</span><span className="text-gray-400">&gt;</span>
                        </div>
                        <div className="ml-4">
                          <span className="text-gray-400">&lt;/</span><span className="text-red-400">div</span><span className="text-gray-400">&gt;</span>
                        </div>
                        <div className="ml-2 text-white">)</div>
                        <div className="text-white">{'}'}</div>
                        <div className="h-1"></div>
                        <div className="text-blue-400">
                          <span className="text-blue-400">export</span> <span className="text-blue-400">default</span> <span className="text-yellow-400">Portfolio</span>
                        </div>
                      </div>
                      
                      <div className="mt-1 flex items-center">
                        <div className="w-0.5 h-3 bg-white animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Html>
          </mesh>
        </group>
      </group>
      <mesh material={materials.keys} geometry={(nodes as any).keyboard.geometry} position={[1.79, 0, 3.45]} />
      <group position={[0, -0.1, 3.39]}>
        <mesh material={materials.aluminium} geometry={(nodes as any)['Cube002'].geometry} />
        <mesh material={materials.trackpad} geometry={(nodes as any)['Cube002_1'].geometry} />
      </group>
      <mesh material={materials.touchbar} geometry={(nodes as any).touchbar.geometry} position={[0, -0.03, 1.2]} />
    </group>
  )
}

export default function ReliableLaptop3D({ scale = 1, position = [0, 0, 0], rotation = [0, 0, 0] }: Laptop3DProps) {
  return (
    <Suspense fallback={null}>
      <group rotation={[0, Math.PI, 0]} position={[0, 1, 0]}>
        <LaptopModel scale={scale} position={position} rotation={rotation} />
      </group>
      <Environment preset="city" />
      <ContactShadows position={[0, -4.5, 0]} scale={20} blur={2} far={4.5} />
    </Suspense>
  )
}

useGLTF.preload('/models/mac-draco.glb')
