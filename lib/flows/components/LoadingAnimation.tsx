'use client'

import { motion } from 'framer-motion'

interface LoadingAnimationProps {
  message?: string
  type?: 'spinner' | 'dots' | 'pulse' | 'skeleton'
}

export const LoadingAnimation = ({ 
  message = 'Cargando...', 
  type = 'spinner' 
}: LoadingAnimationProps) => {
  if (type === 'spinner') {
    return <SpinnerLoading message={message} />
  }
  
  if (type === 'dots') {
    return <DotsLoading message={message} />
  }
  
  if (type === 'pulse') {
    return <PulseLoading message={message} />
  }
  
  return <SkeletonLoading />
}

// Spinner circular
const SpinnerLoading = ({ message }: { message: string }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="flex flex-col items-center justify-center min-h-[200px] p-8"
  >
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ 
        duration: 1, 
        repeat: Infinity, 
        ease: "linear" 
      }}
      className="w-12 h-12 border-4 border-gray-200 border-t-indigo-600 rounded-full"
    />
    <motion.p
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="mt-4 text-gray-600"
    >
      {message}
    </motion.p>
  </motion.div>
)

// Tres puntos animados
const DotsLoading = ({ message }: { message: string }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="flex flex-col items-center justify-center min-h-[200px] p-8"
  >
    <div className="flex gap-2">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -20, 0],
          }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: i * 0.1,
            ease: "easeInOut"
          }}
          className="w-3 h-3 bg-indigo-600 rounded-full"
        />
      ))}
    </div>
    <p className="mt-6 text-gray-600">{message}</p>
  </motion.div>
)

// Pulsación
const PulseLoading = ({ message }: { message: string }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="flex flex-col items-center justify-center min-h-[200px] p-8"
  >
    <div className="relative">
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [1, 0.5, 1]
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="w-16 h-16 bg-indigo-600 rounded-full"
      />
      <motion.div
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.5, 0, 0.5]
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute inset-0 w-16 h-16 bg-indigo-600 rounded-full"
      />
    </div>
    <p className="mt-6 text-gray-600">{message}</p>
  </motion.div>
)

// Skeleton para contenido
const SkeletonLoading = () => (
  <div className="p-4 space-y-4">
    {[1, 2, 3].map((i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: i * 0.1 }}
        className="space-y-3"
      >
        <motion.div
          animate={{
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="h-4 bg-gray-200 rounded w-3/4"
        />
        <motion.div
          animate={{
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.2
          }}
          className="h-4 bg-gray-200 rounded w-1/2"
        />
      </motion.div>
    ))}
  </div>
)

// Loading inline para botones
export const ButtonLoading = () => (
  <motion.div
    animate={{ rotate: 360 }}
    transition={{ 
      duration: 1, 
      repeat: Infinity, 
      ease: "linear" 
    }}
    className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
  />
)

// Progress bar animado
export const ProgressBar = ({ progress = 0 }: { progress: number }) => (
  <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: `${progress}%` }}
      transition={{ 
        duration: 0.5, 
        ease: "easeOut" 
      }}
      className="h-full bg-indigo-600"
    />
  </div>
)
