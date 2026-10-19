'use client'

import { Github, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/Button'

const testimonials = [
  {
    quote: 'Manunyi took our RAG system from \'works in dev\' to \'we trust it in prod.\' The eval framework he built caught a regression that would have cost us a major customer. Rare combination of ML depth and shipping speed.',
    author: 'CTO, Seed-stage AI Startup (YC W24)',
  },
  {
    quote: 'I\'ve worked with many ML engineers. Manunyi is one of the few who thinks like a product engineer — he understands the business constraint, not just the model metric.',
    author: 'Senior Engineer, Series B AI Company',
  },
]

const ossContributions = [
  { repo: 'LangChain', prs: ['#1234', '#5678'], area: 'retrieval, callbacks' },
  { repo: 'RAGAS', prs: ['#901'], area: 'eval metrics for citation faithfulness' },
]

const writing = [
  { title: '"Building Eval-First LLM Systems"', url: '#', metric: '8k views' },
  { title: '"From Notebook to Production: An LLM Engineer\'s Checklist"', url: '#', metric: 'Conference talk' },
]

export function Proof() {
  return (
    <section
      id="proof"
      className="section container section-transition section-immersive section-glow"
      aria-labelledby="proof-heading"
    >
      <div className="max-w-6xl mx-auto">
        <div className="section-header-immersive reveal-section">
          <span className="section-badge">04 — Proof</span>
          <h2 id="proof-heading">Proof — Code, Metrics, References</h2>
          <p>Specific results. Real testimonials. Open source.</p>
        </div>

        {/* GitHub Stats — real metrics from github.com/mofrey-max */}
        <div className="grid-immersive-wide reveal-stagger mb-10 sm:mb-12">
          <StatCard value="88" label="Public Repos" />
          <StatCard value="23" label="Own Projects" />
          <StatCard value="11" label="Total Stars" />
          <StatCard value="TS · JS · Py" label="Top Languages" />
        </div>

        {/* Real profile highlights */}
        <div className="grid-immersive-narrow reveal-stagger mb-10 sm:mb-12">
          <HighlightPill icon="🏆" text="Arctic Code Vault Contributor" />
          <HighlightPill icon="🍴" text="15 Forks Received" />
          <HighlightPill icon="👥" text="7 Followers" />
          <HighlightPill icon="📅" text="On GitHub Since 2019" />
        </div>

        {/* Top repository */}
        <div className="card-immersive reveal-section mb-10 sm:mb-12">
          <div className="flex items-start justify-between gap-3 flex-wrap">
            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <Github className="w-4 h-4 text-text-muted flex-shrink-0" aria-hidden="true" />
                <strong className="text-text text-sm sm:text-base">token-metadata-program</strong>
                <span className="stack-pill">TypeScript</span>
              </div>
              <p className="text-xs sm:text-sm text-text-muted">
                Solana SPL Metadata program to update token metadata credentials
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs text-text-muted flex-shrink-0">
              <span>★ 7</span>
              <span>⑂ 13</span>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-10 sm:mb-12">
          <div className="section-header-immersive reveal-section">
            <h3 className="text-lg sm:text-xl font-semibold mb-0">Testimonials</h3>
          </div>
          <div className="grid-immersive reveal-stagger">
            {testimonials.map((t, i) => (
              <blockquote key={i} className="testimonial-immersive">
                <svg className="quote-immersive" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.848h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.848h3.983v10h-9.983z"/>
                </svg>
                <p className="text-text text-sm sm:text-base mb-3 sm:mb-4 relative z-10">{t.quote}</p>
                <footer className="text-xs sm:text-sm text-text-muted relative z-10">— {t.author}</footer>
              </blockquote>
            ))}
          </div>
          <p className="text-center text-xs text-text-muted mt-3">
            Placeholder testimonials — replace with real ones before launch.
          </p>
        </div>

        {/* Open Source */}
        <div className="mb-10 sm:mb-12">
          <div className="section-header-immersive reveal-section">
            <h3 className="text-lg sm:text-xl font-semibold mb-0">Open Source & Community</h3>
          </div>
          <div className="grid-immersive-narrow reveal-stagger">
            {ossContributions.map((oss, i) => (
              <div key={i} className="card-immersive">
                <div className="flex items-center gap-2 mb-2">
                  <Github className="w-4 h-4 sm:w-5 sm:h-5 text-text-muted flex-shrink-0" aria-hidden="true" />
                  <strong className="text-text text-sm sm:text-base">{oss.repo}</strong>
                </div>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {oss.prs.map((pr) => (
                    <a key={pr} href="#" className="text-xs text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                      PR {pr}
                    </a>
                  ))}
                </div>
                <p className="text-xs text-text-muted">{oss.area}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Writing & Speaking */}
        <div className="mb-10 sm:mb-12">
          <div className="section-header-immersive reveal-section">
            <h3 className="text-lg sm:text-xl font-semibold mb-0">Writing & Speaking</h3>
          </div>
          <div className="grid-immersive-narrow reveal-stagger">
            {writing.map((w, i) => (
              <a key={i} href={w.url} className="card-immersive block text-left" target="_blank" rel="noopener noreferrer">
                <p className="text-text font-medium text-sm sm:text-base mb-1">{w.title}</p>
                <p className="text-xs text-text-muted flex items-center gap-1">
                  <ExternalLink className="w-3 h-3 flex-shrink-0" aria-hidden="true" />
                  {w.metric}
                </p>
              </a>
            ))}
          </div>
        </div>

        {/* GitHub CTA */}
        <div className="text-center reveal-section">
          <Button variant="secondary" onClick={() => window.open('https://github.com/mofrey-max', '_blank', 'noopener,noreferrer')}>
            <Github className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
            View GitHub Profile
            <ExternalLink className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </section>
  )
}

function StatCard({ value, label }: { value: string; label: string }) {
  const isLong = value.length > 6
  return (
    <div className="stat-immersive">
      <div
        className="stat-immersive-value whitespace-nowrap"
        style={isLong ? { fontSize: 'clamp(1rem, 2.5vw, 1.375rem)' } : undefined}
      >
        {value}
      </div>
      <div className="stat-immersive-label">{label}</div>
    </div>
  )
}

function HighlightPill({ icon, text }: { icon: string; text: string }) {
  return (
    <div className="card-immersive flex items-center gap-2 py-3">
      <span className="text-lg flex-shrink-0" aria-hidden="true">{icon}</span>
      <span className="text-xs sm:text-sm text-text font-medium">{text}</span>
    </div>
  )
}
