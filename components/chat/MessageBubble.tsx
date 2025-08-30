'use client'

import { Message, ChatBlock } from '@/lib/types'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { WidgetRenderer } from './WidgetRenderer'
import { cn } from '@/lib/utils'

interface MessageBubbleProps {
  message: Message
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === 'user'

  const renderBlock = (block: ChatBlock, index: number) => {
    if (block.kind === 'text') {
      return (
        <div
          key={index}
          className={cn(
            "max-w-xs lg:max-w-md px-4 py-2 rounded-2xl",
            isUser
              ? "bg-blue-600 text-white ml-auto"
              : "bg-muted text-foreground"
          )}
        >
          {block.text}
        </div>
      )
    } else if (block.kind === 'widget') {
      return <WidgetRenderer key={index} widget={block.widget} />
    }
    return null
  }

  return (
    <div className={cn(
      "flex items-start space-x-3 mb-6",
      isUser && "flex-row-reverse space-x-reverse"
    )}>
      <Avatar className="w-8 h-8">
        <AvatarImage 
          src={isUser ? "/avatars/user.png" : "/avatars/assistant.png"} 
          alt={isUser ? "Usuario" : "Asistente"}
        />
        <AvatarFallback className={cn(
          "text-xs",
          isUser ? "bg-blue-100 text-blue-600" : "bg-green-100 text-green-600"
        )}>
          {isUser ? "U" : "A"}
        </AvatarFallback>
      </Avatar>
      
      <div className={cn(
        "flex flex-col space-y-2",
        isUser ? "items-end" : "items-start"
      )}>
        {message.blocks.map((block, index) => renderBlock(block, index))}
        
        <div className={cn(
          "text-xs text-muted-foreground",
          isUser ? "text-right" : "text-left"
        )}>
          {new Date(message.createdAt).toLocaleTimeString('es-ES', {
            hour: '2-digit',
            minute: '2-digit'
          })}
        </div>
      </div>
    </div>
  )
}
