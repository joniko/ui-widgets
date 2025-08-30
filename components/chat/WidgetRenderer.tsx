'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
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
    <Card className="w-full max-w-sm">
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
    <Card className="w-full max-w-sm">
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

  const renderPaymentCta = (props: Record<string, unknown>) => (
    <Card className="w-full max-w-sm">
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

  const renderConfirmation = (props: Record<string, unknown>) => (
    <Card className="w-full max-w-sm">
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

  const renderImage = (props: Record<string, unknown>) => (
    <div className="w-full max-w-sm">
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
      className="flex justify-center my-4"
    >
      {renderWidget()}
    </motion.div>
  )
}
