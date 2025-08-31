'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { QuickReply } from '@/lib/types'
import {
  Search,
  DollarSign,
  TrendingUp,
  CreditCard,
  BarChart3,
  Wallet,
  Receipt,
} from 'lucide-react'

const getQuickReplyIcon = (label: string) => {
  const lowerLabel = label.toLowerCase()

  // Transferencias
  if (
    lowerLabel.includes('transfer') ||
    lowerLabel.includes('dinero') ||
    lowerLabel.includes('enviar')
  )
    return <DollarSign className="h-5 w-5" />

  // Saldos y cuentas
  if (
    lowerLabel.includes('saldo') ||
    lowerLabel.includes('balance') ||
    lowerLabel.includes('cuenta') ||
    lowerLabel.includes('account')
  )
    return <Wallet className="h-5 w-5" />

  // Pagos y servicios
  if (
    lowerLabel.includes('pago') ||
    lowerLabel.includes('payment') ||
    lowerLabel.includes('servicio') ||
    lowerLabel.includes('service') ||
    lowerLabel.includes('factura')
  )
    return <CreditCard className="h-5 w-5" />

  // Recargas
  if (
    lowerLabel.includes('recarga') ||
    lowerLabel.includes('celular') ||
    lowerLabel.includes('móvil')
  )
    return <Receipt className="h-5 w-5" />

  // Ayuda y soporte
  if (
    lowerLabel.includes('ayuda') ||
    lowerLabel.includes('help') ||
    lowerLabel.includes('soporte') ||
    lowerLabel.includes('contactar')
  )
    return <Search className="h-5 w-5" />

  // Consultas y reportes
  if (
    lowerLabel.includes('consulta') ||
    lowerLabel.includes('check') ||
    lowerLabel.includes('gasto') ||
    lowerLabel.includes('expense') ||
    lowerLabel.includes('historial')
  )
    return <BarChart3 className="h-5 w-5" />

  return <TrendingUp className="h-5 w-5" />
}

interface QuickRepliesProps {
  quickReplies: QuickReply[]
  onQuickReply: (quickReply: QuickReply) => void
}

export function QuickReplies({
  quickReplies,
  onQuickReply,
}: QuickRepliesProps) {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        duration: 0.3,
      },
    },
    exit: {
      opacity: 0,
      y: 20,
      transition: {
        duration: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
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
              <div className="flex min-w-max space-x-3 px-4 py-2">
                {quickReplies.map((quickReply) => (
                  <motion.div key={quickReply.id} variants={itemVariants}>
                    <Button
                      variant="outline"
                      size="lg"
                      className="items-left flex h-auto min-w-[140px] flex-col rounded-2xl border-none bg-transparent p-4 transition-all duration-200 hover:bg-indigo-50"
                      style={{
                        boxShadow:
                          '0 0 0 1px rgba(34, 34, 34, 0.08), 0 1px 1px -0.5px rgba(34, 34, 34, 0.04), 0 2px 2px -1px rgba(34, 34, 34, 0.04), 0 6px 6px -3px rgba(34, 34, 34, 0.04)',
                      }}
                      onClick={() => onQuickReply(quickReply)}
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100">
                        {quickReply.icon ? (
                          <span className="text-lg">{quickReply.icon}</span>
                        ) : (
                          getQuickReplyIcon(quickReply.label)
                        )}
                      </div>
                      <span className="text-center text-sm font-medium leading-tight text-indigo-900">
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
