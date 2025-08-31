'use client'

import { Message, ChatBlock } from '@/lib/types'
import { WidgetRenderer } from './WidgetRenderer'
import { cn } from '@/lib/utils'

interface MessageBubbleProps {
  message: Message
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === 'user'
  const isUIGenerated = message.isUIGenerated

  const renderBlock = (block: ChatBlock, index: number) => {
    if (block.kind === 'text') {
      return (
        <div
          key={index}
          className={cn(
            isUser
              ? "max-w-[310px] px-4 py-3 ml-auto text-base leading-relaxed border-t border-t-white/20"
              : "max-w-[310px] text-neutral-800 text-base leading-relaxed py-1"
          )}
          style={isUser ? {
            borderRadius: 'var(--border-radius-xlarge, 20px) var(--border-radius-xlarge, 20px) var(--border-radius-tiny, 4px) var(--border-radius-xlarge, 20px)',
            background: isUIGenerated ? 'transparent' : 'rgb(244 244 245)',
            border: isUIGenerated ? '2px dashed rgba(156, 163, 175, 0.5)' : undefined,
            boxShadow: isUIGenerated ? 'none' : '0 0 0 1px rgba(34, 34, 34, 0.08), 0 1px 1px -0.5px rgba(34, 34, 34, 0.04), 0 2px 2px -1px rgba(34, 34, 34, 0.04), 0 6px 6px -3px rgba(34, 34, 34, 0.04)'
          } : undefined}
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
