'use client'

import { Navigation } from '@/components/ui/Navigation'
import { Footer } from '@/components/ui/Footer'
import { ScrollProgress } from '@/components/ui/ScrollProgress'
import { useScrollRevealAll } from '@/lib/useScrollReveal'
import Hero from '@/components/sections/Hero'
import { Problem } from '@/components/sections/Problem'
import { Work } from '@/components/sections/Work'
import { Process } from '@/components/sections/Process'
import { Research } from '@/components/sections/Research'
import { Proof } from '@/components/sections/Proof'
import { CTA } from '@/components/sections/CTA'

export default function Home() {
  useScrollRevealAll()

  return (
    <>
      <ScrollProgress />
      <Navigation />
      <main id="main" className="min-h-screen">
        <Hero />
        <Problem />
        <Work />
        <Process />
        <Research />
        <Proof />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
