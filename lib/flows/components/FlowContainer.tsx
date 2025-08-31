'use client'

import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'

interface FlowContainerProps {
  children: React.ReactNode
  title: string
  onBack?: () => void
  showBack?: boolean
}

export const FlowContainer = ({ children, title, onBack, showBack = false }: FlowContainerProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="flex flex-col h-full"
    >
      <div className="flex items-center gap-3 py-4 border-b">
        {showBack && (
          <button
            onClick={onBack}
            className="p-2 -ml-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        )}
        <h2 className="text-xl font-semibold flex-1">{title}</h2>
      </div>
      
      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </motion.div>
  )
}
