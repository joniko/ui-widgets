'use client'

import { useState, useEffect, useCallback } from 'react'
import { LocalStorage, StorageItem } from './storage'

export function useLocalStorage<T>(
  key: string,
  initialValue: T,
  expiresIn?: number,
): [T, (value: T) => void, () => void] {
  // Estado para almacenar el valor
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = LocalStorage.get<T>(key)
      return item ?? initialValue
    } catch (error) {
      console.error(error)
      return initialValue
    }
  })

  // Función para actualizar el valor
  const setValue = useCallback(
    (value: T) => {
      try {
        setStoredValue(value)
        LocalStorage.set(key, value, expiresIn)
      } catch (error) {
        console.error(error)
      }
    },
    [key, expiresIn],
  )

  // Función para eliminar el valor
  const removeValue = useCallback(() => {
    try {
      setStoredValue(initialValue)
      LocalStorage.remove(key)
    } catch (error) {
      console.error(error)
    }
  }, [key, initialValue])

  // Escuchar cambios en otras pestañas
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === `${LocalStorage.getPrefix()}${key}` && e.newValue) {
        try {
          const item: StorageItem<T> = JSON.parse(e.newValue)
          setStoredValue(item.value)
        } catch (error) {
          console.error(error)
        }
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [key])

  return [storedValue, setValue, removeValue]
}
