'use client'

import React from 'react'
import { InlineWidget } from '@/lib/types'

// Type for widget component props
export interface WidgetComponentProps {
  widget: InlineWidget
  openSheet: (node: React.ReactNode, opts?: { snapPoints?: number[]; initialSnap?: number }) => void
}

// Type for widget component
export type WidgetComponent = React.ComponentType<WidgetComponentProps>

// Widget registry type
export type WidgetRegistry = Record<string, WidgetComponent>

// Helper type for creating domain widget registries
export type DomainWidgetRegistry<T extends string> = Record<T, WidgetComponent>

// Global widget registry
const globalWidgetRegistry: WidgetRegistry = {}

// Register widgets from a domain
export const registerWidgets = (widgets: WidgetRegistry) => {
  Object.assign(globalWidgetRegistry, widgets)
  console.log('🎯 Widgets registrados:', Object.keys(widgets))
}

// Get widget component by type
export const getWidgetComponent = (type: string): WidgetComponent | null => {
  return globalWidgetRegistry[type] || null
}

// Get all registered widget types
export const getRegisteredWidgetTypes = (): string[] => {
  return Object.keys(globalWidgetRegistry)
}

// Helper function to create a domain widget registry with type safety
export const createDomainWidgets = <T extends string>(
  widgets: DomainWidgetRegistry<T>
): WidgetRegistry => {
  return widgets as WidgetRegistry
}

// Debug function to see all registered widgets
export const debugWidgetRegistry = () => {
  console.log('🔍 Widgets registrados:', globalWidgetRegistry)
  return globalWidgetRegistry
}
