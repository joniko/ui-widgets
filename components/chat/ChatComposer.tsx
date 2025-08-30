'use client'

import { useState, useRef, useEffect } from 'react'
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
      <div className="relative max-h-full min-h-[60px] w-full">
        {/* Capa 1: Sombra exterior principal */}
        <div 
          className="absolute inset-0 rounded-3xl"
          style={{
            boxShadow: 'rgba(0, 0, 0, 0.18) 0px 10px 24px 0px'
          }}
        />
        
        {/* Capa 2: Backdrop blur y fondo base */}
        <div 
          className="relative backdrop-blur-2xl backdrop-saturate-200 bg-neutral-100/60 rounded-3xl"
          style={{
            boxShadow: 'rgba(0, 0, 0, 0.06) 0px 42px 30px 0px'
          }}
        >
          {/* Capa 3: Contenedor interno con borde sutil */}
          <div 
            className="relative flex flex-col overflow-hidden rounded-3xl"
            style={{
              boxShadow: 'rgba(255, 255, 255, 0.08) 0px 0px 0px 1px inset'
            }}
          >
            {/* Capa 4: Gradiente de fondo */}
            <div 
              className="relative bg-gradient-to-b from-neutral-400/10 to-white/35 p-1.5 rounded-3xl"
              style={{
                boxShadow: 'rgba(255, 255, 255, 0.08) 0px 0px 0px 1px inset'
              }}
            >
              {/* Capa 5: Fondo final del input */}
              <div className="bg-gradient-to-b from-white/90 to-white/0 rounded-3xl">
                {/* Contenedor principal con textarea y botones */}
                <div className="relative flex items-center">
                  {/* Textarea container */}
                  <div className="flex-1 flex items-center">
                    <div className="relative grow overflow-hidden">
                      <div className="relative flex size-full cursor-text overflow-hidden text-black">
                        <div className="flex grow flex-col gap-4 py-3">
                          <div className="overflow-y-auto px-4 max-h-[120px]">
                            <div className="relative">
                              <label className="invisible block h-0 w-0 overflow-hidden whitespace-nowrap" htmlFor="userInput">
                                Preguntale al asistente...
                              </label>
                              <textarea
                                id="userInput"
                                ref={textareaRef}
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Preguntale al asistente..."
                                disabled={disabled}
                                className={cn(
                                  "font-ligatures-none inline-block min-h-[40px] w-full pt-2 resize-none overflow-y-hidden whitespace-pre-wrap",
                                  "bg-transparent align-top text-black outline-none placeholder:text-neutral-400",
                                  "text-base leading-relaxed",
                                  "disabled:cursor-not-allowed disabled:opacity-50"
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
                  <div className="flex gap-2 items-center my-1.5 mr-1.5">
                    {/* Botón de adjuntar */}
                    <button
                      type="button"
                      onClick={handleAttach}
                      disabled={disabled}
                      className={cn(
                        "flex items-center justify-center rounded-xl size-10 p-2",
                        "text-neutral-800 fill-neutral-800 active:text-neutral-600 active:fill-neutral-600",
                        "bg-transparent hover:bg-black/5 active:bg-black/3",
                        "disabled:active:bg-transparent disabled:active:bg-none",
                        "transition-all duration-200"
                      )}
                      aria-label="Adjuntar archivo"
                    >
                      <PlusIcon className="w-6 h-6" />
                    </button>
                    
                    {/* Botón de micrófono o enviar */}
                    <button
                      type="button"
                      onClick={message.trim() ? handleSend : handleMic}
                      disabled={disabled}
                      className={cn(
                        "flex items-center justify-center rounded-xl size-10 p-2",
                        message.trim() 
                          ? "text-primary fill-primary active:text-primary/80 active:fill-primary/80"
                          : "text-neutral-800 fill-neutral-800 active:text-neutral-600 active:fill-neutral-600",
                        "bg-transparent hover:bg-black/5 active:bg-black/3",
                        "disabled:active:bg-transparent disabled:active:bg-none",
                        "transition-all duration-200"
                      )}
                      aria-label={message.trim() ? "Enviar mensaje" : "Grabar audio"}
                    >
                      {message.trim() ? (
                        <SendIcon className="w-6 h-6" />
                      ) : (
                        <MicIcon className="w-6 h-6" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}