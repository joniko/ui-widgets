'use client'

import { useState, useCallback } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Message, QuickReply, DemoContext } from '@/lib/types'
import { createMessage, createTextBlock } from '@/lib/agenticMocks'
import { MessageList } from './MessageList'
import { QuickReplies } from './QuickReplies'
import { ChatComposer } from './ChatComposer'
import { useBottomSheet } from '@/components/drawers/useBottomSheet'

interface ChatLayoutProps {
  initialMessages: Message[]
  initialQuickReplies?: QuickReply[]
  onQuickReply?: (qr: QuickReply, ctx: DemoContext) => void
  onUserMessage?: (text: string, ctx: DemoContext) => void
}

export function ChatLayout({
  initialMessages,
  initialQuickReplies = [],
  onQuickReply,
  onUserMessage
}: ChatLayoutProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [quickReplies, setQuickReplies] = useState<QuickReply[]>(initialQuickReplies)
  const { openSheet } = useBottomSheet()

  const pushMessage = useCallback((message: Message) => {
    setMessages(prev => [...prev, message])
  }, [])

  const pushUserMessage = useCallback((text: string) => {
    const userMessage = createMessage('user', [createTextBlock(text)])
    pushMessage(userMessage)
    return userMessage
  }, [pushMessage])

  const pushAssistantMessage = useCallback((message: Message) => {
    pushMessage(message)
  }, [pushMessage])

  const handleQuickReply = useCallback((quickReply: QuickReply) => {
    // Add user message for the quick reply
    const userMessage = createMessage('user', [createTextBlock(quickReply.label)])
    pushMessage(userMessage)

    // Create demo context
    const ctx: DemoContext = {
      openSheet,
      pushAssistantMessage,
      pushUserMessage
    }

    // Call demo handler if exists
    if (onQuickReply) {
      onQuickReply(quickReply, ctx)
    }

    // Update quick replies if needed
    if (quickReply.payload?.action === 'open_transfer') {
      setQuickReplies([
        { id: '1', label: 'Confirmar transferencia', payload: { action: 'confirm_transfer' } },
        { id: '2', label: 'Cancelar', payload: { action: 'cancel_transfer' } }
      ])
    }
  }, [onQuickReply, openSheet, pushAssistantMessage])

  const handleSendMessage = useCallback((text: string) => {
    // Add user message
    pushUserMessage(text)

    // Create demo context
    const ctx: DemoContext = {
      openSheet,
      pushAssistantMessage,
      pushUserMessage
    }

    // Call demo handler if exists
    if (onUserMessage) {
      onUserMessage(text, ctx)
    } else {
      // Default response
      setTimeout(() => {
        const assistantMessage = createMessage('assistant', [
          createTextBlock('Gracias por tu mensaje. ¿En qué más puedo ayudarte?')
        ])
        pushAssistantMessage(assistantMessage)
      }, 1000)
    }
  }, [onUserMessage, openSheet, pushAssistantMessage, pushUserMessage])

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex items-center space-x-3 px-4 py-3">
          <Avatar className="w-10 h-10">
            <AvatarImage src="/avatars/assistant.png" alt="Asistente" />
            <AvatarFallback className="bg-green-100 text-green-600">A</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h1 className="font-semibold">Asistente Financiero</h1>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary" className="text-xs">
                Agente
              </Badge>
              <span className="text-xs text-muted-foreground">En línea</span>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-hidden">
        <MessageList messages={messages} />
      </div>

      {/* Quick Replies */}
      {quickReplies.length > 0 && (
        <QuickReplies quickReplies={quickReplies} onQuickReply={handleQuickReply} />
      )}

      {/* Composer */}
      <ChatComposer onSendMessage={handleSendMessage} />
    </div>
  )
}
