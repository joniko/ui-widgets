import { BottomSheetProvider } from '@/components/drawers/useBottomSheet'
import { DemoClient } from '@/components/demos/DemoClient'

interface DemoPageProps {
  params: Promise<{ slug: string }>
}

export default async function DemoPage({ params }: DemoPageProps) {
  const { slug } = await params

  return (
    <div className="relative flex flex-col">
      <div
        className="absolute inset-0 bottom-0 z-0 h-full"
        style={{
          animation: 'gentleGlow 10s ease-in-out infinite',
          background:
            'radial-gradient(ellipse at bottom right, rgba(255, 230, 0, .1) 0, rgba(255, 230, 0, .2) 0, transparent 25%), linear-gradient(180deg, hsla(0, 0%, 100%, .1) 40%, rgba(177, 220, 249, .1) 70%, rgba(120, 126, 234, .1))',
          backgroundSize: '150% 120%, 100% 100%',
        }}
      />
      <BottomSheetProvider>
        <DemoClient slug={slug} />
      </BottomSheetProvider>
    </div>
  )
}
