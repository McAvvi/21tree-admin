import { createFileRoute } from '@tanstack/react-router'
import BillingOverview from '@/features/billing'

export const Route = createFileRoute('/_authenticated/billing/')({
  component: BillingOverview,
})
