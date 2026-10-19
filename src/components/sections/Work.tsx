'use client'

import { useState } from 'react'
import { ChevronDown, Github, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { MetricBar } from '@/components/ui/MetricBar'
import { CodeBlock } from '@/components/ui/CodeBlock'
import { cn } from '@/lib/utils'

const projects = [
  {
    id: 'legaldoc-ai',
    title: 'LegalDoc AI',
    subtitle: 'RAG over 500k legal documents',
    role: 'Founding AI Engineer (sole)',
    stack: ['LangChain', 'LlamaIndex', 'RAGAS', 'Langfuse', 'FastAPI', 'PostgreSQL', 'Kubernetes'],
    challenge: 'Prototype hallucinated 18% of citations; 4.2s p95 latency; zero automated eval',
    solution: 'Built hybrid retrieval (BM25 + dense + reranker), custom eval suite (RAGAS + 12 domain metrics), streaming responses, prompt versioning, cost tracking',
    metrics: [
      { label: 'Hallucinations', before: 18, after: 3, unit: '%', trend: 'improvement' as const },
      { label: 'Latency p95', before: 4.2, after: 1.8, unit: 's', trend: 'improvement' as const },
      { label: 'Cost/query', before: 100, after: 38, unit: '%', trend: 'improvement' as const },
      { label: 'Regressions caught', before: 0, after: 23, unit: '', trend: 'improvement' as const },
      { label: 'Eval runtime', before: 0, after: 30, unit: 's/1k', trend: 'neutral' as const },
    ],
    links: {
      github: '#',
      demo: '#',
    },
    codeExample: `from ragas import evaluate
from ragas.metrics import faithfulness, answer_relevancy

# Custom domain metrics
class CitationAccuracy:
    def __call__(self, row):
        citations = extract_citations(row.answer)
        verified = verify_against_source(citations, row.contexts)
        return len(verified) / len(citations) if citations else 1.0

eval_dataset = load_dataset("legal-qa")
results = evaluate(
    eval_dataset,
    metrics=[faithfulness, answer_relevancy, CitationAccuracy()],
)

# CI gate: fail if hallucinations > 5%
assert results['CitationAccuracy'] > 0.95`,
  },
  {
    id: 'finance-agent',
    title: 'FinanceAgent',
    subtitle: 'Multi-agent financial research system',
    role: 'Lead AI Engineer (2-person team)',
    stack: ['LangGraph', 'AutoGen', 'OpenAI', 'Anthropic', 'Weaviate', 'Temporal'],
    challenge: 'Agents looped infinitely; tool calling unreliable; no observability',
    solution: 'Structured agent framework with Temporal orchestration, custom tool retry logic, Langfuse tracing, human-in-the-loop checkpoints',
    metrics: [
      { label: 'Task success rate', before: 67, after: 94, unit: '%', trend: 'improvement' as const },
      { label: 'Avg steps', before: 12, after: 4, unit: '', trend: 'improvement' as const },
      { label: 'Audit trail', before: 0, after: 100, unit: '%', trend: 'improvement' as const },
    ],
    links: {
      github: '#',
      demo: '#',
    },
    codeExample: `from temporalio import workflow
from langgraph.graph import StateGraph

class ResearchWorkflow:
    @workflow.run
    async def run(self, query: str) -> Report:
        # Structured agent with checkpoints
        planner = create_planner_agent()
        researcher = create_researcher_agent()
        writer = create_writer_agent()

        plan = await planner.aplan(query)
        findings = await researcher.aresearch(plan)
        report = await writer.awrite(findings)

        # Human-in-the-loop for compliance
        if report.risk_level == "high":
            report = await workflow.wait_for_human_review(report)

        return report`,
  },
  {
    id: 'eval-platform',
    title: 'LLM Eval Platform',
    subtitle: 'Internal tooling for AI team',
    role: 'Sole builder',
    stack: ['Python', 'FastAPI', 'React', 'PostgreSQL', 'ClickHouse', 'Grafana'],
    challenge: '5 engineers, 0 shared eval infrastructure; every team reinventing metrics',
    solution: 'Centralized eval platform — dataset management, prompt A/B testing, regression detection, cost/latency dashboards, CI/CD integration',
    metrics: [
      { label: 'Team adoption', before: 0, after: 3, unit: '/5 teams', trend: 'improvement' as const },
      { label: 'Regressions caught', before: 0, after: 23, unit: '', trend: 'improvement' as const },
      { label: 'Eval runtime', before: 0, after: 30, unit: 's/1k', trend: 'neutral' as const },
    ],
    links: {
      github: '#',
      demo: '#',
    },
    codeExample: `@app.post("/eval/run")
async def run_evaluation(request: EvalRequest):
    dataset = load_dataset(request.dataset_id)
    results = []

    for sample in dataset:
        output = await run_pipeline(sample.input, request.prompt_version)
        metrics = compute_metrics(sample.expected, output)
        results.append({**sample.dict(), **metrics, "output": output})

    # Regression detection
    baseline = get_baseline(request.prompt_version)
    regressions = detect_regressions(results, baseline)

    await store_results(request.run_id, results, regressions)
    return {"run_id": request.run_id, "regressions": regressions}`,
  },
]

export function Work() {
  const [expanded, setExpanded] = useState<string | null>(null)

  return (
    <section
      id="work"
      className="section container section-transition section-immersive section-glow"
      aria-labelledby="work-heading"
    >
      <div className="max-w-6xl mx-auto">
        <div className="section-header-immersive reveal-section">
          <span className="section-badge">02 — Work</span>
          <h2 id="work-heading">
            Selected Work — Shipped Systems, Measured Results
          </h2>
          <p>Deep-dives with architecture, metrics, and code.</p>
        </div>

        <div className="grid-immersive reveal-stagger">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              isExpanded={expanded === project.id}
              onToggle={() => setExpanded(expanded === project.id ? null : project.id)}
            />
          ))}
        </div>

        <div className="mt-8 sm:mt-10 text-center reveal-section">
          <Button variant="secondary" onClick={() => window.open('https://github.com/mofrey-max', '_blank', 'noopener,noreferrer')}>
            <Github className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
            View All on GitHub
            <ExternalLink className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </section>
  )
}

function ProjectCard({ project, isExpanded, onToggle }: { project: typeof projects[0]; isExpanded: boolean; onToggle: () => void }) {
  return (
    <div className="card-immersive flex flex-col">
      <header className="mb-3 sm:mb-4">
        <div className="flex items-start justify-between gap-3 mb-2 sm:mb-3">
          <div className="min-w-0">
            <h3 className="text-base sm:text-lg font-semibold leading-snug">{project.title}</h3>
            <p className="text-xs sm:text-sm text-text-muted mt-0.5">{project.subtitle}</p>
          </div>
          <button
            onClick={onToggle}
            className="flex-shrink-0 p-2 -m-1 rounded hover:bg-bg transition-colors min-w-[36px] min-h-[36px] flex items-center justify-center"
            aria-expanded={isExpanded}
            aria-controls={`${project.id}-details`}
            aria-label={isExpanded ? 'Collapse details' : 'Expand details'}
          >
            <ChevronDown className={cn('w-5 h-5 text-text-muted transition-transform', isExpanded && 'rotate-180')} aria-hidden="true" />
          </button>
        </div>

        <p className="text-[0.625rem] sm:text-xs text-text-muted mb-2 sm:mb-3">{project.role}</p>

        <div className="flex flex-wrap gap-1 sm:gap-1.5" role="list" aria-label="Tech stack">
          {project.stack.map((tech) => (
            <span key={tech} className="stack-pill">{tech}</span>
          ))}
        </div>
      </header>

      <div className="border-t border-border my-3 sm:my-4" />

      <div id={`${project.id}-details`} className="space-y-3 sm:space-y-4" hidden={!isExpanded}>
        <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
          <div>
            <strong className="text-text-muted">Challenge:</strong>
            <p className="text-text mt-0.5">{project.challenge}</p>
          </div>
          <div>
            <strong className="text-text-muted">Solution:</strong>
            <p className="text-text mt-0.5">{project.solution}</p>
          </div>
        </div>

        <div className="border-t border-border pt-3 sm:pt-4" />
        <strong className="text-text-muted block mb-2 sm:mb-3 text-xs sm:text-sm">Results:</strong>
        <div className="space-y-2 sm:space-y-3">
          {project.metrics.map((m) => (
            <MetricBar key={m.label} {...m} showBar={true} showTrendIcon={true} />
          ))}
        </div>

        <div className="border-t border-border pt-3 sm:pt-4" />
        <CodeBlock
          code={project.codeExample}
          language="python"
          filename={`${project.id}.py`}
          showLineNumbers={true}
          copyable={true}
          maxHeight="300px"
        />

        <div className="flex gap-2 pt-2">
          <Button variant="ghost" size="sm" onClick={() => window.open(project.links.github, '_blank', 'noopener,noreferrer')}>
            <Github className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
            Code
          </Button>
          {project.links.demo !== '#' && (
            <Button variant="ghost" size="sm" onClick={() => window.open(project.links.demo, '_blank', 'noopener,noreferrer')}>
              <ExternalLink className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
              Demo
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
