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

// import React from 'react'

// interface MetricsCardsProps {
//   mrr: number
//   mrrGrowth: number
//   subscribers: {
//     free: number
//     pro: number
//     business: number
//     enterprise: number
//   }
//   churnRate: number
//   churnTrend: number
//   creditSales: { count: number; revenue: number }
// }

// export const MetricsCards: React.FC<MetricsCardsProps> = ({
//   mrr,
//   mrrGrowth,
//   subscribers,
//   churnRate,
//   churnTrend,
//   creditSales,
// }) => {
//   const styles = {
//     grid: {
//       display: 'grid',
//       gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
//       gap: '24px',
//       marginBottom: '24px',
//     },
//     card: {
//       background: '#fff',
//       border: '1px solid #e5e7eb',
//       borderRadius: '8px',
//       padding: '20px',
//       boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
//     },
//     label: {
//       fontSize: '13px',
//       color: '#6b7280',
//       fontWeight: '500',
//       marginBottom: '8px',
//       display: 'block',
//     },
//     value: {
//       fontSize: '24px',
//       fontWeight: '700',
//       color: '#111827',
//       margin: '0 0 4px 0',
//     },
//     trend: {
//       fontSize: '13px',
//       fontWeight: '500',
//       display: 'flex',
//       alignItems: 'center',
//       gap: '4px',
//     },
//     trendUp: { color: '#16a34a' },
//     trendDown: { color: '#dc2626' },
//     subGrid: {
//       display: 'grid',
//       gridTemplateColumns: '1fr 1fr',
//       gap: '8px',
//       marginTop: '8px',
//     },
//     subItem: {
//       fontSize: '13px',
//       color: '#4b5563',
//       background: '#f9fafb',
//       padding: '8px',
//       borderRadius: '4px',
//     },
//     subLabel: { fontWeight: '600', color: '#374151' },
//   }

//   const formatCurrency = (val: number) =>
//     new Intl.NumberFormat('en-US', {
//       style: 'currency',
//       currency: 'USD',
//     }).format(val)

//   return (
//     <div style={styles.grid}>
//       {/* MRR Card */}
//       <div style={styles.card}>
//         <span style={styles.label}>Monthly Recurring Revenue (MRR)</span>
//         <h3 style={styles.value}>{formatCurrency(mrr)}</h3>
//         <div
//           style={{
//             ...styles.trend,
//             ...(mrrGrowth >= 0 ? styles.trendUp : styles.trendDown),
//           }}
//         >
//           {mrrGrowth >= 0 ? '↑' : '↓'} {Math.abs(mrrGrowth)}% vs last month
//         </div>
//       </div>

//       {/* Churn Card */}
//       <div style={styles.card}>
//         <span style={styles.label}>Churn Rate (Monthly)</span>
//         <h3 style={styles.value}>{churnRate}%</h3>
//         <div
//           style={{
//             ...styles.trend,
//             ...(churnTrend <= 0 ? styles.trendUp : styles.trendDown),
//           }}
//         >
//           {churnTrend <= 0 ? '↓' : '↑'} {Math.abs(churnTrend)}% change
//         </div>
//       </div>

//       {/* Credit Sales Card */}
//       <div style={styles.card}>
//         <span style={styles.label}>Credit Package Sales</span>
//         <h3 style={styles.value}>{creditSales.count}</h3>
//         <div style={{ fontSize: '13px', color: '#6b7280' }}>
//           Total Revenue: <strong>{formatCurrency(creditSales.revenue)}</strong>
//         </div>
//       </div>

//       {/* Subscribers Card */}
//       <div style={styles.card}>
//         <span style={styles.label}>Active Subscribers</span>
//         <h3 style={styles.value}>
//           {subscribers.free +
//             subscribers.pro +
//             subscribers.business +
//             subscribers.enterprise}
//         </h3>
//         <div style={styles.subGrid}>
//           <div style={styles.subItem}>
//             <span style={styles.subLabel}>Pro:</span> {subscribers.pro}
//           </div>
//           <div style={styles.subItem}>
//             <span style={styles.subLabel}>Bus:</span> {subscribers.business}
//           </div>
//           <div style={styles.subItem}>
//             <span style={styles.subLabel}>Ent:</span> {subscribers.enterprise}
//           </div>
//           <div style={styles.subItem}>
//             <span style={styles.subLabel}>Free:</span> {subscribers.free}
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }
