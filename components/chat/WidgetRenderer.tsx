'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { InlineWidget } from '@/lib/types'

import { useBottomSheet } from '@/components/drawers/useBottomSheet'

interface WidgetRendererProps {
  widget: InlineWidget
}

const widgetVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 }
}

export function WidgetRenderer({ widget }: WidgetRendererProps) {
  const { openSheet } = useBottomSheet()

  const renderInfoCard = (props: Record<string, unknown>) => (
    <Card 
      className="w-full max-w-sm rounded-2xl border-none"
      style={{
        background: 'var(--antimetal-com-nero-80, rgba(255, 255, 255, 0.80))',
        boxShadow: '0 0 0 1px rgba(14, 63, 126, 0.04), 0 1px 1px -0.5px rgba(42, 51, 69, 0.04), 0 3px 3px -1.5px rgba(42, 51, 70, 0.04), 0 6px 6px -3px rgba(42, 51, 70, 0.04), 0 12px 12px -6px rgba(14, 63, 126, 0.04), 0 24px 24px -12px rgba(14, 63, 126, 0.04)'
      }}
    >
      <CardHeader className="pb-3">
        <CardTitle className="text-base">{props.title as string}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {(props.accounts as Record<string, unknown>[]) && (
          <div className="space-y-2">
            {(props.accounts as Record<string, unknown>[]).map((account: Record<string, unknown>) => (
              <div key={account.id as string} className="flex justify-between items-center">
                <span className="text-sm font-medium">{account.name as string}</span>
                <span className="text-sm text-muted-foreground">
                  ${(account.balance as number).toLocaleString()}
                </span>
              </div>
            ))}
            <Separator />
            <div className="flex justify-between items-center font-semibold">
              <span>Total</span>
                              <span>${(props.totalBalance as number)?.toLocaleString()}</span>
            </div>
          </div>
        )}
        {(props.services as Record<string, unknown>[]) && (
          <div className="space-y-2">
            {(props.services as Record<string, unknown>[]).map((service: Record<string, unknown>) => (
              <div key={service.id as string} className="flex justify-between items-center">
                <span className="text-sm font-medium">{service.name as string}</span>
                <span className="text-sm text-muted-foreground">
                  ${(service.amount as number).toLocaleString()}
                </span>
              </div>
            ))}
            <Separator />
            <div className="flex justify-between items-center font-semibold">
              <span>Total a pagar</span>
                              <span>${(props.totalAmount as number)?.toLocaleString()}</span>
            </div>
          </div>
        )}
        {(props.operations as string[]) && (
          <div className="space-y-2">
            {(props.operations as string[]).map((op: string, index: number) => (
              <div key={index} className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-primary rounded-full" />
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
        boxShadow: '0 0 0 1px rgba(14, 63, 126, 0.04), 0 1px 1px -0.5px rgba(42, 51, 69, 0.04), 0 3px 3px -1.5px rgba(42, 51, 70, 0.04), 0 6px 6px -3px rgba(42, 51, 70, 0.04), 0 12px 12px -6px rgba(14, 63, 126, 0.04), 0 24px 24px -12px rgba(14, 63, 126, 0.04)'
      }}
    >
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Tus Cuentas</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {(props.accounts as Record<string, unknown>[])?.map((account: Record<string, unknown>) => (
          <div
            key={account.id as string}
            className="flex items-center justify-between p-3 rounded-lg border cursor-pointer hover:bg-muted/50 transition-colors"
            onClick={() => openSheet(
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-4">{account.name as string}</h3>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary">
                      ${(account.balance as number).toLocaleString()}
                    </div>
                    <div className="text-sm text-muted-foreground">Saldo disponible</div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Número:</span>
                      <span className="text-sm font-mono">{account.number as string}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Tipo:</span>
                                              <Badge variant="secondary">{account.type as string}</Badge>
                    </div>
                  </div>
                </div>
              </div>
            )}
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                                  <span className="text-primary font-semibold">
                    {(account.name as string).charAt(0)}
                  </span>
              </div>
              <div>
                                  <div className="font-medium">{account.name as string}</div>
                  <div className="text-sm text-muted-foreground">{account.number as string}</div>
              </div>
            </div>
            <div className="text-right">
                              <div className="font-semibold">${(account.balance as number).toLocaleString()}</div>
                <Badge variant="outline" className="text-xs">
                  {account.type as string}
                </Badge>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )

  const renderServiceDetailList = (props: Record<string, unknown>) => (
    <Card 
      className="w-full max-w-sm rounded-2xl border-none"
      style={{
        background: 'var(--antimetal-com-nero-80, rgba(255, 255, 255, 0.80))',
        boxShadow: '0 0 0 1px rgba(14, 63, 126, 0.04), 0 1px 1px -0.5px rgba(42, 51, 69, 0.04), 0 3px 3px -1.5px rgba(42, 51, 70, 0.04), 0 6px 6px -3px rgba(42, 51, 70, 0.04), 0 12px 12px -6px rgba(14, 63, 126, 0.04), 0 24px 24px -12px rgba(14, 63, 126, 0.04)'
      }}
    >
      <CardHeader className="p-4 pb-3">
        <div className="flex items-center gap-2">
          <div className="text-xl">📋</div>
          <CardTitle className="text-base font-semibold">{props.title as string}</CardTitle>
        </div>
        {Array.isArray(props.services) && props.services.some((s: Record<string, unknown>) => s.status === 'overdue') && (
          <div className="mt-2 px-2 py-1 bg-red-100 text-red-700 text-xs font-medium rounded-md inline-flex items-center gap-1 self-start">
            <span className="text-red-600">⚠️</span>
            Tenés {props.services.filter((s: Record<string, unknown>) => s.status === 'overdue').length} factura{props.services.filter((s: Record<string, unknown>) => s.status === 'overdue').length > 1 ? 's' : ''} vencida{props.services.filter((s: Record<string, unknown>) => s.status === 'overdue').length > 1 ? 's' : ''}
          </div>
        )}
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <div className="space-y-3">
          {Array.isArray(props.services) && props.services.map((service: Record<string, unknown>) => (
            <div 
              key={service.id as string} 
              className={`p-3 rounded-lg border ${
                service.status === 'overdue' 
                  ? 'border-red-200 bg-red-50/50' 
                  : 'border-gray-200 bg-white'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="text-2xl mt-0.5">
                  {service.name === 'Edesur' && '💡'}
                  {service.name === 'Metrogas' && '🔥'}
                  {service.name === 'Telecentro' && '📡'}
                  {service.name === 'AySA' && '💧'}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold text-gray-900">{service.name as string}</h4>
                      <p className="text-sm text-gray-600">{service.provider as string}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg">${(service.amount as number).toLocaleString('es-AR')}</p>
                      <p className={`text-xs ${
                        service.status === 'overdue' ? 'text-red-600 font-medium' : 'text-gray-500'
                      }`}>
                        {service.status === 'overdue' ? 'Vencida' : `Vence ${service.dueDate as string}`}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {typeof props.totalAmount === 'number' && (
            <div className="pt-3 mt-3 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-600">Total a pagar:</span>
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

  const renderPaymentCta = (props: Record<string, unknown>) => (
    <Card 
      className="w-full max-w-sm rounded-2xl border-none"
      style={{
        background: 'var(--antimetal-com-nero-80, rgba(255, 255, 255, 0.80))',
        boxShadow: '0 0 0 1px rgba(14, 63, 126, 0.04), 0 1px 1px -0.5px rgba(42, 51, 69, 0.04), 0 3px 3px -1.5px rgba(42, 51, 70, 0.04), 0 6px 6px -3px rgba(42, 51, 70, 0.04), 0 12px 12px -6px rgba(14, 63, 126, 0.04), 0 24px 24px -12px rgba(14, 63, 126, 0.04)'
      }}
    >
      <CardContent className="p-4">
        <div className="text-center space-y-3">
          <div className="text-2xl">💳</div>
          <div>
            <h3 className="font-semibold">Servicios Pendientes</h3>
            <p className="text-sm text-muted-foreground">
              Total: ${props.totalAmount?.toLocaleString()}
            </p>
          </div>
          <Button 
            className="w-full"
            onClick={() => openSheet(
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-4">Pago de Servicios</h3>
                <div className="space-y-4">
                  {(props.services as Record<string, unknown>[])?.map((service: Record<string, unknown>) => (
                    <div key={service.id as string} className="flex items-center justify-between p-3 border rounded-lg">
                                              <div>
                          <div className="font-medium">{service.name as string}</div>
                          <div className="text-sm text-muted-foreground">{service.provider as string}</div>
                        </div>
                      <div className="text-right">
                                                  <div className="font-semibold">${(service.amount as number).toLocaleString()}</div>
                          <div className="text-xs text-muted-foreground">Vence: {service.dueDate as string}</div>
                      </div>
                    </div>
                  ))}
                  <Button className="w-full">Pagar Todo</Button>
                </div>
              </div>
            )}
          >
            Pagar Servicios
          </Button>
        </div>
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
            boxShadow: '0 0 0 1px rgba(14, 63, 126, 0.04), 0 1px 1px -0.5px rgba(42, 51, 69, 0.04), 0 3px 3px -1.5px rgba(42, 51, 70, 0.04), 0 6px 6px -3px rgba(42, 51, 70, 0.04), 0 12px 12px -6px rgba(14, 63, 126, 0.04), 0 24px 24px -12px rgba(14, 63, 126, 0.04)'
          }}
        >
          <CardContent className="p-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-green-900">{props.title as string}</h3>
              
              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10">
                  <AvatarFallback className="bg-green-600 text-white">
                    {(props.recipient as string)?.charAt(0) || 'T'}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-green-900">{props.recipient as string}</p>
                  <p className="text-sm text-green-700">{props.account as string}</p>
                </div>
              </div>
              
              <div className="text-center py-4">
                <p className="text-3xl font-bold text-green-900">
                  ${(props.amount as number).toLocaleString()}
                </p>
                <p className="text-sm text-green-700 mt-1">{props.accountType as string}</p>
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
          boxShadow: '0 0 0 1px rgba(14, 63, 126, 0.04), 0 1px 1px -0.5px rgba(42, 51, 69, 0.04), 0 3px 3px -1.5px rgba(42, 51, 70, 0.04), 0 6px 6px -3px rgba(42, 51, 70, 0.04), 0 12px 12px -6px rgba(14, 63, 126, 0.04), 0 24px 24px -12px rgba(14, 63, 126, 0.04)'
        }}
      >
        <CardContent className="p-4">
          <div className="text-center space-y-3">
            <div className="text-2xl">✅</div>
            <div>
              <h3 className="font-semibold">{props.title as string}</h3>
              {(props.steps as string[]) && (
                <div className="mt-3 space-y-2 text-left">
                  {(props.steps as string[]).map((step: string, index: number) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-5 h-5 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-primary text-xs font-bold">{index + 1}</span>
                      </div>
                      <span className="text-sm">{step}</span>
                    </div>
                  ))}
                </div>
              )}
              {(props.options as string[]) && (
                <div className="mt-3 space-y-2 text-left">
                  {(props.options as string[]).map((option: string, index: number) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-gray-400 rounded-full" />
                      <span className="text-sm">{option}</span>
                    </div>
                  ))}
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
      <div 
        className="w-full h-48 bg-muted rounded-lg flex items-center justify-center"
      >
        <span className="text-muted-foreground">Imagen: {(props.alt as string) || 'Sin título'}</span>
      </div>
    </div>
  )

  const renderWidget = () => {
    switch (widget.type) {
      case 'info-card':
        return renderInfoCard(widget.props)
      case 'account-list':
        return renderAccountList(widget.props)
      case 'payment-cta':
        return renderPaymentCta(widget.props)
      case 'confirmation':
        return renderConfirmation(widget.props)
      case 'service-detail-list':
        return renderServiceDetailList(widget.props)
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
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="flex justify-center my-0"
    >
      {renderWidget()}
    </motion.div>
  )
}
