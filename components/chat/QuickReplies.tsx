'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { QuickReply } from '@/lib/types'

interface QuickRepliesProps {
  quickReplies: QuickReply[]
  onQuickReply: (quickReply: QuickReply) => void
}

export function QuickReplies({ quickReplies, onQuickReply }: QuickRepliesProps) {
  if (quickReplies.length === 0) return null

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <div className="px-4 py-3 border-t bg-muted/30">
      <ScrollArea className="w-full">
        <motion.div
          className="flex space-x-2 min-w-max"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {quickReplies.map((quickReply) => (
            <motion.div key={quickReply.id} variants={itemVariants}>
              <Button
                variant="outline"
                size="sm"
                className="whitespace-nowrap rounded-full px-4 py-2 h-auto"
                onClick={() => onQuickReply(quickReply)}
              >
                {quickReply.label}
              </Button>
            </motion.div>
          ))}
        </motion.div>
        <ScrollBar orientation="horizontal" className="hidden" />
      </ScrollArea>
    </div>
  )
}
