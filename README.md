# Chat Agéntico - Prototipo con Widgets Inline

Un prototipo completo que demuestra cómo funcionará un chat agéntico donde el asistente puede insertar widgets interactivos entre mensajes y resolver flujos complejos en un bottom sheet con gestos.

## 🚀 Características

- **Chat Inteligente**: Conversación natural con asistente que entiende contexto
- **Widgets Inline**: Cards, listados y CTAs que se insertan dinámicamente
- **Bottom Sheet**: Flujos complejos con snap points, gestos y soporte para teclado
- **Quick Replies**: Botones de respuesta rápida sobre el compositor
- **Demos Interactivos**: Múltiples escenarios para probar la funcionalidad
- **Responsive**: Optimizado para móvil y desktop

## 🛠️ Stack Tecnológico

- **Next.js 14** - App Router + TypeScript
- **TailwindCSS** - Utility-first CSS
- **shadcn/ui** - Componentes accesibles y consistentes
- **Vaul** - Bottom sheet nativo con gestos
- **Framer Motion** - Animaciones fluidas para widgets
- **Zod** - Validación de datos
- **Lucide React** - Íconos consistentes
- **Sonner** - Notificaciones toast

## 📦 Instalación

1. **Clonar el repositorio**
   ```bash
   git clone <repo-url>
   cd ui-widgets
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Ejecutar en desarrollo**
   ```bash
   npm run dev
   ```

4. **Abrir en el navegador**
   ```
   http://localhost:3000
   ```

## 🎯 Demos Disponibles

### 1. Transferencia de Dinero (`/demos/transfer`)
- Gestiona transferencias entre cuentas
- Widgets de resumen de cuentas
- Bottom sheet con formulario de transferencia

### 2. Pago de Servicios (`/demos/pay-service`)
- Paga facturas de servicios públicos
- Lista de servicios pendientes
- Formulario de pago en bottom sheet

### 3. Ayuda Contextual (`/demos/help`)
- Obtén ayuda paso a paso
- Guías interactivas
- Información de contacto

## 🏗️ Arquitectura

### Estructura de Archivos
```
app/
  layout.tsx                 # Layout principal
  page.tsx                   # Página de inicio
  (chat)/
    demos/
      page.tsx               # Índice de demos
      [slug]/
        page.tsx             # Página de demo individual
components/
  chat/                      # Componentes del chat
    ChatLayout.tsx           # Layout principal del chat
    MessageList.tsx          # Lista de mensajes
    MessageBubble.tsx        # Burbuja de mensaje individual
    InlineWidget.tsx         # Wrapper para widgets inline
    WidgetRenderer.tsx       # Renderizador de widgets
    QuickReplies.tsx         # Respuestas rápidas
    ChatComposer.tsx         # Compositor de mensajes
  drawers/                   # Sistema de bottom sheet
    BottomSheet.tsx          # Componente principal
    useBottomSheet.ts        # Hook y contexto
  nav/
    AppHeader.tsx            # Header con navegación
lib/
  types.ts                   # Tipos TypeScript
  agenticMocks.ts            # Datos mock y utilidades
  demos/                     # Definiciones de demos
    index.ts                 # Registro de demos
    transfer.ts              # Demo de transferencia
    pay-service.ts           # Demo de pago
    help.ts                  # Demo de ayuda
```

### Flujo de Datos
1. **Demo Definition** define mensajes iniciales y quick replies
2. **ChatLayout** orquesta la conversación
3. **WidgetRenderer** renderiza widgets según su tipo
4. **BottomSheet** maneja flujos complejos
5. **Demo Context** permite comunicación entre componentes

## 🎨 Widgets Disponibles

### Tipos de Widget
- `info-card`: Cards informativas con datos
- `account-list`: Lista de cuentas clicables
- `payment-cta`: Botones de llamada a la acción
- `transfer-form`: Formularios de transferencia
- `confirmation`: Resúmenes con confirmación
- `image`: Imágenes con soporte responsive

### Crear Nuevos Widgets
1. Agregar el tipo en `lib/types.ts`
2. Implementar el renderizado en `WidgetRenderer.tsx`
3. Usar en los demos con `createWidgetBlock()`

## 🔧 Crear Nuevos Demos

### Usando el Script de Scaffold
```bash
npm run scaffold-demo "Mi Demo" "mi-demo" "Descripción del demo" "🚀"
```

### Manualmente
1. Crear archivo en `lib/demos/[slug].ts`
2. Exportar `DemoDefinition`
3. Agregar al registro en `lib/demos/index.ts`
4. Implementar handlers `onQuickReply` y `onUserMessage`

### Estructura de Demo
```typescript
export const miDemo: DemoDefinition = {
  slug: 'mi-demo',
  title: 'Mi Demo',
  description: 'Descripción del demo',
  icon: '🚀',
  initialMessages: [...],
  initialQuickReplies: [...],
  onQuickReply: (qr, ctx) => {
    // Lógica para quick replies
  },
  onUserMessage: (text, ctx) => {
    // Lógica para mensajes del usuario
  }
}
```

## 📱 Bottom Sheet

### Características
- **Snap Points**: Múltiples alturas configurables
- **Gestos**: Drag to dismiss, snap to points
- **Teclado**: `repositionInputs` para inputs
- **Overlay**: Animado y configurable
- **Modal**: Soporte para modo no-modal

### Uso
```typescript
const ctx: DemoContext = {
  openSheet: (node, options) => {
    // Abrir bottom sheet con contenido
  }
}

// En un demo
ctx.openSheet(
  <div>Contenido del sheet</div>,
  { snapPoints: [0.25, 0.5, 0.9], initialSnap: 0.5 }
)
```

## 🎭 Animaciones

### Widgets Inline
- Fade + slide sutil (8-12px)
- Duración: 180-220ms
- Easing: easeOut
- Stagger en quick replies

### Bottom Sheet
- Curva iOS-like (proporcionada por Vaul)
- Overlay con opacidad vinculada al drag
- Transiciones suaves entre snap points

## ♿ Accesibilidad

- **Focus Management**: Manejo correcto del foco
- **ARIA Labels**: Etiquetas descriptivas
- **Keyboard Navigation**: Navegación por teclado
- **Screen Readers**: Compatible con lectores de pantalla
- **Reduced Motion**: Respeto a preferencias de movimiento

## 🌙 Tema

- **Modo Claro/Oscuro**: Soporte automático
- **CSS Variables**: Tokens de shadcn/ui
- **Consistencia**: Diseño system coherente
- **Responsive**: Mobile-first approach

## 🚀 Scripts Disponibles

```bash
npm run dev          # Desarrollo
npm run build        # Build de producción
npm run start        # Servidor de producción
npm run lint         # Linting
npm run scaffold-demo # Crear nuevo demo
```

## 📝 Notas de Desarrollo

### Consideraciones de Performance
- Widgets renderizados bajo demanda
- Lazy loading de componentes pesados
- Optimización de re-renders

### Estado del Bottom Sheet
- Contexto compartido entre componentes
- Estado local para cada instancia
- Cleanup automático al cerrar

### Manejo de Errores
- Fallbacks para widgets no soportados
- Error boundaries en componentes críticos
- Logging para debugging

## 🤝 Contribuir

1. Fork el repositorio
2. Crea una rama para tu feature
3. Implementa los cambios
4. Agrega tests si es necesario
5. Envía un pull request

## 📄 Licencia

MIT License - ver [LICENSE](LICENSE) para detalles.

## 🙏 Agradecimientos

- [shadcn/ui](https://ui.shadcn.com/) por los componentes base
- [Vaul](https://vaul.emilkowal.ski/) por el bottom sheet
- [Framer Motion](https://www.framer.com/motion/) por las animaciones
- [Next.js](https://nextjs.org/) por el framework
