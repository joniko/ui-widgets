'use client'

import { FlowDefinition } from '../types'
import { FlowContainer } from '../components/FlowContainer'
import { SelectList } from '../components/SelectList'
import { Button } from '../components'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button as UIButton } from '@/components/ui/button'
import { InlineWidget } from '@/lib/types'
import {
  WidgetComponentProps,
  createDomainWidgets,
} from '@/lib/widgets/registry'
import {
  Lightbulb,
  Flame,
  Droplets,
  Wifi,
  FileText,
  AlertTriangle,
  CreditCard,
} from 'lucide-react'

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
    icon: <Lightbulb className="h-4 w-4" />,
    status: 'pending',
  },
  {
    id: '2',
    name: 'Metrogas',
    type: 'Gas',
    amount: 3200,
    dueDate: '2024-01-18',
    icon: <Flame className="h-4 w-4" />,
    status: 'pending',
  },
  {
    id: '3',
    name: 'AySA',
    type: 'Agua',
    amount: 2100,
    dueDate: '2024-01-20',
    icon: <Droplets className="h-4 w-4" />,
    status: 'pending',
  },
  {
    id: '4',
    name: 'Telecentro',
    type: 'Internet',
    amount: 12000,
    dueDate: '2024-01-10',
    icon: <Wifi className="h-4 w-4" />,
    status: 'overdue',
  },
]

const accounts = [
  { id: '1', name: 'Cuenta Sueldo', balance: 125000 },
  { id: '2', name: 'Cuenta Ahorros', balance: 450000 },
]

// Payment-specific widgets and BottomSheets
export const PaymentServiceDetailList = ({ widget }: WidgetComponentProps) => {
  const props = widget.props

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
          <FileText className="h-5 w-5" />
          <CardTitle className="text-base font-semibold">
            {props.title as string}
          </CardTitle>
        </div>
        {Array.isArray(props.services) &&
          props.services.some(
            (s: Record<string, unknown>) => s.status === 'overdue',
          ) && (
            <div className="mt-2 inline-flex items-center gap-1 self-start rounded-md bg-red-100 px-2 py-1 text-xs font-medium text-red-700">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              Tenés{' '}
              {
                props.services.filter(
                  (s: Record<string, unknown>) => s.status === 'overdue',
                ).length
              }{' '}
              factura
              {props.services.filter(
                (s: Record<string, unknown>) => s.status === 'overdue',
              ).length > 1
                ? 's'
                : ''}{' '}
              vencida
              {props.services.filter(
                (s: Record<string, unknown>) => s.status === 'overdue',
              ).length > 1
                ? 's'
                : ''}
            </div>
          )}
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <div className="space-y-3">
          {Array.isArray(props.services) &&
            props.services.map((service: Record<string, unknown>) => (
              <div
                key={service.id as string}
                className={`rounded-lg border p-3 ${
                  service.status === 'overdue'
                    ? 'border-red-200 bg-red-50/50'
                    : 'border-gray-200 bg-white'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 text-gray-600">
                    {service.name === 'Edesur' && (
                      <Lightbulb className="h-6 w-6" />
                    )}
                    {service.name === 'Metrogas' && (
                      <Flame className="h-6 w-6" />
                    )}
                    {service.name === 'Telecentro' && (
                      <Wifi className="h-6 w-6" />
                    )}
                    {service.name === 'AySA' && (
                      <Droplets className="h-6 w-6" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-900">
                          {service.name as string}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {service.provider as string}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold">
                          ${(service.amount as number).toLocaleString('es-AR')}
                        </p>
                        <p
                          className={`text-xs ${
                            service.status === 'overdue'
                              ? 'font-medium text-red-600'
                              : 'text-gray-500'
                          }`}
                        >
                          {service.status === 'overdue'
                            ? 'Vencida'
                            : `Vence ${service.dueDate as string}`}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

          {typeof props.totalAmount === 'number' && (
            <div className="mt-3 border-t border-gray-200 pt-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">
                  Total a pagar:
                </span>
                <span className="text-lg font-bold text-gray-900">
                  ${props.totalAmount.toLocaleString('es-AR')}
                </span>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export const PaymentCta = ({ widget, openSheet }: WidgetComponentProps) => {
  const props = widget.props

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
          <CreditCard className="h-8 w-8 text-indigo-600" />
          <div>
            <h3 className="font-semibold">Servicios Pendientes</h3>
            <p className="text-muted-foreground text-sm">
              Total: ${props.totalAmount?.toLocaleString()}
            </p>
          </div>
          <UIButton
            className="w-full"
            onClick={() =>
              openSheet(
                <PaymentBottomSheet
                  services={props.services as Record<string, unknown>[]}
                />,
              )
            }
          >
            Pagar Servicios
          </UIButton>
        </div>
      </CardContent>
    </Card>
  )
}

export const PaymentBottomSheet = ({
  services,
}: {
  services: Record<string, unknown>[]
}) => (
  <div className="p-6">
    <h3 className="mb-4 text-lg font-semibold">Pago de Servicios</h3>
    <div className="space-y-4">
      {services?.map((service: Record<string, unknown>) => (
        <div
          key={service.id as string}
          className="flex items-center justify-between rounded-lg border p-3"
        >
          <div>
            <div className="font-medium">{service.name as string}</div>
            <div className="text-muted-foreground text-sm">
              {service.provider as string}
            </div>
          </div>
          <div className="text-right">
            <div className="font-semibold">
              ${(service.amount as number).toLocaleString()}
            </div>
            <div className="text-muted-foreground text-xs">
              Vence: {service.dueDate as string}
            </div>
          </div>
        </div>
      ))}
      <UIButton className="w-full">Pagar Todo</UIButton>
    </div>
  </div>
)

// Widget registry for payment domain with type safety
export const paymentWidgets = createDomainWidgets({
  'service-detail-list': PaymentServiceDetailList,
  'payment-cta': PaymentCta,
})

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
    /pagar?\s+(luz|gas|agua|internet|edesur|metrogas|aysa|telecentro)/i,
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
              className="mb-4 rounded-lg border border-orange-200 bg-orange-50 p-3"
            >
              <p className="text-sm text-orange-800">
                Tenés {services.filter((s) => s.status === 'overdue').length}{' '}
                facturas vencidas
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
                  className={`w-full rounded-lg border p-4 transition-all ${
                    service.status === 'overdue'
                      ? 'border-red-200 bg-red-50 hover:bg-red-100'
                      : 'border-gray-200 bg-white hover:bg-gray-50'
                  } `}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="text-gray-600">{service.icon}</div>
                      <div className="text-left">
                        <p className="font-medium">{service.name}</p>
                        <p className="text-sm text-gray-600">{service.type}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">
                        ${service.amount.toLocaleString()}
                      </p>
                      <p
                        className={`text-xs ${
                          service.status === 'overdue'
                            ? 'text-red-600'
                            : 'text-gray-500'
                        }`}
                      >
                        Vence: {new Date(service.dueDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Pagar todas */}
            <button className="mt-4 w-full rounded-lg p-3 font-medium text-indigo-600 transition-colors hover:bg-indigo-50">
              Pagar todas las facturas
            </button>
          </div>
        </FlowContainer>
      ),
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
            <div className="mb-4 rounded-lg bg-gray-50 p-4">
              <div className="flex items-center gap-3">
                <div className="text-gray-600">
                  {(data.service as ServiceData).icon === 'lightbulb' && (
                    <Lightbulb className="h-6 w-6" />
                  )}
                  {(data.service as ServiceData).icon === 'flame' && (
                    <Flame className="h-6 w-6" />
                  )}
                  {(data.service as ServiceData).icon === 'droplets' && (
                    <Droplets className="h-6 w-6" />
                  )}
                  {(data.service as ServiceData).icon === 'wifi' && (
                    <Wifi className="h-6 w-6" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-medium">
                    {(data.service as ServiceData).name}
                  </p>
                  <p className="text-sm text-gray-600">
                    {(data.service as ServiceData).type}
                  </p>
                </div>
                <p className="text-xl font-semibold">
                  ${(data.service as ServiceData).amount.toLocaleString()}
                </p>
              </div>
            </div>

            {/* Cuentas */}
            <SelectList
              items={accounts}
              keyExtractor={(a) => a.id}
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
      ),
    },

    {
      id: 'confirm',
      title: 'Confirmá el pago',
      render: ({ data, onNext, onBack }) => (
        <FlowContainer title="Confirmá el pago" onBack={onBack} showBack={true}>
          <div className="py-4">
            <div className="space-y-4">
              {/* Servicio */}
              <div className="rounded-lg bg-gray-50 p-4">
                <p className="mb-1 text-sm text-gray-600">Servicio</p>
                <div className="flex items-center gap-2">
                  <div className="text-gray-600">
                    {(data.service as ServiceData).icon === 'lightbulb' && (
                      <Lightbulb className="h-5 w-5" />
                    )}
                    {(data.service as ServiceData).icon === 'flame' && (
                      <Flame className="h-5 w-5" />
                    )}
                    {(data.service as ServiceData).icon === 'droplets' && (
                      <Droplets className="h-5 w-5" />
                    )}
                    {(data.service as ServiceData).icon === 'wifi' && (
                      <Wifi className="h-5 w-5" />
                    )}
                  </div>
                  <p className="font-medium">
                    {(data.service as ServiceData).name}
                  </p>
                </div>
              </div>

              {/* Monto */}
              <div className="py-6 text-center">
                <p className="text-4xl font-bold">
                  ${(data.service as ServiceData).amount.toLocaleString()}
                </p>
              </div>

              {/* Cuenta */}
              <div className="rounded-lg bg-gray-50 p-4">
                <p className="mb-1 text-sm text-gray-600">Desde</p>
                <p className="font-medium">
                  {(data.account as AccountData).name}
                </p>
                <p className="text-sm text-gray-500">
                  Saldo disponible: $
                  {(data.account as AccountData).balance.toLocaleString()}
                </p>
              </div>

              {/* Fecha de pago */}
              <div className="rounded-lg bg-indigo-50 p-4">
                <p className="text-sm text-indigo-800">
                  Se pagará hoy {new Date().toLocaleDateString()}
                </p>
              </div>
            </div>

            <Button onClick={() => onNext()} className="mt-6 w-full py-3">
              Confirmar pago
            </Button>
          </div>
        </FlowContainer>
      ),
    },
  ],

  onComplete: (data) => {
    console.log('Pago completado:', data)
  },
}
