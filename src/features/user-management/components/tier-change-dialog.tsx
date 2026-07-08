import { useState } from 'react'
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
import { type UserProfile, type UserTier } from '../data/schema'
import { useUserManagement } from './user-management-provider'

type TierChangeDialogProps = {
  currentRow: UserProfile | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function TierChangeDialog({
  currentRow,
  open,
  onOpenChange,
}: TierChangeDialogProps) {
  const [newTier, setNewTier] = useState<UserTier | ''>('')
  const { refreshData } = useUserManagement()

  if (!currentRow) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!newTier) return

    // // TODO: Implement API call to change tier
    // console.log('Tier change:', {
    //   userId: currentRow.id,
    //   oldTier: currentRow.tier,
    //   newTier,
    // })

    // Refresh data after action
    await refreshData()

    // Reset and close
    setNewTier('')
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='max-w-md'>
        <DialogHeader>
          <DialogTitle>Change User Tier</DialogTitle>
          <DialogDescription>
            Change tier for {currentRow.name} ({currentRow.email})
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className='space-y-4'>
          <div className='space-y-2'>
            <Label htmlFor='tier'>New Tier</Label>
            <Select
              value={newTier}
              onValueChange={(value) => setNewTier(value as UserTier)}
            >
              <SelectTrigger id='tier'>
                <SelectValue placeholder='Select a tier' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='free'>Free</SelectItem>
                <SelectItem value='pro'>Pro</SelectItem>
                <SelectItem value='admin'>Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className='rounded-lg bg-muted p-3'>
            <p className='text-sm'>
              <span className='font-medium'>Current Tier:</span>{' '}
              <span className='capitalize'>{currentRow.tier}</span>
            </p>
            {newTier && (
              <p className='text-sm text-muted-foreground'>
                <span className='font-medium'>New Tier:</span>{' '}
                <span className='capitalize'>{newTier}</span>
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
              disabled={!newTier || newTier === currentRow.tier}
            >
              Change Tier
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
