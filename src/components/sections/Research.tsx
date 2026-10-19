'use client'

const papers = [
  {
    year: '2026',
    journal: 'LAUTECH Journal of Computing and Informatics',
    title: 'Explainability Fatigue in Artificial Intelligence',
    authors: 'Manunyi Godfrey & Dahiru Haruna Usman',
    summary:
      'Introduces "explainability fatigue": the point where high-volume XAI explanations overwhelm users, drive disengagement, and erode trust. Makes the case for context-aware, cognitively sustainable transparency.',
    tags: ['Explainable AI (XAI)', 'Cognitive Load', 'Human-Computer Interaction'],
  },
  {
    year: '2026',
    journal: 'Nigerian Journal of Operations Research (NIJOR)',
    title: 'A Formal Ontology Evaluation Methodology for Education-Domain Knowledge Graphs',
    authors: 'Manunyi Godfrey, Shaphat Safethon & Kayode Oladipupo Oluborode',
    summary:
      'A formal methodology for structurally validating and evaluating the ontologies behind education-domain knowledge graphs: measurable quality for semantic data in learning systems.',
    tags: ['Knowledge Graphs', 'Ontology Evaluation', 'Knowledge Engineering'],
  },
]

function highlightName(authors: string) {
  const needle = 'Manunyi Godfrey'
  const parts = authors.split(needle)
  return (
    <>
      {parts.map((part, i) => (
        <span key={i}>
          {part}
          {i < parts.length - 1 && <strong className="text-text-strong">{needle}</strong>}
        </span>
      ))}
    </>
  )
}

export function Research() {
  return (
    <section
      id="research"
      className="section container section-transition section-immersive section-glow"
      aria-labelledby="research-heading"
    >
      <div className="max-w-6xl mx-auto">
        <div className="section-header-immersive reveal-section">
          <span className="section-badge">04 — Research</span>
          <h2 id="research-heading">Academic Contributions: Two Peer-Reviewed Papers, 2026</h2>
          <p>Peer-reviewed AI research. Postgraduate researcher at MAU, Yola.</p>
        </div>

        <div className="grid-immersive reveal-stagger">
          {papers.map((paper) => (
            <article key={paper.title} className="card-immersive flex flex-col">
              {/* Journal + year */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <span className="stack-pill normal-case tracking-normal">{paper.journal}</span>
                <span className="text-xs font-mono text-primary font-semibold flex-shrink-0">
                  {paper.year}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-sm sm:text-base font-semibold leading-snug mb-2 italic">
                &ldquo;{paper.title}&rdquo;
              </h3>

              {/* Authors */}
              <p className="text-xs text-text-muted mb-3">{highlightName(paper.authors)}</p>

              <div className="border-t border-border my-3" />

              {/* Summary */}
              <p className="text-xs sm:text-sm text-text leading-relaxed mb-4 flex-1">
                {paper.summary}
              </p>

              {/* Topic tags */}
              <div className="flex flex-wrap gap-1.5" role="list" aria-label="Research topics">
                {paper.tags.map((tag) => (
                  <span key={tag} className="stack-pill">
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
