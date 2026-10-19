'use client'

import { useEffect, useRef } from 'react'

export function FuturisticBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    let width = 0
    let height = 0
    let time = 0

    // Particle network
    interface Particle {
      x: number
      y: number
      vx: number
      vy: number
      size: number
      opacity: number
    }

    const particles: Particle[] = []
    const PARTICLE_COUNT = 60
    const CONNECTION_DIST = 150

    const resize = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }

    const initParticles = () => {
      particles.length = 0
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          size: Math.random() * 2 + 1,
          opacity: Math.random() * 0.5 + 0.2,
        })
      }
    }

    const drawGrid = () => {
      const gridSize = 60
      ctx.strokeStyle = 'rgba(0, 102, 204, 0.04)'
      ctx.lineWidth = 1

      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, height)
        ctx.stroke()
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(width, y)
        ctx.stroke()
      }

      // Animated scan line
      const scanY = ((time * 0.5) % (height + 200)) - 100
      const gradient = ctx.createLinearGradient(0, scanY - 50, 0, scanY + 50)
      gradient.addColorStop(0, 'transparent')
      gradient.addColorStop(0.5, 'rgba(0, 102, 204, 0.06)')
      gradient.addColorStop(1, 'transparent')
      ctx.fillStyle = gradient
      ctx.fillRect(0, scanY - 50, width, 100)
    }

    const drawParticles = () => {
      // Update
      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > width) p.vx *= -1
        if (p.y < 0 || p.y > height) p.vy *= -1
      }

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < CONNECTION_DIST) {
            const alpha = (1 - dist / CONNECTION_DIST) * 0.15
            ctx.strokeStyle = `rgba(0, 102, 204, ${alpha})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }

      // Draw particles
      for (const p of particles) {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0, 102, 204, ${p.opacity})`
        ctx.fill()

        // Glow
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0, 102, 204, ${p.opacity * 0.15})`
        ctx.fill()
      }
    }

    const drawFloatingShapes = () => {
      // Hexagonal tech shapes
      const shapes = [
        { x: width * 0.1, y: height * 0.2, size: 40, rotation: time * 0.0003 },
        { x: width * 0.9, y: height * 0.3, size: 30, rotation: -time * 0.0002 },
        { x: width * 0.85, y: height * 0.7, size: 50, rotation: time * 0.0004 },
        { x: width * 0.15, y: height * 0.8, size: 35, rotation: -time * 0.0003 },
      ]

      for (const shape of shapes) {
        ctx.save()
        ctx.translate(shape.x, shape.y)
        ctx.rotate(shape.rotation)
        ctx.strokeStyle = 'rgba(0, 102, 204, 0.08)'
        ctx.lineWidth = 1.5

        // Draw hexagon
        ctx.beginPath()
        for (let i = 0; i < 6; i++) {
          const angle = (Math.PI / 3) * i - Math.PI / 6
          const x = Math.cos(angle) * shape.size
          const y = Math.sin(angle) * shape.size
          if (i === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        ctx.closePath()
        ctx.stroke()

        // Inner hexagon
        ctx.beginPath()
        for (let i = 0; i < 6; i++) {
          const angle = (Math.PI / 3) * i - Math.PI / 6
          const x = Math.cos(angle) * shape.size * 0.6
          const y = Math.sin(angle) * shape.size * 0.6
          if (i === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        ctx.closePath()
        ctx.stroke()

        ctx.restore()
      }
    }

    const animate = () => {
      time++
      ctx.clearRect(0, 0, width, height)
      drawGrid()
      drawParticles()
      drawFloatingShapes()
      animationId = requestAnimationFrame(animate)
    }

    resize()
    initParticles()
    animate()

    window.addEventListener('resize', () => {
      resize()
      initParticles()
    })

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <>
      {/* Fixed canvas background */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: -2 }}
        aria-hidden="true"
      />

      {/* Gradient orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: -1 }} aria-hidden="true">
        <div className="futuristic-orb orb-1" />
        <div className="futuristic-orb orb-2" />
        <div className="futuristic-orb orb-3" />
      </div>
    </>
  )
}
