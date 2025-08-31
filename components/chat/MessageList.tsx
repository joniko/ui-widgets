'use client'

import { useEffect, useRef } from 'react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Message } from '@/lib/types'
import { MessageBubble } from './MessageBubble'
import { MessageCircle } from 'lucide-react'

interface MessageListProps {
  messages: Message[]
}

export function MessageList({ messages }: MessageListProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  return (
    <ScrollArea className="flex-1 h-full" ref={scrollRef}>
      <div className="px-4 py-6 space-y-2 pt-20">
        {messages.length === 0 ? (
          <div className="text-center text-muted-foreground py-8">
            <MessageCircle className="w-16 h-16 mb-4 text-gray-400" />
            <p>Inicia una conversación con tu asistente</p>
          </div>
        ) : (
          messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))
        )}
      </div>
    </ScrollArea>
  )
}
