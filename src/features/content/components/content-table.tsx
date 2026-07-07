import { Folder, FileText, MoreVertical, Trash2, Edit } from 'lucide-react'
import { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Badge } from '@/components/ui/badge'
import { type ContentItem } from '../data/schema'
import { useContent } from './content-provider'

interface ContentTableProps {
  data: ContentItem[]
}

export function ContentTable({ data }: ContentTableProps) {
  const { setOpen, setCurrentRow } = useContent()
  const [items, setItems] = useState<ContentItem[]>(data)

  const handleEdit = (item: ContentItem) => {
    setCurrentRow(item)
    setOpen(item.type === 'folder' ? 'addFolder' : 'addTemplate')
  }

  const handleDelete = (item: ContentItem) => {
    setCurrentRow(item)
    setOpen('delete')
  }

  const getTypeBadge = (type: string) => {
    return type === 'folder' ? (
      <Badge variant='secondary'>Folder</Badge>
    ) : (
      <Badge variant='outline'>Template</Badge>
    )
  }

  const getIcon = (type: string) => {
    return type === 'folder' ? (
      <Folder className='h-5 w-5 text-blue-500' />
    ) : (
      <FileText className='h-5 w-5 text-green-500' />
    )
  }

  return (
    <div className='rounded-md border'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Path</TableHead>
            <TableHead>Updated</TableHead>
            <TableHead className='text-right'>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id}>
              <TableCell className='font-medium'>
                <div className='flex items-center gap-2'>
                  {getIcon(item.type)}
                  {item.name}
                </div>
              </TableCell>
              <TableCell>{getTypeBadge(item.type)}</TableCell>
              <TableCell className='text-muted-foreground'>{item.path}</TableCell>
              <TableCell>
                {new Date(item.updatedAt).toLocaleDateString()}
              </TableCell>
              <TableCell className='text-right'>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant='ghost' size='icon'>
                      <MoreVertical className='h-4 w-4' />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align='end'>
                    <DropdownMenuItem onClick={() => handleEdit(item)}>
                      <Edit className='mr-2 h-4 w-4' />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleDelete(item)}
                      className='text-destructive'
                    >
                      <Trash2 className='mr-2 h-4 w-4' />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
