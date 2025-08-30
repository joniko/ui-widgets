'use client'

import { DemoDefinition, DemoContext } from '../types'
import { createMessage, createTextBlock, createWidgetBlock } from '../agenticMocks'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

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

// Componente para manejar el flujo de transferencia con transiciones
const TransferFlow = ({ monto, ctx }: { monto: number, ctx: DemoContext }) => {
  const [currentStep, setCurrentStep] = useState<'contacts' | 'accounts' | 'confirmation'>('contacts')
  const [selectedContact, setSelectedContact] = useState<typeof mockContacts[0] | null>(null)
  const [selectedAccount, setSelectedAccount] = useState<typeof mockBankAccounts[0] | null>(null)

  const scaleVariants = {
    enter: {
      scale: 0.95,
      opacity: 0
    },
    center: {
      scale: 1,
      opacity: 1
    },
    exit: {
      scale: 0.95,
      opacity: 0
    }
  }

  const handleContactSelect = (contact: typeof mockContacts[0]) => {
    setSelectedContact(contact)
    setCurrentStep('accounts')
  }

  const handleAccountSelect = (account: typeof mockBankAccounts[0]) => {
    setSelectedAccount(account)
    setCurrentStep('confirmation')
  }

  const handleConfirm = () => {
    if (!selectedContact || !selectedAccount) return
    
    ctx.closeSheet?.()
    
    setTimeout(() => {
      ctx.pushUserMessage('Confirmar transferencia')
      
      setTimeout(() => {
        ctx.pushAssistantMessage(
          createMessage('assistant', [
            createTextBlock('¡Listo! La transferencia fue realizada'),
            createWidgetBlock('confirmation', {
              type: 'success',
              title: '¡Transferencia realizada!',
              recipient: selectedContact.name,
              account: `${selectedAccount.name} - ${selectedAccount.type}****${selectedAccount.number.slice(-4)}`,
              amount: monto,
              accountType: 'Con dinero en cuenta',
              showReceipt: true
            })
          ])
        )
      }, 1000)
    }, 500)
  }

  const renderContactsStep = () => (
    <motion.div
      key="contacts"
      variants={scaleVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{
        scale: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.15 }
      }}
      className="flex flex-col h-full"
    >
      <div className="px-6 py-4 border-b">
        <h2 className="text-xl font-semibold">Elegí el contacto</h2>
      </div>
      
      <div className="flex-1 overflow-auto">
        {mockContacts.map((contact) => (
          <button
            key={contact.id}
            className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
            onClick={() => handleContactSelect(contact)}
          >
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
            <span className="text-2xl text-primary">💙</span>
          </button>
        ))}
      </div>
      
      <div className="px-6 py-4 border-t">
        <button className="w-full text-primary font-medium">
          Elegí desde tus contactos
        </button>
      </div>
    </motion.div>
  )

  const renderAccountsStep = () => (
    <motion.div
      key="accounts"
      variants={scaleVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{
        scale: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.15 }
      }}
      className="flex flex-col h-full"
    >
      <div className="px-6 py-4 border-b">
        <button 
          onClick={() => setCurrentStep('contacts')}
          className="text-primary hover:underline text-sm mb-2"
        >
          ← Volver
        </button>
        <h2 className="text-xl font-semibold">Seleccioná la cuenta para transferir</h2>
        <p className="text-sm text-gray-600 mt-1">{selectedContact?.name}</p>
      </div>
      
      <div className="flex-1 overflow-auto">
        {mockBankAccounts.map((account) => (
          <button
            key={account.id}
            className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
            onClick={() => handleAccountSelect(account)}
          >
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
    </motion.div>
  )

  const renderConfirmationStep = () => (
    <motion.div
      key="confirmation"
      variants={scaleVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{
        scale: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.15 }
      }}
      className="flex flex-col h-full"
    >
      <div className="px-6 py-4 border-b">
        <button 
          onClick={() => setCurrentStep('accounts')}
          className="text-primary hover:underline text-sm mb-2"
        >
          ← Volver
        </button>
        <h2 className="text-xl font-semibold">Confirma la transferencia</h2>
      </div>
      
      <div className="flex-1 px-6 py-6">
        <div className="flex items-center gap-4 mb-6">
          <Avatar className="w-12 h-12">
            <AvatarImage src={selectedContact?.avatar} />
            <AvatarFallback>{selectedContact?.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{selectedContact?.name}</p>
            <p className="text-sm text-gray-600">{selectedAccount?.name} - {selectedAccount?.type}****{selectedAccount?.number.slice(-4)}</p>
          </div>
        </div>
        
        <div className="text-center py-8">
          <p className="text-4xl font-bold">${monto.toLocaleString()}</p>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Dinero en cuenta</span>
            <span className="text-gray-400">›</span>
          </div>
        </div>
      </div>
      
      <div className="px-6 pb-6">
        <Button 
          className="w-full bg-primary hover:bg-primary/90 text-white py-3 rounded-xl text-lg font-medium"
          onClick={handleConfirm}
        >
          Confirmar transferencia
        </Button>
      </div>
    </motion.div>
  )

  return (
    <div className="flex flex-col h-full relative overflow-hidden">
      <AnimatePresence mode="wait">
        {currentStep === 'contacts' && renderContactsStep()}
        {currentStep === 'accounts' && renderAccountsStep()}
        {currentStep === 'confirmation' && renderConfirmationStep()}
      </AnimatePresence>
    </div>
  )
}

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
    } else if (qr.id === 'recharge') {
      ctx.pushUserMessage('Quiero recargar mi celular')
      setTimeout(() => {
        ctx.pushAssistantMessage(
          createMessage('assistant', [
            createTextBlock('Te ayudo con la recarga. ¿Cuál es tu número de teléfono?')
          ])
        )
      }, 1000)
    } else if (qr.id === 'pay-services') {
      ctx.pushUserMessage('Quiero pagar facturas y servicios')
      setTimeout(() => {
        ctx.pushAssistantMessage(
          createMessage('assistant', [
            createTextBlock('Perfecto, te muestro tus servicios pendientes.')
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
      
      // Extraer el monto del mensaje (variable usada en el componente TransferFlow)
      
      setTimeout(() => {
        ctx.pushAssistantMessage(
          createMessage('assistant', [
            createTextBlock('Tenes tres contactos con ese nombre. ¿A cuál te referís?')
          ])
        )
        
        // Abrir el bottom sheet con el flujo de transferencia
        setTimeout(() => {
          ctx.openSheet(<TransferFlow monto={monto} ctx={ctx} />)
        }, 500)
      }, 1000)
    } else if (text.toLowerCase().includes('transferir')) {
      // Respuesta genérica para transferencias
      setTimeout(() => {
        ctx.pushAssistantMessage(
          createMessage('assistant', [
            createTextBlock('Te ayudo con la transferencia. ¿A quién le quieres transferir y cuánto?')
          ])
        )
      }, 1000)
    } else if (text.toLowerCase().includes('mauro')) {
      // Si menciona Mauro sin transferir, asumir transferencia
      const montoMatch = text.match(/(\d+)/);
      const monto = montoMatch ? parseInt(montoMatch[1]) : 160500;
      
      setTimeout(() => {
        ctx.pushAssistantMessage(
          createMessage('assistant', [
            createTextBlock('Tenes tres contactos con ese nombre. ¿A cuál te referís?')
          ])
        )
        
        // Abrir el bottom sheet con el flujo de transferencia
        setTimeout(() => {
          ctx.openSheet(<TransferFlow monto={monto} ctx={ctx} />)
        }, 500)
      }, 1000)
    } else {
      // Respuesta genérica
      setTimeout(() => {
        ctx.pushAssistantMessage(
          createMessage('assistant', [
            createTextBlock('¿En qué más puedo ayudarte?')
          ])
        )
      }, 1000)
    }
  }
}