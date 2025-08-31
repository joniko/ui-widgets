'use client'

import { useState } from 'react'
import { FlowEngine } from './FlowEngine'
import { FlowDefinition } from './types'

// Importar todos los casos
import { transferFlow } from './cases/transfer'
import { paymentFlow } from './cases/payment'
import { balanceFlow } from './cases/balance'

const flows: FlowDefinition[] = [
  transferFlow,
  paymentFlow,
  balanceFlow
]

interface UnifiedChatProps {
  onMessage: (text: string) => void
}

export const UnifiedChat = ({ onMessage }: UnifiedChatProps) => {
  const [activeFlow, setActiveFlow] = useState<FlowDefinition | null>(null)
  
  const detectFlow = (text: string): FlowDefinition | null => {
    for (const flow of flows) {
      const lowerText = text.toLowerCase()
      if (flow.triggers.some(trigger => {
        if (typeof trigger === 'string') {
          return lowerText.includes(trigger.toLowerCase())
        }
        if (trigger instanceof RegExp) {
          return trigger.test(text)
        }
        if (typeof trigger === 'function') {
          return trigger(text)
        }
        return false
      })) {
        return flow
      }
    }
    return null
  }
  
  const handleUserMessage = (text: string) => {
    const flow = detectFlow(text)
    if (flow) {
      setActiveFlow(flow)
    } else {
      onMessage(text)
    }
  }
  
  if (activeFlow) {
    return (
      <FlowEngine
        flow={activeFlow}
        onComplete={(data) => {
          console.log('Flow completed:', data)
          setActiveFlow(null)
        }}
        onCancel={() => setActiveFlow(null)}
      />
    )
  }
  
  // Tu chat normal aquí
  return (
    <div>
      {/* Chat interface */}
    </div>
  )
}
