// Utilidades para persistir datos en localStorage

export interface StorageItem<T> {
  value: T
  timestamp: number
  expiresIn?: number // milliseconds
}

export class LocalStorage {
  private static prefix = 'ui-widgets-'

  /**
   * Obtiene el prefijo usado para las claves
   */
  static getPrefix(): string {
    return this.prefix
  }

  /**
   * Guarda un item en localStorage
   */
  static set<T>(key: string, value: T, expiresIn?: number): void {
    try {
      const item: StorageItem<T> = {
        value,
        timestamp: Date.now(),
        expiresIn,
      }
      localStorage.setItem(`${this.prefix}${key}`, JSON.stringify(item))
    } catch (e) {
      console.error('Error saving to localStorage:', e)
    }
  }

  /**
   * Obtiene un item del localStorage
   */
  static get<T>(key: string): T | null {
    try {
      const itemStr = localStorage.getItem(`${this.prefix}${key}`)
      if (!itemStr) return null

      const item: StorageItem<T> = JSON.parse(itemStr)

      // Verificar si expiró
      if (item.expiresIn) {
        const now = Date.now()
        const elapsed = now - item.timestamp
        if (elapsed > item.expiresIn) {
          this.remove(key)
          return null
        }
      }

      return item.value
    } catch (e) {
      console.error('Error reading from localStorage:', e)
      return null
    }
  }

  /**
   * Elimina un item del localStorage
   */
  static remove(key: string): void {
    try {
      localStorage.removeItem(`${this.prefix}${key}`)
    } catch (e) {
      console.error('Error removing from localStorage:', e)
    }
  }

  /**
   * Limpia todos los items con nuestro prefijo
   */
  static clear(): void {
    try {
      const keys = Object.keys(localStorage)
      keys.forEach((key) => {
        if (key.startsWith(this.prefix)) {
          localStorage.removeItem(key)
        }
      })
    } catch (e) {
      console.error('Error clearing localStorage:', e)
    }
  }

  /**
   * Obtiene todos los items
   */
  static getAll(): Record<string, unknown> {
    try {
      const result: Record<string, unknown> = {}
      const keys = Object.keys(localStorage)

      keys.forEach((key) => {
        if (key.startsWith(this.prefix)) {
          const cleanKey = key.replace(this.prefix, '')
          const value = this.get(cleanKey)
          if (value !== null) {
            result[cleanKey] = value
          }
        }
      })

      return result
    } catch (e) {
      console.error('Error getting all from localStorage:', e)
      return {}
    }
  }
}

// Re-export hook from separate file
export { useLocalStorage } from './useLocalStorage'
