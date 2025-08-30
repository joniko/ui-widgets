import { Message, QuickReply, ChatBlock, WidgetType } from './types'

export const generateId = () => Math.random().toString(36).substr(2, 9)

export const createMessage = (role: 'user' | 'assistant', blocks: ChatBlock[]): Message => ({
  id: generateId(),
  role,
  blocks,
  createdAt: new Date().toISOString()
})

export const createTextBlock = (text: string) => ({ kind: 'text' as const, text })

export const createWidgetBlock = (type: WidgetType, props: Record<string, unknown>): ChatBlock => ({
  kind: 'widget' as const,
  widget: { id: generateId(), type, props }
})

export const mockAccounts = [
  { id: '1', name: 'Cuenta Corriente', number: '****1234', balance: 25000, type: 'checking' },
  { id: '2', name: 'Cuenta de Ahorros', number: '****5678', balance: 150000, type: 'savings' },
  { id: '3', name: 'Cuenta Inversión', number: '****9012', balance: 500000, type: 'investment' }
]

export const mockServices = [
  { id: '1', name: 'Luz', provider: 'EDESUR', amount: 4500, dueDate: '2024-01-15' },
  { id: '2', name: 'Gas', provider: 'Metrogas', amount: 3200, dueDate: '2024-01-20' },
  { id: '3', name: 'Internet', provider: 'Fibertel', amount: 8900, dueDate: '2024-01-25' }
]

export const mockQuickReplies: Record<string, QuickReply[]> = {
  transfer: [
    { id: '1', label: 'Transferir dinero', payload: { action: 'open_transfer' } },
    { id: '2', label: 'Ver cuentas', payload: { action: 'show_accounts' } },
    { id: '3', label: 'Historial', payload: { action: 'show_history' } }
  ],
  payService: [
    { id: '1', label: 'Pagar servicio', payload: { action: 'open_payment' } },
    { id: '2', label: 'Ver facturas', payload: { action: 'show_bills' } },
    { id: '3', label: 'Configurar auto-pago', payload: { action: 'setup_autopay' } }
  ],
  help: [
    { id: '1', label: 'Cómo transferir', payload: { action: 'help_transfer' } },
    { id: '2', label: 'Cómo pagar servicios', payload: { action: 'help_payment' } },
    { id: '3', label: 'Contactar soporte', payload: { action: 'contact_support' } }
  ]
}
