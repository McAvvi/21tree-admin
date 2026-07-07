import { FolderPlus, FilePlus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useContent } from './content-provider'

export function ContentPrimaryButtons() {
  const { setOpen } = useContent()
  return (
    <div className='flex gap-2'>
      <Button
        variant='outline'
        className='space-x-1'
        onClick={() => setOpen('addFolder')}
      >
        <span>New Folder</span> <FolderPlus size={18} />
      </Button>
      <Button className='space-x-1' onClick={() => setOpen('addTemplate')}>
        <span>New Template</span> <FilePlus size={18} />
      </Button>
    </div>
  )
}
