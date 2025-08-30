import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowRightIcon, MessageCircleIcon, SmartphoneIcon, ZapIcon } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="mb-8">
            <Badge variant="secondary" className="mb-4">
              Prototipo
            </Badge>
            <h1 className="text-4xl font-bold text-center mb-8">
              Chat Agéntico con{' '}
              <span className="text-primary"> Widgets Inline</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Demostración de un chat inteligente donde el asistente puede insertar widgets interactivos 
              entre mensajes y resolver flujos complejos en un bottom sheet con gestos.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/demos">
                <Button size="lg" className="text-lg px-8">
                  Ver Demos
                  <ArrowRightIcon className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="text-lg px-8">
                Documentación
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Características Principales
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircleIcon className="w-8 h-8 text-primary" />
                </div>
                <CardTitle>Chat Inteligente</CardTitle>
                <CardDescription>
                  Conversación natural con asistente que entiende contexto y puede insertar widgets
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ZapIcon className="w-8 h-8 text-green-600" />
                </div>
                <CardTitle>Widgets Inline</CardTitle>
                <CardDescription>
                  Cards, listados y CTAs que se insertan dinámicamente entre mensajes
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <SmartphoneIcon className="w-8 h-8 text-purple-600" />
                </div>
                <CardTitle>Bottom Sheet</CardTitle>
                <CardDescription>
                  Flujos complejos en drawer con snap points, gestos y soporte para teclado
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Stack Tecnológico
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Next.js 14', desc: 'App Router + TypeScript' },
              { name: 'TailwindCSS', desc: 'Utility-first CSS' },
              { name: 'shadcn/ui', desc: 'Componentes accesibles' },
              { name: 'Vaul', desc: 'Bottom sheet nativo' },
              { name: 'Framer Motion', desc: 'Animaciones fluidas' },
              { name: 'Zod', desc: 'Validación de datos' },
              { name: 'Lucide React', desc: 'Íconos consistentes' },
              { name: 'Sonner', desc: 'Notificaciones toast' }
            ].map((tech, index) => (
              <Card key={index}>
                <CardContent className="p-6 text-center">
                  <h3 className="font-semibold mb-2">{tech.name}</h3>
                  <p className="text-sm text-muted-foreground">{tech.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary text-primary-foreground">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            ¿Listo para explorar?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Descubre cómo funciona el chat agéntico con widgets inline y bottom sheet
          </p>
          <Link href="/demos">
            <Button size="lg" variant="secondary" className="text-lg px-8">
              Explorar Demos
              <ArrowRightIcon className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
