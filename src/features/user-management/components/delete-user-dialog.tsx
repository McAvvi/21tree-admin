import { useState } from 'react'
import { Trash2 } from 'lucide-react'
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

type DeleteUserDialogProps = {
  currentRow: UserProfile | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function DeleteUserDialog({
  currentRow,
  open,
  onOpenChange,
}: DeleteUserDialogProps) {
  const [confirmText, setConfirmText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const { refreshData } = useUserManagement()

  if (!currentRow) return null

  const handleDelete = async () => {
    if (confirmText !== currentRow.email) return

    setIsDeleting(true)

    try {
      // TODO: Implement API call to permanently delete user
      // console.log('Delete user:', {
      //   userId: currentRow.id,
      //   email: currentRow.email,
      //   timestamp: new Date().toISOString(),
      //   reason: 'GDPR deletion request',
      // })

      // Refresh data after action
      await refreshData()

      // Close dialog
      onOpenChange(false)
      setConfirmText('')
    } catch (_error) {
      //console.error('Failed to delete user:', error)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='max-w-md'>
        <DialogHeader>
          <DialogTitle className='flex items-center gap-2 text-red-600'>
            <Trash2 className='h-5 w-5' />
            Permanently Delete Account
          </DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete the
            account and all associated data for {currentRow.name} (
            {currentRow.email}).
          </DialogDescription>
        </DialogHeader>

        <Alert variant='destructive'>
          <AlertDescription>
            <strong>DANGER:</strong> This is a GDPR deletion request. All user
            data will be permanently removed including:
            <ul className='mt-2 list-inside list-disc text-sm'>
              <li>Profile information</li>
              <li>All flashcards and folders</li>
              <li>SRS state and progress</li>
              <li>Credit balance and history</li>
              <li>AI usage history</li>
              <li>All other associated data</li>
            </ul>
          </AlertDescription>
        </Alert>

        <div className='space-y-2'>
          <p className='text-sm font-medium'>
            Type the user's email address to confirm deletion:
          </p>
          <input
            type='text'
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            placeholder={currentRow.email}
            className='w-full rounded-md border p-2 font-mono text-sm'
            disabled={isDeleting}
          />
        </div>

        <DialogFooter>
          <Button
            variant='outline'
            onClick={() => {
              setConfirmText('')
              onOpenChange(false)
            }}
            disabled={isDeleting}
          >
            Cancel
          </Button>
          <Button
            variant='destructive'
            onClick={handleDelete}
            disabled={confirmText !== currentRow.email || isDeleting}
          >
            {isDeleting ? 'Deleting...' : 'Permanently Delete'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
