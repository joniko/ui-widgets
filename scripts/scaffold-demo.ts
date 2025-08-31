#!/usr/bin/env node

import fs from 'fs'
import path from 'path'

const DEMO_TEMPLATE = `import { DemoDefinition } from '../types'
import { createMessage, createTextBlock, createWidgetBlock } from '../agenticMocks'

export const {{DEMO_NAME}}Demo: DemoDefinition = {
  slug: '{{DEMO_SLUG}}',
  title: '{{DEMO_TITLE}}',
  description: '{{DEMO_DESCRIPTION}}',
  icon: '{{DEMO_ICON}}',
  initialMessages: [
    createMessage('assistant', [
      createTextBlock('¡Hola! Soy tu asistente. ¿En qué puedo ayudarte?'),
      createWidgetBlock('info-card', {
        title: 'Información del Demo',
        content: 'Este es un demo de ejemplo'
      })
    ])
  ],
  initialQuickReplies: [
    { id: '1', label: 'Opción 1', payload: { action: 'action_1' } },
    { id: '2', label: 'Opción 2', payload: { action: 'action_2' } }
  ],
  onQuickReply: (qr, ctx) => {
    if (qr.payload?.action === 'action_1') {
      ctx.openSheet(
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4">Acción 1</h3>
          <p>Contenido del bottom sheet para la acción 1</p>
        </div>,
        { snapPoints: [0.25, 0.5, 0.9], initialSnap: 0.5 }
      )
    }
  },
  onUserMessage: (text, ctx) => {
    // Lógica para manejar mensajes del usuario
    ctx.pushAssistantMessage(
      createMessage('assistant', [
        createTextBlock('Gracias por tu mensaje. ¿En qué más puedo ayudarte?')
      ])
    )
  }
}
`

const REGISTRY_UPDATE = `
import { {{DEMO_NAME}}Demo } from './{{DEMO_SLUG}}'

export const DEMO_REGISTRY: Record<string, DemoDefinition> = {
  transfer: transferDemo,
  'pay-service': payServiceDemo,
  help: helpDemo,
  '{{DEMO_SLUG}}': {{DEMO_NAME}}Demo
}
`

function scaffoldDemo() {
  const args = process.argv.slice(2)
  
  if (args.length < 3) {
    console.log('Uso: npm run scaffold-demo <nombre> <slug> <descripción> [icono]')
    console.log('Ejemplo: npm run scaffold-demo "Mi Demo" "mi-demo" "Descripción del demo" "rocket"')
    process.exit(1)
  }

  const [name, slug, description, icon = 'lightbulb'] = args
  
  // Crear el archivo del demo
  const demoContent = DEMO_TEMPLATE
    .replace(/{{DEMO_NAME}}/g, name.replace(/\s+/g, ''))
    .replace(/{{DEMO_SLUG}}/g, slug)
    .replace(/{{DEMO_TITLE}}/g, name)
    .replace(/{{DEMO_DESCRIPTION}}/g, description)
    .replace(/{{DEMO_ICON}}/g, icon)

  const demoPath = path.join(__dirname, '..', 'lib', 'demos', `${slug}.ts`)
  
  try {
    fs.writeFileSync(demoPath, demoContent)
    console.log(`✓ Demo creado: ${demoPath}`)
  } catch (error) {
    console.error('✗ Error al crear el demo:', error)
    process.exit(1)
  }

  // Actualizar el registro
  const registryPath = path.join(__dirname, '..', 'lib', 'demos', 'index.ts')
  
  try {
    let registryContent = fs.readFileSync(registryPath, 'utf8')
    
    // Agregar el import
    const importLine = `import { ${name.replace(/\s+/g, '')}Demo } from './${slug}'`
    registryContent = registryContent.replace(
      /import { helpDemo } from '\.\/help'/,
      `import { helpDemo } from './help'\nimport { ${name.replace(/\s+/g, '')}Demo } from './${slug}'`
    )
    
    // Agregar al registro
    registryContent = registryContent.replace(
      /help: helpDemo/,
      `help: helpDemo,\n  '${slug}': ${name.replace(/\s+/g, '')}Demo`
    )
    
    fs.writeFileSync(registryPath, registryContent)
    console.log(`✓ Registro actualizado: ${registryPath}`)
  } catch (error) {
    console.error('✗ Error al actualizar el registro:', error)
    process.exit(1)
  }

  console.log('\n✓ Demo creado exitosamente!')
  console.log(`📁 Archivo: lib/demos/${slug}.ts`)
  console.log(`🔗 URL: /demos/${slug}`)
  console.log('\nPara probar el demo:')
  console.log(`1. Reinicia el servidor de desarrollo`)
  console.log(`2. Ve a http://localhost:3000/demos/${slug}`)
}

if (require.main === module) {
  scaffoldDemo()
}
