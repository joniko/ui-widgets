'use client'

import { FlowDefinition } from '../types'
import { FlowContainer } from '../components/FlowContainer'
import { motion } from 'framer-motion'

// Mock data
const accounts = [
  { 
    id: '1', 
    type: 'Cuenta Sueldo',
    number: '****1234',
    balance: 125000,
    currency: 'ARS',
    icon: '💳'
  },
  { 
    id: '2', 
    type: 'Cuenta Ahorros',
    number: '****5678',
    balance: 450000,
    currency: 'ARS',
    icon: '🏦'
  },
  { 
    id: '3', 
    type: 'Cuenta Dólares',
    number: '****9012',
    balance: 1200,
    currency: 'USD',
    icon: '💵'
  }
]

export const balanceFlow: FlowDefinition = {
  id: 'balance',
  name: 'Consulta de Saldo',
  
  triggers: [
    'saldo',
    'cuánto tengo',
    'cuanto tengo',
    'mis cuentas',
    'ver saldo',
    'consultar saldo',
    /cu[aá]nto\s+(tengo|dinero|plata)/i
  ],
  
  steps: [
    {
      id: 'show-balances',
      title: 'Tus cuentas',
      render: ({ onNext }) => (
        <FlowContainer title="Tus cuentas">
          <div className="p-4 space-y-4">
            {/* Saldo total */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-2xl p-6"
            >
              <p className="text-sm opacity-90 mb-1">Saldo total en pesos</p>
              <p className="text-3xl font-bold">
                ${(accounts
                  .filter(a => a.currency === 'ARS')
                  .reduce((sum, a) => sum + a.balance, 0)
                ).toLocaleString()}
              </p>
            </motion.div>
            
            {/* Lista de cuentas */}
            {accounts.map((account, index) => (
              <motion.div
                key={account.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 + 0.2 }}
                className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{account.icon}</span>
                    <div>
                      <p className="font-medium">{account.type}</p>
                      <p className="text-sm text-gray-500">{account.number}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-semibold">
                      {account.currency === 'USD' ? 'US$' : '$'}
                      {account.balance.toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-500">{account.currency}</p>
                  </div>
                </div>
              </motion.div>
            ))}
            
            {/* Acciones rápidas */}
            <div className="pt-4 space-y-2">
              <button
                onClick={() => onNext({ action: 'transfer' })}
                className="w-full p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-left flex items-center justify-between group"
              >
                <span>Hacer una transferencia</span>
                <span className="text-gray-400 group-hover:text-gray-600">→</span>
              </button>
              
              <button
                onClick={() => onNext({ action: 'movements' })}
                className="w-full p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-left flex items-center justify-between group"
              >
                <span>Ver movimientos</span>
                <span className="text-gray-400 group-hover:text-gray-600">→</span>
              </button>
            </div>
          </div>
        </FlowContainer>
      )
    }
  ],
  
  onComplete: (data, ctx) => {
    console.log('Balance consultado', data)
    // Si eligió una acción, podríamos disparar otro flujo
  }
}
