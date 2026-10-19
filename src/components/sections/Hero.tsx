'use client'

import { useEffect, useState } from 'react'
import { ArrowRight, Download, Github, Mail } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { useToast } from '@/components/ui/Toast'
import { copyEmailToClipboard, openMailClient } from '@/lib/email'
import { GapVisualization } from './GapVisualization'
import { HeroSlider } from './HeroSlider'

const statements = [
  {
    headline: 'I turn LLM prototypes that work in notebooks into features that work in production — evals, observability, and all.',
    subtitle: 'RAG pipelines · Agent systems · Evaluation frameworks · Production deployment',
  },
  {
    headline: 'Building AI systems that don\'t just demo well — they ship, scale, and survive real users.',
    subtitle: 'Retrieval-Augmented Generation · Multi-Agent Orchestration · LLM Evaluation',
  },
  {
    headline: 'Every model call is a production incident waiting to happen. I close the gap before it opens.',
    subtitle: 'Hallucination detection · Latency optimization · Cost control · Guardrails',
  },
  {
    headline: 'From prompt engineering to platform engineering — the full lifecycle of reliable AI features.',
    subtitle: 'Observability · Regression testing · Prompt versioning · A/B testing',
  },
  {
    headline: 'AI that works in the notebook is a demo. AI that works in production is a product.',
    subtitle: 'Eval-first development · CI/CD for LLMs · Streaming · Human-in-the-loop',
  },
]

export default function Hero() {
  const [active, setActive] = useState(0)
  const { toast } = useToast()

  const handleEmailClick = (e: React.MouseEvent) => {
    e.preventDefault()
    toast({ type: 'info', message: 'Opening your email app…' })
    copyEmailToClipboard()
    openMailClient()
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % statements.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const current = statements[active]

  return (
    <section id="hero" className="hero container" aria-labelledby="hero-heading">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        {/* Headline — rotating AI engineering statements */}
        <div className="text-center md:text-left mb-6 md:mb-8">
          <h1 id="hero-heading" className="hero-headline mb-4 headline-rotate min-h-[120px] sm:min-h-[140px] md:min-h-[160px] flex items-end" key={`h-${active}`}>
            {current.headline}
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-text-muted max-w-3xl mx-auto md:mx-0 mb-6 leading-relaxed subtitle-rotate min-h-[62px] flex items-start" key={`s-${active}`}>
            {current.subtitle}
          </p>
          {/* Statement indicators */}
          <div className="flex items-center justify-center md:justify-start gap-1.5" role="tablist" aria-label="Statements">
            {statements.map((_, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === active}
                aria-label={`Statement ${i + 1}`}
                onClick={() => setActive(i)}
                className={`statement-dot ${i === active ? 'active' : ''}`}
              />
            ))}
          </div>
        </div>

        {/* Hero Slider — rotating achievements */}
        <div className="mb-8 md:mb-10">
          <HeroSlider />
        </div>

        {/* Immersive Gap Visualization — container query responsive */}
        <div className="gap-viz-container mb-10 md:mb-12">
          <GapVisualization />
        </div>

        {/* Tech Stack Pills */}
        <div className="mb-10">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
            <span className="text-xs text-text-muted mr-1">Stack:</span>
            {['Python', 'TypeScript', 'LangChain', 'LlamaIndex', 'RAGAS', 'Langfuse', 'vLLM', 'Triton', 'Kubernetes', 'AWS', 'PostgreSQL', 'Redis'].map((tech) => (
              <span key={tech} className="tech-pill">
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* CTA — Resume only */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center md:justify-start gap-3 sm:gap-4 mb-8">
          <Button size="lg" className="w-full sm:w-auto group">
            <Download className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
            <span className="truncate">Resume</span>
            <ArrowRight className="w-5 h-5 flex-shrink-0 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Button>
        </div>

        {/* Contact links */}
        <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-2 sm:gap-4 text-sm text-text-muted">
          <a
            href="https://github.com/mofrey-max"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-primary transition-colors external-link"
            aria-label="GitHub profile (opens in new tab)"
          >
            <Github className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
            github.com/mofrey-max
          </a>
          <span className="hidden sm:inline" aria-hidden="true">·</span>
          <a
            href="mailto:manugodfrey855@gmail.com"
            onClick={handleEmailClick}
            className="flex items-center gap-1.5 hover:text-primary transition-colors"
          >
            <Mail className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
            Send Email
          </a>
        </div>

        {/* Screen-reader data for Gap visualization */}
        <div className="sr-only">
          Gap visualization: The notebook panel shows a clean LLM output in 0.8 seconds at $0.02 per query. The production panel shows the same code failing with 18% hallucinations, 4.2 second latency, $0.42 cost per query, and no evaluation. A bridge labeled EVAL connects them, representing evaluation, streaming, and guardrails as the solution.
        </div>
      </div>
    </section>
  )
}
