import { useState } from 'react'
// import { format } from 'date-fns'
// import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { type UserProfile } from '../data/schema'
import { useUserManagement } from './user-management-provider'

type CreditManagementDialogProps = {
  currentRow: UserProfile | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CreditManagementDialog({
  currentRow,
  open,
  onOpenChange,
}: CreditManagementDialogProps) {
  const [amount, setAmount] = useState<string>('')
  const [reason, setReason] = useState<string>('')
  const [actionType, setActionType] = useState<'grant' | 'revoke'>('grant')
  const { refreshData } = useUserManagement()

  if (!currentRow) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // // TODO: Implement API call to grant/revoke credits
    // console.log('Credit action:', {
    //   userId: currentRow.id,
    //   amount: parseFloat(amount),
    //   reason,
    //   type: actionType,
    // })

    // Refresh data after action
    await refreshData()

    // Reset form and close
    setAmount('')
    setReason('')
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='max-w-md'>
        <DialogHeader>
          <DialogTitle>Manage Credits</DialogTitle>
          <DialogDescription>
            Grant or revoke credits for {currentRow.name} ({currentRow.email})
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className='space-y-4'>
          <div className='flex gap-2'>
            <Button
              type='button'
              variant={actionType === 'grant' ? 'default' : 'outline'}
              onClick={() => setActionType('grant')}
              className='flex-1'
            >
              Grant
            </Button>
            <Button
              type='button'
              variant={actionType === 'revoke' ? 'destructive' : 'outline'}
              onClick={() => setActionType('revoke')}
              className='flex-1'
            >
              Revoke
            </Button>
          </div>

          <div className='space-y-2'>
            <Label htmlFor='amount'>Amount</Label>
            <Input
              id='amount'
              type='number'
              min='0'
              step='0.01'
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder='Enter amount'
              required
            />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='reason'>Reason (required)</Label>
            <Textarea
              id='reason'
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder='Explain why you are granting/revoking these credits'
              rows={3}
              required
            />
          </div>

          <div className='rounded-lg bg-muted p-3'>
            <p className='text-sm'>
              <span className='font-medium'>Current Balance:</span>{' '}
              {currentRow.creditBalance} credits
            </p>
            {amount && (
              <p className='text-sm text-muted-foreground'>
                <span className='font-medium'>New Balance:</span>{' '}
                {(
                  currentRow.creditBalance +
                  (actionType === 'grant'
                    ? parseFloat(amount)
                    : -parseFloat(amount))
                ).toFixed(2)}{' '}
                credits
              </p>
            )}
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
              variant={actionType === 'grant' ? 'default' : 'destructive'}
            >
              {actionType === 'grant' ? 'Grant Credits' : 'Revoke Credits'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
