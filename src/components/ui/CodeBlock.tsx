'use client'

import { useState } from 'react'
import { Copy, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

interface CodeBlockProps {
  code: string
  language?: string
  filename?: string
  showLineNumbers?: boolean
  copyable?: boolean
  maxHeight?: string
}

export function CodeBlock({
  code,
  language = 'python',
  filename,
  showLineNumbers = true,
  copyable = true,
  maxHeight = '400px',
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false)
  const [showLines, setShowLines] = useState(showLineNumbers)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const lines = code.split('\n')

  return (
    <div className="code-block-wrapper group">
      {(filename || copyable) && (
        <div className="code-block-header">
          {filename && (
            <span className="text-xs text-text-muted font-mono truncate">{filename}</span>
          )}
          <div className="flex items-center gap-1.5 flex-shrink-0">
            {showLineNumbers && (
              <button
                onClick={() => setShowLines(!showLines)}
                className={cn(
                  'px-2 py-1 text-xs rounded text-text-muted hover:text-text-strong transition-colors min-h-[28px]',
                  showLines && 'bg-bg-elevated'
                )}
                aria-pressed={showLines}
                aria-label={showLines ? 'Hide line numbers' : 'Show line numbers'}
              >
                #{showLines ? 'on' : 'off'}
              </button>
            )}
            {copyable && (
              <button
                onClick={handleCopy}
                className="p-1.5 rounded bg-bg-elevated border border-border text-text-muted hover:text-text-strong transition-colors min-w-[28px] min-h-[28px] flex items-center justify-center"
                aria-label={copied ? 'Copied!' : 'Copy to clipboard'}
              >
                {copied ? (
                  <Check className="w-3.5 h-3.5 text-success" aria-hidden="true" />
                ) : (
                  <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                )}
              </button>
            )}
          </div>
        </div>
      )}

      <pre
        className="code-block-pre"
        style={{ maxHeight }}
      >
        <code className={cn('block font-mono text-xs', language)}>
          {showLineNumbers ? (
            lines.map((line, i) => (
              <div key={i} className="code-line">
                <span className="code-line-number" aria-hidden="true">
                  {i + 1}
                </span>
                <span className="code-line-content">{line || ' '}</span>
              </div>
            ))
          ) : (
            code
          )}
        </code>
      </pre>
    </div>
  )
}
