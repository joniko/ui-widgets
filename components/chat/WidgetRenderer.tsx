'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { InlineWidget } from '@/lib/types'

import { useBottomSheet } from '@/components/drawers/useBottomSheet'
import { getWidgetComponent } from '@/lib/widgets'
import { CheckCircle } from 'lucide-react'

// Import widgets to ensure they are registered
import '@/lib/widgets'

interface WidgetRendererProps {
  widget: InlineWidget
}

const widgetVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
}

export function WidgetRenderer({ widget }: WidgetRendererProps) {
  const { openSheet } = useBottomSheet()

  const renderInfoCard = (props: Record<string, unknown>) => (
    <Card
      className="w-full max-w-sm rounded-2xl border-none"
      style={{
        background: 'var(--antimetal-com-nero-80, rgba(255, 255, 255, 0.80))',
        boxShadow:
          '0 0 0 1px rgba(14, 63, 126, 0.04), 0 1px 1px -0.5px rgba(42, 51, 69, 0.04), 0 3px 3px -1.5px rgba(42, 51, 70, 0.04), 0 6px 6px -3px rgba(42, 51, 70, 0.04), 0 12px 12px -6px rgba(14, 63, 126, 0.04), 0 24px 24px -12px rgba(14, 63, 126, 0.04)',
      }}
    >
      <CardHeader className="pb-3">
        <CardTitle className="text-base">{props.title as string}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {(props.accounts as Record<string, unknown>[]) && (
          <div className="space-y-2">
            {(props.accounts as Record<string, unknown>[]).map(
              (account: Record<string, unknown>) => (
                <div
                  key={account.id as string}
                  className="flex items-center justify-between"
                >
                  <span className="text-sm font-medium">
                    {account.name as string}
                  </span>
                  <span className="text-muted-foreground text-sm">
                    ${(account.balance as number).toLocaleString()}
                  </span>
                </div>
              ),
            )}
            <Separator />
            <div className="flex items-center justify-between font-semibold">
              <span>Total</span>
              <span>${(props.totalBalance as number)?.toLocaleString()}</span>
            </div>
          </div>
        )}
        {(props.services as Record<string, unknown>[]) && (
          <div className="space-y-2">
            {(props.services as Record<string, unknown>[]).map(
              (service: Record<string, unknown>) => (
                <div
                  key={service.id as string}
                  className="flex items-center justify-between"
                >
                  <span className="text-sm font-medium">
                    {service.name as string}
                  </span>
                  <span className="text-muted-foreground text-sm">
                    ${(service.amount as number).toLocaleString()}
                  </span>
                </div>
              ),
            )}
            <Separator />
            <div className="flex items-center justify-between font-semibold">
              <span>Total a pagar</span>
              <span>${(props.totalAmount as number)?.toLocaleString()}</span>
            </div>
          </div>
        )}
        {(props.operations as string[]) && (
          <div className="space-y-2">
            {(props.operations as string[]).map((op: string, index: number) => (
              <div key={index} className="flex items-center space-x-2">
                <div className="bg-primary h-2 w-2 rounded-full" />
                <span className="text-sm">{op}</span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )

  const renderAccountList = (props: Record<string, unknown>) => (
    <Card
      className="w-full max-w-sm rounded-2xl border-none"
      style={{
        background: 'var(--antimetal-com-nero-80, rgba(255, 255, 255, 0.80))',
        boxShadow:
          '0 0 0 1px rgba(14, 63, 126, 0.04), 0 1px 1px -0.5px rgba(42, 51, 69, 0.04), 0 3px 3px -1.5px rgba(42, 51, 70, 0.04), 0 6px 6px -3px rgba(42, 51, 70, 0.04), 0 12px 12px -6px rgba(14, 63, 126, 0.04), 0 24px 24px -12px rgba(14, 63, 126, 0.04)',
      }}
    >
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Tus Cuentas</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {(props.accounts as Record<string, unknown>[])?.map(
          (account: Record<string, unknown>) => (
            <div
              key={account.id as string}
              className="hover:bg-muted/50 flex cursor-pointer items-center justify-between rounded-lg border p-3 transition-colors"
              onClick={() =>
                openSheet(
                  <div className="p-6">
                    <h3 className="mb-4 text-lg font-semibold">
                      {account.name as string}
                    </h3>
                    <div className="space-y-4">
                      <div className="text-center">
                        <div className="text-primary text-3xl font-bold">
                          ${(account.balance as number).toLocaleString()}
                        </div>
                        <div className="text-muted-foreground text-sm">
                          Saldo disponible
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">Número:</span>
                          <span className="font-mono text-sm">
                            {account.number as string}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Tipo:</span>
                          <Badge variant="secondary">
                            {account.type as string}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>,
                )
              }
            >
              <div className="flex items-center space-x-3">
                <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-full">
                  <span className="text-primary font-semibold">
                    {(account.name as string).charAt(0)}
                  </span>
                </div>
                <div>
                  <div className="font-medium">{account.name as string}</div>
                  <div className="text-muted-foreground text-sm">
                    {account.number as string}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-semibold">
                  ${(account.balance as number).toLocaleString()}
                </div>
                <Badge variant="outline" className="text-xs">
                  {account.type as string}
                </Badge>
              </div>
            </div>
          ),
        )}
      </CardContent>
    </Card>
  )

  const renderConfirmation = (props: Record<string, unknown>) => {
    // Widget de confirmación de transferencia exitosa
    if (props.type === 'success' && props.amount) {
      return (
        <Card
          className="w-full max-w-sm rounded-2xl border-0 py-0"
          style={{
            background: 'rgb(220 252 231)', // green-100
            boxShadow:
              '0 0 0 1px rgba(14, 63, 126, 0.04), 0 1px 1px -0.5px rgba(42, 51, 69, 0.04), 0 3px 3px -1.5px rgba(42, 51, 70, 0.04), 0 6px 6px -3px rgba(42, 51, 70, 0.04), 0 12px 12px -6px rgba(14, 63, 126, 0.04), 0 24px 24px -12px rgba(14, 63, 126, 0.04)',
          }}
        >
          <CardContent className="p-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-green-900">
                {props.title as string}
              </h3>

              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-green-600 text-white">
                    {(props.recipient as string)?.charAt(0) || 'T'}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-green-900">
                    {props.recipient as string}
                  </p>
                  <p className="text-sm text-green-700">
                    {props.account as string}
                  </p>
                </div>
              </div>

              <div className="py-4 text-center">
                <p className="text-3xl font-bold text-green-900">
                  ${(props.amount as number).toLocaleString()}
                </p>
                <p className="mt-1 text-sm text-green-700">
                  {props.accountType as string}
                </p>
              </div>

              {(props.showReceipt as boolean) && (
                <div className="text-center">
                  <button className="text-primary font-medium hover:underline">
                    Descargar comprobante
                  </button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )
    }

    // Widget de confirmación genérico (mantener el original)
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
            <CheckCircle className="h-8 w-8 text-green-600" />
            <div>
              <h3 className="font-semibold">{props.title as string}</h3>
              {(props.steps as string[]) && (
                <div className="mt-3 space-y-2 text-left">
                  {(props.steps as string[]).map(
                    (step: string, index: number) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="bg-primary/10 flex h-5 w-5 items-center justify-center rounded-full">
                          <span className="text-primary text-xs font-bold">
                            {index + 1}
                          </span>
                        </div>
                        <span className="text-sm">{step}</span>
                      </div>
                    ),
                  )}
                </div>
              )}
              {(props.options as string[]) && (
                <div className="mt-3 space-y-2 text-left">
                  {(props.options as string[]).map(
                    (option: string, index: number) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="h-2 w-2 rounded-full bg-gray-400" />
                        <span className="text-sm">{option}</span>
                      </div>
                    ),
                  )}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  const renderImage = (props: Record<string, unknown>) => (
    <div className="w-full max-w-sm rounded-2xl border-none">
      <div className="bg-muted flex h-48 w-full items-center justify-center rounded-lg">
        <span className="text-muted-foreground">
          Imagen: {(props.alt as string) || 'Sin título'}
        </span>
      </div>
    </div>
  )

  const renderWidget = () => {
    // First, try to get widget from domain-specific registry
    const DomainWidget = getWidgetComponent(widget.type)
    if (DomainWidget) {
      return <DomainWidget widget={widget} openSheet={openSheet} />
    }

    // Fallback to generic widgets
    switch (widget.type) {
      case 'info-card':
        return renderInfoCard(widget.props)
      case 'account-list':
        return renderAccountList(widget.props)
      case 'confirmation':
        return renderConfirmation(widget.props)
      case 'image':
        return renderImage(widget.props)
      default:
        return <div>Widget no soportado: {widget.type}</div>
    }
  }

  return (
    <motion.div
      variants={widgetVariants}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="my-0 flex justify-center"
    >
      {renderWidget()}
    </motion.div>
  )
}
