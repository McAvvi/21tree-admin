import React, { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

interface FailedPayment {
  id: string
  customer: string
  email: string
  amount: number
  reason: string
  retries: number
  maxRetries: number
  status: 'pending' | 'failed'
}

interface RefundRequest {
  id: string
  customer: string
  order: string
  amount: number
  reason: string
  status: 'pending' | 'approved' | 'rejected'
  date: string
}

interface Props {
  failedPayments: FailedPayment[]
  refundRequests: RefundRequest[]
}

export const PaymentTables: React.FC<Props> = ({
  failedPayments,
  refundRequests,
}) => {
  const [refunds, setRefunds] = useState(refundRequests)

  const handleRefundAction = (id: string, action: 'approved' | 'rejected') => {
    setRefunds((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: action } : r))
    )
    // TODO: Add API call here
    //console.log(`Refund ${id} marked as ${action}`)
  }

  return (
    <div className='grid gap-6 md:grid-cols-2'>
      {/* Failed Payments */}
      <Card>
        <CardHeader>
          <CardTitle>Failed Payments</CardTitle>
        </CardHeader>
        <CardContent>
          {failedPayments.length === 0 ? (
            <p className='text-sm text-muted-foreground'>
              No failed payments found.
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead className='text-right'>Amount</TableHead>
                  <TableHead>Reason</TableHead>
                  <TableHead>Retries</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {failedPayments.map((fp) => (
                  <TableRow key={fp.id}>
                    <TableCell>
                      <div className='font-medium'>{fp.customer}</div>
                      <div className='text-xs text-muted-foreground'>
                        {fp.email}
                      </div>
                    </TableCell>
                    <TableCell className='text-right'>
                      ${fp.amount.toFixed(2)}
                    </TableCell>
                    <TableCell className='text-sm'>{fp.reason}</TableCell>
                    <TableCell>
                      <div className='flex items-center gap-2'>
                        <span className='text-xs font-medium'>
                          {fp.retries}/{fp.maxRetries}
                        </span>
                        <div className='h-1.5 w-16 overflow-hidden rounded-full bg-secondary'>
                          <div
                            className={`h-full ${fp.retries >= fp.maxRetries ? 'bg-red-500' : 'bg-orange-500'}`}
                            style={{
                              width: `${(fp.retries / fp.maxRetries) * 100}%`,
                            }}
                          />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          fp.status === 'failed' ? 'destructive' : 'secondary'
                        }
                      >
                        {fp.status.toUpperCase()}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Refund Requests */}
      <Card>
        <CardHeader>
          <CardTitle>Refund Requests Queue</CardTitle>
        </CardHeader>
        <CardContent>
          {refunds.length === 0 ? (
            <p className='text-sm text-muted-foreground'>
              No pending requests.
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Order</TableHead>
                  <TableHead className='text-right'>Amount</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {refunds.map((req) => (
                  <TableRow key={req.id}>
                    <TableCell>
                      <div className='font-medium'>{req.customer}</div>
                      <div className='text-xs text-muted-foreground'>
                        {req.date}
                      </div>
                    </TableCell>
                    <TableCell className='font-mono text-xs'>
                      {req.order}
                    </TableCell>
                    <TableCell className='text-right'>
                      ${req.amount.toFixed(2)}
                    </TableCell>
                    <TableCell>
                      {req.status === 'pending' ? (
                        <div className='flex gap-2'>
                          <Button
                            size='sm'
                            variant='default'
                            className='h-8 bg-green-600 hover:bg-green-700'
                            onClick={() =>
                              handleRefundAction(req.id, 'approved')
                            }
                          >
                            Approve
                          </Button>
                          <Button
                            size='sm'
                            variant='outline'
                            className='h-8 border-red-200 text-red-600 hover:bg-red-50'
                            onClick={() =>
                              handleRefundAction(req.id, 'rejected')
                            }
                          >
                            Reject
                          </Button>
                        </div>
                      ) : (
                        <Badge
                          variant={
                            req.status === 'approved'
                              ? 'default'
                              : 'destructive'
                          }
                        >
                          {req.status.toUpperCase()}
                        </Badge>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

// import React, { useState } from 'react'

// interface FailedPayment {
//   id: string
//   customer: string
//   email: string
//   amount: number
//   reason: string
//   retries: number
//   maxRetries: number
//   status: 'pending' | 'failed'
// }

// interface RefundRequest {
//   id: string
//   customer: string
//   order: string
//   amount: number
//   reason: string
//   status: 'pending' | 'approved' | 'rejected'
//   date: string
// }

// interface Props {
//   failedPayments: FailedPayment[]
//   refundRequests: RefundRequest[]
// }

// export const PaymentTables: React.FC<Props> = ({
//   failedPayments,
//   refundRequests,
// }) => {
//   const [refunds, setRefunds] = useState(refundRequests)

//   const handleRefundAction = (id: string, action: 'approved' | 'rejected') => {
//     setRefunds((prev) =>
//       prev.map((r) => (r.id === id ? { ...r, status: action } : r))
//     )
//     // TODO: Add API call here
//     alert(`Refund ${id} marked as ${action}`)
//   }

//   const styles = {
//     section: { marginTop: '24px' },
//     grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' },
//     card: {
//       background: '#fff',
//       border: '1px solid #e5e7eb',
//       borderRadius: '8px',
//       padding: '20px',
//     },
//     cardTitle: {
//       fontSize: '16px',
//       fontWeight: '600',
//       margin: '0 0 16px 0',
//       borderBottom: '1px solid #f3f4f6',
//       paddingBottom: '12px',
//     },
//     table: { width: '100%', borderCollapse: 'collapse', fontSize: '14px' },
//     th: {
//       padding: '12px 8px',
//       fontWeight: '600',
//       color: '#4b5563',
//       textAlign: 'left',
//       borderBottom: '2px solid #f3f4f6',
//     },
//     td: {
//       padding: '12px 8px',
//       color: '#374151',
//       borderBottom: '1px solid #f3f4f6',
//     },
//     badge: {
//       display: 'inline-block',
//       padding: '4px 8px',
//       borderRadius: '4px',
//       fontSize: '12px',
//       fontWeight: '600',
//     },
//     badgePending: { background: '#fef3c7', color: '#92400e' },
//     badgeFailed: { background: '#fee2e2', color: '#991b1b' },
//     badgeSuccess: { background: '#dcfce7', color: '#166534' },
//     btn: {
//       padding: '6px 12px',
//       borderRadius: '4px',
//       border: 'none',
//       cursor: 'pointer',
//       fontSize: '12px',
//       fontWeight: '600',
//       marginRight: '4px',
//     },
//     btnApprove: { background: '#16a34a', color: '#fff' },
//     btnReject: { background: '#dc2626', color: '#fff' },
//     btnDisabled: {
//       background: '#e5e7eb',
//       color: '#9ca3af',
//       cursor: 'not-allowed',
//     },
//     retryBar: {
//       width: '100%',
//       height: '4px',
//       background: '#e5e7eb',
//       borderRadius: '2px',
//       marginTop: '4px',
//       overflow: 'hidden',
//     },
//     retryFill: (count: number, max: number) => ({
//       width: `${(count / max) * 100}%`,
//       height: '100%',
//       background: count >= max ? '#dc2626' : '#f59e0b',
//     }),
//   }

//   return (
//     <div style={styles.section}>
//       <div style={styles.grid}>
//         {/* Failed Payments */}
//         <div style={styles.card}>
//           <h3 style={styles.cardTitle}>Failed Payments</h3>
//           {failedPayments.length === 0 ? (
//             <p>No failed payments</p>
//           ) : (
//             <table
//             //	style={styles.table}
//             >
//               <thead>
//                 <tr>
//                   <th
//                   //style={styles.th}
//                   >
//                     Customer
//                   </th>
//                   <th
//                   //style={styles.th}
//                   >
//                     Amount
//                   </th>
//                   <th
//                   //style={styles.th}
//                   >
//                     Reason
//                   </th>
//                   <th
//                   //style={styles.th}
//                   >
//                     Retries
//                   </th>
//                   <th
//                   //style={styles.th}
//                   >
//                     Status
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {failedPayments.map((fp) => (
//                   <tr key={fp.id}>
//                     <td style={styles.td}>
//                       <div style={{ fontWeight: '500' }}>{fp.customer}</div>
//                       <div style={{ fontSize: '11px', color: '#6b7280' }}>
//                         {fp.email}
//                       </div>
//                     </td>
//                     <td style={styles.td}>${fp.amount.toFixed(2)}</td>
//                     <td style={styles.td}>{fp.reason}</td>
//                     <td style={{ ...styles.td, width: '100px' }}>
//                       {fp.retries}/{fp.maxRetries}
//                       <div style={styles.retryBar}>
//                         <div
//                           style={styles.retryFill(fp.retries, fp.maxRetries)}
//                         />
//                       </div>
//                     </td>
//                     <td style={styles.td}>
//                       <span
//                         style={{
//                           ...styles.badge,
//                           ...(fp.status === 'failed'
//                             ? styles.badgeFailed
//                             : styles.badgePending),
//                         }}
//                       >
//                         {fp.status.toUpperCase()}
//                       </span>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )}
//         </div>

//         {/* Refund Requests */}
//         <div style={styles.card}>
//           <h3 style={styles.cardTitle}>Refund Requests Queue</h3>
//           {refunds.length === 0 ? (
//             <p>No pending requests</p>
//           ) : (
//             <table //style={styles.table}
//             >
//               <thead>
//                 <tr>
//                   <th
//                   //style={styles.th}
//                   >
//                     Customer
//                   </th>
//                   <th
//                   //style={styles.th}
//                   >
//                     Order
//                   </th>
//                   <th
//                   //style={styles.th}
//                   >
//                     Amount
//                   </th>
//                   <th
//                   //style={styles.th}
//                   >
//                     Action
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {refunds.map((req) => (
//                   <tr key={req.id}>
//                     <td style={styles.td}>
//                       <div style={{ fontWeight: '500' }}>{req.customer}</div>
//                       <div style={{ fontSize: '11px', color: '#6b7280' }}>
//                         {req.date}
//                       </div>
//                     </td>
//                     <td style={styles.td}>{req.order}</td>
//                     <td style={styles.td}>${req.amount.toFixed(2)}</td>
//                     <td style={styles.td}>
//                       {req.status === 'pending' ? (
//                         <>
//                           <button
//                             style={{ ...styles.btn, ...styles.btnApprove }}
//                             onClick={() =>
//                               handleRefundAction(req.id, 'approved')
//                             }
//                           >
//                             Approve
//                           </button>
//                           <button
//                             style={{ ...styles.btn, ...styles.btnReject }}
//                             onClick={() =>
//                               handleRefundAction(req.id, 'rejected')
//                             }
//                           >
//                             Reject
//                           </button>
//                         </>
//                       ) : (
//                         <span
//                           style={{
//                             ...styles.badge,
//                             ...(req.status === 'approved'
//                               ? styles.badgeSuccess
//                               : styles.badgeFailed),
//                           }}
//                         >
//                           {req.status.toUpperCase()}
//                         </span>
//                       )}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }
