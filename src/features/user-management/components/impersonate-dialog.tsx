import { useState } from 'react'
import { AlertTriangle } from 'lucide-react'
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

type ImpersonateDialogProps = {
  currentRow: UserProfile | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ImpersonateDialog({
  currentRow,
  open,
  onOpenChange,
}: ImpersonateDialogProps) {
  const [isConfirming, setIsConfirming] = useState(false)
  const { refreshData } = useUserManagement()

  if (!currentRow) return null

  const handleImpersonate = async () => {
    // TODO: Implement API call to start impersonation session
    // console.log('Impersonating user:', {
    //   userId: currentRow.id,
    //   email: currentRow.email,
    //   timestamp: new Date().toISOString(),
    // })

    // Refresh data after action
    await refreshData()

    // Close dialog
    setIsConfirming(false)
    onOpenChange(false)

    // TODO: Redirect to user view or open new window
    alert(
      `Starting impersonation session for ${currentRow.email}. All actions will be logged.`
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='max-w-md'>
        <DialogHeader>
          <DialogTitle className='flex items-center gap-2 text-amber-600'>
            <AlertTriangle className='h-5 w-5' />
            Impersonate User
          </DialogTitle>
          <DialogDescription>
            You are about to impersonate {currentRow.name} ({currentRow.email}).
            This action is intended for support purposes only.
          </DialogDescription>
        </DialogHeader>

        {!isConfirming ? (
          <>
            <Alert variant='destructive'>
              <AlertDescription>
                <strong>Warning:</strong> All actions performed during
                impersonation will be logged and auditable. Only proceed if you
                have a valid support reason.
              </AlertDescription>
            </Alert>

            <div className='space-y-2 text-sm'>
              <p>
                <span className='font-medium'>User:</span> {currentRow.name}
              </p>
              <p>
                <span className='font-medium'>Email:</span> {currentRow.email}
              </p>
              <p>
                <span className='font-medium'>Current Tier:</span>{' '}
                <span className='capitalize'>{currentRow.tier}</span>
              </p>
            </div>

            <DialogFooter>
              <Button variant='outline' onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button
                variant='warning'
                onClick={() => setIsConfirming(true)}
                className='bg-amber-600 hover:bg-amber-700'
              >
                Continue to Confirm
              </Button>
            </DialogFooter>
          </>
        ) : (
          <>
            <Alert variant='destructive'>
              <AlertDescription>
                <strong>Final Confirmation:</strong> Type
                &quot;impersonate&quot; to confirm.
              </AlertDescription>
            </Alert>

            <input
              type='text'
              placeholder='Type "impersonate" to confirm'
              className='w-full rounded-md border p-2'
              onChange={(e) => {
                if (e.target.value === 'impersonate') {
                  handleImpersonate()
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
