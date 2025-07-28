"use client"

import { useRef, Suspense, useState, useEffect } from "react"
import { useFrame } from "@react-three/fiber"
import { useGLTF, Html, Environment, ContactShadows } from "@react-three/drei"
import * as THREE from "three"
import { GLTF } from "three-stdlib"
import LaptopScreen from "./LaptopScreen"

// Error boundary component for 3D models
function ModelErrorBoundary({ children }: { children: React.ReactNode }) {
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      console.error('3D Model Error:', event.error)
      setHasError(true)
    }

    window.addEventListener('error', handleError)
    return () => window.removeEventListener('error', handleError)
  }, [])

  if (hasError) {
    return (
      <group>
        <mesh>
          <boxGeometry args={[3, 2, 0.2]} />
          <meshStandardMaterial color="#dc2626" />
        </mesh>
        <Html center>
          <div className="text-white text-center p-4 bg-red-900 rounded">
            <h3 className="text-sm font-bold">3D Model Error</h3>
            <p className="text-xs">Check console for details</p>
          </div>
        </Html>
      </group>
    )
  }

  return <>{children}</>
}

// Type for GLTF result
type GLTFResult = GLTF & {
  nodes: {
    [name: string]: THREE.Mesh
  }
  materials: {
    [name: string]: THREE.Material
  }
}

interface Laptop3DProps {
  scale?: number
  position?: [number, number, number]
  rotation?: [number, number, number]
}

function LaptopModel({ scale = 1, position = [0, 0, 0], rotation = [0, 0, 0] }: Laptop3DProps) {
  const group = useRef<THREE.Group>(null)
  
  try {
    // Load the GLTF model with error handling
    const gltf = useGLTF("/models/mac-draco.glb") as GLTFResult
    const { nodes, materials } = gltf

    console.log('GLTF loaded successfully:', gltf)
    console.log('Available nodes:', Object.keys(nodes))
    console.log('Available materials:', Object.keys(materials))

    // Make it float
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
      <group ref={group} position={position} rotation={rotation} scale={scale} dispose={null}>
        <group rotation-x={-0.425} position={[0, -0.04, 0.41]}>
          <group position={[0, 2.96, -0.13]} rotation={[Math.PI / 2, 0, 0]}>
            <mesh material={materials.aluminium} geometry={(nodes['Cube008'] as THREE.Mesh).geometry} />
            <mesh material={materials['matte.001']} geometry={(nodes['Cube008_1'] as THREE.Mesh).geometry} />
            <mesh geometry={(nodes['Cube008_2'] as THREE.Mesh).geometry}>
              <Html 
                className="content" 
                rotation-x={-Math.PI / 2} 
                position={[0, 0.05, -0.09]} 
                transform 
                occlude
              >
                <div className="wrapper" onPointerDown={(e) => e.stopPropagation()}>
                  <LaptopScreen />
                </div>
              </Html>
            </mesh>
          </group>
        </group>
        <mesh material={materials.keys} geometry={(nodes.keyboard as THREE.Mesh).geometry} position={[1.79, 0, 3.45]} />
        <group position={[0, -0.1, 3.39]}>
          <mesh material={materials.aluminium} geometry={(nodes['Cube002'] as THREE.Mesh).geometry} />
          <mesh material={materials.trackpad} geometry={(nodes['Cube002_1'] as THREE.Mesh).geometry} />
        </group>
        <mesh material={materials.touchbar} geometry={(nodes.touchbar as THREE.Mesh).geometry} position={[0, -0.03, 1.2]} />
      </group>
    )
  } catch (error) {
    console.error('Error loading 3D model:', error)
    return (
      <group>
        <mesh>
          <boxGeometry args={[3, 2, 0.2]} />
          <meshStandardMaterial color="#f59e0b" />
        </mesh>
        <Html center>
          <div className="text-white text-center p-4 bg-yellow-900 rounded">
            <h3 className="text-sm font-bold">Model Loading Error</h3>
            <p className="text-xs">Falling back to simple shape</p>
          </div>
        </Html>
      </group>
    )
  }
}

function LoadingFallback() {
  return (
    <group>
      <mesh>
        <boxGeometry args={[2, 1.2, 0.2]} />
        <meshStandardMaterial color="#1f2937" />
      </mesh>
      <Html center>
        <div className="text-white text-sm">Loading 3D Model...</div>
      </Html>
    </group>
  )
}

export default function Laptop3DWithDebug({ scale = 1, position = [0, 0, 0], rotation = [0, 0, 0] }: Laptop3DProps) {
  return (
    <ModelErrorBoundary>
      <Suspense fallback={<LoadingFallback />}>
        <group rotation={[0, Math.PI, 0]} position={[0, 1, 0]}>
          <LaptopModel scale={scale} position={position} rotation={rotation} />
        </group>
        <Environment preset="city" />
        <ContactShadows position={[0, -4.5, 0]} scale={20} blur={2} far={4.5} />
      </Suspense>
    </ModelErrorBoundary>
  )
}

// Preload the model
try {
  useGLTF.preload("/models/mac-draco.glb")
  console.log('GLTF preload initiated successfully')
} catch (error) {
  console.error('Error preloading GLTF:', error)
}
