import { useState } from 'react'
import { RotateCcw } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { type UserProfile } from '../data/schema'
import { useUserManagement } from './user-management-provider'

type ResetSRSDialogProps = {
  currentRow: UserProfile | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ResetSRSDialog({
  currentRow,
  open,
  onOpenChange,
}: ResetSRSDialogProps) {
  const [isConfirming, setIsConfirming] = useState(false)
  const { refreshData } = useUserManagement()

  if (!currentRow) return null

  const handleReset = async () => {
    // TODO: Implement API call to reset SRS state
    // console.log('SRS Reset:', {
    //   userId: currentRow.id,
    //   timestamp: new Date().toISOString(),
    //   previousDueCount: currentRow.srsState.dueCount,
    //   previousTotalCards: currentRow.srsState.totalCards,
    // })

    // Refresh data after action
    await refreshData()

    // Close dialog
    setIsConfirming(false)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='max-w-md'>
        <DialogHeader>
          <DialogTitle className='flex items-center gap-2'>
            <RotateCcw className='h-5 w-5' />
            Reset SRS State
          </DialogTitle>
          <DialogDescription>
            Reset the spaced repetition system state for {currentRow.name} (
            {currentRow.email}). This will clear all scheduling data and start
            fresh.
          </DialogDescription>
        </DialogHeader>

        {!isConfirming ? (
          <>
            <Alert variant='destructive'>
              <AlertDescription>
                <strong>Warning:</strong> This action will reset all SRS
                progress for this user. Their flashcards will need to be
                relearned from scratch. This cannot be undone.
              </AlertDescription>
            </Alert>

            <div className='space-y-2 text-sm'>
              <p>
                <span className='font-medium'>Current Due Cards:</span>{' '}
                {currentRow.srsState.dueCount}
              </p>
              <p>
                <span className='font-medium'>Total Cards:</span>{' '}
                {currentRow.srsState.totalCards}
              </p>
              <p>
                <span className='font-medium'>Last Reset:</span>{' '}
                {currentRow.srsState.lastResetAt
                  ? new Date(
                      currentRow.srsState.lastResetAt
                    ).toLocaleDateString()
                  : 'Never'}
              </p>
            </div>

            <DialogFooter>
              <Button variant='outline' onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button
                variant='destructive'
                onClick={() => setIsConfirming(true)}
              >
                Continue to Confirm
              </Button>
            </DialogFooter>
          </>
        ) : (
          <>
            <Alert variant='destructive'>
              <AlertDescription>
                <strong>Final Confirmation:</strong> This will permanently reset
                all SRS data for this user. Type &quot;reset&quot; to confirm.
              </AlertDescription>
            </Alert>

            <input
              type='text'
              placeholder='Type "reset" to confirm'
              className='w-full rounded-md border p-2'
              onChange={(e) => {
                if (e.target.value === 'reset') {
                  handleReset()
                }
              }}
              autoFocus
            />

            <DialogFooter>
              <Button variant='outline' onClick={() => setIsConfirming(false)}>
                Go Back
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
