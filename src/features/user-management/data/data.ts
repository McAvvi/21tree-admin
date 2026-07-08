import { UserCheck, Shield, User } from 'lucide-react'
import { type UserStatus, type UserTier } from './schema'

export const statusColors = new Map<UserStatus, string>([
  ['active', 'bg-teal-100/30 text-teal-900 dark:text-teal-200 border-teal-200'],
  ['inactive', 'bg-neutral-300/40 border-neutral-300'],
  [
    'suspended',
    'bg-amber-200/40 text-amber-900 dark:text-amber-100 border-amber-300',
  ],
  [
    'banned',
    'bg-destructive/10 dark:bg-destructive/50 text-destructive dark:text-primary border-destructive/10',
  ],
])

export const tierIcons = new Map<
  UserTier,
  React.ComponentType<{ className?: string }>
>([
  ['free', User],
  ['pro', UserCheck],
  ['admin', Shield],
])

export const tiers = [
  { label: 'Free', value: 'free', icon: User },
  { label: 'Pro', value: 'pro', icon: UserCheck },
  { label: 'Admin', value: 'admin', icon: Shield },
] as const
