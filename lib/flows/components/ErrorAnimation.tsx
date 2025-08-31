'use client'

import { motion } from 'framer-motion'
import { X, AlertCircle } from 'lucide-react'
import { Button } from './Button'

interface ErrorAnimationProps {
  title?: string
  message?: string
  onRetry?: () => void
  onCancel?: () => void
}

export const ErrorAnimation = ({
  title = 'Algo salió mal',
  message = 'Hubo un error al procesar tu solicitud',
  onRetry,
  onCancel,
}: ErrorAnimationProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex min-h-[400px] flex-col items-center justify-center p-8"
    >
      {/* Círculo animado de error */}
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
        {/* Círculo de fondo con efecto de onda */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1.2, opacity: 0 }}
          transition={{
            duration: 1,
            repeat: 2,
            ease: 'easeOut',
          }}
          className="absolute inset-0 h-24 w-24 rounded-full bg-red-500"
        />

        {/* Círculo principal */}
        <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-red-500">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              delay: 0.3,
              type: 'spring',
              stiffness: 200,
            }}
          >
            <X className="h-12 w-12 text-white" strokeWidth={3} />
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

      {/* Botones */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="mt-8 flex gap-3"
      >
        {onRetry && (
          <Button onClick={onRetry} variant="primary">
            Reintentar
          </Button>
        )}
        {onCancel && (
          <Button onClick={onCancel} variant="ghost">
            Cancelar
          </Button>
        )}
      </motion.div>
    </motion.div>
  )
}

// Variante de error más sutil para formularios
export const FormError = ({ message }: { message: string }) => {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      className="overflow-hidden"
    >
      <div className="mt-2 flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 p-3">
        <AlertCircle className="h-4 w-4 flex-shrink-0 text-red-600" />
        <p className="text-sm text-red-800">{message}</p>
      </div>
    </motion.div>
  )
}
