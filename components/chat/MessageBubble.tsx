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
            isUser
              ? "max-w-[310px] px-4 py-3 bg-purple-500 text-white ml-auto shadow-md rounded-2xl"
              : "max-w-[310px] text-gray-800 text-base leading-relaxed py-1"
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
          isUser ? "bg-purple-100 text-purple-600" : "bg-green-100 text-green-600"
        )}>
          {isUser ? "U" : "A"}
        </AvatarFallback>
      </Avatar>
      
      <div className={cn(
        "flex flex-col space-y-2",
        isUser ? "items-end" : "items-start"
      )}>
        {message.blocks.map((block, index) => renderBlock(block, index))}
        
        {isUser && (
          <div className="text-xs text-muted-foreground text-right">
            {new Date(message.createdAt).toLocaleTimeString('es-ES', {
              hour: '2-digit',
              minute: '2-digit'
            })}
          </div>
        )}
      </div>
    </div>
  )
}
