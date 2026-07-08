import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  summaryMetrics,
  activationFunnel,
  // featureAdoption,
} from '../data/analytics-data'
import { Progress } from '../ui/progress'

// function SimpleProgress({
//   value,
//   className,
// }: {
//   value: number
//   className?: string
// }) {
//   return (
//     <div className={`h-2 w-full rounded-full bg-muted ${className}`}>
//       <div
//         className='h-2 rounded-full bg-primary transition-all'
//         style={{ width: `${value}%` }}
//       />
//     </div>
//   )
// }

export function MetricsOverview() {
  return (
    <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>Total Signups</CardTitle>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            className='h-4 w-4 text-muted-foreground'
          >
            <path d='M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2' />
            <circle cx='9' cy='7' r='4' />
            <path d='M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75' />
          </svg>
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold'>
            {summaryMetrics.totalSignups.toLocaleString()}
          </div>
          <p className='text-xs text-muted-foreground'>
            All-time registrations
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>FTUE Completion</CardTitle>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            className='h-4 w-4 text-muted-foreground'
          >
            <path d='M22 11.08V12a10 10 0 1 1-5.93-9.14' />
            <path d='M22 4L12 14.01l-3-3' />
          </svg>
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold'>
            {summaryMetrics.ftueCompletionRate}%
          </div>
          <p className='text-xs text-muted-foreground'>Finish onboarding</p>
          <Progress
            value={summaryMetrics.ftueCompletionRate}
            className='mt-2'
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>Activation Rate</CardTitle>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            className='h-4 w-4 text-muted-foreground'
          >
            <polygon points='13 2 3 14 12 14 11 22 21 10 12 10 13 2' />
          </svg>
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold'>
            {summaryMetrics.activationRate}%
          </div>
          <p className='text-xs text-muted-foreground'>First card within 24h</p>
          <Progress value={summaryMetrics.activationRate} className='mt-2' />
        </CardContent>
      </Card>

      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>Free → Pro</CardTitle>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            className='h-4 w-4 text-muted-foreground'
          >
            <rect width='20' height='14' x='2' y='5' rx='2' />
            <path d='M2 10h20' />
          </svg>
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold'>
            {summaryMetrics.freeToProConversion}%
          </div>
          <p className='text-xs text-muted-foreground'>Conversion rate</p>
          <Progress
            value={summaryMetrics.freeToProConversion * 4}
            className='mt-2'
          />
        </CardContent>
      </Card>
    </div>
  )
}

export function RetentionMetrics() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Retention Rates</CardTitle>
        <CardDescription>Cohort-based retention over time</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='space-y-4'>
          <div className='flex items-center justify-between'>
            <div className='space-y-1'>
              <p className='text-sm font-medium'>Day 1 Retention</p>
              <p className='text-xs text-muted-foreground'>
                % returning after 1 day
              </p>
            </div>
            <div className='text-right'>
              <p className='text-2xl font-bold'>
                {summaryMetrics.d1Retention}%
              </p>
              <Progress
                value={summaryMetrics.d1Retention}
                className='mt-1 w-24'
              />
            </div>
          </div>
          <div className='flex items-center justify-between'>
            <div className='space-y-1'>
              <p className='text-sm font-medium'>Day 7 Retention</p>
              <p className='text-xs text-muted-foreground'>
                % returning after 7 days
              </p>
            </div>
            <div className='text-right'>
              <p className='text-2xl font-bold'>
                {summaryMetrics.d7Retention}%
              </p>
              <Progress
                value={summaryMetrics.d7Retention}
                className='mt-1 w-24'
              />
            </div>
          </div>
          <div className='flex items-center justify-between'>
            <div className='space-y-1'>
              <p className='text-sm font-medium'>Day 30 Retention</p>
              <p className='text-xs text-muted-foreground'>
                % returning after 30 days
              </p>
            </div>
            <div className='text-right'>
              <p className='text-2xl font-bold'>
                {summaryMetrics.d30Retention}%
              </p>
              <Progress
                value={summaryMetrics.d30Retention}
                className='mt-1 w-24'
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function ActivationFunnel() {
  const maxCount = Math.max(...activationFunnel.map((f) => f.count))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Activation Funnel</CardTitle>
        <CardDescription>
          User journey from signup to activation
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className='space-y-4'>
          {activationFunnel.map(
            (
              step
              // index
            ) => (
              <div key={step.step} className='space-y-2'>
                <div className='flex items-center justify-between text-sm'>
                  <span className='font-medium'>{step.step}</span>
                  <span className='text-muted-foreground'>
                    {step.count.toLocaleString()} ({step.percentage}%)
                  </span>
                </div>
                <div className='h-2 w-full rounded-full bg-muted'>
                  <div
                    className='h-2 rounded-full bg-primary transition-all'
                    style={{ width: `${(step.count / maxCount) * 100}%` }}
                  />
                </div>
              </div>
            )
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export function SystemActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>System Activity</CardTitle>
        <CardDescription>Total cards created and reviewed</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='grid grid-cols-2 gap-4'>
          <div className='space-y-2'>
            <div className='flex items-center gap-2'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                className='h-5 w-5 text-muted-foreground'
              >
                <path d='M12 5v14M5 12h14' />
              </svg>
              <span className='text-sm text-muted-foreground'>
                Cards Created
              </span>
            </div>
            <p className='text-3xl font-bold'>
              {summaryMetrics.totalCardsCreated.toLocaleString()}
            </p>
            <p className='text-xs text-muted-foreground'>All-time total</p>
          </div>
          <div className='space-y-2'>
            <div className='flex items-center gap-2'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                className='h-5 w-5 text-muted-foreground'
              >
                <path d='M2 12h20M2 12l5-5m-5 5 5 5' />
              </svg>
              <span className='text-sm text-muted-foreground'>
                Cards Reviewed
              </span>
            </div>
            <p className='text-3xl font-bold'>
              {summaryMetrics.totalCardsReviewed.toLocaleString()}
            </p>
            <p className='text-xs text-muted-foreground'>All-time total</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
