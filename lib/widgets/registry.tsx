'use client'

import React from 'react'
import { InlineWidget } from '@/lib/types'

// Type for widget component
export type WidgetComponent = React.ComponentType<{
  widget: InlineWidget
  openSheet: (node: React.ReactNode) => void
}>

// Widget registry type
export type WidgetRegistry = Record<string, WidgetComponent>

// Global widget registry
const globalWidgetRegistry: WidgetRegistry = {}

// Register widgets from a domain
export const registerWidgets = (widgets: WidgetRegistry) => {
  Object.assign(globalWidgetRegistry, widgets)
}

// Get widget component by type
export const getWidgetComponent = (type: string): WidgetComponent | null => {
  return globalWidgetRegistry[type] || null
}

// Get all registered widget types
export const getRegisteredWidgetTypes = (): string[] => {
  return Object.keys(globalWidgetRegistry)
}
