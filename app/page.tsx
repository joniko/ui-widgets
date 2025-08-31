
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { HeroSection } from '@/components/ui/hero-section'
import { CTASection } from '@/components/ui/cta-section'
import {
  MessageCircleIcon,
  SmartphoneIcon,
  ZapIcon,
} from 'lucide-react'

export default function HomePage() {
  return (
    <div className="bg-background min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <section className="bg-muted/30 px-4 py-20">
        <div className="container mx-auto">
          <h2 className="mb-12 text-center text-3xl font-bold">
            Características Principales
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            <Card className="text-center">
              <CardHeader>
                <div className="bg-primary/10 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                  <MessageCircleIcon className="text-primary h-8 w-8" />
                </div>
                <CardTitle>Chat Inteligente</CardTitle>
                <CardDescription>
                  Conversación natural con asistente que entiende contexto y
                  puede insertar widgets
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                  <ZapIcon className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle>Widgets Inline</CardTitle>
                <CardDescription>
                  Cards, listados y CTAs que se insertan dinámicamente entre
                  mensajes
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-purple-100">
                  <SmartphoneIcon className="h-8 w-8 text-purple-600" />
                </div>
                <CardTitle>Bottom Sheet</CardTitle>
                <CardDescription>
                  Flujos complejos en drawer con snap points, gestos y soporte
                  para teclado
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="px-4 py-20">
        <div className="container mx-auto">
          <h2 className="mb-12 text-center text-3xl font-bold">
            Stack Tecnológico
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              { name: 'Next.js 14', desc: 'App Router + TypeScript' },
              { name: 'TailwindCSS', desc: 'Utility-first CSS' },
              { name: 'shadcn/ui', desc: 'Componentes accesibles' },
              { name: 'Vaul', desc: 'Bottom sheet nativo' },
              { name: 'Framer Motion', desc: 'Animaciones fluidas' },
              { name: 'Zod', desc: 'Validación de datos' },
              { name: 'Lucide React', desc: 'Íconos consistentes' },
              { name: 'Sonner', desc: 'Notificaciones toast' },
            ].map((tech, index) => (
              <Card key={index}>
                <CardContent className="p-6 text-center">
                  <h3 className="mb-2 font-semibold">{tech.name}</h3>
                  <p className="text-muted-foreground text-sm">{tech.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection />
    </div>
  )
}
