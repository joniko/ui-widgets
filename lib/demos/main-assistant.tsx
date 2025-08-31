import { QuickReply, DemoContext } from '@/lib/types'
import {
  createMessage,
  createTextBlock,
  createWidgetBlock,
} from '@/lib/agenticMocks'

export const mainAssistantDemo = {
  slug: 'main-assistant',
  title: 'Asistente Principal',
  icon: '🤖',
  initialMessages: [
    createMessage('assistant', [createTextBlock('¿En qué te ayudo hoy?')]),
  ],
  initialQuickReplies: [
    {
      id: 'check-payments',
      label: 'Consultar tus últimos pagos',
    },
    {
      id: 'transfer-money',
      label: 'Transferir dinero',
    },
    {
      id: 'monthly-expenses',
      label: 'Mostrar mis gastos mensuales',
    },
  ],
  onQuickReply: (quickReply: QuickReply, ctx: DemoContext) => {
    switch (quickReply.id) {
      case 'check-payments':
        ctx.pushAssistantMessage(
          createMessage('assistant', [
            createTextBlock('Aquí tienes un resumen de tus últimos pagos:'),
            createWidgetBlock('payment-cta', {
              title: 'Últimos Pagos',
              services: [
                {
                  id: '1',
                  name: 'Netflix',
                  amount: 15.99,
                  provider: 'Netflix',
                  dueDate: '15/12/2024',
                },
                {
                  id: '2',
                  name: 'Spotify',
                  amount: 9.99,
                  provider: 'Spotify',
                  dueDate: '20/12/2024',
                },
                {
                  id: '3',
                  name: 'Electricidad',
                  amount: 45.5,
                  provider: 'EDESUR',
                  dueDate: '25/12/2024',
                },
              ],
            }),
          ]),
        )
        break

      case 'transfer-money':
        ctx.pushAssistantMessage(
          createMessage('assistant', [
            createTextBlock(
              'Perfecto, vamos a hacer una transferencia. Primero necesito que selecciones la cuenta de origen:',
            ),
            createWidgetBlock('account-list', {
              title: 'Tus Cuentas',
              accounts: [
                {
                  id: '1',
                  name: 'Cuenta Corriente',
                  balance: 2500,
                  number: '****1234',
                  type: 'Corriente',
                },
                {
                  id: '2',
                  name: 'Caja de Ahorro',
                  balance: 15000,
                  number: '****5678',
                  type: 'Ahorro',
                },
              ],
            }),
          ]),
        )
        break

      case 'monthly-expenses':
        ctx.pushAssistantMessage(
          createMessage('assistant', [
            createTextBlock('Aquí tienes un resumen de tus gastos mensuales:'),
            createWidgetBlock('info-card', {
              title: 'Gastos Diciembre 2024',
              operations: [
                'Alimentación: $450',
                'Transporte: $180',
                'Entretenimiento: $120',
                'Servicios: $200',
                'Otros: $150',
              ],
              totalBalance: 1100,
            }),
          ]),
        )
        break
    }
  },
  onUserMessage: (text: string, ctx: DemoContext) => {
    // Simular respuesta del asistente
    setTimeout(() => {
      ctx.pushAssistantMessage(
        createMessage('assistant', [
          createTextBlock(
            `Entiendo que quieres "${text}". Déjame ayudarte con eso. ¿Podrías ser más específico sobre lo que necesitas?`,
          ),
        ]),
      )
    }, 1000)
  },
}
