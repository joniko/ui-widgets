'use client'

import { FlowDefinition } from '../types'
import { FlowContainer } from '../components/FlowContainer'
import { SuccessAnimation } from '../components/SuccessAnimation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button as UIButton } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  WidgetComponentProps,
  createDomainWidgets,
} from '@/lib/widgets/registry'
import {
  CreditCard,
  Building2,
  Users,
  ArrowRight,
  Heart,
  Send,
  ChevronRight,
} from 'lucide-react'

// Types for transfer widgets
interface TransferContact {
  id: string
  name: string
  avatar?: string
  phone?: string
  banks?: string[]
}

interface TransferAccount {
  id: string
  name: string
  type: string
  number: string
  balance?: number
  icon?: string
  color?: string
}

interface TransferContactListProps {
  title?: string
  contacts: TransferContact[]
}

interface TransferAccountListProps {
  title?: string
  accounts: TransferAccount[]
}

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
    banks: ['🇦🇷', '🇧🇷'],
  },
  {
    id: '2',
    name: 'Mauro Vera',
    avatar: '/avatars/mauro2.jpg',
    banks: ['🇦🇷'],
  },
  {
    id: '3',
    name: 'Mauro Ariel Fernández',
    avatar: '/avatars/mauro3.jpg',
    banks: ['🇧🇷'],
  },
]

const accounts = [
  {
    id: '1',
    name: 'Mercado Pago',
    type: 'CVU',
    number: '0000003100090418135201',
    icon: 'credit-card',
    color: 'bg-yellow-400',
  },
  {
    id: '2',
    name: 'Banco Santander',
    type: 'CBU',
    number: '0081590966990418138814',
    icon: 'building',
    color: 'bg-red-500',
  },
]

export const transferFlow: FlowDefinition = {
  id: 'transfer',
  name: 'Transferencia',

  // Múltiples formas de disparar el flujo
  triggers: [
    'transferir',
    'enviar dinero',
    'mandar plata',
    /transferir?\s*(\d+)?\s*a?\s*(\w+)?/i,
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
            {contacts.map((contact) => (
              <button
                key={contact.id}
                onClick={() => onNext({ contact })}
                className="flex w-full items-center justify-between rounded-lg p-4 transition-colors hover:bg-gray-50"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={contact.avatar}
                    alt={contact.name}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <div className="text-left">
                    <p className="font-medium">{contact.name}</p>
                    <div className="mt-1 flex gap-1">
                      {contact.banks.map((bank, idx) => (
                        <span key={idx} className="text-lg">
                          {bank}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <Heart className="h-6 w-6 text-blue-500" />
              </button>
            ))}

            <button className="mt-4 w-full rounded-lg p-4 text-indigo-600 transition-colors hover:bg-indigo-50">
              Elegí desde tus contactos
            </button>
          </div>
        </FlowContainer>
      ),
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
              <p className="mb-4 text-gray-600">
                Transferencia a {(data.contact as ContactData).name}
              </p>

              <input
                type="number"
                placeholder="$0"
                className="w-full p-4 text-center text-4xl font-bold outline-none"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && e.currentTarget.value) {
                    onNext({ amount: parseFloat(e.currentTarget.value) })
                  }
                }}
              />

              <div className="mt-6 grid grid-cols-3 gap-2">
                {[1000, 5000, 10000].map((amount) => (
                  <button
                    key={amount}
                    onClick={() => onNext({ amount })}
                    className="rounded-lg bg-gray-100 p-3 transition-colors hover:bg-gray-200"
                  >
                    ${amount.toLocaleString()}
                  </button>
                ))}
              </div>
            </div>
          </FlowContainer>
        )
      },
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
              <p className="text-gray-600">
                {(data.contact as ContactData).name}
              </p>
            </div>

            {accounts.map((account) => (
              <button
                key={account.id}
                onClick={() => onNext({ account })}
                className="flex w-full items-center gap-3 rounded-lg p-4 transition-colors hover:bg-gray-50"
              >
                <div
                  className={`h-12 w-12 rounded-full ${account.color} flex items-center justify-center text-white`}
                >
                  {account.icon === 'credit-card' && (
                    <CreditCard className="h-6 w-6" />
                  )}
                  {account.icon === 'building' && (
                    <Building2 className="h-6 w-6" />
                  )}
                </div>
                <div className="flex-1 text-left">
                  <p className="font-medium">{account.name}</p>
                  <p className="text-sm text-gray-600">
                    {account.type} {account.number}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </FlowContainer>
      ),
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
            <div className="mb-6 flex items-center gap-3">
              <img
                src={(data.contact as ContactData).avatar}
                alt={(data.contact as ContactData).name}
                className="h-12 w-12 rounded-full object-cover"
              />
              <div>
                <p className="font-medium">
                  {(data.contact as ContactData).name}
                </p>
                <p className="text-sm text-gray-600">
                  {(data.account as AccountData).name} -{' '}
                  {(data.account as AccountData).type}****
                  {(data.account as AccountData).number.slice(-4)}
                </p>
              </div>
            </div>

            {/* Monto */}
            <div className="py-8 text-center">
              <p className="text-5xl font-bold">
                <span className="align-top text-2xl">$</span>
                {(data.amount as number).toLocaleString()}
              </p>
            </div>

            {/* Tipo de dinero */}
            <button className="mb-6 flex w-full items-center justify-between rounded-lg bg-gray-50 p-4">
              <span className="text-gray-700">Dinero en cuenta</span>
              <ChevronRight className="h-4 w-4 text-gray-400" />
            </button>

            {/* Botón confirmar */}
            <button
              onClick={() => onNext()}
              className="w-full rounded-lg bg-indigo-600 py-4 font-medium text-white transition-colors hover:bg-indigo-700"
            >
              Confirmar transferencia
            </button>
          </div>
        </FlowContainer>
      ),
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
      ),
    },
  ],

  onComplete: (data) => {
    // Aquí iría la lógica de completar la transferencia
    console.log('Transferencia completada:', data)
  },
}

// ==========================================
// 🎯 TRANSFER WIDGETS
// ==========================================

/**
 * Widget para mostrar contactos recientes para transferencias
 */
export const TransferContactList = ({
  widget,
  openSheet,
}: WidgetComponentProps) => {
  const props = widget.props as unknown as TransferContactListProps

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
          <Users className="h-5 w-5" />
          <CardTitle className="text-base font-semibold">
            {props.title || 'Contactos Recientes'}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <div className="space-y-3">
          {props.contacts.map((contact) => (
            <div
              key={contact.id}
              className="cursor-pointer rounded-lg border border-gray-200 bg-white p-3 transition-colors hover:bg-gray-50"
              onClick={() =>
                openSheet(<TransferContactBottomSheet contact={contact} />)
              }
            >
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-indigo-100 text-indigo-600">
                    {contact.name.charAt(0) || 'C'}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">
                    {contact.name}
                  </h4>
                  <div className="mt-1 flex gap-1">
                    {contact.banks?.map((bank, index) => (
                      <span key={index} className="text-sm">
                        {bank}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="text-gray-400">
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </div>
          ))}

          <UIButton
            variant="outline"
            className="mt-3 w-full"
            onClick={() => openSheet(<TransferNewContactBottomSheet />)}
          >
            + Nuevo contacto
          </UIButton>
        </div>
      </CardContent>
    </Card>
  )
}

/**
 * Widget CTA para transferencias rápidas
 */
export const TransferQuickAction = ({
  widget,
  openSheet,
}: WidgetComponentProps) => {
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
          <Send className="h-8 w-8 text-indigo-600" />
          <div>
            <h3 className="font-semibold">Transferir Dinero</h3>
            <p className="text-muted-foreground text-sm">
              Envía dinero rápido y seguro
            </p>
          </div>
          <UIButton
            className="w-full"
            onClick={() => openSheet(<TransferQuickActionBottomSheet />)}
          >
            Transferir Ahora
          </UIButton>
        </div>
      </CardContent>
    </Card>
  )
}

/**
 * Widget para mostrar cuentas disponibles para transferir
 */
export const TransferAccountList = ({
  widget,
  openSheet,
}: WidgetComponentProps) => {
  const props = widget.props as unknown as TransferAccountListProps

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
          <Building2 className="h-5 w-5" />
          <CardTitle className="text-base font-semibold">
            Desde qué cuenta
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
                openSheet(<TransferAccountBottomSheet account={account} />)
              }
            >
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full ${account.color || 'bg-gray-100'}`}
                >
                  <div className="text-white">
                    {account.icon === 'credit-card' && (
                      <CreditCard className="h-4 w-4" />
                    )}
                    {account.icon === 'building' && (
                      <Building2 className="h-4 w-4" />
                    )}
                    {!account.icon && <CreditCard className="h-4 w-4" />}
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">
                    {account.name}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {account.type} • {account.number}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">
                    ${account.balance?.toLocaleString()}
                  </p>
                  <Badge variant="outline" className="text-xs">
                    Disponible
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

// ==========================================
// 🎯 TRANSFER BOTTOMSHEETS
// ==========================================

/**
 * BottomSheet para detalles de contacto
 */
export const TransferContactBottomSheet = ({
  contact,
}: {
  contact: TransferContact
}) => (
  <div className="p-6">
    <div className="mb-4 flex items-center gap-3">
      <Avatar className="h-12 w-12">
        <AvatarFallback className="bg-indigo-100 text-lg text-indigo-600">
          {contact.name.charAt(0) || 'C'}
        </AvatarFallback>
      </Avatar>
      <div>
        <h3 className="text-lg font-semibold">{contact.name}</h3>
        <div className="flex gap-1">
          {contact.banks?.map((bank, index) => (
            <span key={index} className="text-sm">
              {bank}
            </span>
          ))}
        </div>
      </div>
    </div>

    <div className="space-y-4">
      <div>
        <p className="mb-2 text-sm text-gray-600">Acciones rápidas</p>
        <div className="space-y-2">
          <UIButton className="w-full justify-start" variant="outline">
            <Send className="mr-2 h-4 w-4" /> Transferir $1,000
          </UIButton>
          <UIButton className="w-full justify-start" variant="outline">
            <Send className="mr-2 h-4 w-4" /> Transferir $5,000
          </UIButton>
          <UIButton className="w-full justify-start" variant="outline">
            <Send className="mr-2 h-4 w-4" /> Transferir monto personalizado
          </UIButton>
        </div>
      </div>

      <UIButton className="w-full">Iniciar Transferencia</UIButton>
    </div>
  </div>
)

/**
 * BottomSheet para nuevo contacto
 */
export const TransferNewContactBottomSheet = () => (
  <div className="p-6">
    <h3 className="mb-4 text-lg font-semibold">Nuevo Contacto</h3>

    <div className="space-y-4">
      <div>
        <label className="mb-1 block text-sm text-gray-600">Nombre</label>
        <input
          type="text"
          placeholder="Nombre del contacto"
          className="w-full rounded-lg border p-3"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm text-gray-600">
          CBU/CVU/Alias
        </label>
        <input
          type="text"
          placeholder="Ingresa CBU, CVU o alias"
          className="w-full rounded-lg border p-3"
        />
      </div>

      <div className="space-y-2 pt-4">
        <UIButton className="w-full">Agregar Contacto</UIButton>
        <UIButton variant="outline" className="w-full">
          Cancelar
        </UIButton>
      </div>
    </div>
  </div>
)

/**
 * BottomSheet para acción rápida de transferencia
 */
export const TransferQuickActionBottomSheet = () => (
  <div className="p-6">
    <h3 className="mb-4 text-lg font-semibold">Transferencia Rápida</h3>

    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <UIButton variant="outline" className="h-16 flex-col">
          <Users className="mb-1 h-5 w-5" />
          <span className="text-xs">A Contacto</span>
        </UIButton>
        <UIButton variant="outline" className="h-16 flex-col">
          <Building2 className="mb-1 h-5 w-5" />
          <span className="text-xs">Por CBU/CVU</span>
        </UIButton>
      </div>

      <div>
        <p className="mb-2 text-sm text-gray-600">Montos frecuentes</p>
        <div className="grid grid-cols-3 gap-2">
          <UIButton variant="outline" size="sm">
            $1,000
          </UIButton>
          <UIButton variant="outline" size="sm">
            $5,000
          </UIButton>
          <UIButton variant="outline" size="sm">
            $10,000
          </UIButton>
        </div>
      </div>

      <UIButton className="mt-4 w-full">Continuar</UIButton>
    </div>
  </div>
)

/**
 * BottomSheet para detalles de cuenta
 */
export const TransferAccountBottomSheet = ({
  account,
}: {
  account: TransferAccount
}) => (
  <div className="p-6">
    <div className="mb-4 flex items-center gap-3">
      <div
        className={`flex h-12 w-12 items-center justify-center rounded-full ${account.color || 'bg-gray-100'}`}
      >
        <div className="text-white">
          {account.icon === 'credit-card' && <CreditCard className="h-5 w-5" />}
          {account.icon === 'building' && <Building2 className="h-5 w-5" />}
          {!account.icon && <CreditCard className="h-5 w-5" />}
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold">{account.name}</h3>
        <p className="text-sm text-gray-600">
          {account.type} • {account.number}
        </p>
      </div>
    </div>

    <div className="space-y-4">
      <div className="rounded-lg bg-gray-50 p-4">
        <p className="mb-1 text-sm text-gray-600">Saldo disponible</p>
        <p className="text-2xl font-bold">
          ${account.balance?.toLocaleString()}
        </p>
      </div>

      <div className="space-y-2">
        <UIButton className="w-full">Transferir desde esta cuenta</UIButton>
        <UIButton variant="outline" className="w-full">
          Ver movimientos
        </UIButton>
      </div>
    </div>
  </div>
)

// ==========================================
// 🎯 WIDGET REGISTRY
// ==========================================

export const transferWidgets = createDomainWidgets({
  'transfer-contact-list': TransferContactList,
  'transfer-quick-action': TransferQuickAction,
  'transfer-account-list': TransferAccountList,
})
