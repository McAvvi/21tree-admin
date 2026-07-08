import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { type Row } from '@tanstack/react-table'
import {
  UserPen,
  Coins,
  Shield,
  UserX,
  LogIn,
  RotateCcw,
  Download,
  Trash2,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { type UserProfile } from '../data/schema'
import { useUserManagement } from './user-management-provider'

type DataTableRowActionsProps = {
  row: Row<UserProfile>
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
  const { setOpen, setCurrentRow } = useUserManagement()
  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button
            variant='ghost'
            className='flex h-8 w-8 p-0 data-[state=open]:bg-muted'
          >
            <DotsHorizontalIcon className='h-4 w-4' />
            <span className='sr-only'>Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end' className='w-56'>
          <DropdownMenuItem
            onClick={() => {
              setCurrentRow(row.original)
              setOpen('view')
            }}
          >
            View Details
            <DropdownMenuShortcut>
              <UserPen size={16} />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              setCurrentRow(row.original)
              setOpen('credits')
            }}
          >
            Manage Credits
            <DropdownMenuShortcut>
              <Coins size={16} />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              setCurrentRow(row.original)
              setOpen('tier')
            }}
          >
            Change Tier
            <DropdownMenuShortcut>
              <Shield size={16} />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              setCurrentRow(row.original)
              setOpen('impersonate')
            }}
          >
            Impersonate User
            <DropdownMenuShortcut>
              <LogIn size={16} />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              setCurrentRow(row.original)
              setOpen('suspend')
            }}
          >
            Suspend/Ban
            <DropdownMenuShortcut>
              <UserX size={16} />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              setCurrentRow(row.original)
              setOpen('reset-srs')
            }}
          >
            Reset SRS State
            <DropdownMenuShortcut>
              <RotateCcw size={16} />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              setCurrentRow(row.original)
              setOpen('export')
            }}
          >
            Export Data (GDPR)
            <DropdownMenuShortcut>
              <Download size={16} />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              setCurrentRow(row.original)
              setOpen('delete')
            }}
            className='text-red-500!'
          >
            Delete Account (GDPR)
            <DropdownMenuShortcut>
              <Trash2 size={16} />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}

// import { DotsHorizontalIcon } from '@radix-ui/react-icons'
// import { type Row } from '@tanstack/react-table'
// import {
//   UserPen,
//   Coins,
//   Shield,
//   UserX,
//   LogIn,
//   RotateCcw,
//   Download,
//   Trash2,
// } from 'lucide-react'
// import { Button } from '@/components/ui/button'
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuSeparator,
//   DropdownMenuShortcut,
//   DropdownMenuTrigger,
// } from '@/components/ui/dropdown-menu'
// import { type UserProfile } from '../data/schema'
// import { useUserManagement } from './user-management-provider'

// type DataTableRowActionsProps = {
//   row: Row<UserProfile>
// }

// export function DataTableRowActions({ row }: DataTableRowActionsProps) {
//   const { setOpen, setCurrentRow } = useUserManagement()
//   return (
//     <>
//       <DropdownMenu modal={false}>
//         <DropdownMenuTrigger asChild>
//           <Button
//             variant='ghost'
//             className='flex h-8 w-8 p-0 data-[state=open]:bg-muted'
//           >
//             <DotsHorizontalIcon className='h-4 w-4' />
//             <span className='sr-only'>Open menu</span>
//           </Button>
//         </DropdownMenuTrigger>
//         <DropdownMenuContent align='end' className='w-56'>
//           <DropdownMenuItem
//             onClick={() => {
//               setCurrentRow(row.original)
//               setOpen('view')
//             }}
//           >
//             View Details
//             <DropdownMenuShortcut>
//               <UserPen size={16} />
//             </DropdownMenuShortcut>
//           </DropdownMenuItem>
//           <DropdownMenuSeparator />
//           <DropdownMenuItem
//             onClick={() => {
//               setCurrentRow(row.original)
//               setOpen('credits')
//             }}
//           >
//             Manage Credits
//             <DropdownMenuShortcut>
//               <Coins size={16} />
//             </DropdownMenuShortcut>
//           </DropdownMenuItem>
//           <DropdownMenuItem
//             onClick={() => {
//               setCurrentRow(row.original)
//               setOpen('tier')
//             }}
//           >
//             Change Tier
//             <DropdownMenuShortcut>
//               <Shield size={16} />
//             </DropdownMenuShortcut>
//           </DropdownMenuItem>
//           <DropdownMenuSeparator />
//           <DropdownMenuItem
//             onClick={() => {
//               setCurrentRow(row.original)
//               setOpen('impersonate')
//             }}
//           >
//             Impersonate User
//             <DropdownMenuShortcut>
//               <LogIn size={16} />
//             </DropdownMenuShortcut>
//           </DropdownMenuItem>
//           <DropdownMenuItem
//             onClick={() => {
//               setCurrentRow(row.original)
//               setOpen('suspend')
//             }}
//           >
//             Suspend/Ban
//             <DropdownMenuShortcut>
//               <UserX size={16} />
//             </DropdownMenuShortcut>
//           </DropdownMenuItem>
//           <DropdownMenuItem
//             onClick={() => {
//               setCurrentRow(row.original)
//               setOpen('reset-srs')
//             }}
//           >
//             Reset SRS State
//             <DropdownMenuShortcut>
//               <RotateCcw size={16} />
//             </DropdownMenuShortcut>
//           </DropdownMenuItem>
//           <DropdownMenuSeparator />
//           <DropdownMenuItem
//             onClick={() => {
//               setCurrentRow(row.original)
//               setOpen('export')
//             }}
//           >
//             Export Data (GDPR)
//             <DropdownMenuShortcut>
//               <Download size={16} />
//             </DropdownMenuShortcut>
//           </DropdownMenuItem>
//           <DropdownMenuItem
//             onClick={() => {
//               setCurrentRow(row.original)
//               setOpen('delete')
//             }}
//             className='text-red-500!'
//           >
//             Delete Account (GDPR)
//             <DropdownMenuShortcut>
//               <Trash2 size={16} />
//             </DropdownMenuShortcut>
//           </DropdownMenuItem>
//         </DropdownMenuContent>
//       </DropdownMenu>
//     </>
//   )
// }
