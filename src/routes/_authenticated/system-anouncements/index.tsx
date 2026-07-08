import z from 'zod'
import { createFileRoute } from '@tanstack/react-router'
import SystemAnnouncements from '@/features/system-announcements'

const announcementsSearchSchema = z.object({
  page: z.number().optional().catch(1),
  pageSize: z.number().optional().catch(10),
  // Facet filters
  type: z
    .array(
      z.union([
        z.literal('maintenance'),
        z.literal('feature'),
        z.literal('terms'),
        z.literal('security'),
      ])
    )
    .optional()
    .catch([]),
  priority: z
    .array(
      z.union([
        z.literal('low'),
        z.literal('medium'),
        z.literal('high'),
        z.literal('critical'),
      ])
    )
    .optional()
    .catch([]),
  status: z
    .array(
      z.union([
        z.literal('draft'),
        z.literal('scheduled'),
        z.literal('active'),
        z.literal('archived'),
      ])
    )
    .optional()
    .catch([]),
  // Search filter
  title: z.string().optional().catch(''),
})

export const Route = createFileRoute('/_authenticated/system-anouncements/')({
  validateSearch: announcementsSearchSchema,
  component: SystemAnnouncements,
})
