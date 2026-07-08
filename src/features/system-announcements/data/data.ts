import { Wrench, Sparkles, FileText, AlertTriangle } from 'lucide-react'
import {
  type AnnouncementType,
  type PriorityType,
  type StatusType,
} from './schema'

export const statusColors = new Map<StatusType, string>([
  ['draft', 'bg-neutral-300/40 border-neutral-300'],
  [
    'scheduled',
    'bg-blue-100/30 text-blue-900 dark:text-blue-200 border-blue-200',
  ],
  ['active', 'bg-teal-100/30 text-teal-900 dark:text-teal-200 border-teal-200'],
  ['archived', 'bg-neutral-200/40 border-neutral-200 text-neutral-600'],
])

export const priorityColors = new Map<PriorityType, string>([
  ['low', 'bg-slate-100/30 text-slate-700 border-slate-200'],
  ['medium', 'bg-blue-100/30 text-blue-900 dark:text-blue-200 border-blue-200'],
  [
    'high',
    'bg-orange-100/30 text-orange-900 dark:text-orange-200 border-orange-200',
  ],
  ['critical', 'bg-red-100/30 text-red-900 dark:text-red-200 border-red-200'],
])

export const announcementTypes = [
  {
    label: 'Maintenance',
    value: 'maintenance' as AnnouncementType,
    icon: Wrench,
  },
  { label: 'Feature', value: 'feature' as AnnouncementType, icon: Sparkles },
  { label: 'Terms', value: 'terms' as AnnouncementType, icon: FileText },
  {
    label: 'Security',
    value: 'security' as AnnouncementType,
    icon: AlertTriangle,
  },
] as const
