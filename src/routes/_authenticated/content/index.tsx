import { createFileRoute } from '@tanstack/react-router'
import { ContentPage } from '@/features/content/content-page'

export const Route = createFileRoute('/_authenticated/content/')({
  component: ContentPage,
})
