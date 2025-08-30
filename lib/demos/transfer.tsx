import { DemoDefinition } from '../types'
import { createMessage, createTextBlock, createWidgetBlock, mockAccounts } from '../agenticMocks'

export const transferDemo: DemoDefinition = {
  slug: 'transfer',
  title: 'Transferencia de Dinero',
  description: 'Gestiona transferencias entre cuentas y a terceros',
  icon: '💸',
  initialMessages: [
    createMessage('assistant', [
      createTextBlock('¡Hola! Soy tu asistente financiero. ¿En qué puedo ayudarte hoy?'),
      createWidgetBlock('info-card', {
        title: 'Resumen de Cuentas',
        accounts: mockAccounts.slice(0, 2),
        totalBalance: 175000
      })
    ])
  ],
  initialQuickReplies: [
    { id: '1', label: 'Transferir dinero', payload: { action: 'open_transfer' } },
    { id: '2', label: 'Ver cuentas', payload: { action: 'show_accounts' } },
    { id: '3', label: 'Historial', payload: { action: 'show_history' } }
  ],
  onQuickReply: (qr, ctx) => {
    if (qr.payload?.action === 'open_transfer') {
      ctx.openSheet(
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4">Nueva Transferencia</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Cuenta Origen</label>
              <select className="w-full p-3 border rounded-lg">
                {mockAccounts.map(account => (
                  <option key={account.id} value={account.id}>
                    {account.name} - ${account.balance.toLocaleString()}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Monto</label>
              <input type="number" placeholder="0.00" className="w-full p-3 border rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Cuenta Destino</label>
              <input type="text" placeholder="Número de cuenta o CBU" className="w-full p-3 border rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Concepto</label>
              <textarea placeholder="Descripción de la transferencia" className="w-full p-3 border rounded-lg" rows={3} />
            </div>
            <button className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-medium">
              Continuar
            </button>
          </div>
        </div>,
        { snapPoints: [0.25, 0.5, 0.9], initialSnap: 0.5 }
      )
    } else if (qr.payload?.action === 'show_accounts') {
      ctx.pushAssistantMessage(
        createMessage('assistant', [
          createTextBlock('Aquí tienes el detalle de todas tus cuentas:'),
          createWidgetBlock('account-list', { accounts: mockAccounts })
        ])
      )
    }
  },
  onUserMessage: (text, ctx) => {
    if (text.toLowerCase().includes('transferir') || text.toLowerCase().includes('transferencia')) {
      ctx.pushAssistantMessage(
        createMessage('assistant', [
          createTextBlock('Perfecto, te ayudo con la transferencia. ¿Desde qué cuenta quieres transferir?'),
          createWidgetBlock('account-list', { accounts: mockAccounts })
        ])
      )
    }
  }
}
