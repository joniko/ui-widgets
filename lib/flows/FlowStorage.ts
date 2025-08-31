// Persistencia específica para flujos
import { LocalStorage } from '../utils/storage'

export interface FlowTransaction {
  id: string
  flowId: string
  type: 'transfer' | 'payment' | 'balance'
  data: Record<string, unknown>
  status: 'pending' | 'completed' | 'failed'
  timestamp: number
}

export interface UserProfile {
  name: string
  accounts: Account[]
  contacts: Contact[]
  services: Service[]
}

export interface Account {
  id: string
  name: string
  type: string
  number: string
  balance: number
  currency: string
  icon?: string
}

export interface Contact {
  id: string
  name: string
  avatar?: string
  banks?: string[]
  lastTransfer?: number
}

export interface Service {
  id: string
  name: string
  type: string
  amount: number
  dueDate: string
  icon?: string
  status: 'pending' | 'overdue' | 'paid'
  lastPaid?: string
}

export class FlowStorage {
  private static KEYS = {
    TRANSACTIONS: 'transactions',
    PROFILE: 'user-profile',
    FLOW_STATE: 'flow-state',
    PENDING_FLOWS: 'pending-flows',
  }

  // Guardar transacción
  static saveTransaction(
    transaction: Omit<FlowTransaction, 'id' | 'timestamp'>,
  ): string {
    const id = `txn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    const fullTransaction: FlowTransaction = {
      ...transaction,
      id,
      timestamp: Date.now(),
    }

    const transactions = this.getTransactions()
    transactions.push(fullTransaction)

    // Mantener solo las últimas 100 transacciones
    const recentTransactions = transactions.slice(-100)
    LocalStorage.set(this.KEYS.TRANSACTIONS, recentTransactions)

    return id
  }

  // Obtener transacciones
  static getTransactions(): FlowTransaction[] {
    return LocalStorage.get<FlowTransaction[]>(this.KEYS.TRANSACTIONS) || []
  }

  // Obtener transacción por ID
  static getTransaction(id: string): FlowTransaction | null {
    const transactions = this.getTransactions()
    return transactions.find((t) => t.id === id) || null
  }

  // Actualizar estado de transacción
  static updateTransactionStatus(
    id: string,
    status: FlowTransaction['status'],
  ): void {
    const transactions = this.getTransactions()
    const index = transactions.findIndex((t) => t.id === id)

    if (index !== -1) {
      transactions[index].status = status
      LocalStorage.set(this.KEYS.TRANSACTIONS, transactions)
    }
  }

  // Guardar/actualizar perfil de usuario
  static saveProfile(profile: UserProfile): void {
    LocalStorage.set(this.KEYS.PROFILE, profile)
  }

  // Obtener perfil de usuario
  static getProfile(): UserProfile | null {
    return LocalStorage.get<UserProfile>(this.KEYS.PROFILE)
  }

  // Actualizar saldo de cuenta
  static updateAccountBalance(accountId: string, newBalance: number): void {
    const profile = this.getProfile()
    if (!profile) return

    const account = profile.accounts.find((a) => a.id === accountId)
    if (account) {
      account.balance = newBalance
      this.saveProfile(profile)
    }
  }

  // Agregar contacto
  static addContact(contact: Contact): void {
    const profile = this.getProfile()
    if (!profile) return

    // Evitar duplicados
    const exists = profile.contacts.some((c) => c.id === contact.id)
    if (!exists) {
      profile.contacts.push(contact)
      this.saveProfile(profile)
    }
  }

  // Actualizar último contacto usado
  static updateLastContactTransfer(contactId: string): void {
    const profile = this.getProfile()
    if (!profile) return

    const contact = profile.contacts.find((c) => c.id === contactId)
    if (contact) {
      contact.lastTransfer = Date.now()
      this.saveProfile(profile)
    }
  }

  // Marcar servicio como pagado
  static markServiceAsPaid(serviceId: string): void {
    const profile = this.getProfile()
    if (!profile) return

    const service = profile.services.find((s) => s.id === serviceId)
    if (service) {
      service.status = 'paid'
      service.lastPaid = new Date().toISOString()
      this.saveProfile(profile)
    }
  }

  // Guardar estado de flujo incompleto
  static saveFlowState(
    flowId: string,
    step: number,
    data: Record<string, unknown>,
  ): void {
    const states =
      LocalStorage.get<
        Record<
          string,
          { step: number; data: Record<string, unknown>; timestamp: number }
        >
      >(this.KEYS.FLOW_STATE) || {}
    states[flowId] = { step, data, timestamp: Date.now() }
    LocalStorage.set(this.KEYS.FLOW_STATE, states, 24 * 60 * 60 * 1000) // Expira en 24h
  }

  // Recuperar estado de flujo
  static getFlowState(
    flowId: string,
  ): { step: number; data: Record<string, unknown> } | null {
    const states =
      LocalStorage.get<
        Record<
          string,
          { step: number; data: Record<string, unknown>; timestamp: number }
        >
      >(this.KEYS.FLOW_STATE) || {}
    return states[flowId] || null
  }

  // Limpiar estado de flujo
  static clearFlowState(flowId: string): void {
    const states =
      LocalStorage.get<
        Record<
          string,
          { step: number; data: Record<string, unknown>; timestamp: number }
        >
      >(this.KEYS.FLOW_STATE) || {}
    delete states[flowId]
    LocalStorage.set(this.KEYS.FLOW_STATE, states)
  }

  // Inicializar datos de demo
  static initializeDemoData(): void {
    if (!this.getProfile()) {
      const demoProfile: UserProfile = {
        name: 'Usuario Demo',
        accounts: [
          {
            id: '1',
            name: 'Cuenta Sueldo',
            type: 'Caja de Ahorro',
            number: '0000003100090418135201',
            balance: 125000,
            currency: 'ARS',
            icon: 'card',
          },
          {
            id: '2',
            name: 'Cuenta Ahorros',
            type: 'Caja de Ahorro',
            number: '0000003100090418135202',
            balance: 450000,
            currency: 'ARS',
            icon: 'bank',
          },
        ],
        contacts: [
          { id: '1', name: 'Juan Pérez', avatar: 'user', banks: ['AR'] },
          { id: '2', name: 'María García', avatar: 'user', banks: ['AR', 'BR'] },
        ],
        services: [
          {
            id: '1',
            name: 'Edesur',
            type: 'Electricidad',
            amount: 8500,
            dueDate: new Date(
              Date.now() + 5 * 24 * 60 * 60 * 1000,
            ).toISOString(),
            icon: 'lightbulb',
            status: 'pending',
          },
        ],
      }
      this.saveProfile(demoProfile)
    }
  }
}
