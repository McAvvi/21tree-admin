import { type ColumnDef } from '@tanstack/react-table'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { DataTableColumnHeader } from '@/components/data-table'
import { LongText } from '@/components/long-text'
import { statusColors, tiers } from '../data/data'
import { type UserProfile } from '../data/schema'
import { DataTableRowActions } from './data-table-row-actions'

export const userManagementColumns: ColumnDef<UserProfile>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
        className='translate-y-0.5'
      />
    ),
    meta: {
      className: cn('inset-s-0 z-10 rounded-tl-[inherit] max-md:sticky'),
    },
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
        className='translate-y-0.5'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Name' />
    ),
    cell: ({ row }) => {
      const { name, avatar } = row.original
      return (
        <div className='flex items-center gap-x-3'>
          {avatar && (
            <img
              src={avatar}
              alt={name}
              className='h-8 w-8 rounded-full object-cover'
            />
          )}
          <LongText className='max-w-36'>{name}</LongText>
        </div>
      )
    },
    meta: {
      className: cn(
        'drop-shadow-[0_1px_2px_rgb(0_0_0_/_0.1)] dark:drop-shadow-[0_1px_2px_rgb(255_255_255_/_0.1)]',
        'inset-s-6 ps-0.5 max-md:sticky @4xl/content:table-cell @4xl/content:drop-shadow-none'
      ),
    },
    enableHiding: false,
  },
  {
    accessorKey: 'email',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Email' />
    ),
    cell: ({ row }) => (
      <div className='w-fit ps-2 text-nowrap'>{row.getValue('email')}</div>
    ),
  },
  {
    accessorKey: 'tier',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Tier' />
    ),
    cell: ({ row }) => {
      const { tier } = row.original
      const tierConfig = tiers.find(({ value }) => value === tier)
      if (!tierConfig) return null
      return (
        <div className='flex items-center gap-x-2'>
          {tierConfig.icon && (
            <tierConfig.icon size={16} className='text-muted-foreground' />
          )}
          <span className='text-sm capitalize'>{row.getValue('tier')}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
    enableHiding: false,
    enableSorting: false,
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Status' />
    ),
    cell: ({ row }) => {
      const { status } = row.original
      const badgeColor = statusColors.get(status)
      return (
        <div className='flex space-x-2'>
          <Badge variant='outline' className={cn('capitalize', badgeColor)}>
            {row.getValue('status')}
          </Badge>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
    enableHiding: false,
    enableSorting: false,
  },
  {
    accessorKey: 'creditBalance',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Credits' />
    ),
    cell: ({ row }) => (
      <div className='font-medium'>{row.getValue('creditBalance')}</div>
    ),
  },
  {
    accessorKey: 'lastActive',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Last Active' />
    ),
    cell: ({ row }) => {
      const lastActive = row.getValue('lastActive') as Date | null
      if (!lastActive)
        return <span className='text-muted-foreground'>Never</span>
      return (
        <div className='text-nowrap'>
          {new Date(lastActive).toLocaleDateString()}
        </div>
      )
    },
  },
  {
    accessorKey: 'signupDate',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Signup Date' />
    ),
    cell: ({ row }) => {
      const signupDate = row.getValue('signupDate') as Date
      return (
        <div className='text-nowrap'>
          {new Date(signupDate).toLocaleDateString()}
        </div>
      )
    },
  },
  {
    id: 'actions',
    cell: DataTableRowActions,
  },
]
