'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { PaperclipIcon, SendIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ChatComposerProps {
  onSendMessage: (message: string) => void
  disabled?: boolean
}

export function ChatComposer({ onSendMessage, disabled = false }: ChatComposerProps) {
  const [message, setMessage] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleSend = () => {
    if (message.trim() && !disabled) {
      onSendMessage(message.trim())
      setMessage('')
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleAttach = () => {
    // TODO: Implementar adjuntar archivos
    console.log('Adjuntar archivo')
  }

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`
    }
  }, [message])

  return (
    <div className="border-t bg-background p-4 pb-[max(theme(spacing.4),env(safe-area-inset-bottom))]">
      <div className="flex items-end space-x-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleAttach}
          disabled={disabled}
          className="p-2 h-auto"
        >
          <PaperclipIcon className="w-4 h-4" />
        </Button>
        
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Escribe un mensaje..."
            disabled={disabled}
            className={cn(
              "w-full resize-none rounded-lg border border-input bg-background px-3 py-2 text-sm",
              "focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent",
              "min-h-[40px] max-h-[120px]",
              "disabled:cursor-not-allowed disabled:opacity-50"
            )}
            rows={1}
          />
        </div>
        
        <Button
          onClick={handleSend}
          disabled={disabled || !message.trim()}
          size="sm"
          className="px-4 py-2 h-auto"
        >
          <SendIcon className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}
