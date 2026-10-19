'use client'

import { PenLine, ArrowLeft, Construction } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export default function BlogPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-md mx-auto">
        {/* Icon */}
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary-bg border border-primary/30 mb-6">
          <PenLine className="w-10 h-10 text-primary" aria-hidden="true" />
        </div>

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-warning-bg border border-warning/30 text-warning text-sm font-medium mb-6">
          <Construction className="w-4 h-4" aria-hidden="true" />
          Coming Soon
        </div>

        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl font-bold text-text-strong mb-3 tracking-tight">
          Blog
        </h1>

        {/* Subtitle */}
        <p className="text-text-muted mb-8 leading-relaxed">
          Deep dives into LLM engineering, RAG pipelines, evaluation frameworks,
          and shipping AI systems to production. Writing in progress — check back soon.
        </p>

        {/* Preview topics */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {['RAG', 'Evals', 'Agents', 'Observability', 'Prompt Engineering', 'Fine-tuning'].map((topic) => (
            <span
              key={topic}
              className="px-3 py-1 text-xs font-medium bg-bg-elevated border border-border rounded-full text-text-muted"
            >
              {topic}
            </span>
          ))}
        </div>

        {/* Back CTA */}
        <Button
          variant="secondary"
          onClick={() => window.history.back()}
          className="group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" aria-hidden="true" />
          Back to Portfolio
        </Button>
      </div>
    </main>
  )
}
