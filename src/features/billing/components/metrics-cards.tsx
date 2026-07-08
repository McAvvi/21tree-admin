import React from 'react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface MetricsCardsProps {
  mrr: number
  mrrGrowth: number
  subscribers: {
    free: number
    pro: number
    business: number
    enterprise: number
  }
  churnRate: number
  churnTrend: number
  creditSales: { count: number; revenue: number }
}

export const MetricsCards: React.FC<MetricsCardsProps> = ({
  mrr,
  mrrGrowth,
  subscribers,
  churnRate,
  churnTrend,
  creditSales,
}) => {
  const formatCurrency = (val: number) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(val)

  return (
    <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
      {/* MRR Card */}
      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>
            Monthly Recurring Revenue
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold'>{formatCurrency(mrr)}</div>
          <p
            className={`text-xs ${mrrGrowth >= 0 ? 'text-green-600' : 'text-red-600'} mt-1 flex items-center`}
          >
            {mrrGrowth >= 0 ? '↑' : '↓'} {Math.abs(mrrGrowth)}% from last month
          </p>
        </CardContent>
      </Card>

      {/* Churn Card */}
      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>
            Churn Rate (Monthly)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold'>{churnRate}%</div>
          <p
            className={`text-xs ${churnTrend <= 0 ? 'text-green-600' : 'text-red-600'} mt-1 flex items-center`}
          >
            {churnTrend <= 0 ? '↓' : '↑'} {Math.abs(churnTrend)}% change
          </p>
        </CardContent>
      </Card>

      {/* Credit Sales Card */}
      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>
            Credit Package Sales
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold'>{creditSales.count}</div>
          <p className='mt-1 text-xs text-muted-foreground'>
            Total: {formatCurrency(creditSales.revenue)}
          </p>
        </CardContent>
      </Card>

      {/* Subscribers Card */}
      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>
            Active Subscribers
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold'>
            {subscribers.free +
              subscribers.pro +
              subscribers.business +
              subscribers.enterprise}
          </div>
          <div className='mt-2 grid grid-cols-2 gap-2'>
            <Badge variant='secondary' className='justify-center'>
              Pro: {subscribers.pro}
            </Badge>
            <Badge variant='secondary' className='justify-center'>
              Bus: {subscribers.business}
            </Badge>
            <Badge variant='outline' className='justify-center'>
              Ent: {subscribers.enterprise}
            </Badge>
            <Badge variant='outline' className='justify-center'>
              Free: {subscribers.free}
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
