export type Role = 'user' | 'assistant' | 'system'

export type WidgetType =
  | 'info-card'
  | 'account-list'
  | 'payment-cta'
  | 'transfer-form'
  | 'confirmation'
  | 'image'

export type InlineWidget = {
  id: string
  type: WidgetType
  props: Record<string, unknown>
}

export type ChatBlock =
  | { kind: 'text'; text: string }
  | { kind: 'widget'; widget: InlineWidget }

export type Message = {
  id: string
  role: Role
  blocks: ChatBlock[]
  createdAt: string
}

export type QuickReply = { 
  id: string 
  label: string 
  payload?: Record<string, unknown>
}

export type DemoContext = {
  openSheet: (node: React.ReactNode, opts?: { snapPoints?: number[]; initialSnap?: number }) => void
  pushAssistantMessage: (msg: Message) => void
  pushUserMessage: (text: string) => void
}

export type DemoDefinition = {
  slug: string
  title: string
  description?: string
  icon?: string
  initialMessages: Message[]
  initialQuickReplies?: QuickReply[]
  onQuickReply?: (qr: QuickReply, ctx: DemoContext) => void
  onUserMessage?: (text: string, ctx: DemoContext) => void
}
