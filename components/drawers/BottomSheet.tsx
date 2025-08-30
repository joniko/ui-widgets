'use client'

import { Drawer } from 'vaul'
import { useBottomSheet } from './useBottomSheet'
import { cn } from '@/lib/utils'

export type BottomSheetProps = {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  title?: React.ReactNode
  description?: React.ReactNode
  children: React.ReactNode
  footer?: React.ReactNode
  modal?: boolean
  snapPoints?: Array<number>
  initialSnap?: number
  fadeFromIndex?: number
  snapToSequentialPoint?: boolean
  repositionInputs?: boolean
  className?: string
}

export function BottomSheet({
  open,
  onOpenChange,
  title,
  description,
  children,
  footer,
  modal = true,
  fadeFromIndex = 0,
  snapToSequentialPoint = true,
  repositionInputs = true,
  className
}: BottomSheetProps) {
  const { isOpen, closeSheet, options } = useBottomSheet()
  
  const isControlled = open !== undefined
  const isOpenState = isControlled ? open : isOpen
  const handleOpenChange = isControlled ? onOpenChange : closeSheet

  return (
          <Drawer.Root
        open={isOpenState}
        onOpenChange={handleOpenChange}
        modal={modal}
        snapPoints={options.snapPoints || [0.25, 0.5, 0.9]}
        activeSnapPoint={options.initialSnap || 0.5}
        setActiveSnapPoint={() => {}}
        fadeFromIndex={fadeFromIndex}
        snapToSequentialPoint={snapToSequentialPoint}
        repositionInputs={repositionInputs}
      >
      <Drawer.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
      <Drawer.Content className={cn(
        "bg-background flex flex-col rounded-t-[10px] max-h-[95svh]",
        "fixed bottom-0 left-0 right-0 z-50",
        "pb-[max(theme(spacing.4),env(safe-area-inset-bottom))]",
        className
      )}>
        <div className="mx-auto w-full max-w-md">
          <div className="rounded-t-[10px] bg-background">
            <div className="flex items-center justify-center p-4">
              <div className="h-1 w-12 rounded-full bg-muted" />
            </div>
            {(title || description) && (
              <div className="px-4 pb-4">
                {title && (
                  <h3 className="text-lg font-semibold leading-none tracking-tight">
                    {title}
                  </h3>
                )}
                {description && (
                  <p className="text-sm text-muted-foreground mt-1">
                    {description}
                  </p>
                )}
              </div>
            )}
          </div>
          <div className="flex-1 overflow-auto">
            {children}
          </div>
          {footer && (
            <div className="border-t bg-muted/50 p-4">
              {footer}
            </div>
          )}
        </div>
      </Drawer.Content>
    </Drawer.Root>
  )
}
