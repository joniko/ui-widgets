import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-primary mb-4 text-6xl font-bold">404</h1>
        <h2 className="mb-4 text-2xl font-semibold text-neutral-900">
          Página no encontrada
        </h2>
        <p className="mb-8 max-w-md text-neutral-600">
          Lo sentimos, la página que buscas no existe o ha sido movida.
        </p>
        <Button asChild>
          <Link href="/">Volver al inicio</Link>
        </Button>
      </div>
    </div>
  )
}
