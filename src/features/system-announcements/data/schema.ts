import { z } from 'zod'

// Schema for system announcement
export const systemAnnouncementSchema = z.object({
  id: z.string(),
  title: z.string(),
  type: z.enum(['maintenance', 'feature', 'terms', 'security']),
  priority: z.enum(['low', 'medium', 'high', 'critical']),
  status: z.enum(['draft', 'scheduled', 'active', 'archived']),
  description: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  scheduledFor: z.string().optional(),
  expiresAt: z.string().optional(),
  author: z.string(),
})

export type SystemAnnouncement = z.infer<typeof systemAnnouncementSchema>

// Type for announcement type display
export type AnnouncementType = 'maintenance' | 'feature' | 'terms' | 'security'

// Type for priority display
export type PriorityType = 'low' | 'medium' | 'high' | 'critical'

// Type for status display
export type StatusType = 'draft' | 'scheduled' | 'active' | 'archived'
