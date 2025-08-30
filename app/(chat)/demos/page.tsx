import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { getAllDemos } from '@/lib/demos'
import { AppHeader } from '@/components/nav/AppHeader'

export default function DemosPage() {
  const demos = getAllDemos()

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Demos del Chat Agéntico</h1>
          <p className="text-muted-foreground">
            Explora diferentes escenarios donde el asistente puede insertar widgets inline y abrir bottom sheets
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {demos.map((demo) => (
            <Link key={demo.slug} href={`/demos/${demo.slug}`}>
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="text-3xl">{demo.icon}</div>
                    <div>
                      <CardTitle className="group-hover:text-primary transition-colors">
                        {demo.title}
                      </CardTitle>
                      <Badge variant="outline" className="mt-2">
                        Demo
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {demo.description}
                  </CardDescription>
                  <div className="mt-4">
                    <Button className="w-full" variant="outline">
                      Probar Demo
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="bg-muted/50 rounded-lg p-8">
            <h2 className="text-2xl font-semibold mb-4">¿Quieres crear tu propio demo?</h2>
            <p className="text-muted-foreground mb-6">
              Aprende cómo extender el sistema con nuevos widgets y flujos
            </p>
            <Button variant="outline" size="lg">
              Ver Documentación
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
