'use client'

import { useState, useCallback } from 'react'
import { Message, QuickReply, DemoContext } from '@/lib/types'
import { createMessage, createTextBlock } from '@/lib/agenticMocks'
import { MessageList } from './MessageList'
import { QuickReplies } from './QuickReplies'
import { ChatComposer } from './ChatComposer'
import { useBottomSheet } from '@/components/drawers/useBottomSheet'
import { BottomSheet } from '@/components/drawers/BottomSheet'

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
  const { openSheet, isOpen, content, closeSheet } = useBottomSheet()

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
      closeSheet,
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
      closeSheet,
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


      {/* Messages */}
      <div className="flex-1 overflow-hidden bg-white px-4">
        <MessageList messages={messages} />
      </div>

      {/* Quick Replies */}
      {quickReplies.length > 0 && (
        <QuickReplies quickReplies={quickReplies} onQuickReply={handleQuickReply} />
      )}

      {/* Composer */}
      <ChatComposer onSendMessage={handleSendMessage} />
      
      {/* Bottom Sheet */}
      <BottomSheet 
        open={isOpen}
        onOpenChange={closeSheet}
      >
        {content}
      </BottomSheet>
    </div>
  )
}
