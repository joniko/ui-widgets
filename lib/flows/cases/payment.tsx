'use client'

import { FlowDefinition } from '../types'
import { FlowContainer } from '../components/FlowContainer'
import { SelectList } from '../components/SelectList'
import { Button } from '../components'
import { motion } from 'framer-motion'

// Types for payment flow data
interface ServiceData {
  id: string
  name: string
  type: string
  amount: number
  dueDate: string
  icon: string
  status: string
}

interface AccountData {
  id: string
  name: string
  balance: number
}

// Mock data
const services = [
  { 
    id: '1', 
    name: 'Edesur',
    type: 'Electricidad',
    amount: 8500,
    dueDate: '2024-01-15',
    icon: '💡',
    status: 'pending'
  },
  { 
    id: '2', 
    name: 'Metrogas',
    type: 'Gas',
    amount: 3200,
    dueDate: '2024-01-18',
    icon: '🔥',
    status: 'pending'
  },
  { 
    id: '3', 
    name: 'AySA',
    type: 'Agua',
    amount: 2100,
    dueDate: '2024-01-20',
    icon: '💧',
    status: 'pending'
  },
  { 
    id: '4', 
    name: 'Telecentro',
    type: 'Internet',
    amount: 12000,
    dueDate: '2024-01-10',
    icon: '📡',
    status: 'overdue'
  }
]

const accounts = [
  { id: '1', name: 'Cuenta Sueldo', balance: 125000 },
  { id: '2', name: 'Cuenta Ahorros', balance: 450000 }
]

export const paymentFlow: FlowDefinition = {
  id: 'payment',
  name: 'Pago de Servicios',
  
  triggers: [
    'quiero pagar',
    'pagar servicio',
    'pagar factura',
    'pagar luz',
    'pagar gas',
    'pagar agua',
    'pagar internet',
    /pagar?\s+(luz|gas|agua|internet|edesur|metrogas|aysa|telecentro)/i
  ],
  
  steps: [
    {
      id: 'select-service',
      title: 'Elegí el servicio',
      render: ({ onNext, onBack, isFirstStep }) => (
        <FlowContainer 
          title="Servicios pendientes"
          onBack={onBack}
          showBack={!isFirstStep}
        >
          <div className="py-4">
            {/* Resumen */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-orange-50 border border-orange-200 rounded-lg p-3 mb-4"
            >
              <p className="text-sm text-orange-800">
                Tenés {services.filter(s => s.status === 'overdue').length} facturas vencidas
              </p>
            </motion.div>
            
            {/* Lista de servicios */}
            <div className="space-y-3">
              {services.map((service, index) => (
                <motion.button
                  key={service.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => onNext({ service })}
                  className={`
                    w-full p-4 rounded-lg border transition-all
                    ${service.status === 'overdue' 
                      ? 'border-red-200 bg-red-50 hover:bg-red-100' 
                      : 'border-gray-200 bg-white hover:bg-gray-50'
                    }
                  `}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{service.icon}</span>
                      <div className="text-left">
                        <p className="font-medium">{service.name}</p>
                        <p className="text-sm text-gray-600">{service.type}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">${service.amount.toLocaleString()}</p>
                      <p className={`text-xs ${
                        service.status === 'overdue' ? 'text-red-600' : 'text-gray-500'
                      }`}>
                        Vence: {new Date(service.dueDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
            
            {/* Pagar todas */}
            <button className="w-full mt-4 p-3 text-indigo-600 font-medium hover:bg-indigo-50 rounded-lg transition-colors">
              Pagar todas las facturas
            </button>
          </div>
        </FlowContainer>
      )
    },
    
    {
      id: 'select-account',
      title: 'Elegí la cuenta',
      render: ({ data, onNext, onBack }) => (
        <FlowContainer 
          title="¿Desde qué cuenta?"
          onBack={onBack}
          showBack={true}
        >
          <div className="py-4">
            {/* Servicio seleccionado */}
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{(data.service as ServiceData).icon}</span>
                <div className="flex-1">
                  <p className="font-medium">{(data.service as ServiceData).name}</p>
                  <p className="text-sm text-gray-600">{(data.service as ServiceData).type}</p>
                </div>
                <p className="text-xl font-semibold">
                  ${(data.service as ServiceData).amount.toLocaleString()}
                </p>
              </div>
            </div>
            
            {/* Cuentas */}
            <SelectList
              items={accounts}
              keyExtractor={a => a.id}
              onSelect={(account) => onNext({ account })}
              renderItem={(account) => (
                <div className="flex-1">
                  <p className="font-medium">{account.name}</p>
                  <p className="text-sm text-gray-600">
                    Saldo: ${account.balance.toLocaleString()}
                  </p>
                </div>
              )}
            />
          </div>
        </FlowContainer>
      )
    },
    
    {
      id: 'confirm',
      title: 'Confirmá el pago',
      render: ({ data, onNext, onBack }) => (
        <FlowContainer 
          title="Confirmá el pago"
          onBack={onBack}
          showBack={true}
        >
          <div className="py-4">
            <div className="space-y-4">
              {/* Servicio */}
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-1">Servicio</p>
                <div className="flex items-center gap-2">
                  <span>{(data.service as ServiceData).icon}</span>
                  <p className="font-medium">{(data.service as ServiceData).name}</p>
                </div>
              </div>
              
              {/* Monto */}
              <div className="text-center py-6">
                <p className="text-4xl font-bold">
                  ${(data.service as ServiceData).amount.toLocaleString()}
                </p>
              </div>
              
              {/* Cuenta */}
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-1">Desde</p>
                <p className="font-medium">{(data.account as AccountData).name}</p>
                <p className="text-sm text-gray-500">
                  Saldo disponible: ${(data.account as AccountData).balance.toLocaleString()}
                </p>
              </div>
              
              {/* Fecha de pago */}
              <div className="bg-indigo-50 rounded-lg p-4">
                <p className="text-sm text-indigo-800">
                  Se pagará hoy {new Date().toLocaleDateString()}
                </p>
              </div>
            </div>
            
            <Button
              onClick={() => onNext()}
              className="w-full mt-6 py-3"
            >
              Confirmar pago
            </Button>
          </div>
        </FlowContainer>
      )
    }
  ],
  
  onComplete: (data, ctx) => {
    console.log('Pago completado:', data)
  }
}
