'use client'

// 🤖 Este archivo es generado automáticamente por scripts/auto-register-widgets.ts
// No editar manualmente - los cambios se perderán

// Import domain-specific widgets
import { balanceWidgets } from '@/lib/flows/cases/balance'
import { paymentWidgets } from '@/lib/flows/cases/payment'
import { transferWidgets } from '@/lib/flows/cases/transfer'
import { registerWidgets } from './registry'

// Register all domain widgets
registerWidgets({
  ...balanceWidgets,
  ...paymentWidgets,
  ...transferWidgets,
  // Add other domain widgets here as they are created
})

// Re-export registry functions for convenience
export { getWidgetComponent, getRegisteredWidgetTypes, debugWidgetRegistry } from './registry'
export type { WidgetComponent, WidgetComponentProps, WidgetRegistry } from './registry'
