
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
    </div>
  )
}
