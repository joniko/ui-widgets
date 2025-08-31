'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

type BottomSheetOptions = {
  snapPoints?: number[]
  initialSnap?: number
}

type BottomSheetContextType = {
  openSheet: (node: ReactNode, options?: BottomSheetOptions) => void
  closeSheet: () => void
  isOpen: boolean
  content: ReactNode | null
  options: BottomSheetOptions
}

const BottomSheetContext = createContext<BottomSheetContextType | undefined>(
  undefined,
)

export function BottomSheetProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [content, setContent] = useState<ReactNode | null>(null)
  const [options, setOptions] = useState<BottomSheetOptions>({
    snapPoints: [0.25, 0.5, 0.9],
    initialSnap: 0.5,
  })

  const openSheet = (node: ReactNode, opts?: BottomSheetOptions) => {
    setContent(node)
    if (opts) {
      setOptions({
        snapPoints: opts.snapPoints || [0.25, 0.5, 0.9],
        initialSnap: opts.initialSnap || 0.5,
      })
    }
    setIsOpen(true)
  }

  const closeSheet = () => {
    setIsOpen(false)
    setContent(null)
  }

  return (
    <BottomSheetContext.Provider
      value={{
        openSheet,
        closeSheet,
        isOpen,
        content,
        options,
      }}
    >
      {children}
    </BottomSheetContext.Provider>
  )
}

export function useBottomSheet() {
  const context = useContext(BottomSheetContext)
  if (context === undefined) {
    throw new Error('useBottomSheet must be used within a BottomSheetProvider')
  }
  return context
}
