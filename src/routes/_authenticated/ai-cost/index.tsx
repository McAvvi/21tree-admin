import { createFileRoute } from '@tanstack/react-router'
import { AICostDashboard } from '@/features/ai-cost-dashboard/components'

// import { AICostDashboard } from '@/features/ai-cost-dashboard'

export const Route = createFileRoute('/_authenticated/ai-cost/')({
  component: AICostDashboard,
})
