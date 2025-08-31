# 🎯 Sistema de Widgets por Dominio

## 🚀 Resumen

Sistema modular que permite a cada equipo crear widgets y casos de uso completos en un solo archivo, manteniendo el código organizado y fácil de mantener.

## 📁 Estructura

```
lib/widgets/
├── registry.tsx          # Sistema de registro central
├── index.tsx            # Auto-generado: registro de todos los widgets
└── README.md           # Esta documentación

lib/flows/cases/
├── _template.tsx       # Template para nuevos dominios
├── payment.tsx         # Ejemplo: dominio de pagos
├── transfer.tsx        # Ejemplo: dominio de transferencias
└── ...                # Otros dominios
```

## ⚡ Uso Rápido

### 1. Crear nuevo dominio

```bash
# Copiar template
cp lib/flows/cases/_template.tsx lib/flows/cases/mi-dominio.tsx

# Editar y personalizar
# (Ver instrucciones en _template.tsx)
```

### 2. Auto-registro

```bash
# Registrar automáticamente todos los widgets
npm run register-widgets

# O automáticamente antes del build
npm run build  # ejecuta prebuild que registra widgets
```

### 3. ¡Listo!

Los widgets están disponibles automáticamente en toda la aplicación.

## 🏗️ Arquitectura

### Flujo de Registro

1. **Desarrollo**: Crear widgets en `cases/mi-dominio.tsx`
2. **Auto-detección**: Script detecta `export const miDominioWidgets`
3. **Registro**: Genera automáticamente `lib/widgets/index.tsx`
4. **Uso**: Widgets disponibles en `WidgetRenderer`

### Beneficios

- ✅ **Un solo archivo por dominio**: Todo junto, fácil de mantener
- ✅ **Auto-registro**: No hay que editar archivos centrales
- ✅ **Type-safe**: TypeScript completo con helpers
- ✅ **Escalable**: Agregar dominios sin tocar código existente
- ✅ **Modular**: Cada equipo trabaja independiente

## 🔧 API

### Crear Widget

```typescript
export const MiWidget = ({ widget, openSheet }: WidgetComponentProps) => {
  // Tu implementación
}
```

### Registrar Widgets

```typescript
export const miDominioWidgets = createDomainWidgets({
  'mi-widget-tipo': MiWidget,
  'otro-widget': OtroWidget,
})
```

### Usar en Mensajes

```typescript
{
  kind: 'widget',
  widget: {
    id: 'unique-id',
    type: 'mi-widget-tipo',  // ← Debe coincidir con el registro
    props: { /* datos */ }
  }
}
```

## 🛠️ Scripts Disponibles

```bash
# Auto-registrar widgets
npm run register-widgets

# Crear nuevo demo/caso
npm run scaffold-demo

# Build (incluye auto-registro)
npm run build
```

## 📚 Documentación Completa

Ver: `docs/WIDGET_DEVELOPMENT_GUIDE.md`

## 🆘 Troubleshooting

### Widget no aparece

1. ✅ Verificar `export const miDominioWidgets`
2. ✅ Ejecutar `npm run register-widgets`
3. ✅ Verificar nombre del tipo en el mensaje

### Error de tipos

1. ✅ Usar `WidgetComponentProps` en la función
2. ✅ Usar `createDomainWidgets()` para el registro
3. ✅ Verificar imports

### Auto-registro no funciona

1. ✅ Verificar que el archivo no empiece con `_`
2. ✅ Verificar `export const *Widgets =`
3. ✅ Ejecutar manualmente `npm run register-widgets`

---

💡 **Tip**: Usa el template `_template.tsx` como punto de partida para nuevos dominios.
