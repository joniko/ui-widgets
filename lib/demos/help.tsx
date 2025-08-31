import { DemoDefinition } from '../types'
import {
  createMessage,
  createTextBlock,
  createWidgetBlock,
} from '../agenticMocks'
import { Phone, MessageCircle, Mail } from 'lucide-react'

export const helpDemo: DemoDefinition = {
  slug: 'help',
  title: 'Ayuda Contextual',
  icon: '❓',
  initialMessages: [
    createMessage('assistant', [
      createTextBlock(
        '¡Hola! Soy tu asistente de ayuda. ¿En qué operación necesitas asistencia?',
      ),
      createWidgetBlock('info-card', {
        title: 'Operaciones Disponibles',
        operations: [
          'Transferencias',
          'Pago de servicios',
          'Consulta de saldos',
          'Historial de movimientos',
        ],
      }),
    ]),
  ],
  initialQuickReplies: [
    { id: '1', label: 'Cómo transferir', payload: { action: 'help_transfer' } },
    {
      id: '2',
      label: 'Cómo pagar servicios',
      payload: { action: 'help_payment' },
    },
    {
      id: '3',
      label: 'Contactar soporte',
      payload: { action: 'contact_support' },
    },
  ],
  onQuickReply: (qr, ctx) => {
    if (qr.payload?.action === 'help_transfer') {
      ctx.openSheet(
        <div className="p-6">
          <h3 className="mb-4 text-lg font-semibold">
            Cómo hacer una transferencia
          </h3>
          <div className="space-y-4">
            <div className="bg-primary/5 rounded-lg p-4">
              <h4 className="text-primary-foreground mb-2 font-medium">
                Paso 1: Selecciona tu cuenta
              </h4>
              <p className="text-primary-foreground/80 text-sm">
                Elige la cuenta desde la cual quieres transferir dinero
              </p>
            </div>
            <div className="bg-primary/5 rounded-lg p-4">
              <h4 className="text-primary-foreground mb-2 font-medium">
                Paso 2: Ingresa el monto
              </h4>
              <p className="text-primary-foreground/80 text-sm">
                Escribe la cantidad que deseas transferir
              </p>
            </div>
            <div className="bg-primary/5 rounded-lg p-4">
              <h4 className="text-primary-foreground mb-2 font-medium">
                Paso 3: Cuenta destino
              </h4>
              <p className="text-primary-foreground/80 text-sm">
                Ingresa el número de cuenta o CBU del destinatario
              </p>
            </div>
            <div className="bg-primary/5 rounded-lg p-4">
              <h4 className="text-primary-foreground mb-2 font-medium">
                Paso 4: Confirma
              </h4>
              <p className="text-primary-foreground/80 text-sm">
                Revisa los datos y confirma la operación
              </p>
            </div>
            <button className="bg-primary text-primary-foreground w-full rounded-lg py-3 font-medium">
              Entendido
            </button>
          </div>
        </div>,
        { snapPoints: [0.25, 0.7, 0.95], initialSnap: 0.7 },
      )
    } else if (qr.payload?.action === 'help_payment') {
      ctx.pushAssistantMessage(
        createMessage('assistant', [
          createTextBlock('Para pagar servicios, sigue estos pasos:'),
          createWidgetBlock('confirmation', {
            title: 'Pasos para pagar servicios',
            steps: [
              'Selecciona el servicio a pagar',
              'Elige tu cuenta de débito',
              'Confirma el monto',
              'Autoriza el pago',
            ],
          }),
        ]),
      )
    } else if (qr.payload?.action === 'contact_support') {
      ctx.openSheet(
        <div className="p-6">
          <h3 className="mb-4 text-lg font-semibold">Contactar Soporte</h3>
          <div className="space-y-4">
            <div className="text-center">
              <div className="bg-primary/10 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                <Phone className="h-6 w-6 text-indigo-600" />
              </div>
              <h4 className="mb-2 font-medium">Línea de Atención</h4>
              <p className="text-gray-600">0800-333-4444</p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <MessageCircle className="h-6 w-6 text-indigo-600" />
              </div>
              <h4 className="mb-2 font-medium">Chat en vivo</h4>
              <p className="text-gray-600">Disponible 24/7</p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-purple-100">
                <Mail className="h-6 w-6 text-indigo-600" />
              </div>
              <h4 className="mb-2 font-medium">Email</h4>
              <p className="text-gray-600">soporte@banco.com</p>
            </div>
          </div>
        </div>,
        { snapPoints: [0.3, 0.6, 0.9], initialSnap: 0.6 },
      )
    }
  },
  onUserMessage: (text, ctx) => {
    if (
      text.toLowerCase().includes('ayuda') ||
      text.toLowerCase().includes('cómo')
    ) {
      ctx.pushAssistantMessage(
        createMessage('assistant', [
          createTextBlock(
            'Te ayudo con eso. ¿Qué operación específica te gustaría aprender?',
          ),
          createWidgetBlock('confirmation', {
            title: 'Opciones de ayuda',
            options: [
              'Transferencias',
              'Pago de servicios',
              'Consulta de saldos',
              'Historial',
            ],
          }),
        ]),
      )
    }
  },
}
