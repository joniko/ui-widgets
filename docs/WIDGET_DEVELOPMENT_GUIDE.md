# 🚀 Guía de Desarrollo de Widgets y Casos de Uso

## 📋 Resumen
Esta guía te ayudará a crear **casos de uso completos** en un solo archivo, incluyendo:
- ✅ Widgets inline personalizados
- ✅ BottomSheets específicos del dominio  
- ✅ Flujos de conversación
- ✅ Registro automático de componentes

## 🏗️ Arquitectura

### Estructura de un archivo de caso de uso:
```
lib/flows/cases/mi-dominio.tsx
├── Tipos específicos del dominio
├── Datos mock/constantes
├── Widgets inline personalizados
├── BottomSheets personalizados
├── Registro de widgets
└── Definición del flujo
```

## 🎯 Paso a Paso: Crear un Nuevo Caso de Uso

### 1. Crear el archivo del dominio
```typescript
// lib/flows/cases/mi-dominio.tsx
'use client'

import { FlowDefinition } from '../types'
import { FlowContainer } from '../components/FlowContainer'
import { Button } from '../components'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button as UIButton } from '@/components/ui/button'
import { InlineWidget } from '@/lib/types'

// 1️⃣ TIPOS ESPECÍFICOS DEL DOMINIO
interface MiDomainData {
  id: string
  name: string
  // ... otros campos
}

// 2️⃣ DATOS MOCK (opcional)
const mockData = [
  { id: '1', name: 'Ejemplo 1' },
  // ...
]

// 3️⃣ WIDGETS INLINE PERSONALIZADOS
export const MiWidgetPersonalizado = ({ 
  widget, 
  openSheet 
}: { 
  widget: InlineWidget
  openSheet: (node: React.ReactNode) => void 
}) => {
  const props = widget.props
  
  return (
    <Card className="w-full max-w-sm rounded-2xl border-none">
      <CardContent className="p-4">
        <div className="text-center space-y-3">
          <div className="text-2xl">🎯</div>
          <h3 className="font-semibold">{props.title as string}</h3>
          <UIButton 
            className="w-full"
            onClick={() => openSheet(
              <MiBottomSheetPersonalizado data={props.data} />
            )}
          >
            {props.buttonText as string}
          </UIButton>
        </div>
      </CardContent>
    </Card>
  )
}

// 4️⃣ BOTTOMSHEETS PERSONALIZADOS
export const MiBottomSheetPersonalizado = ({ data }: { data: any }) => (
  <div className="p-6">
    <h3 className="text-lg font-semibold mb-4">Mi BottomSheet</h3>
    <div className="space-y-4">
      {/* Contenido personalizado */}
      <UIButton className="w-full">Acción Principal</UIButton>
    </div>
  </div>
)

// 5️⃣ REGISTRO DE WIDGETS DEL DOMINIO
export const miDominioWidgets = {
  'mi-widget-personalizado': MiWidgetPersonalizado,
  // Agregar más widgets aquí...
}

// 6️⃣ DEFINICIÓN DEL FLUJO
export const miDominioFlow: FlowDefinition = {
  id: 'mi-dominio',
  name: 'Mi Dominio',
  
  triggers: [
    'mi trigger',
    'otra palabra clave',
    /regex-pattern/i
  ],
  
  steps: [
    {
      id: 'step-1',
      title: 'Primer Paso',
      render: ({ onNext, onBack, isFirstStep }) => (
        <FlowContainer 
          title="Mi Primer Paso"
          onBack={onBack}
          showBack={!isFirstStep}
        >
          {/* Contenido del paso */}
          <Button onClick={() => onNext({ data: 'ejemplo' })}>
            Continuar
          </Button>
        </FlowContainer>
      )
    }
  ],
  
  onComplete: (data) => {
    console.log('Flujo completado:', data)
  }
}
```

### 2. Registrar los widgets
Agregar al archivo `lib/widgets/index.tsx`:

```typescript
// Importar los nuevos widgets
import { miDominioWidgets } from '@/lib/flows/cases/mi-dominio'

// Registrar en el objeto principal
registerWidgets({
  ...paymentWidgets,
  ...miDominioWidgets, // ← Agregar aquí
})
```

### 3. Registrar el flujo (si aplica)
Si tu caso incluye flujos conversacionales, agregar en el archivo correspondiente.

## 🎨 Widgets Disponibles

### Widgets Genéricos (ya disponibles):
- `info-card` - Tarjeta informativa
- `account-list` - Lista de cuentas
- `confirmation` - Confirmación genérica
- `image` - Imagen

### Widgets Específicos de Dominio:
- `service-detail-list` (Payment) - Lista detallada de servicios
- `payment-cta` (Payment) - Call-to-action de pagos

## 🔧 Helpers y Utilidades

### Estilos Consistentes
Usa estos estilos base para mantener consistencia:

```typescript
const cardStyle = {
  background: 'var(--antimetal-com-nero-80, rgba(255, 255, 255, 0.80))',
  boxShadow: '0 0 0 1px rgba(14, 63, 126, 0.04), 0 1px 1px -0.5px rgba(42, 51, 69, 0.04), 0 3px 3px -1.5px rgba(42, 51, 70, 0.04), 0 6px 6px -3px rgba(42, 51, 70, 0.04), 0 12px 12px -6px rgba(14, 63, 126, 0.04), 0 24px 24px -12px rgba(14, 63, 126, 0.04)'
}
```

### Componentes UI Disponibles
```typescript
import { 
  Card, CardContent, CardHeader, CardTitle,
  Button, Badge, Separator, Avatar, AvatarFallback
} from '@/components/ui/*'
```

## 📝 Ejemplos Reales

### Ejemplo: Payment Domain
Ver `lib/flows/cases/payment.tsx` para un ejemplo completo que incluye:
- ✅ 2 widgets personalizados
- ✅ 1 BottomSheet personalizado  
- ✅ Flujo completo de 3 pasos
- ✅ Registro de widgets

## 🚀 Mejores Prácticas

### ✅ DO:
- Mantén todo el código del dominio en un solo archivo
- Usa nombres descriptivos para widgets (`payment-cta`, `transfer-form`)
- Incluye TypeScript types específicos del dominio
- Reutiliza componentes UI existentes
- Usa el sistema de registro de widgets

### ❌ DON'T:
- No modifiques `WidgetRenderer.tsx` directamente
- No hardcodees estilos, usa las variables CSS
- No olvides registrar los widgets en `lib/widgets/index.tsx`
- No mezcles lógica de diferentes dominios

## 🔄 Flujo de Desarrollo

1. **Crear** → Nuevo archivo en `lib/flows/cases/`
2. **Desarrollar** → Widgets + BottomSheets + Flujo
3. **Registrar** → Agregar widgets a `lib/widgets/index.tsx`
4. **Probar** → `npm run build` y verificar
5. **Deployar** → `git push`

## 🆘 Troubleshooting

### Widget no aparece
- ✅ Verificar que esté registrado en `lib/widgets/index.tsx`
- ✅ Verificar el nombre del tipo de widget
- ✅ Verificar imports

### Errores de TypeScript
- ✅ Verificar que los props del widget coincidan con `InlineWidget`
- ✅ Verificar imports de tipos

### Estilos inconsistentes
- ✅ Usar las variables CSS del design system
- ✅ Seguir la estructura de Card base

---

¿Necesitas ayuda? Revisa los ejemplos existentes o consulta con el equipo de arquitectura.
