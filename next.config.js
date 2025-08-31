/** @type {import('next').NextConfig} */
const nextConfig = {
  // Suprimir warnings de desarrollo
  onDemandEntries: {
    // Período de tiempo que una página debe estar inactiva antes de ser eliminada
    maxInactiveAge: 25 * 1000,
    // Número de páginas que deben mantenerse simultáneamente
    pagesBufferLength: 2,
  },
  // Configuración experimental para reducir warnings
  experimental: {
    // Reducir logs de desarrollo
    logging: {
      level: 'error',
    },
  },
}

module.exports = nextConfig
