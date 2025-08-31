'use client'

import { FlowDefinition } from '../types'
import { FlowContainer } from '../components/FlowContainer'
import { SelectList } from '../components/SelectList'
import { Button } from '../components'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button as UIButton } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { InlineWidget } from '@/lib/types'
import { WidgetComponentProps, createDomainWidgets } from '@/lib/widgets/registry'

/**
 * 🚀 TEMPLATE PARA NUEVOS DOMINIOS
 * 
 * Instrucciones:
 * 1. Copia este archivo y renómbralo (ej: mi-dominio.tsx)
 * 2. Reemplaza "Template" por el nombre de tu dominio
 * 3. Personaliza los tipos, widgets y flujos
 * 4. Registra los widgets en lib/widgets/index.tsx
 * 
 * ¡Listo para usar! 🎯
 */

// ==========================================
// 1️⃣ TIPOS ESPECÍFICOS DEL DOMINIO
// ==========================================

interface TemplateItemData {
  id: string
  name: string
  description?: string
  amount?: number
  status?: 'active' | 'pending' | 'completed'
  icon?: string
}

interface TemplateAccountData {
  id: string
  name: string
  balance: number
  type: string
}

// ==========================================
// 2️⃣ DATOS MOCK / CONSTANTES
// ==========================================

const templateItems: TemplateItemData[] = [
  {
    id: '1',
    name: 'Ejemplo Item 1',
    description: 'Descripción del primer item',
    amount: 1500,
    status: 'active',
    icon: '🎯'
  },
  {
    id: '2',
    name: 'Ejemplo Item 2', 
    description: 'Descripción del segundo item',
    amount: 2300,
    status: 'pending',
    icon: '⭐'
  }
]

const templateAccounts: TemplateAccountData[] = [
  { id: '1', name: 'Cuenta Principal', balance: 50000, type: 'Corriente' },
  { id: '2', name: 'Cuenta Ahorros', balance: 125000, type: 'Ahorros' }
]

// ==========================================
// 3️⃣ WIDGETS INLINE PERSONALIZADOS
// ==========================================

/**
 * Widget para mostrar lista de items del dominio
 */
export const TemplateItemList = ({ widget, openSheet }: WidgetComponentProps) => {
  const props = widget.props
  
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
          <div className="text-xl">📋</div>
          <CardTitle className="text-base font-semibold">{props.title as string}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <div className="space-y-3">
          {Array.isArray(props.items) && props.items.map((item: TemplateItemData) => (
            <div 
              key={item.id} 
              className="p-3 rounded-lg border border-gray-200 bg-white cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => openSheet(
                <TemplateItemBottomSheet item={item} />
              )}
            >
              <div className="flex items-start gap-3">
                <div className="text-2xl mt-0.5">{item.icon}</div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold text-gray-900">{item.name}</h4>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                    <div className="text-right">
                      {item.amount && (
                        <p className="font-bold text-lg">${item.amount.toLocaleString()}</p>
                      )}
                      <Badge variant={item.status === 'active' ? 'default' : 'secondary'}>
                        {item.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

/**
 * Widget CTA (Call-to-Action) del dominio
 */
export const TemplateCta = ({ widget, openSheet }: WidgetComponentProps) => {
  const props = widget.props
  
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
          <div className="text-2xl">{props.icon as string || '🎯'}</div>
          <div>
            <h3 className="font-semibold">{props.title as string}</h3>
            <p className="text-sm text-muted-foreground">
              {props.description as string}
            </p>
          </div>
          <UIButton 
            className="w-full"
            onClick={() => openSheet(
              <TemplateActionBottomSheet 
                title={props.title as string}
                items={props.items as TemplateItemData[]}
              />
            )}
          >
            {props.buttonText as string || 'Acción Principal'}
          </UIButton>
        </div>
      </CardContent>
    </Card>
  )
}

// ==========================================
// 4️⃣ BOTTOMSHEETS PERSONALIZADOS
// ==========================================

/**
 * BottomSheet para mostrar detalles de un item
 */
export const TemplateItemBottomSheet = ({ item }: { item: TemplateItemData }) => (
  <div className="p-6">
    <div className="flex items-center gap-3 mb-4">
      <span className="text-2xl">{item.icon}</span>
      <h3 className="text-lg font-semibold">{item.name}</h3>
    </div>
    
    <div className="space-y-4">
      <div>
        <p className="text-sm text-gray-600 mb-1">Descripción</p>
        <p className="font-medium">{item.description}</p>
      </div>
      
      {item.amount && (
        <div>
          <p className="text-sm text-gray-600 mb-1">Monto</p>
          <p className="text-2xl font-bold">${item.amount.toLocaleString()}</p>
        </div>
      )}
      
      <div>
        <p className="text-sm text-gray-600 mb-1">Estado</p>
        <Badge variant={item.status === 'active' ? 'default' : 'secondary'}>
          {item.status}
        </Badge>
      </div>
      
      <div className="pt-4 space-y-2">
        <UIButton className="w-full">Acción Principal</UIButton>
        <UIButton variant="outline" className="w-full">Acción Secundaria</UIButton>
      </div>
    </div>
  </div>
)

/**
 * BottomSheet para acciones principales del dominio
 */
export const TemplateActionBottomSheet = ({ 
  title, 
  items 
}: { 
  title: string
  items: TemplateItemData[] 
}) => (
  <div className="p-6">
    <h3 className="text-lg font-semibold mb-4">{title}</h3>
    
    <div className="space-y-4">
      {items?.map((item) => (
        <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
          <div className="flex items-center gap-3">
            <span className="text-xl">{item.icon}</span>
            <div>
              <div className="font-medium">{item.name}</div>
              <div className="text-sm text-muted-foreground">{item.description}</div>
            </div>
          </div>
          <div className="text-right">
            {item.amount && (
              <div className="font-semibold">${item.amount.toLocaleString()}</div>
            )}
            <Badge variant="outline" className="text-xs">
              {item.status}
            </Badge>
          </div>
        </div>
      ))}
      
      <div className="pt-4">
        <UIButton className="w-full">Procesar Todo</UIButton>
      </div>
    </div>
  </div>
)

// ==========================================
// 5️⃣ REGISTRO DE WIDGETS DEL DOMINIO
// ==========================================

export const templateWidgets = createDomainWidgets({
  'template-item-list': TemplateItemList,
  'template-cta': TemplateCta,
  // Agregar más widgets aquí...
})

// ==========================================
// 6️⃣ DEFINICIÓN DEL FLUJO (OPCIONAL)
// ==========================================

export const templateFlow: FlowDefinition = {
  id: 'template',
  name: 'Template Domain',
  
  triggers: [
    'template',
    'ejemplo',
    'demo',
    /template|ejemplo/i
  ],
  
  steps: [
    {
      id: 'select-item',
      title: 'Seleccionar Item',
      render: ({ onNext, onBack, isFirstStep }) => (
        <FlowContainer 
          title="Selecciona un item"
          onBack={onBack}
          showBack={!isFirstStep}
        >
          <div className="py-4">
            <div className="space-y-3">
              {templateItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => onNext({ selectedItem: item })}
                  className="w-full p-4 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 transition-all text-left"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{item.icon}</span>
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </FlowContainer>
      )
    },
    
    {
      id: 'select-account',
      title: 'Seleccionar Cuenta',
      render: ({ data, onNext, onBack }) => (
        <FlowContainer 
          title="¿Desde qué cuenta?"
          onBack={onBack}
          showBack={true}
        >
          <div className="py-4">
            {/* Item seleccionado */}
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{(data.selectedItem as TemplateItemData).icon}</span>
                <div className="flex-1">
                  <p className="font-medium">{(data.selectedItem as TemplateItemData).name}</p>
                  <p className="text-sm text-gray-600">{(data.selectedItem as TemplateItemData).description}</p>
                </div>
              </div>
            </div>
            
            {/* Cuentas */}
            <SelectList
              items={templateAccounts}
              keyExtractor={a => a.id}
              onSelect={(account) => onNext({ selectedAccount: account })}
              renderItem={(account) => (
                <div className="flex-1">
                  <p className="font-medium">{account.name}</p>
                  <p className="text-sm text-gray-600">
                    Saldo: ${account.balance.toLocaleString()} • {account.type}
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
      title: 'Confirmar',
      render: ({ data, onNext, onBack }) => (
        <FlowContainer 
          title="Confirmar acción"
          onBack={onBack}
          showBack={true}
        >
          <div className="py-4">
            <div className="space-y-4">
              {/* Resumen */}
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-2">Resumen</p>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Item:</span>
                    <span className="font-medium">{(data.selectedItem as TemplateItemData).name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cuenta:</span>
                    <span className="font-medium">{(data.selectedAccount as TemplateAccountData).name}</span>
                  </div>
                </div>
              </div>
              
              <Button
                onClick={() => onNext()}
                className="w-full mt-6 py-3"
              >
                Confirmar Acción
              </Button>
            </div>
          </div>
        </FlowContainer>
      )
    }
  ],
  
  onComplete: (data) => {
    console.log('Template flow completado:', data)
    // Aquí iría la lógica de completado específica del dominio
  }
}

// ==========================================
// 📝 INSTRUCCIONES PARA USAR ESTE TEMPLATE
// ==========================================

/*
PASOS PARA CREAR UN NUEVO DOMINIO:

1. COPIAR Y RENOMBRAR:
   - Copia este archivo: _template.tsx → mi-dominio.tsx
   
2. BUSCAR Y REEMPLAZAR:
   - "Template" → "MiDominio"
   - "template" → "mi-dominio"
   - Actualizar tipos, datos mock, etc.

3. PERSONALIZAR WIDGETS:
   - Modifica TemplateItemList → MiDominioItemList
   - Modifica TemplateCta → MiDominioCta
   - Agrega widgets específicos de tu dominio

4. PERSONALIZAR BOTTOMSHEETS:
   - Modifica TemplateItemBottomSheet
   - Modifica TemplateActionBottomSheet
   - Agrega BottomSheets específicos

5. REGISTRAR WIDGETS:
   - Actualiza el objeto templateWidgets
   - Agrega en lib/widgets/index.tsx:
     import { miDominioWidgets } from './cases/mi-dominio'
     registerWidgets({ ...paymentWidgets, ...miDominioWidgets })

6. PERSONALIZAR FLUJO (opcional):
   - Modifica templateFlow según tu caso de uso
   - Actualiza triggers, steps, onComplete

7. PROBAR:
   - npm run build
   - Verificar que no hay errores
   - Probar en la aplicación

¡Listo! Tu nuevo dominio estará funcionando 🚀
*/
