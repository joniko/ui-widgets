'use client'

import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { AnimatedText } from '@/components/ui/animated-text'
import { AnimatedButton, AnimatedButtonVariants } from '@/components/ui/animated-button'
import { motion } from 'framer-motion'
import { ArrowRightIcon } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="px-4 py-20">
      <div className="container mx-auto text-center">
        <div className="mb-8">
          <Badge variant="secondary" className="mb-4">
            Prototipo
          </Badge>
          <AnimatedText
            text="Chat Agéntico con Widgets Inline"
            className="mb-8 text-center text-4xl font-bold"
            highlightedWords={['Widgets', 'Inline']}
            delay={0.2}
          />
          <motion.p
            className="text-muted-foreground mx-auto mb-8 max-w-3xl text-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6, ease: 'easeOut' }}
          >
            Demostración de un chat inteligente donde el asistente puede
            insertar widgets interactivos entre mensajes y resolver flujos
            complejos en un bottom sheet con gestos.
          </motion.p>
          <motion.div
            className="flex flex-col justify-center gap-4 sm:flex-row"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.6, ease: 'easeOut' }}
          >
            <Link href="/demos">
              <AnimatedButton 
                size="lg" 
                className="px-8 text-lg"
                {...AnimatedButtonVariants.normal}
              >
                Ver Demos
                <ArrowRightIcon className="ml-2 h-5 w-5" />
              </AnimatedButton>
            </Link>
            <AnimatedButton 
              variant="outline" 
              size="lg" 
              className="px-8 text-lg"
              {...AnimatedButtonVariants.subtle}
            >
              Documentación
            </AnimatedButton>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
