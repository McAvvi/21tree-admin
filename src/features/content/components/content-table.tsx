import { MoreHorizontal, Folder, FileText, LayoutTemplate } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useContent } from './content-provider'

function getTypeIcon(type: string) {
  switch (type) {
    case 'folder':
      return <Folder className='h-4 w-4 text-blue-500' />
    case 'template':
      return <LayoutTemplate className='h-4 w-4 text-purple-500' />
    case 'page':
      return <FileText className='h-4 w-4 text-green-500' />
    default:
      return null
  }
}

function getStatusVariant(status: string) {
  switch (status) {
    case 'published':
      return 'default'
    case 'draft':
      return 'secondary'
    case 'archived':
      return 'outline'
    default:
      return 'outline'
  }
}

export function ContentTable() {
  const { items, selectedItems, toggleSelectItem, deleteItem } = useContent()

  return (
    <div className='rounded-md border'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='w-[50px]'></TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Last Updated</TableHead>
            <TableHead>Author</TableHead>
            <TableHead className='w-[50px]'></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                <Checkbox
                  checked={selectedItems.includes(item.id)}
                  onCheckedChange={() => toggleSelectItem(item.id)}
                />
              </TableCell>
              <TableCell className='font-medium'>{item.title}</TableCell>
              <TableCell>
                <div className='flex items-center gap-2'>
                  {getTypeIcon(item.type)}
                  <span className='capitalize'>{item.type}</span>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant={getStatusVariant(item.status)}>
                  {item.status}
                </Badge>
              </TableCell>
              <TableCell>{item.updatedAt}</TableCell>
              <TableCell>{item.author}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant='ghost' size='icon'>
                      <MoreHorizontal className='h-4 w-4' />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align='end'>
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem
                      className='text-red-600'
                      onClick={() => deleteItem(item.id)}
                    >
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
