'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { QuickReply } from '@/lib/types'
import { Search, DollarSign, TrendingUp, CreditCard, Calculator, BarChart3, Wallet, Receipt } from 'lucide-react'

const getQuickReplyIcon = (label: string) => {
  const lowerLabel = label.toLowerCase()
  
  if (lowerLabel.includes('pago') || lowerLabel.includes('payment')) return <Receipt className="w-5 h-5" />
  if (lowerLabel.includes('transfer') || lowerLabel.includes('dinero')) return <DollarSign className="w-5 h-5" />
  if (lowerLabel.includes('gasto') || lowerLabel.includes('expense')) return <BarChart3 className="w-5 h-5" />
  if (lowerLabel.includes('consulta') || lowerLabel.includes('check')) return <Search className="w-5 h-5" />
  if (lowerLabel.includes('cuenta') || lowerLabel.includes('account')) return <Wallet className="w-5 h-5" />
  if (lowerLabel.includes('servicio') || lowerLabel.includes('service')) return <CreditCard className="w-5 h-5" />
  if (lowerLabel.includes('ayuda') || lowerLabel.includes('help')) return <Calculator className="w-5 h-5" />
  
  return <TrendingUp className="w-5 h-5" />
}

interface QuickRepliesProps {
  quickReplies: QuickReply[]
  onQuickReply: (quickReply: QuickReply) => void
}

export function QuickReplies({ quickReplies, onQuickReply }: QuickRepliesProps) {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        duration: 0.3
      }
    },
    exit: {
      opacity: 0,
      y: 20,
      transition: {
        duration: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <AnimatePresence>
      {quickReplies.length > 0 && (
    <motion.div 
      className="pb-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <div className="">
        <ScrollArea className="w-full">
          <div className="flex space-x-3 min-w-max px-2">
          {quickReplies.map((quickReply) => (
            <motion.div key={quickReply.id} variants={itemVariants}>
              <Button
                variant="outline"
                size="lg"
                className="flex flex-col items-center space-y-2 p-4 h-auto min-w-[140px] rounded-2xl border border-[#D0D4E6] bg-indigo-50 hover:bg-indigo-100 transition-all duration-200"
                style={{
                  boxShadow: '0 2px 4px 0 rgba(40, 40, 52, 0.10)'
                }}
                onClick={() => onQuickReply(quickReply)}
              >
                <div className="w-8 h-8 bg-indigo-200 rounded-full flex items-center justify-center">
                  {quickReply.icon ? (
                    <span className="text-lg">{quickReply.icon}</span>
                  ) : (
                    getQuickReplyIcon(quickReply.label)
                  )}
                </div>
                <span className="text-sm font-medium text-center leading-tight text-indigo-900">
                  {quickReply.label}
                </span>
              </Button>
            </motion.div>
          ))}
          </div>
          <ScrollBar orientation="horizontal" className="hidden" />
        </ScrollArea>
      </div>
    </motion.div>
      )}
    </AnimatePresence>
  )
}
