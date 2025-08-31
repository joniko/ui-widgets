import { DemoDefinition } from '../types'
import {
  createMessage,
  createTextBlock,
  createWidgetBlock,
  mockServices,
} from '../agenticMocks'

export const payServiceDemo: DemoDefinition = {
  slug: 'pay-service',
  title: 'Pago de Servicios',
  icon: 'CreditCard',
  initialMessages: [
    createMessage('assistant', [
      createTextBlock(
        '¡Hola! Soy tu asistente de pagos. ¿Qué servicio necesitas pagar hoy?',
      ),
      createWidgetBlock('info-card', {
        title: 'Servicios Pendientes',
        services: mockServices,
        totalAmount: 16600,
      }),
    ]),
  ],
  initialQuickReplies: [
    { id: '1', label: 'Pagar servicio', payload: { action: 'open_payment' } },
    { id: '2', label: 'Ver facturas', payload: { action: 'show_bills' } },
    {
      id: '3',
      label: 'Configurar auto-pago',
      payload: { action: 'setup_autopay' },
    },
  ],
  onQuickReply: (qr, ctx) => {
    if (qr.payload?.action === 'open_payment') {
      ctx.openSheet(
        <div className="p-6">
          <h3 className="mb-4 text-lg font-semibold">Pago de Servicio</h3>
          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium">Servicio</label>
              <select className="w-full rounded-lg border p-3">
                {mockServices.map((service) => (
                  <option key={service.id} value={service.id}>
                    {service.name} - {service.provider} - $
                    {service.amount.toLocaleString()}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium">
                Cuenta de Débito
              </label>
              <select className="w-full rounded-lg border p-3">
                <option value="1">Cuenta Corriente ****1234</option>
                <option value="2">Cuenta de Ahorros ****5678</option>
              </select>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium">
                Monto a Pagar
              </label>
              <input
                type="number"
                placeholder="0.00"
                className="w-full rounded-lg border p-3"
              />
            </div>
            <div className="flex space-x-3">
              <button className="flex-1 rounded-lg bg-gray-200 py-3 font-medium text-gray-800">
                Cancelar
              </button>
              <button className="bg-primary text-primary-foreground flex-1 rounded-lg py-3 font-medium">
                Pagar Ahora
              </button>
            </div>
          </div>
        </div>,
        { snapPoints: [0.25, 0.6, 0.9], initialSnap: 0.6 },
      )
    } else if (qr.payload?.action === 'show_bills') {
      ctx.pushAssistantMessage(
        createMessage('assistant', [
          createTextBlock('Aquí tienes todas tus facturas pendientes:'),
          createWidgetBlock('payment-cta', {
            services: mockServices,
            totalAmount: 16600,
          }),
        ]),
      )
    }
  },
  onUserMessage: (text, ctx) => {
    if (
      text.toLowerCase().includes('pagar') ||
      text.toLowerCase().includes('factura')
    ) {
      ctx.pushAssistantMessage(
        createMessage('assistant', [
          createTextBlock(
            'Te ayudo a pagar tu factura. ¿Qué servicio quieres pagar?',
          ),
          createWidgetBlock('payment-cta', {
            services: mockServices,
            totalAmount: 16600,
          }),
        ]),
      )
    }
  },
}
