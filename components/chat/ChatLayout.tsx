'use client'

import { useState, useCallback, useRef } from 'react'
import { Message, QuickReply, DemoContext } from '@/lib/types'
import { createMessage, createTextBlock, createUIMessage } from '@/lib/agenticMocks'
import { MessageList, MessageListRef } from './MessageList'
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
  const [inputValue, setInputValue] = useState('')
  const { openSheet, isOpen, content, closeSheet } = useBottomSheet()
  const messageListRef = useRef<MessageListRef>(null)

  const pushMessage = useCallback((message: Message) => {
    setMessages(prev => [...prev, message])
    // Hacer scroll después de agregar el mensaje
    setTimeout(() => {
      messageListRef.current?.scrollToBottom()
    }, 100)
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

  const prefillInput = useCallback((text: string) => {
    setInputValue(text)
    // Focus the input after prefilling
    setTimeout(() => {
      const textarea = document.querySelector('textarea[name="message"]') as HTMLTextAreaElement
      if (textarea) {
        textarea.focus()
        // Move cursor to the end
        textarea.setSelectionRange(textarea.value.length, textarea.value.length)
      }
    }, 100)
  }, [])

  const handleQuickReply = useCallback((quickReply: QuickReply) => {
    // Mark user interaction and hide quick replies
    setHasUserInteracted(true)
    setQuickReplies([])

    // Create demo context with prefillInput
    const ctx: DemoContext = {
      openSheet,
      closeSheet,
      pushAssistantMessage,
      pushUserMessage,
      pushUIMessage,
      prefillInput
    }

    // Call demo handler if exists
    if (onQuickReply) {
      onQuickReply(quickReply, ctx)
    }
  }, [onQuickReply, openSheet, closeSheet, pushAssistantMessage, pushUserMessage, pushUIMessage, prefillInput])

  const handleSendMessage = useCallback((text: string) => {
    // Mark user interaction and hide quick replies
    setHasUserInteracted(true)
    setQuickReplies([])
    
    // Clear input
    setInputValue('')
    
    // Add user message
    pushUserMessage(text)

    // Create demo context
    const ctx: DemoContext = {
      openSheet,
      closeSheet,
      pushAssistantMessage,
      pushUserMessage,
      pushUIMessage,
      prefillInput
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
  }, [onUserMessage, openSheet, closeSheet, pushAssistantMessage, pushUserMessage, pushUIMessage, prefillInput])

  return (
    <div className="h-screen">
      
      {/* Messages - Full height with padding for header and bottom input */}
      <div className="relative z-10 h-full overflow-y-auto pt-0 pb-20 px-4">
        <MessageList ref={messageListRef} messages={messages} />
      </div>

      {/* Fixed Bottom Container */}
      <div className="fixed bottom-0 max-w-xl mx-auto left-0 right-0 pt-6 pb-6 z-10">
        {/* Quick Replies - Only show if user hasn't interacted */}
        {!hasUserInteracted && (
          <QuickReplies quickReplies={quickReplies} onQuickReply={handleQuickReply} />
        )}

        {/* Composer */}
        <ChatComposer 
          onSendMessage={handleSendMessage} 
          value={inputValue}
          onChange={setInputValue}
        />
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
