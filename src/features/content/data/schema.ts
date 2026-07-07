import { z } from 'zod'

export const contentItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: z.enum(['template', 'folder']),
  path: z.string(),
  parentId: z.string().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
})

export type ContentItem = z.infer<typeof contentItemSchema>
