import React, { useRef } from 'react'
import { Canvas, useFrame } from 'react-three-fiber'
import { Circle, useTexture } from '@react-three/drei'

const Animation = () => {
  const texture = 
  useTexture('/background.png')
  const circleRef = useRef()

  useFrame(() => {
    // Rotate the circle in place
    circleRef.current.rotation.y += 0.01
  })

  return (
    <Canvas style={{ width: '100%', height: '100%' }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Circle args={[1, 32]} rotation-y={Math.PI / 4} ref={circleRef}>
        <meshBasicMaterial
          attach="material"
          map={texture}
          side={THREE.DoubleSide}
        />
      </Circle>
    </Canvas>
  )
}

export default Animation
