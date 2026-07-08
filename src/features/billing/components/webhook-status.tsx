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
