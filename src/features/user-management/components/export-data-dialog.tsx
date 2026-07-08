import { useState } from 'react'
import { Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { type UserProfile } from '../data/schema'
import { useUserManagement } from './user-management-provider'

type ExportDataDialogProps = {
  currentRow: UserProfile | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ExportDataDialog({
  currentRow,
  open,
  onOpenChange,
}: ExportDataDialogProps) {
  const [selectedDataTypes, setSelectedDataTypes] = useState<string[]>([
    'profile',
    'flashcards',
    'folders',
    'srs',
    'credits',
  ])
  const [format, setFormat] = useState<'json' | 'csv'>('json')
  const { refreshData } = useUserManagement()

  if (!currentRow) return null

  const dataTypes = [
    {
      id: 'profile',
      label: 'Profile Information',
      description: 'Name, email, tier, account dates',
    },
    {
      id: 'flashcards',
      label: 'Flashcards',
      description: 'All flashcards and their content',
    },
    {
      id: 'folders',
      label: 'Folders',
      description: 'Folder structure and organization',
    },
    {
      id: 'srs',
      label: 'SRS Data',
      description: 'Spaced repetition scheduling data',
    },
    {
      id: 'credits',
      label: 'Credit History',
      description: 'All credit transactions and ledger',
    },
    {
      id: 'ai-usage',
      label: 'AI Usage',
      description: 'AI token usage and cost history',
    },
  ]

  const toggleDataType = (id: string) => {
    setSelectedDataTypes((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }

  const handleExport = async () => {
    // TODO: Implement API call to export user data
    console.log('Export request:', {
      userId: currentRow.id,
      dataTypes: selectedDataTypes,
      format,
      timestamp: new Date().toISOString(),
    })

    // Refresh data after action
    await refreshData()

    // Close dialog
    onOpenChange(false)

    // TODO: Trigger file download
    alert(
      `Exporting ${selectedDataTypes.length} data types in ${format.toUpperCase()} format. Download will begin shortly.`
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='max-w-lg'>
        <DialogHeader>
          <DialogTitle className='flex items-center gap-2'>
            <Download className='h-5 w-5' />
            Export User Data
          </DialogTitle>
          <DialogDescription>
            Export data for {currentRow.name} ({currentRow.email}). This is for
            GDPR compliance - users have the right to receive their data.
          </DialogDescription>
        </DialogHeader>

        <div className='space-y-4'>
          <div className='space-y-3'>
            <Label>Data to Export</Label>
            <div className='max-h-64 space-y-3 overflow-y-auto rounded-md border p-3'>
              {dataTypes.map((dataType) => (
                <div key={dataType.id} className='flex items-start space-x-3'>
                  <Checkbox
                    id={dataType.id}
                    checked={selectedDataTypes.includes(dataType.id)}
                    onCheckedChange={() => toggleDataType(dataType.id)}
                  />
                  <div className='space-y-1 leading-none'>
                    <Label
                      htmlFor={dataType.id}
                      className='cursor-pointer font-medium'
                    >
                      {dataType.label}
                    </Label>
                    <p className='text-xs text-muted-foreground'>
                      {dataType.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className='space-y-2'>
            <Label>Export Format</Label>
            <div className='flex gap-2'>
              <Button
                type='button'
                variant={format === 'json' ? 'default' : 'outline'}
                onClick={() => setFormat('json')}
                className='flex-1'
              >
                JSON
              </Button>
              <Button
                type='button'
                variant={format === 'csv' ? 'default' : 'outline'}
                onClick={() => setFormat('csv')}
                className='flex-1'
              >
                CSV
              </Button>
            </div>
          </div>

          <div className='rounded-lg bg-muted p-3 text-sm'>
            <p className='font-medium'>Summary:</p>
            <ul className='mt-1 list-inside list-disc text-muted-foreground'>
              <li>{selectedDataTypes.length} data types selected</li>
              <li>Format: {format.toUpperCase()}</li>
              <li>User: {currentRow.email}</li>
            </ul>
          </div>
        </div>

        <DialogFooter>
          <Button variant='outline' onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleExport}
            disabled={selectedDataTypes.length === 0}
          >
            <Download className='mr-2 h-4 w-4' />
            Export Data
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
