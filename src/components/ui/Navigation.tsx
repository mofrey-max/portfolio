'use client'

import { useState, useEffect, useCallback } from 'react'
import { Menu, X } from 'lucide-react'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '#hero', label: 'Home' },
  { href: '#problem', label: 'The Problem' },
  { href: '#work', label: 'Work' },
  { href: '#process', label: 'Process' },
  { href: '#proof', label: 'Proof' },
]

export function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('#hero')

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Body scroll lock when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.classList.add('menu-open')
    } else {
      document.body.classList.remove('menu-open')
    }
    return () => document.body.classList.remove('menu-open')
  }, [mobileOpen])

  // Close menu on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`)
          }
        })
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: 0.1 }
    )

    navItems.forEach((item) => {
      const el = document.querySelector(item.href)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  const scrollTo = useCallback((href: string) => {
    setMobileOpen(false)
    // Small delay to let the menu close before scrolling
    requestAnimationFrame(() => {
      const el = document.querySelector(href)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      }
    })
  }, [])

  return (
    <>
      {/* Skip link */}
      <a href="#main" className="skip-link">
        Skip to main content
      </a>

      <nav
        className={cn('sticky-nav', scrolled && 'shadow-1')}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="container flex items-center justify-between h-14 md:h-16">
          {/* Logo/Brand */}
          <a
            href="#hero"
            className="font-semibold text-text-strong hover:text-primary transition-colors text-sm sm:text-base truncate max-w-[50vw] md:max-w-none"
            aria-label="Go to top"
          >
            Manunyi Godfrey
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-0.5">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollTo(item.href)}
                className={cn(
                  'nav-link',
                  activeSection === item.href && 'text-primary bg-primary-bg'
                )}
                aria-current={activeSection === item.href ? 'page' : undefined}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Desktop CTA + Theme Toggle */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            <a
              href="/Manunyi-Godfrey-CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-sm px-4 py-2 rounded-md font-medium"
            >
              Resume
            </a>
          </div>

          {/* Mobile: Theme Toggle + Hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <button
              className="p-2.5 -mr-1 rounded-lg text-text-muted hover:text-text-strong hover:bg-bg-elevated transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu — full-screen overlay */}
        {mobileOpen && (
          <div
            id="mobile-menu"
            className="md:hidden fixed inset-0 z-50 bg-bg/95 backdrop-blur-md flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            {/* Menu header with close */}
            <div className="flex items-center justify-between h-14 px-4 border-b border-border">
              <span className="font-semibold text-text-strong text-sm">Menu</span>
              <button
                className="p-2.5 -mr-1 rounded-lg text-text-muted hover:text-text-strong hover:bg-bg-elevated transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable nav items */}
            <nav className="flex flex-col gap-1 p-4 overflow-y-auto flex-1" aria-label="Mobile navigation">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollTo(item.href)}
                  className={cn(
                    'text-left px-4 py-3.5 text-base font-medium rounded-lg transition-colors min-h-[48px]',
                    activeSection === item.href
                      ? 'text-primary bg-primary-bg'
                      : 'text-text-muted hover:text-text-strong hover:bg-bg-elevated'
                  )}
                  aria-current={activeSection === item.href ? 'page' : undefined}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Bottom CTA */}
            <div className="p-4 border-t border-border" style={{ paddingBottom: 'calc(1rem + env(safe-area-inset-bottom))' }}>
              <a
                href="/Manunyi-Godfrey-CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full text-center py-3"
              >
                Resume
              </a>
            </div>
          </div>
        )}
      </nav>
    </>
  )
}
