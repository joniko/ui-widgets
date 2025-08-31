'use client'

import { motion } from 'framer-motion'

interface LoadingAnimationProps {
  message?: string
  type?: 'spinner' | 'dots' | 'pulse' | 'skeleton'
}

export const LoadingAnimation = ({
  message = 'Cargando...',
  type = 'spinner',
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
    className="flex min-h-[200px] flex-col items-center justify-center p-8"
  >
    <motion.div
      animate={{ rotate: 360 }}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: 'linear',
      }}
      className="h-12 w-12 rounded-full border-4 border-gray-200 border-t-indigo-600"
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
    className="flex min-h-[200px] flex-col items-center justify-center p-8"
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
            ease: 'easeInOut',
          }}
          className="h-3 w-3 rounded-full bg-indigo-600"
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
    className="flex min-h-[200px] flex-col items-center justify-center p-8"
  >
    <div className="relative">
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [1, 0.5, 1],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="h-16 w-16 rounded-full bg-indigo-600"
      />
      <motion.div
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.5, 0, 0.5],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute inset-0 h-16 w-16 rounded-full bg-indigo-600"
      />
    </div>
    <p className="mt-6 text-gray-600">{message}</p>
  </motion.div>
)

// Skeleton para contenido
const SkeletonLoading = () => (
  <div className="space-y-4 p-4">
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
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="h-4 w-3/4 rounded bg-gray-200"
        />
        <motion.div
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.2,
          }}
          className="h-4 w-1/2 rounded bg-gray-200"
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
      ease: 'linear',
    }}
    className="h-4 w-4 rounded-full border-2 border-white border-t-transparent"
  />
)

// Progress bar animado
export const ProgressBar = ({ progress = 0 }: { progress: number }) => (
  <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: `${progress}%` }}
      transition={{
        duration: 0.5,
        ease: 'easeOut',
      }}
      className="h-full bg-indigo-600"
    />
  </div>
)
