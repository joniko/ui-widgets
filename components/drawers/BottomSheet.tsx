'use client'

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
} from '@/components/ui/drawer'
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
    <Drawer
      open={isOpenState}
      onOpenChange={handleOpenChange}
      modal={modal}
    >
      <DrawerContent className={cn(
        "max-h-[95svh]",
        className
      )}>
        {(title || description) && (
          <DrawerHeader>
            {title && <DrawerTitle>{title}</DrawerTitle>}
            {description && <DrawerDescription>{description}</DrawerDescription>}
          </DrawerHeader>
        )}
        
        <div className="flex-1 overflow-auto px-4">
          {children}
        </div>
        
        {footer && (
          <DrawerFooter>
            {footer}
          </DrawerFooter>
        )}
      </DrawerContent>
    </Drawer>
  )
}
