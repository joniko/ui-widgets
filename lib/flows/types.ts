// Tipos para el sistema de flujos
export interface FlowStepProps {
  data: Record<string, unknown>
  onNext: (newData?: Record<string, unknown>) => void
  onBack: () => void
  isFirstStep: boolean
}

export interface FlowStep {
  id: string
  title: string
  render: (props: FlowStepProps) => React.ReactNode
  onNext?: (data: Record<string, unknown>) => Record<string, unknown>
  validate?: (data: Record<string, unknown>) => boolean | string
}

export interface FlowDefinition {
  id: string
  name: string
  triggers: (string | RegExp | ((text: string) => boolean))[]
  steps: FlowStep[]
  onComplete: (
    data: Record<string, unknown>,
    ctx: Record<string, unknown>,
  ) => void
}

export interface FlowState {
  currentStep: number
  data: Record<string, unknown>
  history: number[]
}
