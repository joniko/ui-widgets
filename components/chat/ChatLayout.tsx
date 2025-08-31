'use client'

import { useState, useCallback } from 'react'
import { Message, QuickReply, DemoContext } from '@/lib/types'
import { createMessage, createTextBlock, createUIMessage } from '@/lib/agenticMocks'
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
  const [hasUserInteracted, setHasUserInteracted] = useState(false)
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

  const pushUIMessage = useCallback((text: string) => {
    const uiMessage = createUIMessage('user', [createTextBlock(text)])
    pushMessage(uiMessage)
    return uiMessage
  }, [pushMessage])

  const handleQuickReply = useCallback((quickReply: QuickReply) => {
    // Mark user interaction and hide quick replies
    setHasUserInteracted(true)
    setQuickReplies([])
    
    // Add user message for the quick reply
    const userMessage = createMessage('user', [createTextBlock(quickReply.label)])
    pushMessage(userMessage)

    // Create demo context
    const ctx: DemoContext = {
      openSheet,
      closeSheet,
      pushAssistantMessage,
      pushUserMessage,
      pushUIMessage
    }

    // Call demo handler if exists
    if (onQuickReply) {
      onQuickReply(quickReply, ctx)
    }
  }, [onQuickReply, openSheet, pushAssistantMessage, pushMessage, pushUIMessage])

  const handleSendMessage = useCallback((text: string) => {
    // Mark user interaction and hide quick replies
    setHasUserInteracted(true)
    setQuickReplies([])
    
    // Add user message
    pushUserMessage(text)

    // Create demo context
    const ctx: DemoContext = {
      openSheet,
      closeSheet,
      pushAssistantMessage,
      pushUserMessage,
      pushUIMessage
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
  }, [onUserMessage, openSheet, pushAssistantMessage, pushUserMessage, pushUIMessage])

  return (
    <div className="h-screen bg-background relative">
      {/* Messages - Full height with padding for header and bottom input */}
      <div className="h-full overflow-y-auto bg-white pt-0 pb-20 px-4">
        <MessageList messages={messages} />
      </div>

      {/* Fixed Bottom Container */}
      <div className="fixed bottom-0 max-w-xl mx-auto left-0 right-0 pt-6 pb-6 px-4 z-10">
        {/* Quick Replies - Only show if user hasn't interacted */}
        {!hasUserInteracted && (
          <QuickReplies quickReplies={quickReplies} onQuickReply={handleQuickReply} />
        )}

        {/* Composer */}
        <ChatComposer onSendMessage={handleSendMessage} />
      </div>
      
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
