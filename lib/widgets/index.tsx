'use client'

// Import domain-specific widgets
import { paymentWidgets } from '@/lib/flows/cases/payment'
import { registerWidgets } from './registry'

// Register all domain widgets
registerWidgets({
  ...paymentWidgets,
  // Add other domain widgets here as they are created
  // ...transferWidgets,
  // ...balanceWidgets,
})

// Re-export registry functions for convenience
export { getWidgetComponent, getRegisteredWidgetTypes } from './registry'
