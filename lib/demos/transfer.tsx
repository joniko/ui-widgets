import { DemoDefinition } from '../types'
import { createMessage, createTextBlock, createWidgetBlock } from '../agenticMocks'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

// Mock de contactos
const mockContacts = [
  {
    id: '1',
    name: 'Mauro González',
    avatar: '/avatars/mauro1.jpg',
    banks: ['🇦🇷', '🇧🇷']
  },
  {
    id: '2', 
    name: 'Mauro Vera',
    avatar: '/avatars/mauro2.jpg',
    banks: ['🇦🇷']
  },
  {
    id: '3',
    name: 'Mauro Ariel Fernández',
    avatar: '/avatars/mauro3.jpg',
    banks: ['🇧🇷']
  }
]

// Mock de cuentas
const mockBankAccounts = [
  {
    id: '1',
    name: 'Mercado Pago',
    type: 'CVU',
    number: '0000003100090418135201',
    icon: '💳',
    color: 'bg-yellow-400'
  },
  {
    id: '2',
    name: 'Banco Santander',
    type: 'CBU',
    number: '0081590966990418138814',
    icon: '🏦',
    color: 'bg-red-500'
  }
]

export const transferDemo: DemoDefinition = {
  slug: 'transfer',
  title: 'Transferencia de Dinero',
  description: 'Gestiona transferencias entre cuentas y a terceros',
  icon: '💸',
  initialMessages: [
    createMessage('assistant', [
      createTextBlock('¿En qué te ayudo hoy?')
    ])
  ],
  initialQuickReplies: [
    { 
      id: 'transfer', 
      label: 'Transferir dinero',
      icon: '🔄'
    },
    { 
      id: 'recharge', 
      label: 'Recargar celular',
      icon: '📱'
    },
    { 
      id: 'pay-services', 
      label: 'Pagar facturas y servicios',
      icon: '📄'
    }
  ],
  onQuickReply: (qr, ctx) => {
    if (qr.id === 'transfer') {
      // Simular que el usuario escribió un mensaje
      ctx.pushUserMessage('Quiero transferir dinero')
      
      setTimeout(() => {
        ctx.pushAssistantMessage(
          createMessage('assistant', [
            createTextBlock('Perfecto, te ayudo con la transferencia. ¿A quién le quieres transferir y cuánto?')
          ])
        )
      }, 1000)
    }
  },
  onUserMessage: (text, ctx) => {
    // Detectar si el mensaje incluye "transferir" y "Mauro"
    if (text.toLowerCase().includes('transferir') && text.toLowerCase().includes('mauro')) {
      // Extraer el monto del mensaje
      const montoMatch = text.match(/(\d+)/);
      const monto = montoMatch ? parseInt(montoMatch[1]) : 160500;
      
      // Guardar el monto en el contexto
      const transferData = { monto, destinatario: 'Mauro' };
      
      setTimeout(() => {
        ctx.pushAssistantMessage(
          createMessage('assistant', [
            createTextBlock('Tenes tres contactos con ese nombre. ¿A cuál te referís?')
          ])
        )
        
        // Abrir el bottom sheet con la lista de contactos
        setTimeout(() => {
          ctx.openSheet(
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="px-6 py-4 border-b">
                <h2 className="text-xl font-semibold">Elegí el contacto</h2>
              </div>
              
              {/* Lista de contactos */}
              <div className="flex-1 overflow-auto">
                {mockContacts.map((contact) => (
                  <button
                    key={contact.id}
                    className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                    onClick={() => {
                      // Cerrar el sheet actual
                      ctx.closeSheet?.();
                      
                      // Abrir el siguiente sheet para seleccionar cuenta
                      setTimeout(() => {
                        ctx.openSheet(
                          <div className="flex flex-col h-full">
                            {/* Header */}
                            <div className="px-6 py-4 border-b">
                              <h2 className="text-xl font-semibold">Seleccioná la cuenta para transferir</h2>
                              <p className="text-sm text-gray-600 mt-1">{contact.name}</p>
                            </div>
                            
                            {/* Lista de cuentas */}
                            <div className="flex-1 overflow-auto">
                              {mockBankAccounts.map((account) => (
                                <button
                                  key={account.id}
                                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                                  onClick={() => {
                                    // Cerrar el sheet actual
                                    ctx.closeSheet?.();
                                    
                                    // Abrir el sheet de confirmación
                                    setTimeout(() => {
                                      ctx.openSheet(
                                        <div className="flex flex-col h-full">
                                          {/* Header */}
                                          <div className="px-6 py-4 border-b">
                                            <h2 className="text-xl font-semibold">Confirma la transferencia</h2>
                                          </div>
                                          
                                          {/* Contenido */}
                                          <div className="flex-1 px-6 py-6">
                                            {/* Destinatario */}
                                            <div className="flex items-center gap-4 mb-6">
                                              <Avatar className="w-12 h-12">
                                                <AvatarImage src={contact.avatar} />
                                                <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                                              </Avatar>
                                              <div>
                                                <p className="font-medium">{contact.name}</p>
                                                <p className="text-sm text-gray-600">{account.name} - {account.type}****{account.number.slice(-4)}</p>
                                              </div>
                                            </div>
                                            
                                            {/* Monto */}
                                            <div className="text-center py-8">
                                              <p className="text-4xl font-bold">${monto.toLocaleString()}</p>
                                            </div>
                                            
                                            {/* Detalles */}
                                            <div className="bg-gray-50 rounded-lg p-4 mb-6">
                                              <div className="flex justify-between items-center">
                                                <span className="text-gray-600">Dinero en cuenta</span>
                                                <span className="text-gray-400">›</span>
                                              </div>
                                            </div>
                                          </div>
                                          
                                          {/* Botón de confirmación */}
                                          <div className="px-6 pb-6">
                                            <Button 
                                              className="w-full bg-primary hover:bg-primary/90 text-white py-3 rounded-xl text-lg font-medium"
                                              onClick={() => {
                                                // Cerrar el sheet
                                                ctx.closeSheet?.();
                                                
                                                // Enviar mensaje de confirmación
                                                setTimeout(() => {
                                                  ctx.pushUserMessage('Confirmar transferencia');
                                                  
                                                  // Respuesta del asistente
                                                  setTimeout(() => {
                                                    ctx.pushAssistantMessage(
                                                      createMessage('assistant', [
                                                        createTextBlock('¡Listo! La transferencia fue realizada'),
                                                        createWidgetBlock('confirmation', {
                                                          type: 'success',
                                                          title: '¡Transferencia realizada!',
                                                          recipient: contact.name,
                                                          account: `${account.name} - ${account.type}****${account.number.slice(-4)}`,
                                                          amount: monto,
                                                          accountType: 'Con dinero en cuenta',
                                                          showReceipt: true
                                                        })
                                                      ])
                                                    )
                                                  }, 1000)
                                                }, 500)
                                              }}
                                            >
                                              Confirmar transferencia
                                            </Button>
                                          </div>
                                        </div>
                                      )
                                    }, 300)
                                  }}
                                >
                                  {/* Icono de la cuenta */}
                                  <div className="flex items-center gap-4">
                                    <div className={`w-12 h-12 rounded-full ${account.color} flex items-center justify-center text-white`}>
                                      <span className="text-2xl">{account.icon}</span>
                                    </div>
                                    <div className="text-left">
                                      <p className="font-medium">{account.name}</p>
                                      <p className="text-sm text-gray-600">{account.type} {account.number}</p>
                                    </div>
                                  </div>
                                </button>
                              ))}
                            </div>
                          </div>
                        )
                      }, 300)
                    }}
                  >
                    {/* Avatar y nombre */}
                    <div className="flex items-center gap-4">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={contact.avatar} />
                        <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="text-left">
                        <p className="font-medium">{contact.name}</p>
                        <div className="flex gap-2 mt-1">
                          {contact.banks.map((bank, index) => (
                            <span key={index} className="text-lg">{bank}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    {/* Corazón */}
                    <span className="text-2xl text-primary">💙</span>
                  </button>
                ))}
              </div>
              
              {/* Footer */}
              <div className="px-6 py-4 border-t">
                <button className="w-full text-primary font-medium">
                  Elegí desde tus contactos
                </button>
              </div>
            </div>
          )
        }, 500)
      }, 1000)
    } else if (text.toLowerCase().includes('transferir')) {
      // Respuesta genérica para transferencias
      ctx.pushAssistantMessage(
        createMessage('assistant', [
          createTextBlock('Te ayudo con la transferencia. ¿A quién le quieres transferir y cuánto?')
        ])
      )
    } else {
      // Respuesta genérica
      ctx.pushAssistantMessage(
        createMessage('assistant', [
          createTextBlock('¿En qué más puedo ayudarte?')
        ])
      )
    }
  }
}