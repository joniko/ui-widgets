'use client'

import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

interface SuccessAnimationProps {
  title?: string
  message?: string
  onComplete?: () => void
}

export const SuccessAnimation = ({
  title = '¡Listo!',
  message = 'Operación completada exitosamente',
  onComplete,
}: SuccessAnimationProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex min-h-[400px] flex-col items-center justify-center p-8"
    >
      {/* Círculo animado */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          type: 'spring',
          stiffness: 200,
          damping: 15,
          delay: 0.1,
        }}
        className="relative"
      >
        {/* Círculo de fondo */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1.2, opacity: 0 }}
          transition={{
            duration: 1,
            repeat: 2,
            ease: 'easeOut',
          }}
          className="absolute inset-0 h-24 w-24 rounded-full bg-green-500"
        />

        {/* Círculo principal */}
        <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-green-500">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              delay: 0.3,
              type: 'spring',
              stiffness: 200,
            }}
          >
            <Check className="h-12 w-12 text-white" strokeWidth={3} />
          </motion.div>
        </div>
      </motion.div>

      {/* Texto */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-6 text-center"
      >
        <h3 className="mb-2 text-2xl font-semibold">{title}</h3>
        <p className="text-gray-600">{message}</p>
      </motion.div>

      {/* Auto-complete */}
      {onComplete && (
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 2, delay: 0.5 }}
          onAnimationComplete={onComplete}
          className="mt-8 h-1 w-full max-w-xs overflow-hidden rounded-full bg-gray-200"
        >
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: '0%' }}
            transition={{ duration: 2, delay: 0.5 }}
            className="h-full bg-green-500"
          />
        </motion.div>
      )}
    </motion.div>
  )
}
