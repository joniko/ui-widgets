'use client'

import Link from 'next/link'
import { AnimatedButton, AnimatedButtonVariants } from '@/components/ui/animated-button'
import { ArrowRightIcon } from 'lucide-react'

export function CTASection() {
  return (
    <section className="bg-primary text-primary-foreground px-4 py-20">
      <div className="container mx-auto text-center">
        <h2 className="mb-6 text-3xl font-bold">¿Listo para explorar?</h2>
        <p className="mb-8 text-xl opacity-90">
          Descubre cómo funciona el chat agéntico con widgets inline y bottom
          sheet
        </p>
        <Link href="/demos">
          <AnimatedButton 
            size="lg" 
            variant="secondary" 
            className="px-8 text-lg"
            {...AnimatedButtonVariants.pronounced}
          >
            Explorar Demos
            <ArrowRightIcon className="ml-2 h-5 w-5" />
          </AnimatedButton>
        </Link>
      </div>
    </section>
  )
}
