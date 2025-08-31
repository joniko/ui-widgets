'use client'

import { useState, useRef, useEffect } from 'react'
import { PlusIcon, SendIcon, MicIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ChatComposerProps {
  onSendMessage: (message: string) => void
  disabled?: boolean
  value?: string
  onChange?: (value: string) => void
}

export function ChatComposer({
  onSendMessage,
  disabled = false,
  value,
  onChange,
}: ChatComposerProps) {
  const [internalMessage, setInternalMessage] = useState('')
  const message = value !== undefined ? value : internalMessage
  const setMessage = onChange || setInternalMessage
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleSend = () => {
    if (message.trim() && !disabled) {
      onSendMessage(message.trim())
      // Clear both internal state and parent state
      setInternalMessage('')
      if (onChange) {
        onChange('')
      }
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
    <div className="bg-transparent">
      <div className="relative max-h-full min-h-[60px] w-full">
        {/* Capa 1: Sombra exterior principal */}
        <div
          className="absolute inset-0 rounded-3xl"
          style={{
            boxShadow:
              '0 0 0 1px rgba(14, 63, 126, 0.04), 0 1px 1px -0.5px rgba(42, 51, 69, 0.04), 0 3px 3px -1.5px rgba(42, 51, 70, 0.04), 0 6px 6px -3px rgba(42, 51, 70, 0.04), 0 12px 12px -6px rgba(14, 63, 126, 0.04), 0 24px 24px -12px rgba(14, 63, 126, 0.04)',
          }}
        />

        {/* Capa 2: Backdrop blur y fondo base */}
        <div
          className="relative rounded-3xl bg-neutral-100/40 backdrop-blur-2xl backdrop-saturate-200"
          style={{
            boxShadow: 'rgba(0, 0, 0, 0.06) 0px 42px 30px 0px',
          }}
        >
          {/* Capa 3: Contenedor interno con borde sutil */}
          <div
            className="relative flex flex-col overflow-hidden rounded-3xl"
            style={{
              boxShadow: 'rgba(255, 255, 255, 0.08) 0px 0px 0px 1px inset',
            }}
          >
            {/* Capa 4: Gradiente de fondo */}
            <div
              className="relative rounded-3xl bg-gradient-to-b from-neutral-400/10 to-white p-2"
              style={{
                boxShadow: 'rgba(255, 255, 255, 0.08) 0px 0px 0px 1px inset',
              }}
            >
              {/* Capa 5: Fondo final del input */}
              {/* Contenedor principal con textarea y botones */}
              <div className="bg-background relative flex items-center rounded-2xl">
                {/* Textarea container */}
                <div className="flex flex-1 items-center">
                  <div className="relative grow overflow-hidden">
                    <div className="relative flex size-full cursor-text overflow-hidden text-black">
                      <div className="flex grow flex-col gap-4 py-3">
                        <div className="max-h-[120px] overflow-y-auto px-4">
                          <div className="relative">
                            <label
                              className="invisible block h-0 w-0 overflow-hidden whitespace-nowrap"
                              htmlFor="userInput"
                            >
                              Preguntale al asistente...
                            </label>
                            <textarea
                              id="userInput"
                              name="message"
                              ref={textareaRef}
                              value={message}
                              onChange={(e) => setMessage(e.target.value)}
                              onKeyDown={handleKeyDown}
                              placeholder="Preguntale al asistente..."
                              disabled={disabled}
                              className={cn(
                                'font-ligatures-none inline-block min-h-[40px] w-full resize-none overflow-y-hidden whitespace-pre-wrap pt-2',
                                'bg-transparent align-top text-black outline-none placeholder:text-neutral-400',
                                'text-base leading-relaxed',
                                'disabled:cursor-not-allowed disabled:opacity-50',
                              )}
                              rows={1}
                              role="textbox"
                              aria-autocomplete="both"
                              spellCheck={false}
                              enterKeyHint="enter"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Botones dentro del input */}
                <div className="my-1.5 mr-1.5 flex items-center gap-2">
                  {/* Botón de adjuntar */}
                  <button
                    type="button"
                    onClick={handleAttach}
                    disabled={disabled}
                    className={cn(
                      'flex size-10 items-center justify-center rounded-xl p-2',
                      'fill-neutral-800 text-neutral-800 active:fill-neutral-600 active:text-neutral-600',
                      'active:bg-black/3 bg-transparent hover:bg-black/5',
                      'disabled:active:bg-transparent disabled:active:bg-none',
                      'transition-all duration-200',
                    )}
                    aria-label="Adjuntar archivo"
                  >
                    <PlusIcon className="h-6 w-6" />
                  </button>

                  {/* Botón de micrófono o enviar */}
                  <button
                    type="button"
                    onClick={message.trim() ? handleSend : handleMic}
                    disabled={disabled}
                    className={cn(
                      'flex size-10 items-center justify-center rounded-xl p-2',
                      message.trim()
                        ? 'text-primary fill-primary active:text-primary/80 active:fill-primary/80'
                        : 'fill-neutral-800 text-neutral-800 active:fill-neutral-600 active:text-neutral-600',
                      'active:bg-black/3 bg-transparent hover:bg-black/5',
                      'disabled:active:bg-transparent disabled:active:bg-none',
                      'transition-all duration-200',
                    )}
                    aria-label={
                      message.trim() ? 'Enviar mensaje' : 'Grabar audio'
                    }
                  >
                    {message.trim() ? (
                      <SendIcon className="h-6 w-6" />
                    ) : (
                      <MicIcon className="h-6 w-6" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
