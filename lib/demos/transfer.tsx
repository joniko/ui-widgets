'use client'

import { DemoDefinition, DemoContext } from '../types'
import { createMessage, createTextBlock, createWidgetBlock } from '../agenticMocks'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useState } from 'react'
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'
import { ArrowLeftIcon } from 'lucide-react'

// Sistema de animaciones optimizado
const ANIMATION = {
  // Duraciones consistentes
  duration: {
    instant: 0.1,
    fast: 0.15,
    normal: 0.2,
    slow: 0.3
  },
  // Cubic bezier curves optimizadas
  ease: {
    smooth: [0.32, 0.72, 0, 1],     // iOS-style easeOut
    sharp: [0.12, 0, 0.39, 0],      // Entrada rápida
    bounce: [0.68, -0.6, 0.32, 1.6] // Sutil rebote
  }
}

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
    icon: 'credit-card',
    color: 'bg-yellow-400'
  },
  {
    id: '2',
    name: 'Banco Santander',
    type: 'CBU',
    number: '0081590966990418138814',
    icon: 'building',
    color: 'bg-red-500'
  }
]

// Componente para manejar el flujo de transferencia con transiciones
const TransferFlow = ({ monto, ctx }: { monto: number, ctx: DemoContext }) => {
  const [currentStep, setCurrentStep] = useState<'contacts' | 'accounts' | 'confirmation'>('contacts')
  const [selectedContact, setSelectedContact] = useState<typeof mockContacts[0] | null>(null)
  const [selectedAccount, setSelectedAccount] = useState<typeof mockBankAccounts[0] | null>(null)
  const [direction, setDirection] = useState(0)

  // Variantes optimizadas para performance
  const pageVariants = {
    enter: (direction: number) => ({
      y: direction > 0 ? 30 : -10,
      opacity: 0,
      scale: 0.98
    }),
    center: {
      y: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction: number) => ({
      y: direction < 0 ? 30 : -10,
      opacity: 0,
      scale: 0.98
    })
  }
  
  // Transición separada para mejor control
  const pageTransition = {
    y: { 
      type: "tween" as const, 
      duration: ANIMATION.duration.fast,
      ease: ANIMATION.ease.smooth as [number, number, number, number]
    },
    opacity: { 
      duration: ANIMATION.duration.instant 
    },
    scale: { 
      duration: ANIMATION.duration.fast,
      ease: ANIMATION.ease.smooth as [number, number, number, number]
    }
  }

  const handleContactSelect = (contact: typeof mockContacts[0]) => {
    setSelectedContact(contact)
    setDirection(1)
    setCurrentStep('accounts')
  }

  const handleAccountSelect = (account: typeof mockBankAccounts[0]) => {
    setSelectedAccount(account)
    setDirection(1)
    setCurrentStep('confirmation')
  }
  
  const handleBack = (target: 'contacts' | 'accounts') => {
    setDirection(-1)
    setCurrentStep(target)
  }

  const handleConfirm = () => {
    if (!selectedContact || !selectedAccount) return
    
    ctx.closeSheet?.()
    
    setTimeout(() => {
      ctx.pushUIMessage('Confirmar transferencia')
      
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
      custom={direction}
      variants={pageVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={pageTransition}
      className="flex flex-col"
    >
      <motion.div className="px-0 py-4" layoutId="header">
        <h2 className="text-xl font-semibold">
          Elegí el contacto
        </h2>
      </motion.div>
      
      <div className="">
        {mockContacts.map((contact) => (
          <motion.button
            key={contact.id}
            className="w-full px-0 py-4 flex items-center justify-between hover:bg-gray-50"
            onClick={() => handleContactSelect(contact)}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: ANIMATION.duration.instant }}
          >
            <div className="flex items-center gap-4">
              <motion.div layoutId={`avatar-${contact.id}`}>
                <Avatar className="w-12 h-12">
                  <AvatarImage src={contact.avatar} />
                  <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                </Avatar>
              </motion.div>
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
          </motion.button>
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
      custom={direction}
      variants={pageVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={pageTransition}
      className="flex flex-col"
    >
      <motion.div className="flex flex-row px-0 py-4" layoutId="header">
        <Button 
          variant="ghost"
          onClick={() => handleBack('contacts')}
          className="p-2 mb-2 -ml-2 flex-shrink-0"
        >
          <ArrowLeftIcon className="w-4 h-4" />
        </Button>
        <h2 className="text-xl font-semibold">
          Seleccioná la cuenta para transferir
        </h2>
      </motion.div>
      
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
      custom={direction}
      variants={pageVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={pageTransition}
      className="flex flex-col"
    >
      <motion.div className="flex flex-row px-0 py-4" layoutId="header">
        <Button 
          variant="ghost"
          onClick={() => handleBack('accounts')}
          className="p-2 mb-2 -ml-2 flex-shrink-0"
        >
          <ArrowLeftIcon className="w-4 h-4" />
        </Button>
        <h2 className="text-xl font-semibold">
          Confirma la transferencia
        </h2>
      </motion.div>
      
      <div className="px-0 py-0">
        <div className="flex items-center gap-4 mb-6">
          <motion.div layoutId={`avatar-${selectedContact?.id}`}>
            <Avatar className="w-12 h-12">
              <AvatarImage src={selectedContact?.avatar} />
              <AvatarFallback>{selectedContact?.name.charAt(0)}</AvatarFallback>
            </Avatar>
          </motion.div>
          <div>
            <p className="font-medium">{selectedContact?.name}</p>
            <p className="text-sm text-gray-600">{selectedAccount?.name} - {selectedAccount?.type}****{selectedAccount?.number.slice(-4)}</p>
          </div>
        </div>
        
        <motion.div className="text-center py-8" layoutId="amount">
          <p className="text-4xl font-bold">${monto.toLocaleString()}</p>
        </motion.div>
        
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
        layout: { 
          duration: ANIMATION.duration.normal,
          ease: ANIMATION.ease.smooth as [number, number, number, number]
        }
      }}
      style={{
        willChange: 'transform',
        backfaceVisibility: 'hidden',
        perspective: 1000
      }}
    >
      <LayoutGroup>
        <AnimatePresence mode="wait" custom={direction}>
          {currentStep === 'contacts' && renderContactsStep()}
          {currentStep === 'accounts' && renderAccountsStep()}
          {currentStep === 'confirmation' && renderConfirmationStep()}
        </AnimatePresence>
      </LayoutGroup>
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
      label: 'Transferir dinero'
      // No icon - will use getQuickReplyIcon
    },
    { 
      id: 'recharge', 
      label: 'Recargar celular'
      // No icon - will use getQuickReplyIcon
    },
    { 
      id: 'pay-services', 
      label: 'Pagar facturas y servicios'
      // No icon - will use getQuickReplyIcon
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