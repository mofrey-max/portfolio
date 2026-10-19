'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

/**
 * IntersectionObserver that adds .visible to elements with
 * .reveal-section, .reveal-stagger, or .reveal-slide classes.
 */
export function useScrollRevealAll() {
  useEffect(() => {
    const elements = document.querySelectorAll(
      '.reveal-section, .reveal-stagger, .reveal-slide'
    )

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.05, rootMargin: '0px 0px -30px 0px' }
    )

    elements.forEach((el) => observer.observe(el))

    // Fallback: force-show any .reveal-slide elements already in viewport after 100ms
    const timer = setTimeout(() => {
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect()
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          el.classList.add('visible')
        }
      })
    }, 100)

    return () => {
      observer.disconnect()
      clearTimeout(timer)
    }
  }, [])
}
