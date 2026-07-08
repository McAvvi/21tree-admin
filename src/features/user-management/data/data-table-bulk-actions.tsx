import { type Table } from '@tanstack/react-table'
import { Trash2, Coins, Shield, UserX } from 'lucide-react'
import { toast } from 'sonner'
import { sleep } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { DataTableBulkActions as BulkActionsToolbar } from '@/components/data-table'
import { type UserProfile } from '../data/schema'

type DataTableBulkActionsProps<TData> = {
  table: Table<TData>
}

export function DataTableBulkActions<TData>({
  table,
}: DataTableBulkActionsProps<TData>) {
  const selectedRows = table.getFilteredSelectedRowModel().rows

  const handleBulkTierChange = (tier: 'free' | 'pro' | 'admin') => {
    const selectedUsers = selectedRows.map((row) => row.original as UserProfile)
    toast.promise(sleep(2000), {
      loading: `Changing tier to ${tier}...`,
      success: () => {
        table.resetRowSelection()
        return `Changed tier for ${selectedUsers.length} user${selectedUsers.length > 1 ? 's' : ''}`
      },
      error: `Error changing tier`,
    })
    table.resetRowSelection()
  }

  const handleBulkSuspend = () => {
    const selectedUsers = selectedRows.map((row) => row.original as UserProfile)
    toast.promise(sleep(2000), {
      loading: 'Suspending users...',
      success: () => {
        table.resetRowSelection()
        return `Suspended ${selectedUsers.length} user${selectedUsers.length > 1 ? 's' : ''}`
      },
      error: 'Error suspending users',
    })
    table.resetRowSelection()
  }

  const handleBulkCreditGrant = () => {
    const selectedUsers = selectedRows.map((row) => row.original as UserProfile)
    toast.promise(sleep(2000), {
      loading: 'Granting credits...',
      success: () => {
        table.resetRowSelection()
        return `Granted credits to ${selectedUsers.length} user${selectedUsers.length > 1 ? 's' : ''}`
      },
      error: 'Error granting credits',
    })
    table.resetRowSelection()
  }

  return (
    <BulkActionsToolbar table={table} entityName='user'>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant='outline'
            size='icon'
            onClick={() => handleBulkTierChange('pro')}
            className='size-8'
            aria-label='Upgrade selected users to Pro'
            title='Upgrade selected users to Pro'
          >
            <Shield />
            <span className='sr-only'>Upgrade to Pro</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Upgrade to Pro</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant='outline'
            size='icon'
            onClick={() => handleBulkCreditGrant()}
            className='size-8'
            aria-label='Grant credits to selected users'
            title='Grant credits to selected users'
          >
            <Coins />
            <span className='sr-only'>Grant credits</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Grant credits</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant='outline'
            size='icon'
            onClick={handleBulkSuspend}
            className='size-8'
            aria-label='Suspend selected users'
            title='Suspend selected users'
          >
            <UserX />
            <span className='sr-only'>Suspend selected users</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Suspend selected users</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant='destructive'
            size='icon'
            className='size-8'
            aria-label='Delete selected users'
            title='Delete selected users'
          >
            <Trash2 />
            <span className='sr-only'>Delete selected users</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Delete selected users</p>
        </TooltipContent>
      </Tooltip>
    </BulkActionsToolbar>
  )
}
