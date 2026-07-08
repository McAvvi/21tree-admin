import { useState, useEffect } from 'react'
import { MetricsCards } from './components/metrics-cards'
import { PaymentTables } from './components/payment-tables'
import { WebhookStatus } from './components/webhook-status'

// --- Types ---
type SubscriberTier = 'free' | 'pro' | 'business' | 'enterprise'
type WebhookStatusType = 'success' | 'failed'
type PaymentStatusType = 'pending' | 'failed'
type RefundStatusType = 'pending' | 'approved' | 'rejected'

interface WebhookEvent {
  id: string
  event: string
  status: WebhookStatusType
  date: string
  error?: string
}

interface FailedPayment {
  id: string
  customer: string
  email: string
  amount: number
  reason: string
  retries: number
  maxRetries: number
  status: PaymentStatusType
}

interface RefundRequest {
  id: string
  customer: string
  order: string
  amount: number
  reason: string
  status: RefundStatusType
  date: string
}

interface BillingData {
  mrr: number
  mrrGrowth: number
  subscribers: Record<SubscriberTier, number>
  churnRate: number
  churnTrend: number
  creditSales: { count: number; revenue: number }
  topRevenueDays: { date: string; amount: number; count: number }[]
  webhooks: WebhookEvent[]
  failedPayments: FailedPayment[]
  refundRequests: RefundRequest[]
}

// --- Mock Data (Strictly Typed) ---
const mockData: BillingData = {
  mrr: 12450,
  mrrGrowth: 12.5,
  subscribers: {
    free: 1240,
    pro: 350,
    business: 85,
    enterprise: 12,
  },
  churnRate: 2.4,
  churnTrend: -0.5,
  creditSales: {
    count: 45,
    revenue: 1250,
  },
  topRevenueDays: [
    { date: '2023-10-25', amount: 3200, count: 12 },
    { date: '2023-10-15', amount: 2800, count: 9 },
    { date: '2023-10-01', amount: 2100, count: 8 },
    { date: '2023-09-25', amount: 1950, count: 7 },
    { date: '2023-09-15', amount: 1800, count: 6 },
  ],
  webhooks: [
    {
      id: '1',
      event: 'subscription_created',
      status: 'success',
      date: '2023-10-26 10:00',
    },
    {
      id: '2',
      event: 'order_created',
      status: 'success',
      date: '2023-10-26 09:45',
    },
    {
      id: '3',
      event: 'subscription_updated',
      status: 'failed',
      error: 'Timeout',
      date: '2023-10-26 09:30',
    },
    {
      id: '4',
      event: 'payment_failed',
      status: 'success',
      date: '2023-10-26 09:15',
    },
    {
      id: '5',
      event: 'subscription_cancelled',
      status: 'success',
      date: '2023-10-26 08:00',
    },
    {
      id: '6',
      event: 'order_created',
      status: 'success',
      date: '2023-10-25 23:00',
    },
    {
      id: '7',
      event: 'refund_created',
      status: 'success',
      date: '2023-10-25 22:15',
    },
    {
      id: '8',
      event: 'subscription_created',
      status: 'failed',
      error: '500 Internal',
      date: '2023-10-25 21:00',
    },
    {
      id: '9',
      event: 'order_created',
      status: 'success',
      date: '2023-10-25 20:00',
    },
    {
      id: '10',
      event: 'payment_success',
      status: 'success',
      date: '2023-10-25 19:00',
    },
  ] as WebhookEvent[],
  failedPayments: [
    {
      id: 'fp1',
      customer: 'Alice Smith',
      email: 'alice@example.com',
      amount: 49.0,
      reason: 'Card Declined',
      retries: 2,
      maxRetries: 3,
      status: 'pending',
    },
    {
      id: 'fp2',
      customer: 'Bob Jones',
      email: 'bob@example.com',
      amount: 99.0,
      reason: 'Insufficient Funds',
      retries: 1,
      maxRetries: 3,
      status: 'pending',
    },
    {
      id: 'fp3',
      customer: 'Charlie Day',
      email: 'charlie@example.com',
      amount: 29.0,
      reason: 'Expired Card',
      retries: 3,
      maxRetries: 3,
      status: 'failed',
    },
  ] as FailedPayment[],
  refundRequests: [
    {
      id: 'ref1',
      customer: 'David Lee',
      order: '#ORD-7782',
      amount: 49.0,
      reason: 'Duplicate charge',
      status: 'pending',
      date: '2023-10-26',
    },
    {
      id: 'ref2',
      customer: 'Eva Green',
      order: '#ORD-7780',
      amount: 199.0,
      reason: 'Service not used',
      status: 'pending',
      date: '2023-10-25',
    },
  ] as RefundRequest[],
}

export const BillingOverview = () => {
  const [data, setData] = useState<BillingData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API fetch
    const timer = setTimeout(() => {
      setData(mockData)
      setLoading(false)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  if (loading || !data) {
    return (
      <div className='flex items-center justify-center p-10'>
        Loading Billing Data...
      </div>
    )
  }

  return (
    <div className='space-y-6 p-6'>
      <header>
        <h1 className='text-2xl font-bold tracking-tight'>
          Billing & Revenue Overview
        </h1>
        <p className='text-muted-foreground'>
          High-level financial health and transaction monitoring
        </p>
      </header>

      {/* Section 1: Key Metrics */}
      <MetricsCards
        mrr={data.mrr}
        mrrGrowth={data.mrrGrowth}
        subscribers={data.subscribers}
        churnRate={data.churnRate}
        churnTrend={data.churnTrend}
        creditSales={data.creditSales}
      />

      {/* Section 2: Top Revenue & Webhooks Grid */}
      <div className='grid gap-6 md:grid-cols-2'>
        {/* Top Revenue Days Card */}
        <div className='card-wrapper'>
          {/* Using standard shadcn Card structure manually here for clarity if needed, or assume global styles */}
          <div className='rounded-xl border bg-card text-card-foreground shadow'>
            <div className='flex flex-col space-y-1.5 p-6'>
              <h3 className='leading-none font-semibold tracking-tight'>
                Top Revenue Days
              </h3>
            </div>
            <div className='p-6 pt-0'>
              <table className='w-full text-sm'>
                <thead>
                  <tr className='border-b text-muted-foreground'>
                    <th className='h-10 px-4 text-left align-middle font-medium'>
                      Date
                    </th>
                    <th className='h-10 px-4 text-right align-middle font-medium'>
                      Transactions
                    </th>
                    <th className='h-10 px-4 text-right align-middle font-medium'>
                      Revenue
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.topRevenueDays.map((day, idx) => (
                    <tr key={idx} className='border-b last:border-0'>
                      <td className='p-4 align-middle'>{day.date}</td>
                      <td className='p-4 text-right align-middle'>
                        {day.count}
                      </td>
                      <td className='p-4 text-right align-middle font-medium'>
                        ${day.amount.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <WebhookStatus events={data.webhooks} />
      </div>

      {/* Section 3: Tables (Failed Payments & Refunds) */}
      <PaymentTables
        failedPayments={data.failedPayments}
        refundRequests={data.refundRequests}
      />
    </div>
  )
}

export default BillingOverview

// import React, { useState, useEffect } from 'react'
// import { MetricsCards } from './components/metrics-cards'
// import { PaymentTables } from './components/payment-tables'
// import { WebhookStatus } from './components/webhook-status'

// // --- Mock Data (Replace with API calls) ---
// const mockData = {
//   mrr: 12450,
//   mrrGrowth: 12.5,
//   subscribers: {
//     free: 1240,
//     pro: 350,
//     business: 85,
//     enterprise: 12,
//   },
//   churnRate: 2.4,
//   churnTrend: -0.5,
//   creditSales: {
//     count: 45,
//     revenue: 1250,
//   },
//   topRevenueDays: [
//     { date: '2023-10-25', amount: 3200, count: 12 },
//     { date: '2023-10-15', amount: 2800, count: 9 },
//     { date: '2023-10-01', amount: 2100, count: 8 },
//     { date: '2023-09-25', amount: 1950, count: 7 },
//     { date: '2023-09-15', amount: 1800, count: 6 },
//   ],
//   webhooks: [
//     {
//       id: '1',
//       event: 'subscription_created',
//       status: 'success',
//       date: '2023-10-26 10:00',
//     },
//     {
//       id: '2',
//       event: 'order_created',
//       status: 'success',
//       date: '2023-10-26 09:45',
//     },
//     {
//       id: '3',
//       event: 'subscription_updated',
//       status: 'failed',
//       error: 'Timeout',
//       date: '2023-10-26 09:30',
//     },
//     {
//       id: '4',
//       event: 'payment_failed',
//       status: 'success',
//       date: '2023-10-26 09:15',
//     },
//     {
//       id: '5',
//       event: 'subscription_cancelled',
//       status: 'success',
//       date: '2023-10-26 08:00',
//     },
//     {
//       id: '6',
//       event: 'order_created',
//       status: 'success',
//       date: '2023-10-25 23:00',
//     },
//     {
//       id: '7',
//       event: 'refund_created',
//       status: 'success',
//       date: '2023-10-25 22:15',
//     },
//     {
//       id: '8',
//       event: 'subscription_created',
//       status: 'failed',
//       error: '500 Internal',
//       date: '2023-10-25 21:00',
//     },
//     {
//       id: '9',
//       event: 'order_created',
//       status: 'success',
//       date: '2023-10-25 20:00',
//     },
//     {
//       id: '10',
//       event: 'payment_success',
//       status: 'success',
//       date: '2023-10-25 19:00',
//     },
//   ],
//   failedPayments: [
//     {
//       id: 'fp1',
//       customer: 'Alice Smith',
//       email: 'alice@example.com',
//       amount: 49.0,
//       reason: 'Card Declined',
//       retries: 2,
//       maxRetries: 3,
//       status: 'pending',
//     },
//     {
//       id: 'fp2',
//       customer: 'Bob Jones',
//       email: 'bob@example.com',
//       amount: 99.0,
//       reason: 'Insufficient Funds',
//       retries: 1,
//       maxRetries: 3,
//       status: 'pending',
//     },
//     {
//       id: 'fp3',
//       customer: 'Charlie Day',
//       email: 'charlie@example.com',
//       amount: 29.0,
//       reason: 'Expired Card',
//       retries: 3,
//       maxRetries: 3,
//       status: 'failed',
//     },
//   ],
//   refundRequests: [
//     {
//       id: 'ref1',
//       customer: 'David Lee',
//       order: '#ORD-7782',
//       amount: 49.0,
//       reason: 'Duplicate charge',
//       status: 'pending',
//       date: '2023-10-26',
//     },
//     {
//       id: 'ref2',
//       customer: 'Eva Green',
//       order: '#ORD-7780',
//       amount: 199.0,
//       reason: 'Service not used',
//       status: 'pending',
//       date: '2023-10-25',
//     },
//   ],
// }

// export const BillingOverview = () => {
//   const [data, setData] = useState(mockData)
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     // Simulate API fetch
//     const timer = setTimeout(() => {
//       setData(mockData)
//       setLoading(false)
//     }, 500)
//     return () => clearTimeout(timer)
//   }, [])

//   if (loading) {
//     return <div style={styles.loading}>Loading Billing Data...</div>
//   }

//   return (
//     <div style={styles.container}>
//       <header style={styles.header}>
//         <h1 style={styles.title}>Billing & Revenue Overview</h1>
//         <p style={styles.subtitle}>
//           High-level financial health and transaction monitoring
//         </p>
//       </header>

//       {/* Section 1: Key Metrics */}
//       <MetricsCards
//         mrr={data.mrr}
//         mrrGrowth={data.mrrGrowth}
//         subscribers={data.subscribers}
//         churnRate={data.churnRate}
//         churnTrend={data.churnTrend}
//         creditSales={data.creditSales}
//       />

//       {/* Section 2: Top Revenue & Webhooks Grid */}
//       <div style={styles.gridTwo}>
//         <div style={styles.card}>
//           <h3 style={styles.cardTitle}>Top Revenue Days</h3>
//           <table style={styles.table}>
//             <thead>
//               <tr style={styles.tableHeaderRow}>
//                 <th style={styles.th}>Date</th>
//                 <th style={styles.th}>Transactions</th>
//                 <th style={styles.thRight}>Revenue</th>
//               </tr>
//             </thead>
//             <tbody>
//               {data.topRevenueDays.map((day, idx) => (
//                 <tr key={idx} style={styles.tableRow}>
//                   <td style={styles.td}>{day.date}</td>
//                   <td style={styles.td}>{day.count}</td>
//                   <td style={styles.tdRight}>${day.amount.toLocaleString()}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         <WebhookStatus
// 				events={data.webhooks} />
//       </div>

//       {/* Section 3: Tables (Failed Payments & Refunds) */}
//       <PaymentTables
//         failedPayments={data.failedPayments}
//         refundRequests={data.refundRequests}
//       />
//     </div>
//   )
// }

// // --- Basic Inline Styles for Safety ---
// const styles: Record<string, React.CSSProperties> = {
//   container: {
//     padding: '24px',
//     fontFamily: 'system-ui, sans-serif',
//     color: '#333',
//     maxWidth: '1400px',
//     margin: '0 auto',
//   },
//   header: { marginBottom: '24px' },
//   title: { fontSize: '24px', fontWeight: '700', margin: '0 0 8px 0' },
//   subtitle: { fontSize: '14px', color: '#666', margin: 0 },
//   loading: {
//     padding: '40px',
//     textAlign: 'center',
//     fontSize: '18px',
//     color: '#666',
//   },
//   gridTwo: {
//     display: 'grid',
//     gridTemplateColumns: '1fr 1fr',
//     gap: '24px',
//     marginTop: '24px',
//   },
//   gridFour: {
//     display: 'grid',
//     gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
//     gap: '24px',
//     marginBottom: '24px',
//   },
//   card: {
//     background: '#fff',
//     border: '1px solid #e5e7eb',
//     borderRadius: '8px',
//     padding: '20px',
//     boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
//   },
//   cardTitle: {
//     fontSize: '16px',
//     fontWeight: '600',
//     margin: '0 0 16px 0',
//     borderBottom: '1px solid #f3f4f6',
//     paddingBottom: '12px',
//   },

//   // Table Styles
//   table: { width: '100%', borderCollapse: 'collapse', fontSize: '14px' },
//   tableHeaderRow: { borderBottom: '2px solid #f3f4f6', textAlign: 'left' },
//   tableRow: { borderBottom: '1px solid #f3f4f6' },
//   th: {
//     padding: '12px 8px',
//     fontWeight: '600',
//     color: '#4b5563',
//     textAlign: 'left',
//   },
//   thRight: {
//     padding: '12px 8px',
//     fontWeight: '600',
//     color: '#4b5563',
//     textAlign: 'right',
//   },
//   td: { padding: '12px 8px', color: '#374151' },
//   tdRight: {
//     padding: '12px 8px',
//     color: '#374151',
//     textAlign: 'right',
//     fontWeight: '500',
//   },

//   // Badges
//   badge: {
//     display: 'inline-block',
//     padding: '4px 8px',
//     borderRadius: '4px',
//     fontSize: '12px',
//     fontWeight: '600',
//   },
//   badgeSuccess: { background: '#dcfce7', color: '#166534' },
//   badgeDanger: { background: '#fee2e2', color: '#991b1b' },
//   badgeWarning: { background: '#fef3c7', color: '#92400e' },
//   badgeNeutral: { background: '#f3f4f6', color: '#374151' },
// }

// export default BillingOverview
