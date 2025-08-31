'use client'

import { FlowDefinition } from '../types'
import { FlowContainer } from '../components/FlowContainer'

import { SuccessAnimation } from '../components/SuccessAnimation'

// Types for transfer flow data
interface ContactData {
  id: string
  name: string
  avatar: string
  phone: string
}

interface AccountData {
  id: string
  name: string
  type: string
  number: string
  balance: number
}

// Mock data
const contacts = [
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

const accounts = [
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

export const transferFlow: FlowDefinition = {
  id: 'transfer',
  name: 'Transferencia',
  
  // Múltiples formas de disparar el flujo
  triggers: [
    'transferir',
    'enviar dinero',
    'mandar plata',
    /transferir?\s*(\d+)?\s*a?\s*(\w+)?/i
  ],
  
  steps: [
    {
      id: 'select-contact',
      title: 'Elegí el contacto',
      render: ({ onNext, onBack, isFirstStep }) => (
        <FlowContainer 
          title="Elegí el contacto"
          onBack={onBack}
          showBack={!isFirstStep}
        >
          <div className="space-y-2">
            {contacts.map(contact => (
              <button
                key={contact.id}
                onClick={() => onNext({ contact })}
                className="w-full p-4 flex items-center justify-between hover:bg-gray-50 rounded-lg transition-colors"
              >
                <div className="flex items-center gap-3">
                  <img 
                    src={contact.avatar} 
                    alt={contact.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="text-left">
                    <p className="font-medium">{contact.name}</p>
                    <div className="flex gap-1 mt-1">
                      {contact.banks.map((bank, idx) => (
                        <span key={idx} className="text-lg">{bank}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <span className="text-2xl">💙</span>
              </button>
            ))}
            
            <button className="w-full p-4 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors mt-4">
              Elegí desde tus contactos
            </button>
          </div>
        </FlowContainer>
      )
    },
    
    {
      id: 'enter-amount',
      title: 'Ingresá el monto',
      render: ({ data, onNext, onBack }) => {
        // Skip this step if amount was provided in the trigger
        if (data.amount) {
          onNext({ amount: data.amount as number })
          return null
        }
        
        return (
          <FlowContainer 
            title="Ingresá el monto"
            onBack={onBack}
            showBack={true}
          >
            <div className="py-4">
              <p className="text-gray-600 mb-4">
                Transferencia a {(data.contact as ContactData).name}
              </p>
              
              <input
                type="number"
                placeholder="$0"
                className="w-full text-4xl font-bold text-center p-4 outline-none"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && e.currentTarget.value) {
                    onNext({ amount: parseFloat(e.currentTarget.value) })
                  }
                }}
              />
              
              <div className="grid grid-cols-3 gap-2 mt-6">
                {[1000, 5000, 10000].map(amount => (
                  <button
                    key={amount}
                    onClick={() => onNext({ amount })}
                    className="p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    ${amount.toLocaleString()}
                  </button>
                ))}
              </div>
            </div>
          </FlowContainer>
        )
      }
    },
    
    {
      id: 'select-account',
      title: 'Seleccioná la cuenta para transferir',
      render: ({ data, onNext, onBack }) => (
        <FlowContainer 
          title="Seleccioná la cuenta para transferir"
          onBack={onBack}
          showBack={true}
        >
          <div className="space-y-3">
            <div className="mb-4">
              <p className="text-gray-600">{(data.contact as ContactData).name}</p>
            </div>
            
            {accounts.map(account => (
              <button
                key={account.id}
                onClick={() => onNext({ account })}
                className="w-full p-4 flex items-center gap-3 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <div className={`w-12 h-12 rounded-full ${account.color} flex items-center justify-center text-white`}>
                  <span className="text-2xl">{account.icon}</span>
                </div>
                <div className="text-left flex-1">
                  <p className="font-medium">{account.name}</p>
                  <p className="text-sm text-gray-600">{account.type} {account.number}</p>
                </div>
              </button>
            ))}
          </div>
        </FlowContainer>
      )
    },
    
    {
      id: 'confirm',
      title: 'Confirmá la transferencia',
      render: ({ data, onNext, onBack }) => (
        <FlowContainer 
          title="Confirmá la transferencia"
          onBack={onBack}
          showBack={true}
        >
          <div className="py-4">
            {/* Destinatario */}
            <div className="flex items-center gap-3 mb-6">
              <img 
                src={(data.contact as ContactData).avatar} 
                alt={(data.contact as ContactData).name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="font-medium">{(data.contact as ContactData).name}</p>
                <p className="text-sm text-gray-600">
                  {(data.account as AccountData).name} - {(data.account as AccountData).type}****{(data.account as AccountData).number.slice(-4)}
                </p>
              </div>
            </div>
            
            {/* Monto */}
            <div className="text-center py-8">
              <p className="text-5xl font-bold">
                <span className="text-2xl align-top">$</span>
                {(data.amount as number).toLocaleString()}
              </p>
            </div>
            
            {/* Tipo de dinero */}
            <button className="w-full p-4 bg-gray-50 rounded-lg flex items-center justify-between mb-6">
              <span className="text-gray-700">Dinero en cuenta</span>
              <span className="text-gray-400">›</span>
            </button>
            
            {/* Botón confirmar */}
            <button
              onClick={() => onNext()}
              className="w-full bg-indigo-600 text-white py-4 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
            >
              Confirmar transferencia
            </button>
          </div>
        </FlowContainer>
      )
    },
    
    {
      id: 'success',
      title: 'Transferencia exitosa',
      render: ({ data, onNext }) => (
        <SuccessAnimation
          title="¡Transferencia realizada!"
          message={`Se transfirieron $${(data.amount as number).toLocaleString()} a ${(data.contact as ContactData).name}`}
          onComplete={onNext}
        />
      )
    }
  ],
  
  onComplete: (data, ctx) => {
    // Aquí iría la lógica de completar la transferencia
    console.log('Transferencia completada:', data)
  }
}
