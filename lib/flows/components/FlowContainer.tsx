'use client'

import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'

interface FlowContainerProps {
  children: React.ReactNode
  title: string
  onBack?: () => void
  showBack?: boolean
}

export const FlowContainer = ({
  children,
  title,
  onBack,
  showBack = false,
}: FlowContainerProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="flex h-full flex-col"
    >
      <div className="flex items-center gap-3 border-b py-4">
        {showBack && (
          <button
            onClick={onBack}
            className="-ml-2 rounded-lg p-2 transition-colors hover:bg-gray-100"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
        )}
        <h2 className="flex-1 text-xl font-semibold">{title}</h2>
      </div>

      <div className="flex-1 overflow-auto">{children}</div>
    </motion.div>
  )
}
