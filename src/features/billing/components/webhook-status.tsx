import React from 'react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

interface WebhookEvent {
  id: string
  event: string
  status: 'success' | 'failed'
  error?: string
  date: string
}

interface Props {
  events: WebhookEvent[]
}

export const WebhookStatus: React.FC<Props> = ({ events }) => {
  return (
    <Card className='h-full'>
      <CardHeader>
        <CardTitle>Lemon Squeezy Webhooks (Last 10)</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Event</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className='text-right'>Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {events.map((evt) => (
              <TableRow key={evt.id}>
                <TableCell className='font-medium'>
                  {evt.event}
                  {evt.error && (
                    <div className='mt-1 text-xs text-red-500'>
                      Error: {evt.error}
                    </div>
                  )}
                </TableCell>
                <TableCell>
                  {evt.status === 'success' ? (
                    <Badge
                      variant='default'
                      className='bg-green-100 text-green-800 hover:bg-green-200'
                    >
                      Success
                    </Badge>
                  ) : (
                    <Badge variant='destructive'>Failed</Badge>
                  )}
                </TableCell>
                <TableCell className='text-right text-xs text-muted-foreground'>
                  {evt.date}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

// import React from 'react'

// interface WebhookEvent {
//   id: string
//   event: string
//   status: 'success' | 'failed'
//   error?: string
//   date: string
// }

// interface Props {
//   events: WebhookEvent[]
// }

// export const WebhookStatus: React.FC<Props> = ({ events }) => {
//   const styles = {
//     card: {
//       background: '#fff',
//       border: '1px solid #e5e7eb',
//       borderRadius: '8px',
//       padding: '20px',
//       height: '100%',
//     },
//     cardTitle: {
//       fontSize: '16px',
//       fontWeight: '600',
//       margin: '0 0 16px 0',
//       borderBottom: '1px solid #f3f4f6',
//       paddingBottom: '12px',
//     },
//     list: {
//       listStyle: 'none',
//       padding: 0,
//       margin: 0,
//       maxHeight: '300px',
//       overflowY: 'auto',
//     },
//     listItem: {
//       display: 'flex',
//       justifyContent: 'space-between',
//       alignItems: 'center',
//       padding: '10px 0',
//       borderBottom: '1px solid #f9fafb',
//       fontSize: '13px',
//     },
//     eventInfo: { display: 'flex', flexDirection: 'column' },
//     eventName: { fontWeight: '500', color: '#374151' },
//     eventDate: { color: '#9ca3af', fontSize: '11px' },
//     badge: {
//       padding: '2px 6px',
//       borderRadius: '4px',
//       fontSize: '11px',
//       fontWeight: '600',
//       marginLeft: '8px',
//     },
//     badgeSuccess: { background: '#dcfce7', color: '#166534' },
//     badgeFail: { background: '#fee2e2', color: '#991b1b' },
//     errorText: { color: '#dc2626', fontSize: '11px', marginTop: '2px' },
//   }

//   return (
//     <div style={styles.card}>
//       <h3 style={styles.cardTitle}>Lemon Squeezy Webhooks (Last 10)</h3>
//       <ul
//       //style={styles.list}
//       >
//         {events.map((evt) => (
//           <li key={evt.id} style={styles.listItem}>
//             <div
//             //style={styles.eventInfo}
//             >
//               <span style={styles.eventName}>
//                 {evt.event}
//                 {evt.status === 'failed' && (
//                   <span style={{ ...styles.badge, ...styles.badgeFail }}>
//                     Failed
//                   </span>
//                 )}
//                 {evt.status === 'success' && (
//                   <span style={{ ...styles.badge, ...styles.badgeSuccess }}>
//                     OK
//                   </span>
//                 )}
//               </span>
//               {evt.error && (
//                 <span style={styles.errorText}>Error: {evt.error}</span>
//               )}
//               <span style={styles.eventDate}>{evt.date}</span>
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   )
// }
