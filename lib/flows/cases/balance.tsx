'use client'

import { FlowDefinition } from '../types'
import { FlowContainer } from '../components/FlowContainer'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button as UIButton } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { WidgetComponentProps, createDomainWidgets } from '@/lib/widgets/registry'

// Types for balance widgets
interface BalanceAccount {
  id: string
  type: string
  number: string
  balance: number
  currency: string
  icon: string
}

interface BalanceSummaryProps {
  totalBalance: number
  accounts: BalanceAccount[]
}

interface BalanceAccountListProps {
  title?: string
  accounts: BalanceAccount[]
  totalBalance?: number
}

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
  
  onComplete: (data) => {
    console.log('Balance consultado', data)
    // Si eligió una acción, podríamos disparar otro flujo
  }
}

// ==========================================
// 🎯 BALANCE WIDGETS
// ==========================================

/**
 * Widget para mostrar resumen de saldos
 */
export const BalanceSummary = ({ widget, openSheet }: WidgetComponentProps) => {
  const props = widget.props as unknown as BalanceSummaryProps
  
  return (
    <Card 
      className="w-full max-w-sm rounded-2xl border-none"
      style={{
        background: 'var(--antimetal-com-nero-80, rgba(255, 255, 255, 0.80))',
        boxShadow: '0 0 0 1px rgba(14, 63, 126, 0.04), 0 1px 1px -0.5px rgba(42, 51, 69, 0.04), 0 3px 3px -1.5px rgba(42, 51, 70, 0.04), 0 6px 6px -3px rgba(42, 51, 70, 0.04), 0 12px 12px -6px rgba(14, 63, 126, 0.04), 0 24px 24px -12px rgba(14, 63, 126, 0.04)'
      }}
    >
      <CardContent className="p-4">
        <div className="space-y-4">
          {/* Saldo total destacado */}
          <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-xl p-4">
            <p className="text-sm opacity-90 mb-1">Saldo total</p>
            <p className="text-2xl font-bold">
              ${props.totalBalance.toLocaleString()}
            </p>
            <p className="text-xs opacity-75 mt-1">ARS • Pesos argentinos</p>
          </div>
          
          {/* Acciones rápidas */}
          <div className="grid grid-cols-2 gap-2">
            <UIButton 
              variant="outline" 
              size="sm"
              onClick={() => openSheet(
                <BalanceDetailBottomSheet accounts={props.accounts} />
              )}
            >
              Ver detalle
            </UIButton>
            <UIButton 
              variant="outline" 
              size="sm"
              onClick={() => openSheet(
                <BalanceActionsBottomSheet />
              )}
            >
              Acciones
            </UIButton>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

/**
 * Widget para mostrar lista detallada de cuentas
 */
export const BalanceAccountList = ({ widget, openSheet }: WidgetComponentProps) => {
  const props = widget.props as unknown as BalanceAccountListProps
  
  return (
    <Card 
      className="w-full max-w-sm rounded-2xl border-none"
      style={{
        background: 'var(--antimetal-com-nero-80, rgba(255, 255, 255, 0.80))',
        boxShadow: '0 0 0 1px rgba(14, 63, 126, 0.04), 0 1px 1px -0.5px rgba(42, 51, 69, 0.04), 0 3px 3px -1.5px rgba(42, 51, 70, 0.04), 0 6px 6px -3px rgba(42, 51, 70, 0.04), 0 12px 12px -6px rgba(14, 63, 126, 0.04), 0 24px 24px -12px rgba(14, 63, 126, 0.04)'
      }}
    >
      <CardHeader className="p-4 pb-3">
        <div className="flex items-center gap-2">
          <div className="text-xl">💰</div>
          <CardTitle className="text-base font-semibold">{props.title || 'Tus Cuentas'}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <div className="space-y-3">
          {props.accounts.map((account) => (
            <div 
              key={account.id} 
              className="p-3 rounded-lg border border-gray-200 bg-white cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => openSheet(
                <BalanceAccountBottomSheet account={account} />
              )}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <span className="text-lg">{account.icon || '💳'}</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">{account.type}</h4>
                  <p className="text-sm text-gray-600">{account.number}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">
                    {account.currency === 'USD' ? 'US$' : '$'}
                    {account.balance.toLocaleString()}
                  </p>
                  <Badge variant="outline" className="text-xs">
                    {account.currency}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
          
          {props.totalBalance && (
            <div className="pt-3 mt-3 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-600">Total en pesos:</span>
                <span className="text-lg font-bold text-gray-900">
                  ${props.totalBalance.toLocaleString()}
                </span>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

/**
 * Widget CTA para acciones de balance
 */
export const BalanceActions = ({ widget, openSheet }: WidgetComponentProps) => {
  const _props = widget.props
  
  return (
    <Card 
      className="w-full max-w-sm rounded-2xl border-none"
      style={{
        background: 'var(--antimetal-com-nero-80, rgba(255, 255, 255, 0.80))',
        boxShadow: '0 0 0 1px rgba(14, 63, 126, 0.04), 0 1px 1px -0.5px rgba(42, 51, 69, 0.04), 0 3px 3px -1.5px rgba(42, 51, 70, 0.04), 0 6px 6px -3px rgba(42, 51, 70, 0.04), 0 12px 12px -6px rgba(14, 63, 126, 0.04), 0 24px 24px -12px rgba(14, 63, 126, 0.04)'
      }}
    >
      <CardContent className="p-4">
        <div className="text-center space-y-3">
          <div className="text-2xl">📊</div>
          <div>
            <h3 className="font-semibold">Gestionar Dinero</h3>
            <p className="text-sm text-muted-foreground">
              Transferir, invertir o consultar movimientos
            </p>
          </div>
          <UIButton 
            className="w-full"
            onClick={() => openSheet(
              <BalanceActionsBottomSheet />
            )}
          >
            Ver Opciones
          </UIButton>
        </div>
      </CardContent>
    </Card>
  )
}

// ==========================================
// 🎯 BALANCE BOTTOMSHEETS
// ==========================================

/**
 * BottomSheet para detalle completo de cuentas
 */
export const BalanceDetailBottomSheet = ({ accounts }: { accounts: BalanceAccount[] }) => (
  <div className="p-6">
    <h3 className="text-lg font-semibold mb-4">Detalle de Cuentas</h3>
    
    <div className="space-y-4">
      {/* Resumen total */}
      <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-xl p-4">
        <p className="text-sm opacity-90 mb-1">Patrimonio total</p>
        <p className="text-3xl font-bold">
          ${accounts?.reduce((sum, acc) => {
            return sum + (acc.currency === 'ARS' ? acc.balance : acc.balance * 1000) // Mock conversion
          }, 0).toLocaleString()}
        </p>
        <p className="text-xs opacity-75 mt-1">Equivalente en pesos argentinos</p>
      </div>
      
      {/* Lista detallada */}
      <div className="space-y-3">
        {accounts?.map((account) => (
          <div key={account.id} className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xl">{account.icon}</span>
              <div className="flex-1">
                <h4 className="font-semibold">{account.type}</h4>
                <p className="text-sm text-gray-600">{account.number}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xl font-bold">
                {account.currency === 'USD' ? 'US$' : '$'}
                {account.balance.toLocaleString()}
              </p>
              <p className="text-xs text-gray-500">{account.currency}</p>
            </div>
          </div>
        ))}
      </div>
      
      <UIButton className="w-full mt-4">
        Exportar Resumen
      </UIButton>
    </div>
  </div>
)

/**
 * BottomSheet para acciones disponibles
 */
export const BalanceActionsBottomSheet = () => (
  <div className="p-6">
    <h3 className="text-lg font-semibold mb-4">¿Qué querés hacer?</h3>
    
    <div className="space-y-3">
      <UIButton variant="outline" className="w-full justify-start h-16">
        <div className="flex items-center gap-3">
          <span className="text-2xl">💸</span>
          <div className="text-left">
            <p className="font-medium">Transferir dinero</p>
            <p className="text-sm text-gray-600">Enviar a contactos o CBU/CVU</p>
          </div>
        </div>
      </UIButton>
      
      <UIButton variant="outline" className="w-full justify-start h-16">
        <div className="flex items-center gap-3">
          <span className="text-2xl">📋</span>
          <div className="text-left">
            <p className="font-medium">Ver movimientos</p>
            <p className="text-sm text-gray-600">Historial de transacciones</p>
          </div>
        </div>
      </UIButton>
      
      <UIButton variant="outline" className="w-full justify-start h-16">
        <div className="flex items-center gap-3">
          <span className="text-2xl">💳</span>
          <div className="text-left">
            <p className="font-medium">Pagar servicios</p>
            <p className="text-sm text-gray-600">Luz, gas, agua, internet</p>
          </div>
        </div>
      </UIButton>
      
      <UIButton variant="outline" className="w-full justify-start h-16">
        <div className="flex items-center gap-3">
          <span className="text-2xl">📈</span>
          <div className="text-left">
            <p className="font-medium">Invertir</p>
            <p className="text-sm text-gray-600">Plazo fijo, fondos, acciones</p>
          </div>
        </div>
      </UIButton>
    </div>
  </div>
)

/**
 * BottomSheet para detalles de una cuenta específica
 */
export const BalanceAccountBottomSheet = ({ account }: { account: BalanceAccount }) => (
  <div className="p-6">
    <div className="flex items-center gap-3 mb-4">
      <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
        <span className="text-xl">{account.icon}</span>
      </div>
      <div>
        <h3 className="text-lg font-semibold">{account.type}</h3>
        <p className="text-sm text-gray-600">{account.number}</p>
      </div>
    </div>
    
    <div className="space-y-4">
      {/* Saldo principal */}
      <div className="bg-gray-50 rounded-lg p-4 text-center">
        <p className="text-sm text-gray-600 mb-1">Saldo disponible</p>
        <p className="text-3xl font-bold">
          {account.currency === 'USD' ? 'US$' : '$'}
          {account.balance.toLocaleString()}
        </p>
        <Badge variant="outline" className="mt-2">
          {account.currency}
        </Badge>
      </div>
      
      {/* Información adicional */}
      <div className="grid grid-cols-2 gap-4 text-center">
        <div className="bg-green-50 rounded-lg p-3">
          <p className="text-xs text-green-600 mb-1">Ingresos del mes</p>
          <p className="font-semibold text-green-700">+$45,000</p>
        </div>
        <div className="bg-red-50 rounded-lg p-3">
          <p className="text-xs text-red-600 mb-1">Gastos del mes</p>
          <p className="font-semibold text-red-700">-$32,000</p>
        </div>
      </div>
      
      {/* Acciones */}
      <div className="space-y-2 pt-2">
        <UIButton className="w-full">Transferir desde esta cuenta</UIButton>
        <UIButton variant="outline" className="w-full">Ver movimientos</UIButton>
        <UIButton variant="outline" className="w-full">Generar CBU/CVU</UIButton>
      </div>
    </div>
  </div>
)

// ==========================================
// 🎯 WIDGET REGISTRY
// ==========================================

export const balanceWidgets = createDomainWidgets({
  'balance-summary': BalanceSummary,
  'balance-account-list': BalanceAccountList,
  'balance-actions': BalanceActions,
})
