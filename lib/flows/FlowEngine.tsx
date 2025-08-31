'use client'

import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { FlowDefinition, FlowState } from './types'

interface FlowEngineProps {
  flow: FlowDefinition
  onComplete: (data: Record<string, unknown>) => void
  onCancel: () => void
  initialData?: Record<string, unknown>
}

export const FlowEngine = ({
  flow,
  onComplete,
  onCancel,
  initialData = {},
}: FlowEngineProps) => {
  const [state, setState] = useState<FlowState>({
    currentStep: 0,
    data: initialData,
    history: [],
  })

  const currentStep = flow.steps[state.currentStep]

  const goNext = (stepData?: Record<string, unknown>) => {
    const newData = { ...state.data, ...stepData }

    // Si es el último paso, completar
    if (state.currentStep >= flow.steps.length - 1) {
      onComplete(newData)
      flow.onComplete(newData, {
        /* context */
      })
      return
    }

    // Avanzar al siguiente paso
    setState({
      currentStep: state.currentStep + 1,
      data: newData,
      history: [...state.history, state.currentStep],
    })
  }

  const goBack = () => {
    if (state.history.length === 0) {
      onCancel()
      return
    }

    const newHistory = [...state.history]
    const previousStep = newHistory.pop()!

    setState({
      ...state,
      currentStep: previousStep,
      history: newHistory,
    })
  }

  return (
    <AnimatePresence mode="wait">
      <div key={currentStep.id}>
        {currentStep.render({
          data: state.data,
          onNext: goNext,
          onBack: goBack,
          isFirstStep: state.currentStep === 0,
        })}
      </div>
    </AnimatePresence>
  )
}
