import { extend } from '@react-three/fiber'
import * as THREE from 'three'

// Extend Three.js objects for JSX usage
extend(THREE)

declare global {
  namespace JSX {
    interface IntrinsicElements {
      group: any
      mesh: any
      boxGeometry: any
      meshStandardMaterial: any
      pointLight: any
      ambientLight: any
      directionalLight: any
      primitive: any
      planeGeometry: any
      meshBasicMaterial: any
    }
  }
}
