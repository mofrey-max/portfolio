'use client'

const steps = [
  {
    number: '1',
    title: 'Audit & Stabilize',
    description: 'Add evals, observability, and regression testing. Ship confidence, not just code.',
    deliverable: 'Week 1: Eval dashboard that fails the build if hallucinations >5%.',
    icon: '🔍',
  },
  {
    number: '2',
    title: 'Harden & Optimize',
    description: 'Fix retrieval, add streaming and guardrails. Turn "sometimes works" into "always works."',
    deliverable: '',
    icon: '🛠',
  },
  {
    number: '3',
    title: 'Scale & Own',
    description: 'Prompt versioning, cost dashboards, runbooks. Enable the next hire from day one.',
    deliverable: '',
    icon: '📈',
  },
]

const principles = [
  'Eval before code — No feature merges without an eval that would catch its failure',
  'Observability is not optional — Traces, metrics, logs from the first deploy',
  'Cost is a feature — Token budgets, caching, model routing built in, not bolted on',
  'Guardrails > hope — Output validation, fallback chains, human-in-the-loop where it matters',
  'Document decisions, not just code — ADRs for architecture, prompt versioning, runbooks for on-call',
  'Ship to learn — Real user feedback > perfect benchmarks',
]

const stackPhilosophy = 'I choose boring, proven infrastructure (PostgreSQL, Redis, Kubernetes) so the interesting complexity lives in the LLM layer — where it creates value.'

export function Process() {
  return (
    <section
      id="process"
      className="section container section-transition section-immersive section-glow"
      aria-labelledby="process-heading"
    >
      <div className="max-w-6xl mx-auto">
        <div className="section-header-immersive reveal-section">
          <span className="section-badge">03 — Process</span>
          <h2 id="process-heading">
            How I Work — Eval-First, Observability-from-Day-One
          </h2>
          <p>Three steps. No handoffs. Production from day one.</p>
        </div>

        {/* Three Steps — 3-column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 reveal-stagger mb-12 md:mb-16">
          {steps.map((step) => (
            <article key={step.number} className="step-immersive">
              <div className="step-immersive-number" aria-hidden="true">
                {step.number}
              </div>
              <div className="pt-4">
                <div className="text-xl sm:text-2xl mb-2" aria-hidden="true">{step.icon}</div>
                <h3 className="text-sm sm:text-base font-semibold leading-snug mb-1.5">{step.title}</h3>
                <p className="text-text-muted text-[0.6875rem] sm:text-xs leading-relaxed mb-3">{step.description}</p>
                {step.deliverable && (
                  <p className="text-[0.625rem] sm:text-xs font-medium text-primary bg-primary-bg px-2.5 py-1 rounded-full inline-block leading-snug">
                    {step.deliverable}
                  </p>
                )}
              </div>
            </article>
          ))}
        </div>

        {/* Principles — auto-fit grid */}
        <div className="mb-12 md:mb-16">
          <div className="section-header-immersive reveal-section">
            <h3 className="text-lg sm:text-xl font-semibold mb-0">Principles</h3>
          </div>
          <ul className="grid-immersive-narrow reveal-stagger" role="list">
            {principles.map((principle, i) => (
              <li key={i} className="principle-immersive">
                <p className="text-text">{principle}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Stack Philosophy */}
        <div className="card-immersive text-center reveal-section">
          <p className="text-text-muted text-xs sm:text-sm max-w-2xl mx-auto">{stackPhilosophy}</p>
        </div>
      </div>
    </section>
  )
}
