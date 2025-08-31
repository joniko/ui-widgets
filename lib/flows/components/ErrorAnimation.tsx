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
  onCancel 
}: ErrorAnimationProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center min-h-[400px] p-8"
    >
      {/* Círculo animado de error */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ 
          type: "spring", 
          stiffness: 200, 
          damping: 15,
          delay: 0.1 
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
            ease: "easeOut"
          }}
          className="absolute inset-0 w-24 h-24 bg-red-500 rounded-full"
        />
        
        {/* Círculo principal */}
        <div className="relative w-24 h-24 bg-red-500 rounded-full flex items-center justify-center">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ 
              delay: 0.3,
              type: "spring",
              stiffness: 200
            }}
          >
            <X className="w-12 h-12 text-white" strokeWidth={3} />
          </motion.div>
        </div>
      </motion.div>
      
      {/* Texto */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-center mt-6"
      >
        <h3 className="text-2xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600">{message}</p>
      </motion.div>
      
      {/* Botones */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="flex gap-3 mt-8"
      >
        {onRetry && (
          <Button
            onClick={onRetry}
            variant="primary"
          >
            Reintentar
          </Button>
        )}
        {onCancel && (
          <Button
            onClick={onCancel}
            variant="ghost"
          >
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
      <div className="flex items-center gap-2 p-3 mt-2 bg-red-50 border border-red-200 rounded-lg">
        <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
        <p className="text-sm text-red-800">{message}</p>
      </div>
    </motion.div>
  )
}
