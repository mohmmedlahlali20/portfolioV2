"use client"

import { useRef, useState, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Points, PointMaterial, OrbitControls, Environment } from "@react-three/drei"
import * as THREE from "three"

function DNAHelix() {
  const ref = useRef<THREE.Group>(null)
  const particlesRef = useRef<THREE.Group>(null)

  const helixPoints = useMemo(() => {
    const points = []
    const particlePositions = []

    for (let i = 0; i < 200; i++) {
      const t = (i / 200) * Math.PI * 8
      const radius = 1.5

      points.push(Math.cos(t) * radius, (i / 200) * 8 - 4, Math.sin(t) * radius)

      points.push(Math.cos(t + Math.PI) * radius, (i / 200) * 8 - 4, Math.sin(t + Math.PI) * radius)

      if (i % 10 === 0) {
        for (let j = 0; j < 5; j++) {
          const lerp = j / 4
          particlePositions.push(
            THREE.MathUtils.lerp(Math.cos(t) * radius, Math.cos(t + Math.PI) * radius, lerp),
            (i / 200) * 8 - 4,
            THREE.MathUtils.lerp(Math.sin(t) * radius, Math.sin(t + Math.PI) * radius, lerp),
          )
        }
      }
    }

    return { helix: new Float32Array(points), particles: new Float32Array(particlePositions) }
  }, [])

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.2
    }
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.1
    }
  })

  return (
    <group ref={ref}>
      <Points positions={helixPoints.helix} stride={3}>
        <PointMaterial transparent color="#4f46e5" size={0.1} sizeAttenuation />
      </Points>
      <Points ref={particlesRef} positions={helixPoints.particles} stride={3}>
        <PointMaterial transparent color="#8b5cf6" size={0.05} sizeAttenuation />
      </Points>
    </group>
  )
}

// Animation Option 2: Morphing Geometric Shapes
function MorphingShapes() {
  const meshRef = useRef<THREE.Mesh>(null)
  const [currentShape, setCurrentShape] = useState(0)

  const shapes = useMemo(
    () => [
      new THREE.SphereGeometry(2, 32, 32),
      new THREE.BoxGeometry(3, 3, 3),
      new THREE.ConeGeometry(2, 4, 8),
      new THREE.TorusGeometry(2, 0.8, 16, 100),
    ],
    [],
  )

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.3
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3
      meshRef.current.rotation.z = Math.cos(state.clock.elapsedTime * 0.3) * 0.2

      const shapeIndex = Math.floor(state.clock.elapsedTime / 3) % shapes.length
      if (shapeIndex !== currentShape) {
        setCurrentShape(shapeIndex)
      }
    }
  })

  return (
    <mesh ref={meshRef} geometry={shapes[currentShape]}>
      <meshStandardMaterial
        color="#4f46e5"
        wireframe
        transparent
        opacity={0.8}
        emissive="#1e1b4b"
        emissiveIntensity={0.2}
      />
    </mesh>
  )
}

function ParticleGalaxy() {
  const ref = useRef<THREE.Points>(null)

  const { positions, colors } = useMemo(() => {
    const count = 5000
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      const radius = Math.random() * 5
      const spinAngle = radius * 0.5
      const branchAngle = (i % 3) * ((Math.PI * 2) / 3)

      const randomX = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.3
      const randomY = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.3
      const randomZ = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.3

      positions[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX
      positions[i3 + 1] = randomY
      positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ

      const mixedColor = new THREE.Color()
      mixedColor.setHSL(0.6 + Math.random() * 0.1, 0.8, 0.6)

      colors[i3] = mixedColor.r
      colors[i3 + 1] = mixedColor.g
      colors[i3 + 2] = mixedColor.b
    }

    return { positions, colors }
  }, [])

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.5
    }
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={positions} count={positions.length / 3} itemSize={3} args={[]} />
        <bufferAttribute attach="attributes-color" array={colors} count={colors.length / 3} itemSize={3} args={[]} />
      </bufferGeometry>
      <pointsMaterial size={0.02} vertexColors sizeAttenuation />
    </points>
  )
}

function CodeMatrix() {
  const groupRef = useRef<THREE.Group>(null)

  const codeBlocks = useMemo(() => {
    const blocks = []
    const codeSnippets = ["React", "Node.js", "JS", "TS", "CSS", "HTML", "API", "DB", "UI", "UX"]

    for (let i = 0; i < 30; i++) {
      blocks.push({
        position: [(Math.random() - 0.5) * 10, (Math.random() - 0.5) * 8, (Math.random() - 0.5) * 6],
        text: codeSnippets[Math.floor(Math.random() * codeSnippets.length)],
        speed: 0.5 + Math.random() * 1,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
      })
    }
    return blocks
  }, [])

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.children.forEach((child, index) => {
        const block = codeBlocks[index]
        child.position.y += block.speed * 0.01
        child.rotation.y += block.rotationSpeed

        if (child.position.y > 4) {
          child.position.y = -4
        }
      })
    }
  })

  return (
    <group ref={groupRef}>
      {codeBlocks.map((block, index) => (
        <mesh key={index} position={block.position}>
          <boxGeometry args={[0.8, 0.8, 0.1]} />
          <meshStandardMaterial color="#4f46e5" transparent opacity={0.7} emissive="#1e1b4b" emissiveIntensity={0.3} />
        </mesh>
      ))}
    </group>
  )
}

function QuantumField() {
  const pointsRef = useRef<THREE.Points>(null)
  const spheresRef = useRef<THREE.Group>(null)

  const { positions, connections } = useMemo(() => {
    const nodeCount = 50
    const positions = new Float32Array(nodeCount * 3)
    const connections = []

    for (let i = 0; i < nodeCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 8
      positions[i * 3 + 1] = (Math.random() - 0.5) * 6
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4
    }

    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        const distance = Math.sqrt(
          Math.pow(positions[i * 3] - positions[j * 3], 2) +
            Math.pow(positions[i * 3 + 1] - positions[j * 3 + 1], 2) +
            Math.pow(positions[i * 3 + 2] - positions[j * 3 + 2], 2),
        )

        if (distance < 2.5) {
          connections.push([
            positions[i * 3],
            positions[i * 3 + 1],
            positions[i * 3 + 2],
            positions[j * 3],
            positions[j * 3 + 1],
            positions[j * 3 + 2],
          ])
        }
      }
    }

    return { positions, connections }
  }, [])

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.1
    }
    if (spheresRef.current) {
      spheresRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1
    }
  })

  return (
    <group>
      <Points ref={pointsRef} positions={positions} stride={3}>
        <PointMaterial transparent color="#4f46e5" size={0.1} sizeAttenuation />
      </Points>

      <group ref={spheresRef}>
        {connections.map((connection, index) => (
          <line key={index}>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                array={new Float32Array(connection)}
                count={2}
                itemSize={3} args={[]}              />
            </bufferGeometry>
            <lineBasicMaterial color="#8b5cf6" transparent opacity={0.3} />
          </line>
        ))}
      </group>
    </group>
  )
}

export default function Home() {
  const [selectedAnimation, setSelectedAnimation] = useState(0)

  const animations = [
    { name: "DNA Helix", component: DNAHelix },
    { name: "Morphing Shapes", component: MorphingShapes },
    { name: "Particle Galaxy", component: ParticleGalaxy },
    { name: "Code Matrix", component: CodeMatrix },
    { name: "Quantum Field", component: QuantumField },
  ]

  const CurrentAnimation = animations[selectedAnimation].component

  return (
    <div className="min-h-screen flex items-center justify-center pt-20">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-7xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
                Mohammed Lahlali
              </h1>
              <h2 className="text-2xl lg:text-3xl text-gray-300">Full Stack Developer</h2>
            </div>

            <p className="text-lg text-gray-400 leading-relaxed max-w-lg">
              Passionate developer creating innovative web solutions with modern technologies. I specialize in React,
              Node.js, and creating immersive user experiences.
            </p>

            <div className="flex flex-wrap gap-4">
              <button className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-semibold hover:scale-105 transition-transform duration-300">
                View My Work
              </button>
              <button className="px-8 py-3 glass-effect rounded-lg font-semibold hover:bg-white/20 transition-all duration-300">
                Contact Me
              </button>
            </div>

            <div className="space-y-3">
              <p className="text-sm text-gray-400">Choose Animation:</p>
              <div className="flex flex-wrap gap-2">
                {animations.map((animation, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedAnimation(index)}
                    className={`px-3 py-1 text-xs rounded-full transition-all duration-300 ${
                      selectedAnimation === index
                        ? "bg-blue-500 text-white"
                        : "bg-white/10 text-gray-400 hover:bg-white/20 hover:text-white"
                    }`}
                  >
                    {animation.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="h-96 lg:h-[500px]">
            <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} intensity={1} />
              <pointLight position={[-10, -10, -5]} intensity={0.5} color="#3b82f6" />

              <CurrentAnimation />

              <Environment preset="night" />
              <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
            </Canvas>
          </div>
        </div>
      </div>
    </div>
  )
}
