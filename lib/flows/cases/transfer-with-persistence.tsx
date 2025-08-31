'use client'

import { FlowDefinition } from '../types'
import { SuccessAnimation } from '../components/SuccessAnimation'

export const transferWithPersistenceFlow: FlowDefinition = {
  id: 'transfer-persistent',
  name: 'Transferencia con Persistencia',

  triggers: ['transferir con guardado', 'transfer persistente'],

  steps: [
    {
      id: 'select-contact',
      title: 'Elegí el contacto',
      render: (props) => <div>SelectContactStep - TODO: Implement</div>,
    },

    {
      id: 'enter-amount',
      title: 'Ingresá el monto',
      render: (props) => <div>EnterAmountStep - TODO: Implement</div>,
    },

    {
      id: 'confirm',
      title: 'Confirmá la transferencia',
      render: (props) => <div>ConfirmTransferStep - TODO: Implement</div>,
    },

    {
      id: 'success',
      title: 'Transferencia exitosa',
      render: ({ data, onNext }) => (
        <SuccessAnimation
          title="¡Transferencia realizada!"
          message={`Se transfirieron $${(data.amount as number).toLocaleString()} a ${(data.contact as { name: string }).name}`}
          onComplete={onNext}
        />
      ),
    },
  ],

  onComplete: (data, ctx) => {
    console.log('Transferencia completada y guardada:', data)
  },
}
