'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import { Message, QuickReply, DemoContext } from '@/lib/types'
import {
  createMessage,
  createTextBlock,
  createUIMessage,
} from '@/lib/agenticMocks'
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
  onUserMessage,
}: ChatLayoutProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [quickReplies, setQuickReplies] =
    useState<QuickReply[]>(initialQuickReplies)
  const [hasUserInteracted, setHasUserInteracted] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [viewportHeight, setViewportHeight] = useState('100vh')
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false)
  const { openSheet, isOpen, content, closeSheet } = useBottomSheet()
  const messageListRef = useRef<MessageListRef>(null)

  // Manejar viewport height dinámico para teclado virtual
  useEffect(() => {
    const updateViewportHeight = () => {
      // Usar visualViewport si está disponible (mejor para teclado virtual)
      if (window.visualViewport) {
        const height = window.visualViewport.height
        const windowHeight = window.innerHeight
        setViewportHeight(`${height}px`)
        setIsKeyboardOpen(height < windowHeight * 0.75)
      } else {
        // Fallback para navegadores que no soportan visualViewport
        setViewportHeight(`${window.innerHeight}px`)
      }
    }

    // Configurar listeners
    updateViewportHeight()
    
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', updateViewportHeight)
      return () => {
        window.visualViewport?.removeEventListener('resize', updateViewportHeight)
      }
    } else {
      window.addEventListener('resize', updateViewportHeight)
      return () => {
        window.removeEventListener('resize', updateViewportHeight)
      }
    }
  }, [])

  // Auto scroll cuando se abre el teclado y ajustar posición
  useEffect(() => {
    if (isKeyboardOpen) {
      // Scroll al final de los mensajes
      setTimeout(() => {
        messageListRef.current?.scrollToBottom()
      }, 100)
      
      // Asegurar que el contenedor principal esté en la posición correcta
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }, 200)
    }
  }, [isKeyboardOpen])

  const pushMessage = useCallback((message: Message) => {
    setMessages((prev) => [...prev, message])
    // Hacer scroll después de agregar el mensaje
    setTimeout(() => {
      messageListRef.current?.scrollToBottom()
    }, 100)
  }, [])

  const pushUserMessage = useCallback(
    (text: string) => {
      const userMessage = createMessage('user', [createTextBlock(text)])
      pushMessage(userMessage)
      return userMessage
    },
    [pushMessage],
  )

  const pushAssistantMessage = useCallback(
    (message: Message) => {
      pushMessage(message)
    },
    [pushMessage],
  )

  const pushUIMessage = useCallback(
    (text: string) => {
      const uiMessage = createUIMessage('user', [createTextBlock(text)])
      pushMessage(uiMessage)
      return uiMessage
    },
    [pushMessage],
  )

  const prefillInput = useCallback((text: string) => {
    setInputValue(text)
    // Focus the input after prefilling
    setTimeout(() => {
      const textarea = document.querySelector(
        'textarea[name="message"]',
      ) as HTMLTextAreaElement
      if (textarea) {
        textarea.focus()
        // Move cursor to the end
        textarea.setSelectionRange(textarea.value.length, textarea.value.length)
      }
    }, 100)
  }, [])

  const handleQuickReply = useCallback(
    (quickReply: QuickReply) => {
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
        prefillInput,
      }

      // Call demo handler if exists
      if (onQuickReply) {
        onQuickReply(quickReply, ctx)
      }
    },
    [
      onQuickReply,
      openSheet,
      closeSheet,
      pushAssistantMessage,
      pushUserMessage,
      pushUIMessage,
      prefillInput,
    ],
  )

  const handleSendMessage = useCallback(
    (text: string) => {
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
        prefillInput,
      }

      // Call demo handler if exists
      if (onUserMessage) {
        onUserMessage(text, ctx)
      } else {
        // Default response
        setTimeout(() => {
          const assistantMessage = createMessage('assistant', [
            createTextBlock(
              'Gracias por tu mensaje. ¿En qué más puedo ayudarte?',
            ),
          ])
          pushAssistantMessage(assistantMessage)
        }, 1000)
      }
    },
    [
      onUserMessage,
      openSheet,
      closeSheet,
      pushAssistantMessage,
      pushUserMessage,
      pushUIMessage,
      prefillInput,
    ],
  )

  return (
    <div 
      className="mx-auto max-w-2xl min-w-full flex flex-col"
      style={{ 
        height: viewportHeight,
        maxHeight: viewportHeight,
        overflow: 'hidden'
      }}
    >
      {/* Messages - Flex grow to fill available space */}
      <div 
        className={`flex-1 z-10 mx-auto max-w-xl overflow-y-auto pt-0 ${
          isKeyboardOpen ? 'pb-4' : 'pb-4'
        }`}
        style={{ 
          minHeight: 0, // Permite que flex-1 funcione correctamente
        }}
      >
        <MessageList ref={messageListRef} messages={messages} />
      </div>

      {/* Bottom Container - Fixed height */}
      <div className="flex-shrink-0 z-10 mx-auto max-w-xl pt-6 md:pb-6">
        {/* Quick Replies - Only show if user hasn't interacted */}
        {!hasUserInteracted && (
          <QuickReplies
            quickReplies={quickReplies}
            onQuickReply={handleQuickReply}
          />
        )}

        {/* Composer */}
        <ChatComposer
          onSendMessage={handleSendMessage}
          value={inputValue}
          onChange={setInputValue}
        />
      </div>

      {/* Bottom Sheet */}
      <BottomSheet open={isOpen} onOpenChange={closeSheet}>
        {content}
      </BottomSheet>
    </div>
  )
}
