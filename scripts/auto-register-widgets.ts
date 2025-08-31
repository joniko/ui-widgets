#!/usr/bin/env tsx

/**
 * 🤖 Auto-registro de widgets
 *
 * Este script detecta automáticamente todos los archivos de dominio
 * en lib/flows/cases/ y genera el archivo de registro de widgets.
 */

import fs from 'fs'
import path from 'path'

const CASES_DIR = path.join(process.cwd(), 'lib/flows/cases')
const WIDGETS_INDEX_FILE = path.join(process.cwd(), 'lib/widgets/index.tsx')

interface DomainInfo {
  fileName: string
  domainName: string
  widgetsExportName: string
}

/**
 * Detecta todos los archivos de dominio válidos
 */
function detectDomainFiles(): DomainInfo[] {
  const files = fs.readdirSync(CASES_DIR)
  const domains: DomainInfo[] = []

  for (const file of files) {
    // Ignorar archivos que empiecen con _ o no sean .tsx
    if (file.startsWith('_') || !file.endsWith('.tsx')) {
      continue
    }

    const filePath = path.join(CASES_DIR, file)
    const content = fs.readFileSync(filePath, 'utf-8')

    // Buscar export de widgets (ej: export const paymentWidgets)
    const widgetsExportMatch = content.match(/export const (\w+Widgets)\s*=/)

    if (widgetsExportMatch) {
      const domainName = file.replace('.tsx', '')
      const widgetsExportName = widgetsExportMatch[1]

      domains.push({
        fileName: file,
        domainName,
        widgetsExportName,
      })

      console.log(`✓ Detectado dominio: ${domainName} (${widgetsExportName})`)
    } else {
      console.log(`⚠ Archivo sin widgets: ${file}`)
    }
  }

  return domains
}

/**
 * Genera el contenido del archivo index.tsx
 */
function generateWidgetsIndex(domains: DomainInfo[]): string {
  const imports = domains
    .map(
      (d) =>
        `import { ${d.widgetsExportName} } from '@/lib/flows/cases/${d.domainName}'`,
    )
    .join('\n')

  const registrations = domains
    .map((d) => `  ...${d.widgetsExportName},`)
    .join('\n')

  return `'use client'

// 🤖 Este archivo es generado automáticamente por scripts/auto-register-widgets.ts
// No editar manualmente - los cambios se perderán

// Import domain-specific widgets
${imports}
import { registerWidgets } from './registry'

// Register all domain widgets
registerWidgets({
${registrations}
  // Add other domain widgets here as they are created
})

// Re-export registry functions for convenience
export { getWidgetComponent, getRegisteredWidgetTypes, debugWidgetRegistry } from './registry'
export type { WidgetComponent, WidgetComponentProps, WidgetRegistry } from './registry'
`
}

/**
 * Función principal
 */
function main() {
  console.log('🚀 Iniciando auto-registro de widgets...\n')

  try {
    // Detectar dominios
    const domains = detectDomainFiles()

    if (domains.length === 0) {
      console.log('✗ No se encontraron dominios con widgets')
      return
    }

    console.log(`\n📦 Encontrados ${domains.length} dominios:`)
    domains.forEach((d) =>
      console.log(`   - ${d.domainName} (${d.widgetsExportName})`),
    )

    // Generar archivo
    const content = generateWidgetsIndex(domains)
    fs.writeFileSync(WIDGETS_INDEX_FILE, content, 'utf-8')

    console.log(`\n✓ Archivo generado: ${WIDGETS_INDEX_FILE}`)
    console.log('🎯 Widgets registrados automáticamente!')
  } catch (error) {
    console.error('✗ Error:', error)
    process.exit(1)
  }
}

// Ejecutar si es llamado directamente
if (require.main === module) {
  main()
}

export { main as autoRegisterWidgets }
