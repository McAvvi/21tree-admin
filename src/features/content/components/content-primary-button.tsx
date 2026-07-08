import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function ContentPrimaryButtons() {
  const handleNewContent = () => {
    const trigger = document.getElementById('trigger-new-content')
    if (trigger) trigger.click()
  }

  return (
    <div className='flex gap-2'>
      <Button onClick={handleNewContent}>
        <Plus className='mr-2 h-4 w-4' />
        New Content
      </Button>
      <Button variant='outline'>Upload</Button>
    </div>
  )
}
