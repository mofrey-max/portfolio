'use client'

export function Problem() {
  const problems = [
    { icon: '🧠', label: 'Hallucinations', detail: '15%+ citation errors on real queries' },
    { icon: '⏱', label: 'Latency', detail: '4s+ p95, users bouncing' },
    { icon: '📊', label: 'No evals', detail: 'Every release = manual QA, crossed fingers' },
    { icon: '💸', label: 'Cost surprises', detail: '$0.02/query in dev, $0.40 in prod' },
    { icon: '🔄', label: 'Prompt drift', detail: 'What worked Tuesday fails Friday' },
    { icon: '🤷', label: 'Debugging blindness', detail: '"Why did it answer that?" → 🤷' },
  ]

  return (
    <section
      id="problem"
      className="section container section-transition section-immersive section-glow"
      aria-labelledby="problem-heading"
    >
      <div className="max-w-6xl mx-auto">
        <div className="section-header-immersive reveal-section">
          <span className="section-badge">01 — The Problem</span>
          <h2 id="problem-heading">
            The gap between &ldquo;it works on my machine&rdquo; and &ldquo;it works for customers&rdquo; has a name:
            <span className="block text-primary mt-1">the demo-to-prod wall.</span>
          </h2>
          <p>Your RAG pipeline works in the notebook. In production?</p>
        </div>

        <ul className="grid-immersive reveal-stagger" role="list">
          {problems.map((p) => (
            <li key={p.label} className="card-immersive">
              <div className="flex items-start gap-3">
                <span className="text-xl sm:text-2xl flex-shrink-0 mt-0.5" aria-hidden="true">{p.icon}</span>
                <div className="min-w-0">
                  <strong className="text-text-strong text-sm sm:text-base">{p.label}</strong>
                  <p className="text-xs sm:text-sm text-text-muted mt-0.5">{p.detail}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <div className="card-immersive mt-8 text-center reveal-section">
          <p className="text-text text-sm sm:text-base mb-3">
            You&rsquo;ve hit the wall. <strong>I&rsquo;ve climbed it.</strong>
          </p>
          <p className="text-text-muted text-xs sm:text-sm">
            I&rsquo;ve debugged <code className="font-mono bg-bg px-1.5 py-0.5 rounded text-xs">RetrievalQA</code> at 2am. Watched a demo crash 5 minutes before an investor call. I know the gap &mdash; and I know how to close it.
          </p>
        </div>

        <p className="mt-6 text-text-muted text-sm text-center reveal-section">
          Here&rsquo;s what that looks like when it&rsquo;s fixed.
        </p>
      </div>
    </section>
  )
}
