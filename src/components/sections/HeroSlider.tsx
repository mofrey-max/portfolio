'use client'

import { useEffect, useState, useCallback } from 'react'
import { cn } from '@/lib/utils'

interface Slide {
  id: string
  icon: string
  title: string
  description: string
  metrics?: Array<{ value: string; label: string }>
}

const slides: Slide[] = [
  {
    id: 'hallucinations',
    icon: '🧠',
    title: 'Cut Hallucinations 18% → 3%',
    description: 'Hybrid retrieval + custom eval suite caught what no one else could see.',
    metrics: [
      { value: '500k', label: 'documents indexed' },
      { value: '500+', label: 'daily users' },
      { value: '95%', label: 'citation accuracy' },
    ],
  },
  {
    id: 'latency',
    icon: '⚡',
    title: 'Reduced Latency 50%+',
    description: 'Streaming responses, reranking, prompt caching — p95 from 4.2s to 1.8s.',
    metrics: [
      { value: '1.8s', label: 'p95 latency' },
      { value: '62%', label: 'cost reduction' },
      { value: '30s', label: 'eval per 1k queries' },
    ],
  },
  {
    id: 'agents',
    icon: '🤖',
    title: 'Built Multi-Agent Systems',
    description: 'LangGraph + Temporal orchestration with human-in-the-loop guardrails.',
    metrics: [
      { value: '94%', label: 'task success rate' },
      { value: '4', label: 'avg agent steps' },
      { value: '100%', label: 'audit trail' },
    ],
  },
  {
    id: 'evals',
    icon: '📊',
    title: 'Eval-First Engineering',
    description: 'Every PR runs evals. Hallucinations >5% fails the build. No exceptions.',
    metrics: [
      { value: '23', label: 'regressions caught' },
      { value: '5', label: 'teams onboarded' },
      { value: '0', label: 'blind deploys' },
    ],
  },
]

export function HeroSlider() {
  const [active, setActive] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const next = useCallback(() => {
    setActive((prev) => (prev + 1) % slides.length)
  }, [])

  useEffect(() => {
    if (isPaused) return
    const timer = setInterval(next, 4000)
    return () => clearInterval(timer)
  }, [isPaused, next])

  const slide = slides[active]

  return (
    <div
      className="hero-slider"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      role="region"
      aria-label="Key achievements"
      aria-roledescription="carousel"
    >
      {/* Slide content */}
      <div className="hero-slider-content" key={slide.id}>
        <div className="hero-slider-header">
          <span className="hero-slider-icon" aria-hidden="true">{slide.icon}</span>
          <div>
            <h2 className="hero-slider-title">{slide.title}</h2>
            <p className="hero-slider-desc">{slide.description}</p>
          </div>
        </div>

        {slide.metrics && (
          <div className="hero-slider-metrics">
            {slide.metrics.map((m) => (
              <div key={m.label} className="hero-slider-metric">
                <span className="hero-slider-metric-value">{m.value}</span>
                <span className="hero-slider-metric-label">{m.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Slide indicators */}
      <div className="hero-slider-dots" role="tablist" aria-label="Slide navigation">
        {slides.map((s, i) => (
          <button
            key={s.id}
            role="tab"
            aria-selected={i === active}
            aria-label={`Slide ${i + 1}: ${s.title}`}
            className={cn('hero-slider-dot', i === active && 'active')}
            onClick={() => setActive(i)}
          />
        ))}
      </div>
    </div>
  )
}
