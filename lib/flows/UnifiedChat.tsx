'use client'

import { useState } from 'react'
import { FlowEngine } from './FlowEngine'
import { FlowDefinition } from './types'
import {
  createMessage,
  createTextBlock,
  createWidgetBlock,
} from '../agenticMocks'
import { DemoContext } from '../types'

// Importar todos los casos
import { transferFlow } from './cases/transfer'
import { paymentFlow } from './cases/payment'
import { balanceFlow } from './cases/balance'

const flows: FlowDefinition[] = [transferFlow, paymentFlow, balanceFlow]

interface UnifiedChatProps {
  onMessage: (text: string) => void
  ctx?: DemoContext // Contexto del chat para mostrar mensajes y widgets
}

export const UnifiedChat = ({ onMessage, ctx }: UnifiedChatProps) => {
  const [activeFlow, setActiveFlow] = useState<FlowDefinition | null>(null)

  const detectFlow = (text: string): FlowDefinition | null => {
    for (const flow of flows) {
      const lowerText = text.toLowerCase()
      if (
        flow.triggers.some((trigger) => {
          if (typeof trigger === 'string') {
            return lowerText.includes(trigger.toLowerCase())
          }
          if (trigger instanceof RegExp) {
            return trigger.test(text)
          }
          if (typeof trigger === 'function') {
            return trigger(text)
          }
          return false
        })
      ) {
        return flow
      }
    }
    return null
  }

  if (activeFlow) {
    return (
      <FlowEngine
        flow={activeFlow}
        onComplete={(data) => {
          console.log('Flow completed:', data)
          setActiveFlow(null)

          // Si tenemos contexto del chat, mostrar el widget de congratulaciones
          if (ctx) {
            setTimeout(() => {
              if (activeFlow.id === 'transfer') {
                ctx.pushAssistantMessage(
                  createMessage('assistant', [
                    createTextBlock('¡Listo! La transferencia fue realizada'),
                    createWidgetBlock('confirmation', {
                      type: 'success',
                      title: '¡Transferencia realizada!',
                      recipient: (data.contact as { name: string }).name,
                      account: `${(data.account as { name: string; type: string; number: string }).name} - ${(data.account as { name: string; type: string; number: string }).type}****${(data.account as { name: string; type: string; number: string }).number.slice(-4)}`,
                      amount: data.amount as number,
                      accountType: 'Con dinero en cuenta',
                      showReceipt: true,
                    }),
                  ]),
                )
              } else if (activeFlow.id === 'payment') {
                ctx.pushAssistantMessage(
                  createMessage('assistant', [
                    createTextBlock('¡Listo! El pago fue realizado'),
                    createWidgetBlock('confirmation', {
                      type: 'success',
                      title: '¡Pago realizado!',
                      recipient: (data.service as { name: string }).name,
                      account: `${(data.account as { name: string }).name}`,
                      amount: (data.service as { amount: number }).amount,
                      accountType: 'Pago de servicio',
                      showReceipt: true,
                    }),
                  ]),
                )
              } else {
                // Para otros flujos, mostrar mensaje genérico
                ctx.pushAssistantMessage(
                  createMessage('assistant', [
                    createTextBlock(
                      '¡Listo! La operación se completó exitosamente.',
                    ),
                  ]),
                )
              }
            }, 500)
          }
        }}
        onCancel={() => setActiveFlow(null)}
      />
    )
  }

  // Tu chat normal aquí
  return <div>{/* Chat interface */}</div>
}
