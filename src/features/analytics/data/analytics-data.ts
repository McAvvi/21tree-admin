// Mock data for analytics dashboard
// In production, this would come from your database tables:
// user_profiles, study_sessions, catalog_flashcards, catalog_units

export interface SignupTrend {
  date: string
  count: number
  source?: 'organic' | 'referral' | 'paid' | 'social'
}

export interface CohortData {
  cohort: string // e.g., "2024-W01"
  d0: number
  d1: number
  d7: number
  d30: number
}

export interface FeatureAdoption {
  feature: string
  users: number
  percentage: number
}

export interface DailyActivity {
  date: string
  cardsCreated: number
  cardsReviewed: number
}

export interface FunnelData {
  step: string
  count: number
  percentage: number
}

// Mock signup trends (last 14 days)
export const signupTrends: SignupTrend[] = [
  { date: '2024-01-01', count: 45, source: 'organic' },
  { date: '2024-01-02', count: 52, source: 'organic' },
  { date: '2024-01-03', count: 38, source: 'referral' },
  { date: '2024-01-04', count: 61, source: 'paid' },
  { date: '2024-01-05', count: 55, source: 'social' },
  { date: '2024-01-06', count: 48, source: 'organic' },
  { date: '2024-01-07', count: 42, source: 'organic' },
  { date: '2024-01-08', count: 58, source: 'referral' },
  { date: '2024-01-09', count: 63, source: 'paid' },
  { date: '2024-01-10', count: 51, source: 'social' },
  { date: '2024-01-11', count: 47, source: 'organic' },
  { date: '2024-01-12', count: 54, source: 'organic' },
  { date: '2024-01-13', count: 59, source: 'referral' },
  { date: '2024-01-14', count: 66, source: 'paid' },
]

// Mock cohort retention data
export const cohortRetention: CohortData[] = [
  { cohort: '2024-W01', d0: 100, d1: 65, d7: 42, d30: 28 },
  { cohort: '2024-W02', d0: 120, d1: 78, d7: 51, d30: 35 },
  {
    cohort: '2024-W03',
    d0: 115,
    d1: 74,
    d7: 48,
    d30: null as unknown as number,
  },
  {
    cohort: '2024-W04',
    d0: 130,
    d1: 85,
    d7: 55,
    d30: null as unknown as number,
  },
]

// Mock feature adoption data
export const featureAdoption: FeatureAdoption[] = [
  { feature: 'Flashcards', users: 1250, percentage: 85 },
  { feature: 'Notes', users: 890, percentage: 61 },
  { feature: 'Verbatim Mode', users: 620, percentage: 42 },
  { feature: 'Templates', users: 540, percentage: 37 },
  { feature: 'Chat Assistant', users: 480, percentage: 33 },
  { feature: 'Spaced Repetition', users: 720, percentage: 49 },
]

// Mock daily activity (cards created/reviewed)
export const dailyActivity: DailyActivity[] = [
  { date: '2024-01-08', cardsCreated: 342, cardsReviewed: 1250 },
  { date: '2024-01-09', cardsCreated: 389, cardsReviewed: 1380 },
  { date: '2024-01-10', cardsCreated: 301, cardsReviewed: 1120 },
  { date: '2024-01-11', cardsCreated: 356, cardsReviewed: 1290 },
  { date: '2024-01-12', cardsCreated: 378, cardsReviewed: 1410 },
  { date: '2024-01-13', cardsCreated: 295, cardsReviewed: 980 },
  { date: '2024-01-14', cardsCreated: 312, cardsReviewed: 1050 },
]

// Mock funnel data (signup → activation)
export const activationFunnel: FunnelData[] = [
  { step: 'Signups', count: 1500, percentage: 100 },
  { step: 'FTUE Completed', count: 1125, percentage: 75 },
  { step: 'First Card Created (24h)', count: 825, percentage: 55 },
  { step: 'First Review Session', count: 675, percentage: 45 },
  { step: 'Active (D7)', count: 450, percentage: 30 },
]

// Summary metrics
export const summaryMetrics = {
  totalSignups: 1500,
  ftueCompletionRate: 75, // %
  activationRate: 55, // % who create first card within 24h
  d1Retention: 65, // %
  d7Retention: 42, // %
  d30Retention: 28, // %
  freeToProConversion: 12.5, // %
  totalCardsCreated: 45230,
  totalCardsReviewed: 128450,
}
