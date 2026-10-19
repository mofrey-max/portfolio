'use client'

import { Github, Linkedin, Mail } from 'lucide-react'
import { useToast } from '@/components/ui/Toast'
import { copyEmailToClipboard, openMailClient } from '@/lib/email'

export function Footer() {
  const { toast } = useToast()

  const handleEmailClick = (e: React.MouseEvent) => {
    e.preventDefault()
    toast({ type: 'info', message: 'Opening your email app…' })
    copyEmailToClipboard()
    openMailClient()
  }

  return (
    <footer className="border-t border-border py-6 md:py-8" role="contentinfo">
      <div className="container flex flex-col items-center gap-5">
        {/* Links row */}
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-text-muted">
          <a
            href="https://github.com/mofrey-max/portfolio"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors flex items-center gap-1.5"
          >
            <Github className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
            Source
          </a>
          <a
            href="mailto:manugodfrey855@gmail.com"
            onClick={handleEmailClick}
            className="hover:text-primary transition-colors flex items-center gap-1.5"
          >
            <Mail className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
            Contact
          </a>
          <a
            href="https://www.linkedin.com/in/manunyi-godfrey-a0433012a/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors flex items-center gap-1.5"
          >
            <Linkedin className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
            LinkedIn
          </a>
          <a
            href="https://github.com/mofrey-max"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors flex items-center gap-1.5"
          >
            <Github className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
            GitHub
          </a>
        </div>

        {/* Copyright */}
        <p className="text-xs text-text-muted text-center">
          © 2026 Manunyi Godfrey • Available for hire
        </p>
      </div>
    </footer>
  )
}
