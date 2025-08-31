'use client'

import { DemoDefinition, DemoContext } from '../types'
import { createMessage, createTextBlock, createWidgetBlock, createUIMessage } from '../agenticMocks'
import { FlowEngine } from '../flows/FlowEngine'
import { transferFlow } from '../flows/cases/transfer'
import { balanceFlow } from '../flows/cases/balance'
import { paymentFlow } from '../flows/cases/payment'
import { transferWithPersistenceFlow } from '../flows/cases/transfer-with-persistence'
import { useState, useEffect } from 'react'
import { FlowStorage } from '../flows/FlowStorage'

// Todos los flujos disponibles
const flows = [
  transferFlow,
  balanceFlow,
  paymentFlow,
  transferWithPersistenceFlow
]

// Inicializar datos de demo
if (typeof window !== 'undefined') {
  FlowStorage.initializeDemoData()
}

// Detectar qué flujo ejecutar basado en el texto
const detectFlow = (text: string) => {
  const lowerText = text.toLowerCase()
  
  for (const flow of flows) {
    // flow.triggers es siempre un array
    const matched = flow.triggers.some(trigger => {
      if (typeof trigger === 'string') {
        return lowerText.includes(trigger.toLowerCase())
      } else if (trigger instanceof RegExp) {
        return trigger.test(text)
      } else if (typeof trigger === 'function') {
        return trigger(text)
      }
      return false
    })
    
    if (matched) return flow
  }
  
  return null
}

export const unifiedAssistantDemo: DemoDefinition = {
  slug: 'unified',
  title: 'Asistente Virtual',
  icon: '🤖',
  initialMessages: [
    createMessage('assistant', [
      createTextBlock('¡Hola! Soy tu asistente virtual. ¿En qué puedo ayudarte?')
    ])
  ],
  initialQuickReplies: [
    { 
      id: 'transfer', 
      label: 'Transferir dinero',
      icon: '💸'
    },
    { 
      id: 'balance', 
      label: 'Ver saldo',
      icon: '💰'
    },
    { 
      id: 'pay', 
      label: 'Pagar servicios',
      icon: '💳'
    },
    { 
      id: 'help', 
      label: 'Ayuda',
      icon: '❓'
    }
  ],
  
  onQuickReply: (qr, ctx) => {
    // Simular que el usuario escribió el texto
    ctx.pushUserMessage(qr.label)
    
    // Detectar y ejecutar flujo
    const flow = detectFlow(qr.label)
    if (flow) {
      setTimeout(() => {
        ctx.openSheet(
          <FlowEngine
            flow={flow}
            onComplete={(data) => {
              // Mostrar mensaje de confirmación inmediatamente
              if (flow.id === 'transfer') {
                ctx.pushUIMessage('Confirmar transferencia')
              } else if (flow.id === 'payment') {
                ctx.pushUIMessage('Confirmar pago')
              }
              
              ctx.closeSheet?.()
              
              // Mensaje de confirmación específico según el flujo
              setTimeout(() => {
                if (flow.id === 'transfer') {
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
                        showReceipt: true
                      })
                    ])
                  )
                } else if (flow.id === 'payment') {
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
                        showReceipt: true
                      })
                    ])
                  )
                } else {
                  // Para otros flujos, mostrar mensaje genérico
                  ctx.pushAssistantMessage(
                    createMessage('assistant', [
                      createTextBlock('¡Listo! La operación se completó exitosamente.')
                    ])
                  )
                }
              }, 500)
            }}
            onCancel={() => ctx.closeSheet?.()}
          />,
          { snapPoints: [0.5, 0.7, 0.9], initialSnap: 0.7 }
        )
      }, 500)
    }
  },
  
  onUserMessage: (text, ctx) => {
    // Detectar intención
    const flow = detectFlow(text)
    
    if (flow) {
      // Respuesta contextual antes de abrir el flujo
      setTimeout(() => {
        // Si es transferencia y menciona "Mauro", dar respuesta especial
        if (flow.id === 'transfer' && text.toLowerCase().includes('mauro')) {
          ctx.pushAssistantMessage(
            createMessage('assistant', [
              createTextBlock('Tenes tres contactos con ese nombre. ¿A cuál te referís?')
            ])
          )
        } else {
          ctx.pushAssistantMessage(
            createMessage('assistant', [
              createTextBlock('Perfecto, te ayudo con eso.')
            ])
          )
        }
        
        // Abrir el flujo
        setTimeout(() => {
          // Extraer el monto si está presente en el texto
          const montoMatch = text.match(/(\d+(?:\.\d+)?)/);
          const initialData = montoMatch ? { amount: parseFloat(montoMatch[1]) } : {};
          
          ctx.openSheet(
            <FlowEngine
              flow={flow}
              initialData={initialData}
              onComplete={(data) => {
                ctx.closeSheet?.()
                // Mensaje de confirmación específico según el flujo
                setTimeout(() => {
                  if (flow.id === 'transfer') {
                    ctx.pushUIMessage('Confirmar transferencia')
                    setTimeout(() => {
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
                            showReceipt: true
                          })
                        ])
                      )
                    }, 500)
                  } else {
                    ctx.pushAssistantMessage(
                      createMessage('assistant', [
                        createTextBlock('¡Operación completada exitosamente! ¿Necesitas algo más?')
                      ])
                    )
                  }
                }, 500)
              }}
              onCancel={() => ctx.closeSheet?.()}
            />,
            { snapPoints: [0.5, 0.7, 0.9], initialSnap: 0.7 }
          )
        }, 500)
      }, 300)
    } else {
      // Respuesta genérica si no se detecta intención
      setTimeout(() => {
        ctx.pushAssistantMessage(
          createMessage('assistant', [
            createTextBlock('No entendí bien qué necesitas. Puedo ayudarte a transferir dinero, ver tu saldo o pagar servicios.')
          ])
        )
      }, 500)
    }
  }
}
