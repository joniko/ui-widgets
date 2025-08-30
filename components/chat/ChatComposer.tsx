'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { PlusIcon, SendIcon, MicIcon } from 'lucide-react'
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

  const handleMic = () => {
    // TODO: Implementar micrófono
    console.log('Activar micrófono')
  }

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`
    }
  }, [message])

  return (
    <div className="border-t border-neutral-100 bg-white p-4 pb-[max(theme(spacing.4),env(safe-area-inset-bottom))]">
      <div className="flex items-end space-x-3">
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Preguntale al asistente..."
            disabled={disabled}
            className={cn(
              "w-full resize-none rounded-full border border-neutral-200 bg-white px-4 py-3 pr-12 text-sm",
              "focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary",
              "min-h-[48px] max-h-[120px]",
              "disabled:cursor-not-allowed disabled:opacity-50",
              "placeholder:text-neutral-400"
            )}
            rows={1}
          />
          <Button
            size="sm"
            className="absolute right-2 bottom-2 h-8 w-8 rounded-full p-0 bg-primary hover:bg-primary/90"
            onClick={handleSend}
            disabled={disabled || !message.trim()}
          >
            <SendIcon className="w-4 h-4 text-primary-foreground" />
          </Button>
        </div>
        
        <Button
          variant="outline"
          size="icon"
          onClick={handleAttach}
          disabled={disabled}
          className="h-12 w-12 rounded-full border-neutral-200 bg-white hover:bg-neutral-50"
        >
          <PlusIcon className="w-5 h-5 text-neutral-600" />
        </Button>
        
        <Button
          size="icon"
          onClick={handleMic}
          disabled={disabled}
          className="h-12 w-12 rounded-full bg-primary hover:bg-primary/90 shadow-lg"
        >
          <MicIcon className="w-5 h-5 text-primary-foreground" />
        </Button>
      </div>
    </div>
  )
}
