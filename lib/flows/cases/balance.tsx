'use client'

import { FlowDefinition } from '../types'
import { FlowContainer } from '../components/FlowContainer'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button as UIButton } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  WidgetComponentProps,
  createDomainWidgets,
} from '@/lib/widgets/registry'
import {
  CreditCard,
  Building2,
  DollarSign,
  BarChart3,
  Send,
  FileText,
  TrendingUp,
  ArrowRight,
  Wallet,
} from 'lucide-react'

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
    icon: 'credit-card',
  },
  {
    id: '2',
    type: 'Cuenta Ahorros',
    number: '****5678',
    balance: 450000,
    currency: 'ARS',
    icon: 'building',
  },
  {
    id: '3',
    type: 'Cuenta Dólares',
    number: '****9012',
    balance: 1200,
    currency: 'USD',
    icon: 'dollar-sign',
  },
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
    /cu[aá]nto\s+(tengo|dinero|plata)/i,
  ],

  steps: [
    {
      id: 'show-balances',
      title: 'Tus cuentas',
      render: ({ onNext }) => (
        <FlowContainer title="Tus cuentas">
          <div className="space-y-4 p-4">
            {/* Saldo total */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl bg-gradient-to-r from-indigo-500 to-indigo-600 p-6 text-white"
            >
              <p className="mb-1 text-sm opacity-90">Saldo total en pesos</p>
              <p className="text-3xl font-bold">
                $
                {accounts
                  .filter((a) => a.currency === 'ARS')
                  .reduce((sum, a) => sum + a.balance, 0)
                  .toLocaleString()}
              </p>
            </motion.div>

            {/* Lista de cuentas */}
            {accounts.map((account, index) => (
              <motion.div
                key={account.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 + 0.2 }}
                className="rounded-xl border border-gray-200 bg-white p-4 transition-shadow hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-gray-600">
                      {account.icon === 'credit-card' && (
                        <CreditCard className="h-6 w-6" />
                      )}
                      {account.icon === 'building' && (
                        <Building2 className="h-6 w-6" />
                      )}
                      {account.icon === 'dollar-sign' && (
                        <DollarSign className="h-6 w-6" />
                      )}
                    </div>
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
            <div className="space-y-2 pt-4">
              <button
                onClick={() => onNext({ action: 'transfer' })}
                className="group flex w-full items-center justify-between rounded-lg bg-gray-50 p-3 text-left transition-colors hover:bg-gray-100"
              >
                <span>Hacer una transferencia</span>
                <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-gray-600" />
              </button>

              <button
                onClick={() => onNext({ action: 'movements' })}
                className="group flex w-full items-center justify-between rounded-lg bg-gray-50 p-3 text-left transition-colors hover:bg-gray-100"
              >
                <span>Ver movimientos</span>
                <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-gray-600" />
              </button>
            </div>
          </div>
        </FlowContainer>
      ),
    },
  ],

  onComplete: (data) => {
    console.log('Balance consultado', data)
    // Si eligió una acción, podríamos disparar otro flujo
  },
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
        boxShadow:
          '0 0 0 1px rgba(14, 63, 126, 0.04), 0 1px 1px -0.5px rgba(42, 51, 69, 0.04), 0 3px 3px -1.5px rgba(42, 51, 70, 0.04), 0 6px 6px -3px rgba(42, 51, 70, 0.04), 0 12px 12px -6px rgba(14, 63, 126, 0.04), 0 24px 24px -12px rgba(14, 63, 126, 0.04)',
      }}
    >
      <CardContent className="p-4">
        <div className="space-y-4">
          {/* Saldo total destacado */}
          <div className="rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-600 p-4 text-white">
            <p className="mb-1 text-sm opacity-90">Saldo total</p>
            <p className="text-2xl font-bold">
              ${props.totalBalance.toLocaleString()}
            </p>
            <p className="mt-1 text-xs opacity-75">ARS • Pesos argentinos</p>
          </div>

          {/* Acciones rápidas */}
          <div className="grid grid-cols-2 gap-2">
            <UIButton
              variant="outline"
              size="sm"
              onClick={() =>
                openSheet(
                  <BalanceDetailBottomSheet accounts={props.accounts} />,
                )
              }
            >
              Ver detalle
            </UIButton>
            <UIButton
              variant="outline"
              size="sm"
              onClick={() => openSheet(<BalanceActionsBottomSheet />)}
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
export const BalanceAccountList = ({
  widget,
  openSheet,
}: WidgetComponentProps) => {
  const props = widget.props as unknown as BalanceAccountListProps

  return (
    <Card
      className="w-full max-w-sm rounded-2xl border-none"
      style={{
        background: 'var(--antimetal-com-nero-80, rgba(255, 255, 255, 0.80))',
        boxShadow:
          '0 0 0 1px rgba(14, 63, 126, 0.04), 0 1px 1px -0.5px rgba(42, 51, 69, 0.04), 0 3px 3px -1.5px rgba(42, 51, 70, 0.04), 0 6px 6px -3px rgba(42, 51, 70, 0.04), 0 12px 12px -6px rgba(14, 63, 126, 0.04), 0 24px 24px -12px rgba(14, 63, 126, 0.04)',
      }}
    >
      <CardHeader className="p-4 pb-3">
        <div className="flex items-center gap-2">
          <Wallet className="h-5 w-5" />
          <CardTitle className="text-base font-semibold">
            {props.title || 'Tus Cuentas'}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <div className="space-y-3">
          {props.accounts.map((account) => (
            <div
              key={account.id}
              className="cursor-pointer rounded-lg border border-gray-200 bg-white p-3 transition-colors hover:bg-gray-50"
              onClick={() =>
                openSheet(<BalanceAccountBottomSheet account={account} />)
              }
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                  <div className="text-gray-600">
                    {account.icon === 'credit-card' && (
                      <CreditCard className="h-4 w-4" />
                    )}
                    {account.icon === 'building' && (
                      <Building2 className="h-4 w-4" />
                    )}
                    {account.icon === 'dollar-sign' && (
                      <DollarSign className="h-4 w-4" />
                    )}
                    {!account.icon && <CreditCard className="h-4 w-4" />}
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">
                    {account.type}
                  </h4>
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
            <div className="mt-3 border-t border-gray-200 pt-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">
                  Total en pesos:
                </span>
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
        boxShadow:
          '0 0 0 1px rgba(14, 63, 126, 0.04), 0 1px 1px -0.5px rgba(42, 51, 69, 0.04), 0 3px 3px -1.5px rgba(42, 51, 70, 0.04), 0 6px 6px -3px rgba(42, 51, 70, 0.04), 0 12px 12px -6px rgba(14, 63, 126, 0.04), 0 24px 24px -12px rgba(14, 63, 126, 0.04)',
      }}
    >
      <CardContent className="p-4">
        <div className="space-y-3 text-center">
          <BarChart3 className="h-8 w-8 text-indigo-600" />
          <div>
            <h3 className="font-semibold">Gestionar Dinero</h3>
            <p className="text-muted-foreground text-sm">
              Transferir, invertir o consultar movimientos
            </p>
          </div>
          <UIButton
            className="w-full"
            onClick={() => openSheet(<BalanceActionsBottomSheet />)}
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
export const BalanceDetailBottomSheet = ({
  accounts,
}: {
  accounts: BalanceAccount[]
}) => (
  <div className="p-6">
    <h3 className="mb-4 text-lg font-semibold">Detalle de Cuentas</h3>

    <div className="space-y-4">
      {/* Resumen total */}
      <div className="rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-600 p-4 text-white">
        <p className="mb-1 text-sm opacity-90">Patrimonio total</p>
        <p className="text-3xl font-bold">
          $
          {accounts
            ?.reduce((sum, acc) => {
              return (
                sum +
                (acc.currency === 'ARS' ? acc.balance : acc.balance * 1000)
              ) // Mock conversion
            }, 0)
            .toLocaleString()}
        </p>
        <p className="mt-1 text-xs opacity-75">
          Equivalente en pesos argentinos
        </p>
      </div>

      {/* Lista detallada */}
      <div className="space-y-3">
        {accounts?.map((account) => (
          <div key={account.id} className="rounded-lg bg-gray-50 p-4">
            <div className="mb-2 flex items-center gap-3">
              <div className="text-gray-600">
                {account.icon === 'credit-card' && (
                  <CreditCard className="h-6 w-6" />
                )}
                {account.icon === 'building' && (
                  <Building2 className="h-6 w-6" />
                )}
                {account.icon === 'dollar-sign' && (
                  <DollarSign className="h-6 w-6" />
                )}
              </div>
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

      <UIButton className="mt-4 w-full">Exportar Resumen</UIButton>
    </div>
  </div>
)

/**
 * BottomSheet para acciones disponibles
 */
export const BalanceActionsBottomSheet = () => (
  <div className="p-6">
    <h3 className="mb-4 text-lg font-semibold">¿Qué querés hacer?</h3>

    <div className="space-y-3">
      <UIButton variant="outline" className="h-16 w-full justify-start">
        <div className="flex items-center gap-3">
          <Send className="h-6 w-6 text-indigo-600" />
          <div className="text-left">
            <p className="font-medium">Transferir dinero</p>
            <p className="text-sm text-gray-600">
              Enviar a contactos o CBU/CVU
            </p>
          </div>
        </div>
      </UIButton>

      <UIButton variant="outline" className="h-16 w-full justify-start">
        <div className="flex items-center gap-3">
          <FileText className="h-6 w-6 text-indigo-600" />
          <div className="text-left">
            <p className="font-medium">Ver movimientos</p>
            <p className="text-sm text-gray-600">Historial de transacciones</p>
          </div>
        </div>
      </UIButton>

      <UIButton variant="outline" className="h-16 w-full justify-start">
        <div className="flex items-center gap-3">
          <CreditCard className="h-6 w-6 text-indigo-600" />
          <div className="text-left">
            <p className="font-medium">Pagar servicios</p>
            <p className="text-sm text-gray-600">Luz, gas, agua, internet</p>
          </div>
        </div>
      </UIButton>

      <UIButton variant="outline" className="h-16 w-full justify-start">
        <div className="flex items-center gap-3">
          <TrendingUp className="h-6 w-6 text-indigo-600" />
          <div className="text-left">
            <p className="font-medium">Invertir</p>
            <p className="text-sm text-gray-600">
              Plazo fijo, fondos, acciones
            </p>
          </div>
        </div>
      </UIButton>
    </div>
  </div>
)

/**
 * BottomSheet para detalles de una cuenta específica
 */
export const BalanceAccountBottomSheet = ({
  account,
}: {
  account: BalanceAccount
}) => (
  <div className="p-6">
    <div className="mb-4 flex items-center gap-3">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
        <div className="text-gray-600">
          {account.icon === 'credit-card' && <CreditCard className="h-6 w-6" />}
          {account.icon === 'building' && <Building2 className="h-6 w-6" />}
          {account.icon === 'dollar-sign' && <DollarSign className="h-6 w-6" />}
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold">{account.type}</h3>
        <p className="text-sm text-gray-600">{account.number}</p>
      </div>
    </div>

    <div className="space-y-4">
      {/* Saldo principal */}
      <div className="rounded-lg bg-gray-50 p-4 text-center">
        <p className="mb-1 text-sm text-gray-600">Saldo disponible</p>
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
        <div className="rounded-lg bg-green-50 p-3">
          <p className="mb-1 text-xs text-green-600">Ingresos del mes</p>
          <p className="font-semibold text-green-700">+$45,000</p>
        </div>
        <div className="rounded-lg bg-red-50 p-3">
          <p className="mb-1 text-xs text-red-600">Gastos del mes</p>
          <p className="font-semibold text-red-700">-$32,000</p>
        </div>
      </div>

      {/* Acciones */}
      <div className="space-y-2 pt-2">
        <UIButton className="w-full">Transferir desde esta cuenta</UIButton>
        <UIButton variant="outline" className="w-full">
          Ver movimientos
        </UIButton>
        <UIButton variant="outline" className="w-full">
          Generar CBU/CVU
        </UIButton>
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
