'use client'

import { useToast } from '@/components/ui/Toast'
import { Download, Mail, Github, Linkedin } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { copyEmailToClipboard, openMailClient } from '@/lib/email'

export function CTA() {
  const { toast } = useToast()

  const handleEmailClick = (e: React.MouseEvent) => {
    e.preventDefault()
    toast({ type: 'info', message: 'Opening your email app…' })
    copyEmailToClipboard()
    openMailClient()
  }

  return (
    <section
      id="contact"
      className="section container section-transition section-immersive section-glow"
      aria-labelledby="contact-heading"
    >
      <div className="max-w-6xl mx-auto text-center">
        <div className="section-header-immersive reveal-section">
          <span className="section-badge">05 — Contact</span>
          <h2 id="contact-heading">Ready to Ship Reliable LLM Features?</h2>
          <p>
            I&rsquo;m currently open to <strong>full-time AI Engineer roles</strong> (founding engineer / senior IC) at AI-first startups.
          </p>
          <p className="text-text-muted text-xs sm:text-sm mt-2">
            Available immediately • Open to remote / hybrid / relocation
          </p>
        </div>

        {/* Primary CTA */}
        <div className="mb-8 reveal-section">
          <Button size="lg" className="w-full sm:w-auto group">
            <Download className="w-5 h-5 flex-shrink-0 transition-transform group-hover:translate-y-0.5" aria-hidden="true" />
            <span className="truncate">Download Resume & Contact Me</span>
          </Button>
        </div>

        {/* Contact Links — auto-fit grid */}
        <div className="grid-immersive-narrow reveal-stagger mb-8">
          <ContactLink
            icon={<Mail className="w-5 h-5" />}
            label="Email"
            value="Send Email"
            href="mailto:manugodfrey855@gmail.com"
            onClick={handleEmailClick}
            ariaLabel="Send email"
          />
          <ContactLink
            icon={<Linkedin className="w-5 h-5" />}
            label="LinkedIn"
            value="linkedin.com/in/manunyi"
            href="https://linkedin.com/in/manunyi"
            external
          />
          <ContactLink
            icon={<Github className="w-5 h-5" />}
            label="GitHub"
            value="github.com/mofrey-max"
            href="https://github.com/mofrey-max"
            external
          />
          <ContactLink
            icon={<Mail className="w-5 h-5" />}
            label="Blog"
            value="Blog — Coming Soon"
            href="/blog"
          />
        </div>

        {/* Availability Notice */}
        <div className="card-immersive reveal-section" style={{ borderColor: 'var(--primary)', background: 'var(--primary-bg)' }}>
          <p className="text-xs sm:text-sm text-primary font-medium flex items-start sm:items-center justify-center gap-2 text-left sm:text-center">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse flex-shrink-0 mt-1 sm:mt-0" aria-hidden="true" />
            <span>Accepting conversations for Q1 2027. Response time: usually within 24 hours.</span>
          </p>
        </div>
      </div>
    </section>
  )
}

function ContactLink({
  icon,
  label,
  value,
  onClick,
  href,
  external = false,
  ariaLabel,
}: {
  icon: React.ReactNode
  label: string
  value: string
  onClick?: (e: React.MouseEvent) => void
  href?: string
  external?: boolean
  ariaLabel?: string
}) {
  const content = (
    <div className="card-immersive flex flex-col items-center justify-center text-center min-h-[90px] gap-1">
      <div className="text-text-muted" aria-hidden="true">{icon}</div>
      <span className="text-xs font-medium text-text-muted">{label}</span>
      <span className="text-xs sm:text-sm text-text-strong font-mono truncate max-w-full w-full">{value}</span>
    </div>
  )

  if (href) {
    return (
      <a
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        onClick={onClick}
        className="group"
        aria-label={ariaLabel || `${label}: ${value}`}
      >
        {content}
      </a>
    )
  }

  return (
    <button
      onClick={onClick}
      className="w-full group"
      aria-label={ariaLabel || `${label}: ${value}`}
    >
      {content}
    </button>
  )
}
