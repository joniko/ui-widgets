

import { BottomSheetProvider } from '@/components/drawers/useBottomSheet'
import { DemoClient } from '@/components/demos/DemoClient'

interface DemoPageProps {
  params: Promise<{ slug: string }>
}

export default async function DemoPage({ params }: DemoPageProps) {
  const { slug } = await params

  return (
    <div className="h-screen flex flex-col">
      <BottomSheetProvider>
        <DemoClient slug={slug} />
      </BottomSheetProvider>
    </div>
  )
}
