'use client'

import { notFound } from 'next/navigation'
import { ChatLayout } from '@/components/chat/ChatLayout'
import { AppHeader } from '@/components/nav/AppHeader'
import { Toaster } from '@/components/ui/sonner'
import { getDemo } from '@/lib/demos'

interface DemoClientProps {
  slug: string
}

export function DemoClient({ slug }: DemoClientProps) {
  const demo = getDemo(slug)

  if (!demo) {
    notFound()
  }

  return (
    <>
      <AppHeader currentDemo={demo} showBackButton />
      
      <ChatLayout
        initialMessages={demo.initialMessages}
        initialQuickReplies={demo.initialQuickReplies}
        onQuickReply={demo.onQuickReply}
        onUserMessage={demo.onUserMessage}
      />
      <Toaster />
    </>
  )
}
