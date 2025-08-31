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
  onComplete 
}: SuccessAnimationProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center min-h-[400px] p-8"
    >
      {/* Círculo animado */}
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
        {/* Círculo de fondo */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1.2, opacity: 0 }}
          transition={{
            duration: 1,
            repeat: 2,
            ease: "easeOut"
          }}
          className="absolute inset-0 w-24 h-24 bg-green-500 rounded-full"
        />
        
        {/* Círculo principal */}
        <div className="relative w-24 h-24 bg-green-500 rounded-full flex items-center justify-center">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ 
              delay: 0.3,
              type: "spring",
              stiffness: 200
            }}
          >
            <Check className="w-12 h-12 text-white" strokeWidth={3} />
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
      
      {/* Auto-complete */}
      {onComplete && (
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 2, delay: 0.5 }}
          onAnimationComplete={onComplete}
          className="w-full max-w-xs h-1 bg-gray-200 rounded-full mt-8 overflow-hidden"
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
