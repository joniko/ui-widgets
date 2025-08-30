

import { BottomSheetProvider } from '@/components/drawers/useBottomSheet'
import { DemoClient } from '@/components/demos/DemoClient'

interface DemoPageProps {
  params: Promise<{ slug: string }>
}

export default async function DemoPage({ params }: DemoPageProps) {
  const { slug } = await params

  return (
    <div className="h-screen flex flex-col max-w-[640px] mx-auto max-h-[1000px]">
      <BottomSheetProvider>
        <DemoClient slug={slug} />
      </BottomSheetProvider>
    </div>
  )
}
