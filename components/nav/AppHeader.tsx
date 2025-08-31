'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowLeftIcon } from 'lucide-react'
import { DemoDefinition } from '@/lib/types'

interface AppHeaderProps {
  currentDemo?: DemoDefinition
  showBackButton?: boolean
}

export function AppHeader({ currentDemo, showBackButton = false }: AppHeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 border-b border-gray-200/50 bg-white/85 backdrop-blur-sm z-20">
      <div className="max-w-xl mx-auto px-0 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {showBackButton && (
              <Link href="/demos">
                <Button variant="ghost" size="sm" className="p-2">
                  <ArrowLeftIcon className="w-4 h-4" />
                </Button>
              </Link>
            )}
            
            {currentDemo ? (
              <div>
                <h1 className="text-xl font-semibold flex items-center space-x-2">
                  <span>{currentDemo.title}</span>
                </h1>
                {currentDemo.description && (
                  <p className="text-sm text-muted-foreground mt-1">
                    {currentDemo.description}
                  </p>
                )}
              </div>
            ) : (
              <div>
                <h1 className="text-xl font-semibold">Chat Agéntico</h1>
                <p className="text-sm text-muted-foreground">
                  Prototipo con widgets inline y bottom sheet
                </p>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-2">
            {!currentDemo && (
              <Link href="/demos">
                <Button variant="outline" size="sm">
                  Ver Demos
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
