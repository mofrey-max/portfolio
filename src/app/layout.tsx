import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import '../styles/globals.css'
import { Providers } from '@/components/ui/Providers'
import { FuturisticBg } from '@/components/ui/FuturisticBg'

// TODO: Replace with Geist Variable fonts (see FONTS.md)
// Download from https://vercel.com/font/geist and use next/font/local
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-geist-sans',
  display: 'swap',
  preload: true,
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
  display: 'swap',
  preload: true,
})

export const metadata: Metadata = {
  title: 'Manunyi Godfrey — AI Engineer | LLM/RAG/Agents | Production Systems',
  description: 'I turn LLM prototypes that work in notebooks into features that work in production — evals, observability, and all. Shipped 3+ LLM systems. Open to full-time roles.',
  keywords: ['AI Engineer', 'LLM', 'RAG', 'Agents', 'LangChain', 'LlamaIndex', 'Evaluation', 'Production ML', 'Machine Learning'],
  authors: [{ name: 'Manunyi Godfrey' }],
  creator: 'Manunyi Godfrey',
  publisher: 'Manunyi Godfrey',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'Manunyi Godfrey — AI Engineer | LLM/RAG/Agents | Production Systems',
    description: 'I turn LLM prototypes that work in notebooks into features that work in production — evals, observability, and all.',
    siteName: 'Manunyi Godfrey — AI Engineer Portfolio',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Manunyi Godfrey — AI Engineer Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Manunyi Godfrey — AI Engineer',
    description: 'I turn LLM prototypes that work in notebooks into features that work in production — evals, observability, and all.',
    images: ['/og-image.png'],
    creator: '@manunyi',
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fafafa' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  viewportFit: 'cover',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        <FuturisticBg />
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}