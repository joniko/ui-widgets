'use client'

import { motion } from 'framer-motion'

interface SelectListProps<T> {
  items: T[]
  onSelect: (item: T) => void
  renderItem: (item: T) => React.ReactNode
  keyExtractor: (item: T) => string
}

export function SelectList<T>({
  items,
  onSelect,
  renderItem,
  keyExtractor,
}: SelectListProps<T>) {
  return (
    <div className="divide-y divide-gray-100">
      {items.map((item, index) => (
        <motion.button
          key={keyExtractor(item)}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.05 }}
          onClick={() => onSelect(item)}
          className="flex w-full items-center p-4 transition-colors hover:bg-gray-50"
        >
          {renderItem(item)}
        </motion.button>
      ))}
    </div>
  )
}
