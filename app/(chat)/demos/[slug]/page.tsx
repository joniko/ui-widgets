

import { notFound } from 'next/navigation'
import { getDemo } from '@/lib/demos'
import { ChatLayout } from '@/components/chat/ChatLayout'
import { BottomSheetProvider } from '@/components/drawers/useBottomSheet'
import { AppHeader } from '@/components/nav/AppHeader'
import { Toaster } from '@/components/ui/sonner'

interface DemoPageProps {
  params: Promise<{ slug: string }>
}

export default async function DemoPage({ params }: DemoPageProps) {
  const { slug } = await params
  const demo = getDemo(slug)

  if (!demo) {
    notFound()
  }

  return (
    <div className="h-screen flex flex-col">
      <AppHeader currentDemo={demo} showBackButton />
      
      <BottomSheetProvider>
        <div className="flex-1">
          <ChatLayout
            initialMessages={demo.initialMessages}
            initialQuickReplies={demo.initialQuickReplies}
            onQuickReply={demo.onQuickReply}
            onUserMessage={demo.onUserMessage}
          />
        </div>
        <Toaster />
      </BottomSheetProvider>
    </div>
  )
}
