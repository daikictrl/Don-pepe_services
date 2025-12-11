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
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4)
    scene.add(ambientLight)

    // Gold accent light
    const goldLight = new THREE.DirectionalLight(0xd4af37, 1.2)
    goldLight.position.set(5, 5, 5)
    scene.add(goldLight)

    // Purple accent light
    const purpleLight = new THREE.DirectionalLight(0x6b46c1, 0.8)
    purpleLight.position.set(-5, 3, -5)
    scene.add(purpleLight)

    // Rim light for dramatic effect
    const rimLight = new THREE.DirectionalLight(0xffffff, 0.6)
    rimLight.position.set(0, -5, -5)
    scene.add(rimLight)

    // Create futuristic sports car
    const carGroup = new THREE.Group()

    // Main body - sleek and aerodynamic
    const bodyGeometry = new THREE.BoxGeometry(4, 0.8, 1.8)
    const bodyMaterial = new THREE.MeshStandardMaterial({
      color: 0x1a1a1a,
      metalness: 0.95,
      roughness: 0.05,
      envMapIntensity: 1.5,
    })
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial)
    body.position.y = 0.4
    carGroup.add(body)

    // Front section - aggressive wedge shape
    const frontGeometry = new THREE.BoxGeometry(1.2, 0.6, 1.6)
    const frontMaterial = new THREE.MeshStandardMaterial({
      color: 0x0a0a0a,
      metalness: 0.9,
      roughness: 0.1,
    })
    const front = new THREE.Mesh(frontGeometry, frontMaterial)
    front.position.set(2.4, 0.3, 0)
    front.scale.set(1, 0.8, 1)
    carGroup.add(front)

    // Cockpit/Cabin - low and sleek
    const cabinGeometry = new THREE.BoxGeometry(2, 0.7, 1.4)
    const cabinMaterial = new THREE.MeshStandardMaterial({
      color: 0x0a0a0a,
      metalness: 0.9,
      roughness: 0.15,
      transparent: true,
      opacity: 0.95,
    })
    const cabin = new THREE.Mesh(cabinGeometry, cabinMaterial)
    cabin.position.set(-0.3, 1.1, 0)
    cabin.scale.set(1, 0.9, 1)
    carGroup.add(cabin)

    // Gold accent strips
    const stripGeometry = new THREE.BoxGeometry(3.8, 0.08, 0.1)
    const stripMaterial = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      metalness: 1,
      roughness: 0,
      emissive: 0xd4af37,
      emissiveIntensity: 0.5,
    })
    
    const strip1 = new THREE.Mesh(stripGeometry, stripMaterial)
    strip1.position.set(0, 0.8, 0.95)
    carGroup.add(strip1)
    
    const strip2 = new THREE.Mesh(stripGeometry, stripMaterial)
    strip2.position.set(0, 0.8, -0.95)
    carGroup.add(strip2)

    // Rear spoiler
    const spoilerGeometry = new THREE.BoxGeometry(1.5, 0.1, 2)
    const spoilerMaterial = new THREE.MeshStandardMaterial({
      color: 0x1a1a1a,
      metalness: 0.9,
      roughness: 0.1,
    })
    const spoiler = new THREE.Mesh(spoilerGeometry, spoilerMaterial)
    spoiler.position.set(-2.2, 1.2, 0)
    carGroup.add(spoiler)

    // Wheels - futuristic design
    const wheelGeometry = new THREE.CylinderGeometry(0.4, 0.4, 0.3, 32)
    const wheelMaterial = new THREE.MeshStandardMaterial({
      color: 0x0a0a0a,
      metalness: 0.95,
      roughness: 0.1,
    })

    // Wheel rims with gold accent
    const rimGeometry = new THREE.CylinderGeometry(0.25, 0.25, 0.32, 32)
    const rimMaterial = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      metalness: 1,
      roughness: 0,
      emissive: 0xd4af37,
      emissiveIntensity: 0.3,
    })

    const wheelPositions = [
      [1.5, 0, 1],
      [1.5, 0, -1],
      [-1.5, 0, 1],
      [-1.5, 0, -1],
    ]

    wheelPositions.forEach((pos) => {
      // Wheel tire
      const wheel = new THREE.Mesh(wheelGeometry, wheelMaterial)
      wheel.rotation.z = Math.PI / 2
      wheel.position.set(...pos)
      carGroup.add(wheel)

      // Wheel rim
      const rim = new THREE.Mesh(rimGeometry, rimMaterial)
      rim.rotation.z = Math.PI / 2
      rim.position.set(...pos)
      carGroup.add(rim)
    })

    // Headlights - glowing gold
    const headlightGeometry = new THREE.SphereGeometry(0.15, 16, 16)
    const headlightMaterial = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      emissive: 0xd4af37,
      emissiveIntensity: 2,
      metalness: 0.5,
      roughness: 0.2,
    })

    const headlight1 = new THREE.Mesh(headlightGeometry, headlightMaterial)
    headlight1.position.set(3, 0.4, 0.6)
    carGroup.add(headlight1)

    const headlight2 = new THREE.Mesh(headlightGeometry, headlightMaterial)
    headlight2.position.set(3, 0.4, -0.6)
    carGroup.add(headlight2)

    // Taillights - glowing purple
    const taillightMaterial = new THREE.MeshStandardMaterial({
      color: 0x6b46c1,
      emissive: 0x6b46c1,
      emissiveIntensity: 1.5,
      metalness: 0.5,
      roughness: 0.2,
    })

    const taillight1 = new THREE.Mesh(headlightGeometry, taillightMaterial)
    taillight1.position.set(-2.5, 0.5, 0.7)
    carGroup.add(taillight1)

    const taillight2 = new THREE.Mesh(headlightGeometry, taillightMaterial)
    taillight2.position.set(-2.5, 0.5, -0.7)
    carGroup.add(taillight2)

    // Underglow effect
    const underglowGeometry = new THREE.PlaneGeometry(4, 2)
    const underglowMaterial = new THREE.MeshBasicMaterial({
      color: 0xd4af37,
      transparent: true,
      opacity: 0.3,
      side: THREE.DoubleSide,
    })
    const underglow = new THREE.Mesh(underglowGeometry, underglowMaterial)
    underglow.rotation.x = -Math.PI / 2
    underglow.position.y = -0.3
    carGroup.add(underglow)

    scene.add(carGroup)

    // Position camera based on screen size
    const updateCameraPosition = () => {
      const width = window.innerWidth
      if (width < 640) {
        // Mobile
        camera.position.set(0, 3, 8)
        carGroup.scale.set(0.7, 0.7, 0.7)
      } else if (width < 1024) {
        // Tablet
        camera.position.set(0, 2.5, 7)
        carGroup.scale.set(0.85, 0.85, 0.85)
      } else {
        // Desktop
        camera.position.set(0, 2, 6)
        carGroup.scale.set(1, 1, 1)
      }
      camera.lookAt(carGroup.position)
    }
    updateCameraPosition()

    // Mouse and scroll interaction
    let mouseX = 0
    let mouseY = 0
    let targetRotationX = 0
    let targetRotationY = 0
    let currentScroll = 0

    const handleMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1
      
      // More pronounced mouse interaction
      targetRotationY = mouseX * 0.5
      targetRotationX = mouseY * 0.25
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

      // Base rotation
      carGroup.rotation.y += 0.003
      
      // Mouse-based rotation (smooth interpolation) - more responsive
      carGroup.rotation.x += (targetRotationX - carGroup.rotation.x) * 0.08
      carGroup.rotation.y += (targetRotationY - carGroup.rotation.y) * 0.08

      // Scroll-based interaction - tilt and move based on scroll
      const scrollTilt = currentScroll * Math.PI * 0.3
      const scrollOffset = currentScroll * 2
      
      carGroup.rotation.z = Math.sin(scrollTilt) * 0.15
      carGroup.position.y = Math.sin(time) * 0.1 - scrollOffset
      carGroup.position.x = Math.sin(scrollTilt) * 0.5

      // Pulsing underglow
      underglow.material.opacity = 0.2 + Math.sin(time * 2) * 0.1

      // Pulsing lights
      headlight1.material.emissiveIntensity = 1.5 + Math.sin(time * 3) * 0.5
      headlight2.material.emissiveIntensity = 1.5 + Math.sin(time * 3) * 0.5
      taillight1.material.emissiveIntensity = 1 + Math.sin(time * 2.5) * 0.5
      taillight2.material.emissiveIntensity = 1 + Math.sin(time * 2.5) * 0.5

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
  }, [])

  return <div ref={mountRef} className="w-full h-full" />
}

export default Hero3D