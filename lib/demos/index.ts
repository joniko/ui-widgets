import { DemoDefinition } from '../types'
import { transferDemo } from './transfer'
import { payServiceDemo } from './pay-service'
import { helpDemo } from './help'
import { mainAssistantDemo } from './main-assistant'
import { unifiedAssistantDemo } from './unified-assistant'

export const DEMO_REGISTRY: Record<string, DemoDefinition> = {
  'unified': unifiedAssistantDemo,
  'main-assistant': mainAssistantDemo,
  transfer: transferDemo,
  'pay-service': payServiceDemo,
  help: helpDemo
}

export const DEMOS = Object.values(DEMO_REGISTRY)

export function getDemo(slug: string): DemoDefinition | null {
  return DEMO_REGISTRY[slug] ?? null
}

export function getAllDemos(): DemoDefinition[] {
  return DEMOS
}
