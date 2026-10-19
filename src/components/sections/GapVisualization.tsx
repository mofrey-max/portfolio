'use client'

import { useEffect, useRef, useState } from 'react'

export function GapVisualization() {
  const prefersReducedMotion = typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const [mounted, setMounted] = useState(false)
  const particlesRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Particle system for ambient atmosphere
  useEffect(() => {
    if (prefersReducedMotion || !particlesRef.current) return

    const canvas = particlesRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect()
      if (rect) {
        canvas.width = rect.width * window.devicePixelRatio
        canvas.height = rect.height * window.devicePixelRatio
        canvas.style.width = `${rect.width}px`
        canvas.style.height = `${rect.height}px`
      }
    }

    const particles: Array<{
      x: number; y: number; vx: number; vy: number
      size: number; opacity: number; color: string
    }> = []

    const initParticles = () => {
      particles.length = 0
      const count = Math.min(30, Math.floor((canvas.width * canvas.height) / 20000))
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25,
          size: Math.random() * 1.2 + 0.4,
          opacity: Math.random() * 0.2 + 0.03,
          color: Math.random() > 0.6 ? '#60a5fa' : Math.random() > 0.3 ? '#34d399' : '#fbbf24'
        })
      }
    }

    let animationId: number
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach(p => {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size * window.devicePixelRatio, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.globalAlpha = p.opacity
        ctx.fill()
      })

      ctx.globalAlpha = 0.025
      ctx.strokeStyle = '#60a5fa'
      ctx.lineWidth = 0.5
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 100 * window.devicePixelRatio) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }
      ctx.globalAlpha = 1

      animationId = requestAnimationFrame(animate)
    }

    resize()
    initParticles()
    animate()
    window.addEventListener('resize', resize)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
    }
  }, [prefersReducedMotion])

  if (!mounted) {
    return (
      <div className="gap-visualization" role="img" aria-hidden="true">
        <div className="flex items-center justify-center min-h-[300px] md:min-h-[400px]">
          <div className="text-center text-text-muted text-sm py-12">Loading visualization…</div>
        </div>
      </div>
    )
  }

  return (
    <div className="gap-visualization" role="img" aria-label="Notebook prototype vs production system, bridged by evaluation, streaming, and guardrails.">
      {/* Ambient particle canvas — absolute behind everything */}
      <canvas
        ref={particlesRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: -1 }}
        aria-hidden="true"
      />

      {/* Grid overlay for depth */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: -1,
          backgroundImage: `
            linear-gradient(rgba(96, 165, 250, 0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(96, 165, 250, 0.02) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 80%)'
        }}
        aria-hidden="true"
      />

      {/* Panels container — flex column on mobile, row on desktop */}
      <div className="gap-viz-panels relative">
        {/* Left Panel — Notebook */}
        <div className="gap-panel gap-panel-left reveal-panel" style={{ animationDelay: '0ms' }}>
          <div className="panel-glow" aria-hidden="true" />

          {/* Traffic lights */}
          <div className="flex items-center gap-1.5 mb-2.5" aria-hidden="true">
            <span className="w-2.5 h-2.5 rounded-full bg-error" />
            <span className="w-2.5 h-2.5 rounded-full bg-warning" />
            <span className="w-2.5 h-2.5 rounded-full bg-success" />
          </div>

          <div className="code-window">
            <div className="code-header">
              <span className="code-dot error" aria-hidden="true" />
              <span className="code-dot warning" aria-hidden="true" />
              <span className="code-dot success" aria-hidden="true" />
              <span className="code-title">notebook.ipynb</span>
            </div>
            <pre className="m-0 p-3 sm:p-4 overflow-x-auto text-xs text-text bg-bg">
              <code>{`chain.invoke({
  query: "What is our refund policy?"
})`}</code>
            </pre>
          </div>

          <div
            className="result-badge mt-2.5 p-2.5 bg-success-bg border border-success rounded-lg text-success text-xs font-mono flex flex-wrap items-center gap-x-4 gap-y-1"
            style={{ animationDelay: '300ms' }}
          >
            <span className="flex items-center gap-1">
              <svg className="w-3 h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 1.414z" clipRule="evenodd" /></svg>
              Clean output
            </span>
            <span className="text-text-muted">0.8s</span>
            <span className="text-text-muted">$0.02</span>
          </div>

          <p className="text-center text-xs text-text-muted mt-2 panel-label">Notebook</p>
        </div>

        {/* Bridge — on mobile: vertical arrow between panels; on desktop: centered SVG */}
        <div className="gap-bridge" style={{ opacity: prefersReducedMotion ? 1 : undefined }}>
          <div className="bridge-container">
            {/* Animated particles flowing along bridge */}
            <div className="bridge-particles" aria-hidden="true">
              {[...Array(10)].map((_, i) => (
                <div
                  key={i}
                  className="bridge-particle"
                  style={{
                    animationDelay: `${i * 180}ms`,
                    left: `${50 + (Math.random() - 0.5) * 8}%`
                  }}
                />
              ))}
            </div>

            <svg
              viewBox="0 0 100 100"
              className="bridge-svg"
              preserveAspectRatio="xMidYMid meet"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="bridgeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#60a5fa" />
                  <stop offset="50%" stopColor="#34d399" />
                  <stop offset="100%" stopColor="#fbbf24" />
                </linearGradient>
                <filter id="bridgeGlow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="2" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              {/* Vertical line for mobile, curved for desktop — single path works for both with preserveAspectRatio */}
              <path
                d="M50 8 Q50 35 50 50 Q50 65 50 92"
                stroke="url(#bridgeGrad)"
                strokeWidth="2.5"
                fill="none"
                filter="url(#bridgeGlow)"
                style={{
                  strokeDasharray: 1000,
                  strokeDashoffset: prefersReducedMotion ? 0 : 1000,
                  animation: prefersReducedMotion ? 'none' : 'drawBridge 1000ms cubic-bezier(0.16, 1, 0.3, 1) 300ms forwards',
                }}
              />
              {/* Arrowhead */}
              <polygon
                points="44,88 50,98 56,88"
                fill="#fbbf24"
                style={{
                  opacity: prefersReducedMotion ? 1 : 0,
                  animation: prefersReducedMotion ? 'none' : 'fadeInScale 300ms ease 1200ms forwards',
                }}
              />
              {/* EVAL label */}
              <text
                x="50" y="52"
                textAnchor="middle" dominantBaseline="middle"
                className="bridge-label"
                fill="var(--text-strong)"
                style={{
                  opacity: prefersReducedMotion ? 1 : 0,
                  animation: prefersReducedMotion ? 'none' : 'fadeInScale 400ms cubic-bezier(0.16, 1, 0.3, 1) 800ms forwards',
                }}
              >
                EVAL
              </text>
            </svg>

            {/* Floating metrics — desktop only (hidden via CSS on mobile) */}
            <div className="bridge-metrics" aria-hidden="true">
              <div className="bridge-metric" style={{ top: '15%', left: '-90px', animationDelay: '1100ms' }}>
                <span className="metric-tag success">✓ Eval</span>
              </div>
              <div className="bridge-metric" style={{ top: '45%', right: '-90px', animationDelay: '1250ms' }}>
                <span className="metric-tag warning">⚡ Stream</span>
              </div>
              <div className="bridge-metric" style={{ top: '75%', left: '-90px', animationDelay: '1400ms' }}>
                <span className="metric-tag success">🛡 Guard</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel — Production */}
        <div className="gap-panel gap-panel-right reveal-panel" style={{ animationDelay: '120ms' }}>
          <div className="panel-glow error" aria-hidden="true" />

          {/* Traffic lights */}
          <div className="flex items-center gap-1.5 mb-2.5" aria-hidden="true">
            <span className="w-2.5 h-2.5 rounded-full bg-error animate-pulse" />
            <span className="w-2.5 h-2.5 rounded-full bg-warning" />
            <span className="w-2.5 h-2.5 rounded-full bg-success" />
          </div>

          <div className="code-window error">
            <div className="code-header">
              <span className="code-dot error" aria-hidden="true" />
              <span className="code-dot warning" aria-hidden="true" />
              <span className="code-dot success" aria-hidden="true" />
              <span className="code-title">production.py</span>
              <span className="status-badge error">LIVE</span>
            </div>
            <div className="relative">
              <pre className="m-0 p-3 sm:p-4 overflow-x-auto text-xs text-text bg-bg">
                <code>{`chain.invoke({
  query: "What is our refund policy?"
})`}</code>
              </pre>
              {/* Annotations — responsive positioning */}
              <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
                <div className="annotation error hidden sm:inline-flex" style={{ top: '12px', right: '12px' }}>
                  <span className="annotation-dot error" />
                  <span>18% hallucinations</span>
                </div>
                <div className="annotation warning hidden sm:inline-flex" style={{ top: '44px', right: '12px' }}>
                  <span className="annotation-dot warning" />
                  <span>4.2s p95</span>
                </div>
                <div className="annotation warning hidden sm:inline-flex" style={{ bottom: '44px', right: '12px' }}>
                  <span className="annotation-dot warning" />
                  <span>$0.42/query</span>
                </div>
                <div className="annotation error hidden sm:inline-flex" style={{ bottom: '12px', right: '12px' }}>
                  <span className="annotation-dot error" />
                  <span>No eval</span>
                </div>
              </div>
            </div>
          </div>

          <div
            className="result-badge mt-2.5 p-2.5 bg-error-bg border border-error rounded-lg text-error text-xs font-mono flex flex-wrap items-center gap-x-3 gap-y-1"
            style={{ animationDelay: '400ms' }}
          >
            <span className="flex items-center gap-1">
              <svg className="w-3 h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L10.586 10l-1.879 1.879a1 1 0 101.414 1.414L12 11.414l1.879 1.879a1 1 0 001.414-1.414L13.414 10l1.879-1.879a1 1 0 00-1.414-1.414L12 8.586 10.121 6.707a1 1 0 00-1.414-1.414L10 6.586 8.121 8.465a1 1 0 001.414 1.414z" clipRule="evenodd" /></svg>
              Hallucinates
            </span>
            <span className="text-text-muted">Slow</span>
            <span className="text-text-muted">Expensive</span>
            <span className="text-text-muted">Blind</span>
          </div>

          <p className="text-center text-xs text-text-muted mt-2 panel-label">Production</p>
        </div>
      </div>

      {/* Screen-reader data */}
      <div className="sr-only">
        Gap visualization: The notebook panel shows a clean LLM output in 0.8 seconds at $0.02 per query. The production panel shows the same code failing with 18% hallucinations, 4.2 second latency, $0.42 cost per query, and no evaluation. A bridge labeled EVAL connects them, representing evaluation, streaming, and guardrails as the solution.
      </div>
    </div>
  )
}
