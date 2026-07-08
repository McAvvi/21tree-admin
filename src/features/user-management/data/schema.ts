import { z } from 'zod'

// User Status Enum
export const userStatusSchema = z.enum([
  'active',
  'inactive',
  'suspended',
  'banned',
])
export type UserStatus = z.infer<typeof userStatusSchema>

// User Tier Enum
export const userTierSchema = z.enum(['free', 'pro', 'admin'])
export type UserTier = z.infer<typeof userTierSchema>

// SRS State Schema
export const srsStateSchema = z.object({
  dueCount: z.number(),
  totalCards: z.number(),
  lastResetAt: z.date().nullable(),
})

export type SrsState = z.infer<typeof srsStateSchema>

// AI Usage Schema
export const aiUsageSchema = z.object({
  tokensUsed: z.number(),
  cost: z.number(),
  periodStart: z.date(),
  periodEnd: z.date(),
})

export type AiUsage = z.infer<typeof aiUsageSchema>

// User Profile Schema
// Prefix with _ because it's only used for type inference in other files
export const _userProfileSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string(),
  avatar: z.string().url().nullable(),
  tier: userTierSchema,
  status: userStatusSchema,
  creditBalance: z.number(),
  folderCount: z.number(),
  flashcardCount: z.number(),
  srsState: srsStateSchema,
  aiUsage: aiUsageSchema,
  signupDate: z.date(),
  lastLogin: z.date().nullable(),
  lastActive: z.date().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export type UserProfile = z.infer<typeof _userProfileSchema>

// Credit Ledger Entry Schema
// Prefix with _ because it's only used for type inference in other files
export const _creditLedgerEntrySchema = z.object({
  id: z.string(),
  userId: z.string(),
  amount: z.number(),
  balanceAfter: z.number(),
  reason: z.string(),
  type: z.enum(['grant', 'revoke', 'usage']),
  createdAt: z.date(),
  createdBy: z.string().nullable(), // Admin who performed the action
})

export type CreditLedgerEntry = z.infer<typeof _creditLedgerEntrySchema>
