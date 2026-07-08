'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

const topSpenders = [
  {
    id: 1,
    name: 'Alice Johnson',
    email: 'alice@example.com',
    spend: 245.8,
    avatar: '/avatars/alice.jpg',
  },
  {
    id: 2,
    name: 'Bob Smith',
    email: 'bob@example.com',
    spend: 198.5,
    avatar: '/avatars/bob.jpg',
  },
  {
    id: 3,
    name: 'Carol White',
    email: 'carol@example.com',
    spend: 176.2,
    avatar: '/avatars/carol.jpg',
  },
  {
    id: 4,
    name: 'David Brown',
    email: 'david@example.com',
    spend: 154.9,
    avatar: '/avatars/david.jpg',
  },
  {
    id: 5,
    name: 'Eve Davis',
    email: 'eve@example.com',
    spend: 142.3,
    avatar: '/avatars/eve.jpg',
  },
  {
    id: 6,
    name: 'Frank Miller',
    email: 'frank@example.com',
    spend: 128.7,
    avatar: '/avatars/frank.jpg',
  },
  {
    id: 7,
    name: 'Grace Wilson',
    email: 'grace@example.com',
    spend: 115.4,
    avatar: '/avatars/grace.jpg',
  },
  {
    id: 8,
    name: 'Henry Moore',
    email: 'henry@example.com',
    spend: 98.6,
    avatar: '/avatars/henry.jpg',
  },
  {
    id: 9,
    name: 'Ivy Taylor',
    email: 'ivy@example.com',
    spend: 87.2,
    avatar: '/avatars/ivy.jpg',
  },
  {
    id: 10,
    name: 'Jack Anderson',
    email: 'jack@example.com',
    spend: 76.5,
    avatar: '/avatars/jack.jpg',
  },
]

export function TopSpendersTable() {
  return (
    <Card className='col-span-1 lg:col-span-2'>
      <CardHeader>
        <CardTitle>Top Spenders (This Month)</CardTitle>
        <CardDescription>Top 20 users by AI cost</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Email</TableHead>
              <TableHead className='text-right'>Spend</TableHead>
              <TableHead className='text-right'>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {topSpenders.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <div className='flex items-center gap-3'>
                    <Avatar className='h-8 w-8'>
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>
                        {user.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </AvatarFallback>
                    </Avatar>
                    <span className='font-medium'>{user.name}</span>
                  </div>
                </TableCell>
                <TableCell className='text-muted-foreground'>
                  {user.email}
                </TableCell>
                <TableCell className='text-right font-medium'>
                  ${user.spend.toFixed(2)}
                </TableCell>
                <TableCell className='text-right'>
                  {user.spend > 200 ? (
                    <Badge variant='destructive'>High</Badge>
                  ) : user.spend > 100 ? (
                    <Badge variant='warning'>Medium</Badge>
                  ) : (
                    <Badge variant='secondary'>Normal</Badge>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
