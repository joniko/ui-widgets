'use client'

import { DemoDefinition } from '../types'
import { createMessage, createTextBlock, createWidgetBlock } from '../agenticMocks'
import { FlowEngine } from '../flows/FlowEngine'
import { transferFlow } from '../flows/cases/transfer'
import { balanceFlow } from '../flows/cases/balance'
import { paymentFlow } from '../flows/cases/payment'
import { transferWithPersistenceFlow } from '../flows/cases/transfer-with-persistence'
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
  title: 'Asistente',
  icon: '🤖',
  initialMessages: [
    createMessage('assistant', [
      createTextBlock('¡Hola! Soy tu asistente virtual. ¿En qué puedo ayudarte?')
    ])
  ],
  initialQuickReplies: [
    { 
      id: 'transfer', 
      label: 'Transferir dinero'
      // No icon - will use getQuickReplyIcon
    },
    { 
      id: 'balance', 
      label: 'Ver saldo'
      // No icon - will use getQuickReplyIcon
    },
    { 
      id: 'pay', 
      label: 'Pagar servicios'
      // No icon - will use getQuickReplyIcon
    },
    { 
      id: 'help', 
      label: 'Ayuda'
      // No icon - will use getQuickReplyIcon
    }
  ],
  
  onQuickReply: (qr, ctx) => {
    // Quick reply de Pagar servicios muestra los servicios pendientes inline
    if (qr.label === 'Pagar servicios') {
      // Mostrar servicios pendientes inline
      setTimeout(() => {
        const services = [
          { id: '1', name: 'Edesur', amount: 8500, provider: 'Electricidad', dueDate: '15/01/2024', status: 'pending' },
          { id: '2', name: 'Metrogas', amount: 3200, provider: 'Gas', dueDate: '18/01/2024', status: 'pending' },
          { id: '3', name: 'Telecentro', amount: 12000, provider: 'Internet', dueDate: '10/01/2024', status: 'overdue' }
        ]
        const totalAmount = services.reduce((sum, service) => sum + service.amount, 0)
        const overdueCount = services.filter(s => s.status === 'overdue').length
        
        ctx.pushAssistantMessage(
          createMessage('assistant', [
            createTextBlock(`Tenés ${services.length} servicios pendientes por un total de $${totalAmount.toLocaleString('es-AR')}${overdueCount > 0 ? `. Hay ${overdueCount > 1 ? '' : 'una '}factura${overdueCount > 1 ? 's' : ''} vencida${overdueCount > 1 ? 's' : ''}` : '.'}`),
            createWidgetBlock('service-detail-list', {
              title: 'Servicios por Pagar',
              services: services,
              totalAmount: totalAmount
            })
          ])
        )
        
        setTimeout(() => {
          ctx.pushAssistantMessage(
            createMessage('assistant', [
              createTextBlock('Puedes decirme "pagar todas", "pagar Edesur" o seleccionar un servicio específico del listado.')
            ])
          )
        }, 800)
      }, 500)
      return
    }
    
    // Mapeo de quick replies a textos de prefill
    const prefillTexts: Record<string, string> = {
      'Transferir dinero': 'Quiero transferir a ',
      'Ver mi saldo': 'Quiero ver mi saldo',
      'Ayuda': '¿Cómo puedo '
    }
    
    // Si hay un texto de prefill para este quick reply, usarlo
    if (prefillTexts[qr.label]) {
      ctx.prefillInput(prefillTexts[qr.label])
      return
    }
    
    // Si es "Ver mi saldo", ejecutarlo directamente sin prefill
    if (qr.label === 'Ver mi saldo') {
      setTimeout(() => {
        ctx.pushAssistantMessage(
          createMessage('assistant', [
            createTextBlock('Aquí tienes el resumen de tus cuentas:'),
            createWidgetBlock('account-list', {
              title: 'Tus Cuentas',
              accounts: [
                { id: '1', name: 'Cuenta Corriente', balance: 125000, number: '****1234', type: 'Corriente' },
                { id: '2', name: 'Caja de Ahorro', balance: 450000, number: '****5678', type: 'Ahorro' }
              ]
            })
          ])
        )
      }, 500)
    }
  },
  
  onUserMessage: (text, ctx) => {
    const lowerText = text.toLowerCase()
    
    // Detectar si quiere pagar todos los servicios
    if (lowerText.includes('pagar todas') || lowerText.includes('pagar todo')) {
      setTimeout(() => {
        ctx.pushAssistantMessage(
          createMessage('assistant', [
            createTextBlock('Perfecto, voy a procesar el pago de todos tus servicios pendientes.')
          ])
        )
        
        // Abrir bottom sheet para confirmar pago múltiple
        setTimeout(() => {
          ctx.openSheet(
            <FlowEngine
              flow={paymentFlow}
              initialData={{ 
                multiplePayment: true,
                totalAmount: 23700,
                services: ['Edesur', 'Metrogas', 'Telecentro']
              }}
              onComplete={(data) => {
                ctx.pushUIMessage('Confirmar pago de todos los servicios')
                ctx.closeSheet?.()
                setTimeout(() => {
                  ctx.pushAssistantMessage(
                    createMessage('assistant', [
                      createTextBlock('¡Listo! Se pagaron todos los servicios'),
                      createWidgetBlock('confirmation', {
                        type: 'success',
                        title: '¡Pagos realizados!',
                        recipient: '3 servicios',
                        account: 'Cuenta Principal',
                        amount: 23700,
                        accountType: 'Pago múltiple',
                        showReceipt: true
                      })
                    ])
                  )
                }, 500)
              }}
              onCancel={() => ctx.closeSheet?.()}
            />,
            { snapPoints: [0.5, 0.7, 0.9], initialSnap: 0.7 }
          )
        }, 1000)
      }, 500)
      return
    }
    
    // Verificar si es una consulta de servicios pendientes
    const isServicesQuery = 
      lowerText.includes('servicios pendientes') ||
      lowerText.includes('cuánto debo') ||
      lowerText.includes('facturas pendientes') ||
      lowerText.includes('servicios por pagar') ||
      lowerText.includes('qué tengo que pagar') ||
      lowerText.includes('cuentas por pagar') ||
      lowerText === 'servicios' ||
      lowerText === 'facturas'
    
    if (isServicesQuery) {
      // Mostrar servicios pendientes inline
      setTimeout(() => {
        const services = [
          { id: '1', name: 'Edesur', amount: 8500, provider: 'Electricidad', dueDate: '15/01/2024', status: 'pending' },
          { id: '2', name: 'Metrogas', amount: 3200, provider: 'Gas', dueDate: '18/01/2024', status: 'pending' },
          { id: '3', name: 'Telecentro', amount: 12000, provider: 'Internet', dueDate: '10/01/2024', status: 'overdue' }
        ]
        const totalAmount = services.reduce((sum, service) => sum + service.amount, 0)
        const overdueCount = services.filter(s => s.status === 'overdue').length
        
        ctx.pushAssistantMessage(
          createMessage('assistant', [
            createTextBlock(`Tenés ${services.length} servicios pendientes por un total de $${totalAmount.toLocaleString('es-AR')}${overdueCount > 0 ? `. Hay ${overdueCount > 1 ? '' : 'una '}factura${overdueCount > 1 ? 's' : ''} vencida${overdueCount > 1 ? 's' : ''}` : '.'}`),
            createWidgetBlock('service-detail-list', {
              title: 'Servicios por Pagar',
              services: services,
              totalAmount: totalAmount
            })
          ])
        )
        
        // Agregar opciones para acciones sobre los servicios
        setTimeout(() => {
          ctx.pushAssistantMessage(
            createMessage('assistant', [
              createTextBlock('Puedes decirme "pagar todas", "pagar Edesur" o seleccionar un servicio específico del listado.')
            ])
          )
        }, 800)
      }, 500)
      return
    }
    
    // Detectar otros flujos
    const flow = detectFlow(text)
    
    if (flow) {
      // Flujos informativos (inline) vs flujos interactivos (bottom sheet)
      const informationalFlows = ['balance']
      const isInformational = informationalFlows.includes(flow.id)
      
      if (isInformational) {
        // Flujos informativos se ejecutan inline
        setTimeout(() => {
          ctx.pushAssistantMessage(
            createMessage('assistant', [
              createTextBlock('Perfecto, te ayudo con eso.')
            ])
          )
          
          setTimeout(() => {
            // Ejecutar el flujo directamente y mostrar resultado inline
            if (flow.id === 'balance') {
              ctx.pushAssistantMessage(
                createMessage('assistant', [
                  createTextBlock('Aquí tienes el resumen de tus cuentas:'),
                  createWidgetBlock('account-list', {
                    title: 'Tus Cuentas',
                    accounts: [
                      { id: '1', name: 'Cuenta Corriente', balance: 125000, number: '****1234', type: 'Corriente' },
                      { id: '2', name: 'Caja de Ahorro', balance: 450000, number: '****5678', type: 'Ahorro' }
                    ]
                  })
                ])
              )
            }
          }, 1000)
        }, 500)
      } else {
        // Flujos interactivos usan bottom sheet
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
        }, 1000)
      }, 500)
    }
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
