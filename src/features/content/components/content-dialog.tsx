import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { type ContentItem } from '../types'
import { useContent } from './content-provider'

export function ContentDialogs() {
  const { addItem } = useContent()
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState<Partial<ContentItem>>({
    type: 'template',
    status: 'draft',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // const newItem: ContentItem = {
    //   id: Math.random().toString(36).substr(2, 9),
    //   title: formData.title || 'Untitled',
    //   type: (formData.type as any) || 'template',
    //   status: (formData.status as any) || 'draft',
    //   updatedAt: new Date().toISOString().split('T')[0],
    //   author: 'Current User',
    // }
    // No `as any` needed! TypeScript knows these resolve to ContentItem types.
    const newItem: ContentItem = {
      id: Math.random().toString(36).substring(2, 11), // Note: substring is preferred over deprecated substr
      title: formData.title || 'Untitled',
      type: formData.type || 'template',
      status: formData.status || 'draft',
      updatedAt: new Date().toISOString().split('T')[0],
      author: 'Current User',
    }

    addItem(newItem)
    setOpen(false)
    setFormData({ type: 'template', status: 'draft', title: '' })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className='hidden' id='trigger-new-content' />
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Create New Content</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className='grid gap-4 py-4'>
          <div className='grid gap-2'>
            <Label htmlFor='title'>Title</Label>
            <Input
              id='title'
              value={formData.title || ''}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, title: e.target.value }))
              }
              placeholder='Enter content title'
            />
          </div>
          <div className='grid gap-2'>
            <Label>Type</Label>
            <Select
              value={formData.type}
              onValueChange={(val) =>
                setFormData((prev) => ({ ...prev, type: val as any }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder='Select type' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='folder'>Folder</SelectItem>
                <SelectItem value='template'>Template</SelectItem>
                <SelectItem value='page'>Page</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className='grid gap-2'>
            <Label>Status</Label>
            <Select
              value={formData.status}
              onValueChange={(val) =>
                setFormData((prev) => ({ ...prev, status: val as any }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder='Select status' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='draft'>Draft</SelectItem>
                <SelectItem value='published'>Published</SelectItem>
                <SelectItem value='archived'>Archived</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button type='submit'>Create Content</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
