'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { Button, buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { type VariantProps } from 'class-variance-authority'

type ButtonProps = React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }

interface AnimatedButtonProps extends ButtonProps {
  hoverScale?: number
  tapScale?: number
  children: React.ReactNode
}

export const AnimatedButton = React.forwardRef<
  HTMLButtonElement,
  AnimatedButtonProps
>(
  (
    {
      className,
      hoverScale = 1.05,
      tapScale = 0.95,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <motion.div
        whileHover={
          disabled
            ? {}
            : {
                scale: hoverScale,
                transition: { type: 'spring', stiffness: 400, damping: 17 },
              }
        }
        whileTap={
          disabled
            ? {}
            : {
                scale: tapScale,
                transition: { type: 'spring', stiffness: 400, damping: 17 },
              }
        }
        style={{ display: 'inline-block' }}
      >
        <Button
          ref={ref}
          className={cn(className)}
          disabled={disabled}
          {...props}
        >
          {children}
        </Button>
      </motion.div>
    )
  }
)

AnimatedButton.displayName = 'AnimatedButton'

// Variantes predefinidas para diferentes tipos de animaciones
export const AnimatedButtonVariants = {
  // Animación sutil para botones principales
  subtle: {
    hoverScale: 1.02,
    tapScale: 0.98,
  },
  // Animación normal (por defecto)
  normal: {
    hoverScale: 1.05,
    tapScale: 0.95,
  },
  // Animación más pronunciada para CTAs importantes
  pronounced: {
    hoverScale: 1.1,
    tapScale: 0.9,
  },
  // Animación dramática como en el ejemplo
  dramatic: {
    hoverScale: 1.2,
    tapScale: 0.8,
  },
}
