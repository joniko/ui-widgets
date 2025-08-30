'use client'

import { DemoDefinition, DemoContext } from '../types'
import { createMessage, createTextBlock, createWidgetBlock } from '../agenticMocks'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeftIcon } from 'lucide-react'

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
      scale: 0.97,
      opacity: 0,
      y: 20
    },
    center: {
      scale: 1,
      opacity: 1,
      y: 0
    },
    exit: {
      scale: 1,
      opacity: 0,
      y: 10
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
        scale: { type: "tween", ease: "easeInOut", duration: 0.3 },
        opacity: { duration: 0.1 },
        y: { type: "tween", ease: "easeInOut", duration: 0.3 }
      }}
      className="flex flex-col"
    >
      <div className="px-0 py-4">
        <h2 className="text-xl font-semibold">Elegí el contacto</h2>
      </div>
      
      <div className="">
        {mockContacts.map((contact) => (
          <button
            key={contact.id}
            className="w-full px-0 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
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
      
      <div className="px-0 py-4">
        <Button variant="secondary" className="w-full" size="lg">
          Elegí desde tus contactos
        </Button>
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
        scale: { type: "tween", ease: "easeInOut", duration: 0.3 },
        opacity: { duration: 0.1 },
        y: { type: "tween", ease: "easeInOut", duration: 0.3 }
      }}
      className="flex flex-col"
    >
      <div className="flex flex-row px-0 py-4">
        <Button 
          variant="ghost"
          onClick={() => setCurrentStep('contacts')}
          className="p-2 mb-2 -ml-2 flex-shrink-0"
        >
          <ArrowLeftIcon className="w-4 h-4" />
        </Button>
        <h2 className="text-xl font-semibold">Seleccioná la cuenta para transferir</h2>
      </div>
      
      <div className="">
        <div className="p-0">
          <p className="text-sm text-gray-600 mt-1">{selectedContact?.name}</p>
        </div>
        {mockBankAccounts.map((account) => (
          <button
            key={account.id}
            className="w-full px-0 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
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
        scale: { type: "tween", ease: "easeInOut", duration: 0.3 },
        opacity: { duration: 0.1 },
        y: { type: "tween", ease: "easeInOut", duration: 0.3 }
      }}
      className="flex flex-col"
    >
      <div className="flex flex-row px-0 py-4">
        <Button 
          variant="ghost"
          onClick={() => setCurrentStep('accounts')}
          className="p-2 mb-2 -ml-2 flex-shrink-0"
        >
          <ArrowLeftIcon className="w-4 h-4" />
        </Button>
        <h2 className="text-xl font-semibold">Confirma la transferencia</h2>
      </div>
      
      <div className="px-0 py-0">
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
        
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Dinero en cuenta</span>
            <span className="text-gray-400">›</span>
          </div>
        </div>
      </div>
      
      <div className="px-0 py-4">
        <Button className="w-full" size="lg" variant="default"
  
          onClick={handleConfirm}
        >
          Confirmar transferencia
        </Button>
      </div>
    </motion.div>
  )

  return (
    <motion.div 
      className="flex flex-col relative overflow-hidden"
      layout
      transition={{ 
        layout: { duration: 0.3, ease: "easeInOut" }
      }}
    >
      <AnimatePresence mode="wait">
        {currentStep === 'contacts' && renderContactsStep()}
        {currentStep === 'accounts' && renderAccountsStep()}
        {currentStep === 'confirmation' && renderConfirmationStep()}
      </AnimatePresence>
    </motion.div>
  )
}

export const transferDemo: DemoDefinition = {
  slug: 'transfer',
  title: 'Transferencia de Dinero',
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
          ctx.openSheet(
            <TransferFlow monto={monto} ctx={ctx} />,
            { snapPoints: [0.4, 0.6, 0.9], initialSnap: 0.6 }
          )
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
          ctx.openSheet(
            <TransferFlow monto={monto} ctx={ctx} />,
            { snapPoints: [0.4, 0.6, 0.9], initialSnap: 0.6 }
          )
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