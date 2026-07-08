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
