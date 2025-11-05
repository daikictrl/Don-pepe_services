import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'

function Hero3D() {
  const mountRef = useRef(null)

  useEffect(() => {
    if (!mountRef.current) return

    let renderer
    try {
      // Scene setup
      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(
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
      renderer.setPixelRatio(window.devicePixelRatio)
      mountRef.current.appendChild(renderer.domElement)
    } catch (error) {
      console.warn('Failed to initialize WebGL:', error.message)
      return
    }

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
    scene.add(ambientLight)

    const directionalLight1 = new THREE.DirectionalLight(0xd4af37, 0.8)
    directionalLight1.position.set(5, 5, 5)
    scene.add(directionalLight1)

    const directionalLight2 = new THREE.DirectionalLight(0x6b46c1, 0.6)
    directionalLight2.position.set(-5, 3, -5)
    scene.add(directionalLight2)

    // Create simplified luxury car
    const carGroup = new THREE.Group()

    // Body
    const bodyGeometry = new THREE.BoxGeometry(3, 1, 1.5)
    const bodyMaterial = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      metalness: 0.9,
      roughness: 0.1,
    })
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial)
    carGroup.add(body)

    // Roof
    const roofGeometry = new THREE.BoxGeometry(1.5, 0.8, 1.2)
    const roof = new THREE.Mesh(roofGeometry, bodyMaterial)
    roof.position.set(-0.5, 0.9, 0)
    carGroup.add(roof)

    // Wheels
    const wheelGeometry = new THREE.CylinderGeometry(0.3, 0.3, 0.2, 32)
    const wheelMaterial = new THREE.MeshStandardMaterial({
      color: 0x1a1a1a,
      metalness: 0.8,
      roughness: 0.2,
    })

    const wheelPositions = [
      [-0.8, -0.6, 0.9],
      [-0.8, -0.6, -0.9],
      [0.8, -0.6, 0.9],
      [0.8, -0.6, -0.9],
    ]

    wheelPositions.forEach((pos) => {
      const wheel = new THREE.Mesh(wheelGeometry, wheelMaterial)
      wheel.rotation.z = Math.PI / 2
      wheel.position.set(...pos)
      carGroup.add(wheel)
    })

    scene.add(carGroup)

    camera.position.set(0, 2, 5)
    camera.lookAt(carGroup.position)

    // Mouse interaction
    let mouseX = 0
    let mouseY = 0

    const handleMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1
    }

    window.addEventListener('mousemove', handleMouseMove)

    // Animation loop
    let frameId
    const animate = () => {
      frameId = requestAnimationFrame(animate)

      carGroup.rotation.y += 0.005
      carGroup.rotation.x += (mouseY * 0.1 - carGroup.rotation.x) * 0.05

      renderer.render(scene, camera)
    }
    animate()

    // Handle resize
    const handleResize = () => {
      if (!mountRef.current) return
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight)
    }
    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
      if (frameId) cancelAnimationFrame(frameId)
      if (mountRef.current && renderer && renderer.domElement && mountRef.current.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement)
      }
      if (renderer) {
        renderer.dispose()
      }
    }
  }, [])

  return <div ref={mountRef} className="w-full h-full" />
}

export default Hero3D

