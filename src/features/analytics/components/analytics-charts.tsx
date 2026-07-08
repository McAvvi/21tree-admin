'use client'

import {
  Bar,
  BarChart,
  CartesianGrid,
  // Line,
  // LineChart,
  // ResponsiveContainer,
  XAxis,
  YAxis,
  // Tooltip as RechartsTooltip,
} from 'recharts'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
// import {
//   ChartConfig,
//   ChartContainer,
//   ChartTooltip,
//   ChartTooltipContent,
// } from '@/components/ui/chart'
import {
  signupTrends,
  dailyActivity,
  cohortRetention,
  featureAdoption,
} from '../data/analytics-data'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '../ui/charts'

const signupChartConfig = {
  count: {
    label: 'Signups',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig

const activityChartConfig = {
  cardsCreated: {
    label: 'Cards Created',
    color: 'hsl(var(--chart-2))',
  },
  cardsReviewed: {
    label: 'Cards Reviewed',
    color: 'hsl(var(--chart-3))',
  },
} satisfies ChartConfig

const retentionChartConfig = {
  d1: {
    label: 'D1',
    color: 'hsl(var(--chart-1))',
  },
  d7: {
    label: 'D7',
    color: 'hsl(var(--chart-2))',
  },
  d30: {
    label: 'D30',
    color: 'hsl(var(--chart-3))',
  },
} satisfies ChartConfig

export function SignupTrendChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Signups Trend</CardTitle>
        <CardDescription>Daily signups over the last 14 days</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={signupChartConfig} className='h-[300px] w-full'>
          <BarChart data={signupTrends}>
            <CartesianGrid strokeDasharray='3 3' vertical={false} />
            <XAxis
              dataKey='date'
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(5)} // Show MM-DD
            />
            <YAxis tickLine={false} axisLine={false} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar
              dataKey='count'
              fill='var(--color-count)'
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export function ActivityChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Cards Created & Reviewed</CardTitle>
        <CardDescription>Daily activity across the platform</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={activityChartConfig}
          className='h-[300px] w-full'
        >
          <BarChart data={dailyActivity}>
            <CartesianGrid strokeDasharray='3 3' vertical={false} />
            <XAxis
              dataKey='date'
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(5)}
            />
            <YAxis tickLine={false} axisLine={false} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar
              dataKey='cardsCreated'
              fill='var(--color-cardsCreated)'
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey='cardsReviewed'
              fill='var(--color-cardsReviewed)'
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export function RetentionCohortChart() {
  // Transform cohort data for chart
  const chartData = cohortRetention.map((cohort) => ({
    cohort: cohort.cohort,
    d1: cohort.d1,
    d7: cohort.d7,
    d30: cohort.d30 ?? null,
  }))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Retention Cohorts</CardTitle>
        <CardDescription>D1/D7/D30 retention by weekly cohort</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={retentionChartConfig}
          className='h-[300px] w-full'
        >
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray='3 3' vertical={false} />
            <XAxis
              dataKey='cohort'
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              domain={[0, 100]}
              tickFormatter={(value) => `${value}%`}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar
              dataKey='d1'
              fill='var(--color-d1)'
              radius={[4, 4, 0, 0]}
              stackId='a'
            />
            <Bar
              dataKey='d7'
              fill='var(--color-d7)'
              radius={[4, 4, 0, 0]}
              stackId='a'
            />
            <Bar
              dataKey='d30'
              fill='var(--color-d30)'
              radius={[4, 4, 0, 0]}
              stackId='a'
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export function FeatureAdoptionChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Feature Adoption</CardTitle>
        <CardDescription>% of users who have used each feature</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            percentage: { label: 'Adoption %', color: 'hsl(var(--chart-1))' },
          }}
          className='h-[300px] w-full'
        >
          <BarChart data={featureAdoption} layout='vertical'>
            <CartesianGrid
              strokeDasharray='3 3'
              horizontal={true}
              vertical={false}
            />
            <XAxis
              type='number'
              tickLine={false}
              axisLine={false}
              domain={[0, 100]}
              tickFormatter={(value) => `${value}%`}
            />
            <YAxis
              dataKey='feature'
              type='category'
              tickLine={false}
              axisLine={false}
              width={120}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar
              dataKey='percentage'
              fill='hsl(var(--chart-1))'
              radius={[0, 4, 4, 0]}
              label={{
                position: 'right',
                // formatter: (value: number) => `${value}%`,
                // 👇 FIX: Remove ': number' and safely handle the value
                formatter: (value) => `${Number(value)}%`,
              }}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
