'use client'

export const EMAIL_ADDRESS = 'manugodfrey855@gmail.com'

/**
 * Best-effort email copy. Never throws — silently ignores rejections
 * (clipboard requires a focused document in some browsers).
 */
export function copyEmailToClipboard(): boolean {
  try {
    if (!navigator.clipboard?.writeText) return false
    const result = navigator.clipboard.writeText(EMAIL_ADDRESS)
    // writeText returns a Promise that may reject (unfocused document)
    if (result && typeof result.catch === 'function') {
      result.catch(() => {})
    }
    return true
  } catch {
    return false
  }
}

/**
 * Open the visitor's mail app via a hidden iframe — survives browsers
 * that swallow window.location mailto assignments. Never throws.
 */
export function openMailClient(): void {
  try {
    const iframe = document.createElement('iframe')
    iframe.style.display = 'none'
    iframe.setAttribute('aria-hidden', 'true')
    iframe.src = `mailto:${EMAIL_ADDRESS}`
    document.body.appendChild(iframe)
    window.setTimeout(() => iframe.remove(), 2000)
  } catch {
    // External protocol blocked — caller's toast already gave feedback
  }
}
