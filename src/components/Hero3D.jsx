import React, { useEffect, useRef } from 'react'
import { useMotionValue } from 'framer-motion'
import * as THREE from 'three'

function Hero3D({ scrollProgress }) {
  const mountRef = useRef(null)
  const scrollValue = useMotionValue(0)

  // Subscribe to scroll progress changes
  useEffect(() => {
    if (!scrollProgress) return
    const unsubscribe = scrollProgress.on('change', (latest) => {
      scrollValue.set(latest)
    })
    return unsubscribe
  }, [scrollProgress, scrollValue])

  useEffect(() => {
    if (!mountRef.current) return

    let renderer
    let scene
    let camera
    let frameId
    
    try {
      // Scene setup
      scene = new THREE.Scene()
      camera = new THREE.PerspectiveCamera(
        75,
        mountRef.current.clientWidth / mountRef.current.clientHeight,
        0.1,
        1000
      )
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
      
      // Check if WebGL is actually available
      if (!renderer.getContext()) {
        console.warn('WebGL not available, skipping 3D hero animation')
        return
      }
      
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      mountRef.current.appendChild(renderer.domElement)
    } catch (error) {
      console.warn('Failed to initialize WebGL:', error.message)
      return
    }

    // Enhanced Lighting for futuristic look
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)

    // Multiple directional lights for better illumination
    const lights = [
      { color: 0xd4af37, intensity: 1, position: [10, 10, 10] },
      { color: 0x6b46c1, intensity: 0.8, position: [-10, 8, -10] },
      { color: 0xffffff, intensity: 0.6, position: [0, 15, 0] },
    ]

    lights.forEach(({ color, intensity, position }) => {
      const light = new THREE.DirectionalLight(color, intensity)
      light.position.set(...position)
      scene.add(light)
    })

    // Car colors - 9 different vibrant colors
    const carColors = [
      { body: 0xd4af37, accent: 0xf8e9b5, name: 'Gold' },      // Gold
      { body: 0x6b46c1, accent: 0xa78bfa, name: 'Purple' },    // Purple
      { body: 0xff0000, accent: 0xff6b6b, name: 'Red' },       // Red
      { body: 0x00ff00, accent: 0x90ee90, name: 'Green' },     // Green
      { body: 0x0080ff, accent: 0x87ceeb, name: 'Blue' },      // Blue
      { body: 0xff6600, accent: 0xffa500, name: 'Orange' },    // Orange
      { body: 0xff1493, accent: 0xffb6c1, name: 'Pink' },      // Pink
      { body: 0x00ffff, accent: 0xe0ffff, name: 'Cyan' },      // Cyan
      { body: 0xffff00, accent: 0xffffe0, name: 'Yellow' },    // Yellow
    ]

    // Function to create a futuristic sports car
    const createCar = (colorScheme) => {
      const carGroup = new THREE.Group()

      // Main body - sleek and aerodynamic
      const bodyGeometry = new THREE.BoxGeometry(2.5, 0.6, 1.2)
      const bodyMaterial = new THREE.MeshStandardMaterial({
        color: colorScheme.body,
        metalness: 0.95,
        roughness: 0.05,
        envMapIntensity: 1.5,
      })
      const body = new THREE.Mesh(bodyGeometry, bodyMaterial)
      body.position.y = 0.3
      carGroup.add(body)

      // Front section
      const frontGeometry = new THREE.BoxGeometry(0.8, 0.4, 1)
      const front = new THREE.Mesh(frontGeometry, bodyMaterial)
      front.position.set(1.5, 0.2, 0)
      front.scale.set(1, 0.8, 1)
      carGroup.add(front)

      // Cockpit/Cabin
      const cabinGeometry = new THREE.BoxGeometry(1.2, 0.5, 1)
      const cabinMaterial = new THREE.MeshStandardMaterial({
        color: 0x0a0a0a,
        metalness: 0.9,
        roughness: 0.15,
        transparent: true,
        opacity: 0.8,
      })
      const cabin = new THREE.Mesh(cabinGeometry, cabinMaterial)
      cabin.position.set(-0.2, 0.8, 0)
      carGroup.add(cabin)

      // Accent strips
      const stripGeometry = new THREE.BoxGeometry(2.3, 0.05, 0.08)
      const stripMaterial = new THREE.MeshStandardMaterial({
        color: colorScheme.accent,
        metalness: 1,
        roughness: 0,
        emissive: colorScheme.accent,
        emissiveIntensity: 0.6,
      })
      
      const strip1 = new THREE.Mesh(stripGeometry, stripMaterial)
      strip1.position.set(0, 0.6, 0.65)
      carGroup.add(strip1)
      
      const strip2 = new THREE.Mesh(stripGeometry, stripMaterial)
      strip2.position.set(0, 0.6, -0.65)
      carGroup.add(strip2)

      // Rear spoiler
      const spoilerGeometry = new THREE.BoxGeometry(1, 0.08, 1.3)
      const spoiler = new THREE.Mesh(spoilerGeometry, bodyMaterial)
      spoiler.position.set(-1.4, 0.9, 0)
      carGroup.add(spoiler)

      // Wheels
      const wheelGeometry = new THREE.CylinderGeometry(0.25, 0.25, 0.2, 16)
      const wheelMaterial = new THREE.MeshStandardMaterial({
        color: 0x0a0a0a,
        metalness: 0.95,
        roughness: 0.1,
      })

      const rimGeometry = new THREE.CylinderGeometry(0.15, 0.15, 0.22, 16)
      const rimMaterial = new THREE.MeshStandardMaterial({
        color: colorScheme.accent,
        metalness: 1,
        roughness: 0,
        emissive: colorScheme.accent,
        emissiveIntensity: 0.4,
      })

      const wheelPositions = [
        [1, 0, 0.7],
        [1, 0, -0.7],
        [-1, 0, 0.7],
        [-1, 0, -0.7],
      ]

      wheelPositions.forEach((pos) => {
        const wheel = new THREE.Mesh(wheelGeometry, wheelMaterial)
        wheel.rotation.z = Math.PI / 2
        wheel.position.set(...pos)
        carGroup.add(wheel)

        const rim = new THREE.Mesh(rimGeometry, rimMaterial)
        rim.rotation.z = Math.PI / 2
        rim.position.set(...pos)
        carGroup.add(rim)
      })

      // Headlights
      const headlightGeometry = new THREE.SphereGeometry(0.1, 12, 12)
      const headlightMaterial = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        emissive: 0xffffff,
        emissiveIntensity: 2,
      })

      const headlight1 = new THREE.Mesh(headlightGeometry, headlightMaterial)
      headlight1.position.set(1.9, 0.3, 0.4)
      carGroup.add(headlight1)

      const headlight2 = new THREE.Mesh(headlightGeometry, headlightMaterial)
      headlight2.position.set(1.9, 0.3, -0.4)
      carGroup.add(headlight2)

      // Taillights
      const taillightMaterial = new THREE.MeshStandardMaterial({
        color: 0xff0000,
        emissive: 0xff0000,
        emissiveIntensity: 1.5,
      })

      const taillight1 = new THREE.Mesh(headlightGeometry, taillightMaterial)
      taillight1.position.set(-1.6, 0.4, 0.5)
      carGroup.add(taillight1)

      const taillight2 = new THREE.Mesh(headlightGeometry, taillightMaterial)
      taillight2.position.set(-1.6, 0.4, -0.5)
      carGroup.add(taillight2)

      return carGroup
    }

    // Function to create a building
    const createBuilding = (width, height, depth, color, x, z) => {
      const buildingGroup = new THREE.Group()
      
      // Main building structure
      const geometry = new THREE.BoxGeometry(width, height, depth)
      const material = new THREE.MeshStandardMaterial({
        color: color,
        metalness: 0.6,
        roughness: 0.4,
      })
      const building = new THREE.Mesh(geometry, material)
      building.position.y = height / 2
      buildingGroup.add(building)
      
      // Windows - glowing effect
      const windowRows = Math.floor(height / 1.5)
      const windowCols = Math.floor(width / 1.2)
      
      for (let row = 0; row < windowRows; row++) {
        for (let col = 0; col < windowCols; col++) {
          if (Math.random() > 0.3) { // 70% chance of window
            const windowGeometry = new THREE.PlaneGeometry(0.4, 0.6)
            const windowMaterial = new THREE.MeshStandardMaterial({
              color: Math.random() > 0.5 ? 0xd4af37 : 0x6b46c1,
              emissive: Math.random() > 0.5 ? 0xd4af37 : 0x6b46c1,
              emissiveIntensity: 0.8,
            })
            const window1 = new THREE.Mesh(windowGeometry, windowMaterial)
            window1.position.set(
              -width/2 + (col + 0.5) * (width / windowCols),
              (row + 0.5) * (height / windowRows),
              depth/2 + 0.01
            )
            buildingGroup.add(window1)
          }
        }
      }
      
      buildingGroup.position.set(x, 0, z)
      return buildingGroup
    }

    // Function to create a tree/plant
    const createTree = (x, z) => {
      const treeGroup = new THREE.Group()
      
      // Trunk
      const trunkGeometry = new THREE.CylinderGeometry(0.2, 0.3, 2, 8)
      const trunkMaterial = new THREE.MeshStandardMaterial({
        color: 0x4a3728,
        roughness: 0.9,
      })
      const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial)
      trunk.position.y = 1
      treeGroup.add(trunk)
      
      // Foliage
      const foliageGeometry = new THREE.SphereGeometry(1, 8, 8)
      const foliageMaterial = new THREE.MeshStandardMaterial({
        color: 0x2d5016,
        roughness: 0.8,
      })
      const foliage = new THREE.Mesh(foliageGeometry, foliageMaterial)
      foliage.position.y = 2.5
      treeGroup.add(foliage)
      
      treeGroup.position.set(x, 0, z)
      return treeGroup
    }

    // Create the city environment
    const cityGroup = new THREE.Group()

    // Ground/Base plate
    const groundGeometry = new THREE.CircleGeometry(35, 64)
    const groundMaterial = new THREE.MeshStandardMaterial({
      color: 0x1a1a1a,
      roughness: 0.9,
    })
    const ground = new THREE.Mesh(groundGeometry, groundMaterial)
    ground.rotation.x = -Math.PI / 2
    ground.position.y = -0.5
    cityGroup.add(ground)

    // Racing track - circular road
    const trackRadius = 12
    const trackWidth = 9
    const roadGeometry = new THREE.RingGeometry(trackRadius - trackWidth/2, trackRadius + trackWidth/2, 64)
    const roadMaterial = new THREE.MeshStandardMaterial({
      color: 0x2a2a2a,
      roughness: 0.8,
    })
    const road = new THREE.Mesh(roadGeometry, roadMaterial)
    road.rotation.x = -Math.PI / 2
    road.position.y = -0.48
    cityGroup.add(road)

    // Road lane markings
    const laneMarkingGeometry = new THREE.RingGeometry(trackRadius - 1.5, trackRadius - 1.3, 64)
    const laneMarkingMaterial = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      emissive: 0xd4af37,
      emissiveIntensity: 0.5,
    })
    const laneMarking1 = new THREE.Mesh(laneMarkingGeometry, laneMarkingMaterial)
    laneMarking1.rotation.x = -Math.PI / 2
    laneMarking1.position.y = -0.47
    cityGroup.add(laneMarking1)

    const laneMarking2 = new THREE.Mesh(
      new THREE.RingGeometry(trackRadius + 1.5, trackRadius + 1.7, 64),
      laneMarkingMaterial
    )
    laneMarking2.rotation.x = -Math.PI / 2
    laneMarking2.position.y = -0.47
    cityGroup.add(laneMarking2)

    // Create buildings around the track
    const buildingColors = [0x2d2d2d, 0x1a1a1a, 0x3d3d3d, 0x252525]
    const buildingPositions = [
      // Outer ring of tall buildings
      { x: 25, z: 0, w: 4, h: 15, d: 4 },
      { x: -25, z: 0, w: 4, h: 18, d: 4 },
      { x: 0, z: 25, w: 5, h: 20, d: 5 },
      { x: 0, z: -25, w: 4, h: 16, d: 4 },
      { x: 18, z: 18, w: 3, h: 12, d: 3 },
      { x: -18, z: 18, w: 4, h: 14, d: 4 },
      { x: 18, z: -18, w: 3, h: 13, d: 3 },
      { x: -18, z: -18, w: 4, h: 17, d: 4 },
      
      // Mid ring buildings
      { x: 22, z: 10, w: 3, h: 10, d: 3 },
      { x: 22, z: -10, w: 3, h: 11, d: 3 },
      { x: -22, z: 10, w: 3, h: 9, d: 3 },
      { x: -22, z: -10, w: 3, h: 12, d: 3 },
      { x: 10, z: 22, w: 3, h: 8, d: 3 },
      { x: -10, z: 22, w: 3, h: 10, d: 3 },
      { x: 10, z: -22, w: 3, h: 9, d: 3 },
      { x: -10, z: -22, w: 3, h: 11, d: 3 },
      
      // Additional scattered buildings
      { x: 28, z: 12, w: 3, h: 14, d: 3 },
      { x: 28, z: -12, w: 3, h: 13, d: 3 },
      { x: -28, z: 12, w: 3, h: 15, d: 3 },
      { x: -28, z: -12, w: 3, h: 12, d: 3 },
    ]

    buildingPositions.forEach(({ x, z, w, h, d }) => {
      const color = buildingColors[Math.floor(Math.random() * buildingColors.length)]
      const building = createBuilding(w, h, d, color, x, z)
      cityGroup.add(building)
    })

    // Add smaller houses/structures inside the track
    const housePositions = [
      { x: 5, z: 5 }, { x: -5, z: 5 }, { x: 5, z: -5 }, { x: -5, z: -5 },
      { x: 7, z: 0 }, { x: -7, z: 0 }, { x: 0, z: 7 }, { x: 0, z: -7 },
    ]

    housePositions.forEach(({ x, z }) => {
      const house = createBuilding(2, 3, 2, 0x3d3d3d, x, z)
      cityGroup.add(house)
    })

    // Add trees/plants scattered around
    const treePositions = [
      { x: 20, z: 5 }, { x: 20, z: -5 }, { x: -20, z: 5 }, { x: -20, z: -5 },
      { x: 15, z: 15 }, { x: -15, z: 15 }, { x: 15, z: -15 }, { x: -15, z: -15 },
      { x: 8, z: 2 }, { x: -8, z: 2 }, { x: 8, z: -2 }, { x: -8, z: -2 },
      { x: 3, z: 8 }, { x: -3, z: 8 }, { x: 3, z: -8 }, { x: -3, z: -8 },
      { x: 25, z: 15 }, { x: -25, z: 15 }, { x: 25, z: -15 }, { x: -25, z: -15 },
    ]

    treePositions.forEach(({ x, z }) => {
      const tree = createTree(x, z)
      cityGroup.add(tree)
    })

    // Add street lights around the track
    const streetLightPositions = 12
    for (let i = 0; i < streetLightPositions; i++) {
      const angle = (i / streetLightPositions) * Math.PI * 2
      const radius = trackRadius + trackWidth/2 + 1
      const x = Math.cos(angle) * radius
      const z = Math.sin(angle) * radius
      
      // Light pole
      const poleGeometry = new THREE.CylinderGeometry(0.1, 0.1, 4, 8)
      const poleMaterial = new THREE.MeshStandardMaterial({ color: 0x4a4a4a })
      const pole = new THREE.Mesh(poleGeometry, poleMaterial)
      pole.position.set(x, 2, z)
      cityGroup.add(pole)
      
      // Light
      const lightGeometry = new THREE.SphereGeometry(0.3, 8, 8)
      const lightMaterial = new THREE.MeshStandardMaterial({
        color: 0xffd700,
        emissive: 0xffd700,
        emissiveIntensity: 2,
      })
      const light = new THREE.Mesh(lightGeometry, lightMaterial)
      light.position.set(x, 4, z)
      cityGroup.add(light)
      
      // Point light for illumination
      const pointLight = new THREE.PointLight(0xffd700, 0.5, 10)
      pointLight.position.set(x, 4, z)
      cityGroup.add(pointLight)
    }

    scene.add(cityGroup)

    // Create 9 racing cars with different colors
    const cars = []
    const trackLanes = 3 // 3 lanes with 3 cars each

    carColors.forEach((colorScheme, index) => {
      const car = createCar(colorScheme)
      
      // Position cars in 3 lanes (inner, middle, outer)
      const lane = Math.floor(index / 3)
      const positionInLane = index % 3
      const laneRadius = trackRadius + (lane * 3) - 3
      
      // Initial angle position (spread evenly in each lane)
      const angleOffset = (positionInLane * (Math.PI * 2 / 3)) + (lane * 0.3)
      
      // Store car data
      cars.push({
        mesh: car,
        lane: lane,
        laneRadius: laneRadius,
        speed: 0.008 + (Math.random() * 0.004), // Different speeds
        angle: angleOffset,
        colorScheme: colorScheme
      })
      
      scene.add(car)
    })

    // Position camera
    const updateCameraPosition = () => {
      const width = window.innerWidth
      if (width < 640) {
        camera.position.set(0, 12, 20)
      } else if (width < 1024) {
        camera.position.set(0, 14, 22)
      } else {
        camera.position.set(0, 16, 24)
      }
      camera.lookAt(0, 0, 0)
    }
    updateCameraPosition()

    // Mouse and scroll interaction
    let mouseX = 0
    let mouseY = 0
    let currentScroll = 0

    const handleMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1
    }

    window.addEventListener('mousemove', handleMouseMove)

    // Track scroll value
    const unsubscribeScroll = scrollValue.on('change', (latest) => {
      currentScroll = latest
    })

    // Animation loop
    let time = 0
    const animate = () => {
      frameId = requestAnimationFrame(animate)
      time += 0.01

      // Update each car's position on the racing track
      cars.forEach((carData, index) => {
        // Update angle for circular racing motion
        carData.angle += carData.speed
        
        // Calculate position on circular track
        const x = Math.cos(carData.angle) * carData.laneRadius
        const z = Math.sin(carData.angle) * carData.laneRadius
        
        carData.mesh.position.x = x
        carData.mesh.position.z = z
        carData.mesh.position.y = Math.sin(time + index) * 0.15 // Floating effect
        
        // Rotate car to face direction of travel
        carData.mesh.rotation.y = -carData.angle + Math.PI / 2
        
        // Slight tilt based on speed
        carData.mesh.rotation.z = Math.sin(time * 2 + index) * 0.05
      })

      // Camera movement based on mouse and scroll
      const targetX = mouseX * 3
      const targetY = 16 + (mouseY * 2) - (currentScroll * 5)
      
      camera.position.x += (targetX - camera.position.x) * 0.05
      camera.position.y += (targetY - camera.position.y) * 0.05
      camera.lookAt(0, 0, 0)

      renderer.render(scene, camera)
    }
    animate()

    // Handle resize
    const handleResize = () => {
      if (!mountRef.current) return
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight)
      updateCameraPosition()
    }
    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
      if (unsubscribeScroll) unsubscribeScroll()
      if (frameId) cancelAnimationFrame(frameId)
      if (mountRef.current && renderer && renderer.domElement && mountRef.current.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement)
      }
      if (renderer) {
        renderer.dispose()
      }
      // Dispose geometries and materials
      scene.traverse((object) => {
        if (object.geometry) object.geometry.dispose()
        if (object.material) {
          if (Array.isArray(object.material)) {
            object.material.forEach(material => material.dispose())
          } else {
            object.material.dispose()
          }
        }
      })
    }
  }, [scrollValue])

  return <div ref={mountRef} className="w-full h-full" />
}

export default Hero3D