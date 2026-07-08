import { useState } from 'react'
import { ShieldAlert } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import {
  type UserProfile,
  // type UserStatus
} from '../data/schema'
import { useUserManagement } from './user-management-provider'

type SuspendUserDialogProps = {
  currentRow: UserProfile | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SuspendUserDialog({
  currentRow,
  open,
  onOpenChange,
}: SuspendUserDialogProps) {
  const [action, setAction] = useState<'suspend' | 'ban' | 'reinstate'>(
    'suspend'
  )
  const [reason, setReason] = useState<string>('')
  const { refreshData } = useUserManagement()

  if (!currentRow) return null

  const isSuspended = currentRow.status === 'suspended'
  const isBanned = currentRow.status === 'banned'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!reason && action !== 'reinstate') return

    // // TODO: Implement API call to suspend/ban/reinstate user
    // console.log('User status change:', {
    //   userId: currentRow.id,
    //   action,
    //   reason,
    //   previousStatus: currentRow.status,
    // })

    // Refresh data after action
    await refreshData()

    // Reset and close
    setReason('')
    onOpenChange(false)
  }

  const getDialogTitle = () => {
    if (isBanned) return 'Reinstate Banned User'
    if (isSuspended) return 'Reinstate Suspended User'
    return action === 'suspend' ? 'Suspend User' : 'Ban User'
  }

  const getDialogDescription = () => {
    if (isBanned)
      return `Reinstate ${currentRow.name} (${currentRow.email}) by removing the ban.`
    if (isSuspended)
      return `Reinstate ${currentRow.name} (${currentRow.email}) by removing the suspension.`
    return action === 'suspend'
      ? `Suspend ${currentRow.name} (${currentRow.email}). They will not be able to access their account.`
      : `Ban ${currentRow.name} (${currentRow.email}). This is a permanent restriction.`
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='max-w-md'>
        <DialogHeader>
          <DialogTitle className='flex items-center gap-2'>
            <ShieldAlert className='h-5 w-5 text-red-600' />
            {getDialogTitle()}
          </DialogTitle>
          <DialogDescription>{getDialogDescription()}</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className='space-y-4'>
          {!isSuspended && !isBanned && (
            <div className='space-y-2'>
              <Label htmlFor='action'>Action</Label>
              <Select value={action} onValueChange={(v) => setAction(v as any)}>
                <SelectTrigger id='action'>
                  <SelectValue placeholder='Select action' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='suspend'>Suspend (Temporary)</SelectItem>
                  <SelectItem value='ban'>Ban (Permanent)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {(action !== 'reinstate' || isSuspended || isBanned) && (
            <div className='space-y-2'>
              <Label htmlFor='reason'>Reason (required)</Label>
              <Textarea
                id='reason'
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder='Explain why you are taking this action'
                rows={4}
                required
              />
            </div>
          )}

          <div className='rounded-lg bg-muted p-3'>
            <p className='text-sm'>
              <span className='font-medium'>Current Status:</span>{' '}
              <span className='capitalize'>{currentRow.status}</span>
            </p>
            <p className='text-sm text-muted-foreground'>
              <span className='font-medium'>New Status:</span>{' '}
              <span className='capitalize'>
                {isBanned || isSuspended ? 'active' : action}
              </span>
            </p>
          </div>

          <DialogFooter>
            <Button
              type='button'
              variant='outline'
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              type='submit'
              variant={isBanned || isSuspended ? 'default' : 'destructive'}
              disabled={!reason && action !== 'reinstate'}
            >
              {isBanned || isSuspended
                ? 'Reinstate User'
                : action === 'suspend'
                  ? 'Suspend User'
                  : 'Ban User'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
