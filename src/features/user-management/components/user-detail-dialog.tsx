import { format } from 'date-fns'
import { Shield, User, UserCheck } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  statusColors,
  // tierIcons
} from '../data/data'
import type { UserProfile, UserStatus, UserTier } from '../data/schema'

type UserDetailDialogProps = {
  currentRow: UserProfile | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

// Move these components outside of the main component to avoid React hooks warnings
function StatusBadge({ status }: { status: UserStatus }) {
  const badgeColor = statusColors.get(status)
  return (
    <Badge variant='outline' className={badgeColor}>
      {status}
    </Badge>
  )
}

// function TierBadge({ tier }: { tier: UserTier }) {
//   const TierIcon = tierIcons.get(tier)
//   return (
//     <Badge variant='secondary' className='gap-x-1'>
//       {TierIcon && <TierIcon className='h-4 w-4' />}
//       {tier}
//     </Badge>
//   )
// }

function TierBadge({ tier }: { tier: UserTier }) {
  return (
    <Badge variant='secondary' className='gap-x-1'>
      {tier === 'free' && <User className='h-4 w-4' />}
      {tier === 'pro' && <UserCheck className='h-4 w-4' />}
      {tier === 'admin' && <Shield className='h-4 w-4' />}
      {tier}
    </Badge>
  )
}

export function UserDetailDialog({
  currentRow,
  open,
  onOpenChange,
}: UserDetailDialogProps) {
  if (!currentRow) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='max-w-2xl'>
        <DialogHeader>
          <DialogTitle>User Details</DialogTitle>
          <DialogDescription>
            Complete profile information and statistics
          </DialogDescription>
        </DialogHeader>

        <div className='space-y-6'>
          {/* Profile Section */}
          <div className='flex items-center gap-x-4'>
            {currentRow.avatar && (
              <img
                src={currentRow.avatar}
                alt={currentRow.name}
                className='h-20 w-20 rounded-full object-cover'
              />
            )}
            <div>
              <h3 className='text-lg font-semibold'>{currentRow.name}</h3>
              <p className='text-muted-foreground'>{currentRow.email}</p>
              <div className='mt-2 flex gap-x-2'>
                <StatusBadge status={currentRow.status} />
                <TierBadge tier={currentRow.tier} />
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className='grid grid-cols-2 gap-4 md:grid-cols-4'>
            <div className='rounded-lg border p-4'>
              <p className='text-sm text-muted-foreground'>Credit Balance</p>
              <p className='text-2xl font-bold'>{currentRow.creditBalance}</p>
            </div>
            <div className='rounded-lg border p-4'>
              <p className='text-sm text-muted-foreground'>Folders</p>
              <p className='text-2xl font-bold'>{currentRow.folderCount}</p>
            </div>
            <div className='rounded-lg border p-4'>
              <p className='text-sm text-muted-foreground'>Flashcards</p>
              <p className='text-2xl font-bold'>{currentRow.flashcardCount}</p>
            </div>
            <div className='rounded-lg border p-4'>
              <p className='text-sm text-muted-foreground'>SRS Due</p>
              <p className='text-2xl font-bold'>
                {currentRow.srsState.dueCount}
              </p>
            </div>
          </div>

          {/* AI Usage */}
          <div className='rounded-lg border p-4'>
            <h4 className='mb-2 font-semibold'>AI Usage This Month</h4>
            <div className='grid grid-cols-2 gap-4'>
              <div>
                <p className='text-sm text-muted-foreground'>Tokens Used</p>
                <p className='font-medium'>
                  {currentRow.aiUsage.tokensUsed.toLocaleString()}
                </p>
              </div>
              <div>
                <p className='text-sm text-muted-foreground'>Cost</p>
                <p className='font-medium'>
                  ${currentRow.aiUsage.cost.toFixed(2)}
                </p>
              </div>
            </div>
          </div>

          {/* Dates */}
          <div className='grid grid-cols-2 gap-4'>
            <div>
              <p className='text-sm text-muted-foreground'>Signup Date</p>
              <p className='font-medium'>
                {format(new Date(currentRow.signupDate), 'PPP')}
              </p>
            </div>
            <div>
              <p className='text-sm text-muted-foreground'>Last Login</p>
              <p className='font-medium'>
                {currentRow.lastLogin
                  ? format(new Date(currentRow.lastLogin), 'PPP')
                  : 'Never'}
              </p>
            </div>
            <div>
              <p className='text-sm text-muted-foreground'>Last Active</p>
              <p className='font-medium'>
                {currentRow.lastActive
                  ? format(new Date(currentRow.lastActive), 'PPP')
                  : 'Never'}
              </p>
            </div>
            <div>
              <p className='text-sm text-muted-foreground'>SRS Last Reset</p>
              <p className='font-medium'>
                {currentRow.srsState.lastResetAt
                  ? format(new Date(currentRow.srsState.lastResetAt), 'PPP')
                  : 'Never'}
              </p>
            </div>
          </div>
        </div>

        <div className='flex justify-end'>
          <Button onClick={() => onOpenChange(false)}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// import { format } from 'date-fns'
// import { Badge } from '@/components/ui/badge'
// import { Button } from '@/components/ui/button'
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
// } from '@/components/ui/dialog'
// import { statusColors, tierIcons } from '../data/data'
// import { type UserProfile } from '../data/schema'
// import type { UserStatus, UserTier } from '../data/schema'

// type UserDetailDialogProps = {
//   currentRow: UserProfile | null
//   open: boolean
//   onOpenChange: (open: boolean) => void
// }

// // Move these components outside of the main component to avoid React hooks warnings
// function StatusBadge({ status }: { status: UserStatus }) {
//   const badgeColor = statusColors.get(status)
//   return (
//     <Badge variant='outline' className={badgeColor}>
//       {status}
//     </Badge>
//   )
// }

// function TierBadge({ tier }: { tier: UserTier }) {
//   const TierIcon = tierIcons.get(tier)
//   return (
//     <Badge variant='secondary' className='gap-x-1'>
//       {TierIcon && <TierIcon className='h-4 w-4' />}
//       {tier}
//     </Badge>
//   )
// }

// export function UserDetailDialog({
//   currentRow,
//   open,
//   onOpenChange,
// }: UserDetailDialogProps) {
//   if (!currentRow) return null

//   return (
//     <Dialog open={open} onOpenChange={onOpenChange}>
//       <DialogContent className='max-w-2xl'>
//         <DialogHeader>
//           <DialogTitle>User Details</DialogTitle>
//           <DialogDescription>
//             Complete profile information and statistics
//           </DialogDescription>
//         </DialogHeader>

//         <div className='space-y-6'>
//           {/* Profile Section */}
//           <div className='flex items-center gap-x-4'>
//             {currentRow.avatar && (
//               <img
//                 src={currentRow.avatar}
//                 alt={currentRow.name}
//                 className='h-20 w-20 rounded-full object-cover'
//               />
//             )}
//             <div>
//               <h3 className='text-lg font-semibold'>{currentRow.name}</h3>
//               <p className='text-muted-foreground'>{currentRow.email}</p>
//               <div className='mt-2 flex gap-x-2'>
//                 <StatusBadge status={currentRow.status} />
//                 <TierBadge tier={currentRow.tier} />
//               </div>
//             </div>
//           </div>

//           {/* Stats Grid */}
//           <div className='grid grid-cols-2 gap-4 md:grid-cols-4'>
//             <div className='rounded-lg border p-4'>
//               <p className='text-sm text-muted-foreground'>Credit Balance</p>
//               <p className='text-2xl font-bold'>{currentRow.creditBalance}</p>
//             </div>
//             <div className='rounded-lg border p-4'>
//               <p className='text-sm text-muted-foreground'>Folders</p>
//               <p className='text-2xl font-bold'>{currentRow.folderCount}</p>
//             </div>
//             <div className='rounded-lg border p-4'>
//               <p className='text-sm text-muted-foreground'>Flashcards</p>
//               <p className='text-2xl font-bold'>{currentRow.flashcardCount}</p>
//             </div>
//             <div className='rounded-lg border p-4'>
//               <p className='text-sm text-muted-foreground'>SRS Due</p>
//               <p className='text-2xl font-bold'>
//                 {currentRow.srsState.dueCount}
//               </p>
//             </div>
//           </div>

//           {/* AI Usage */}
//           <div className='rounded-lg border p-4'>
//             <h4 className='mb-2 font-semibold'>AI Usage This Month</h4>
//             <div className='grid grid-cols-2 gap-4'>
//               <div>
//                 <p className='text-sm text-muted-foreground'>Tokens Used</p>
//                 <p className='font-medium'>
//                   {currentRow.aiUsage.tokensUsed.toLocaleString()}
//                 </p>
//               </div>
//               <div>
//                 <p className='text-sm text-muted-foreground'>Cost</p>
//                 <p className='font-medium'>
//                   ${currentRow.aiUsage.cost.toFixed(2)}
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* Dates */}
//           <div className='grid grid-cols-2 gap-4'>
//             <div>
//               <p className='text-sm text-muted-foreground'>Signup Date</p>
//               <p className='font-medium'>
//                 {format(new Date(currentRow.signupDate), 'PPP')}
//               </p>
//             </div>
//             <div>
//               <p className='text-sm text-muted-foreground'>Last Login</p>
//               <p className='font-medium'>
//                 {currentRow.lastLogin
//                   ? format(new Date(currentRow.lastLogin), 'PPP')
//                   : 'Never'}
//               </p>
//             </div>
//             <div>
//               <p className='text-sm text-muted-foreground'>Last Active</p>
//               <p className='font-medium'>
//                 {currentRow.lastActive
//                   ? format(new Date(currentRow.lastActive), 'PPP')
//                   : 'Never'}
//               </p>
//             </div>
//             <div>
//               <p className='text-sm text-muted-foreground'>SRS Last Reset</p>
//               <p className='font-medium'>
//                 {currentRow.srsState.lastResetAt
//                   ? format(new Date(currentRow.srsState.lastResetAt), 'PPP')
//                   : 'Never'}
//               </p>
//             </div>
//           </div>
//         </div>

//         <div className='flex justify-end'>
//           <Button onClick={() => onOpenChange(false)}>Close</Button>
//         </div>
//       </DialogContent>
//     </Dialog>
//   )
// }

// // import { format } from 'date-fns'
// // import { Badge } from '@/components/ui/badge'
// // import { Button } from '@/components/ui/button'
// // import {
// //   Dialog,
// //   DialogContent,
// //   DialogDescription,
// //   DialogHeader,
// //   DialogTitle,
// // } from '@/components/ui/dialog'
// // import { statusColors, tierIcons } from '../data/data'
// // import { type UserProfile } from '../data/schema'

// // type UserDetailDialogProps = {
// //   currentRow: UserProfile | null
// //   open: boolean
// //   onOpenChange: (open: boolean) => void
// // }

// // export function UserDetailDialog({
// //   currentRow,
// //   open,
// //   onOpenChange,
// // }: UserDetailDialogProps) {
// //   if (!currentRow) return null

// //   // const StatusBadge = ({ status }: { status: string }) => {
// //   //   const badgeColor = statusColors.get(status as keyof typeof statusColors)
// //   //   return (
// //   //     <Badge variant='outline' className={badgeColor}>
// //   //       {status}
// //   //     </Badge>
// //   //   )
// //   // }

// //   // const TierBadge = ({ tier }: { tier: string }) => {
// //   //   const TierIcon = tierIcons.get(tier as keyof typeof tierIcons)
// //   //   return (
// //   //     <Badge variant='secondary' className='gap-x-1'>
// //   //       {TierIcon && <TierIcon size={14} />}
// //   //       {tier}
// //   //     </Badge>
// //   //   )
// //   // }

// // 	// Move these components outside of the main component
// // function StatusBadge({ status }: { status: string }) {
// //   const badgeColor = statusColors.get(status as 'active' | 'inactive' | 'suspended' | 'banned')
// //   return (
// //     <Badge variant='outline' className={badgeColor}>
// //       {status}
// //     </Badge>
// //   )
// // }

// // function TierBadge({ tier }: { tier: string }) {
// //   const TierIcon = tierIcons.get(tier as 'free' | 'pro' | 'admin')
// //   return (
// //     <Badge variant='secondary' className='gap-x-1'>
// //       {TierIcon && <TierIcon size={14} />}
// //       {tier}
// //     </Badge>
// //   )
// // }

// //   return (
// //     <Dialog open={open} onOpenChange={onOpenChange}>
// //       <DialogContent className='max-w-2xl'>
// //         <DialogHeader>
// //           <DialogTitle>User Details</DialogTitle>
// //           <DialogDescription>
// //             Complete profile information and statistics
// //           </DialogDescription>
// //         </DialogHeader>

// //         <div className='space-y-6'>
// //           {/* Profile Section */}
// //           <div className='flex items-center gap-x-4'>
// //             {currentRow.avatar && (
// //               <img
// //                 src={currentRow.avatar}
// //                 alt={currentRow.name}
// //                 className='h-20 w-20 rounded-full object-cover'
// //               />
// //             )}
// //             <div>
// //               <h3 className='text-lg font-semibold'>{currentRow.name}</h3>
// //               <p className='text-muted-foreground'>{currentRow.email}</p>
// //               <div className='mt-2 flex gap-x-2'>
// //                 <StatusBadge status={currentRow.status} />
// //                 <TierBadge tier={currentRow.tier} />
// //               </div>
// //             </div>
// //           </div>

// //           {/* Stats Grid */}
// //           <div className='grid grid-cols-2 gap-4 md:grid-cols-4'>
// //             <div className='rounded-lg border p-4'>
// //               <p className='text-sm text-muted-foreground'>Credit Balance</p>
// //               <p className='text-2xl font-bold'>{currentRow.creditBalance}</p>
// //             </div>
// //             <div className='rounded-lg border p-4'>
// //               <p className='text-sm text-muted-foreground'>Folders</p>
// //               <p className='text-2xl font-bold'>{currentRow.folderCount}</p>
// //             </div>
// //             <div className='rounded-lg border p-4'>
// //               <p className='text-sm text-muted-foreground'>Flashcards</p>
// //               <p className='text-2xl font-bold'>{currentRow.flashcardCount}</p>
// //             </div>
// //             <div className='rounded-lg border p-4'>
// //               <p className='text-sm text-muted-foreground'>SRS Due</p>
// //               <p className='text-2xl font-bold'>
// //                 {currentRow.srsState.dueCount}
// //               </p>
// //             </div>
// //           </div>

// //           {/* AI Usage */}
// //           <div className='rounded-lg border p-4'>
// //             <h4 className='mb-2 font-semibold'>AI Usage This Month</h4>
// //             <div className='grid grid-cols-2 gap-4'>
// //               <div>
// //                 <p className='text-sm text-muted-foreground'>Tokens Used</p>
// //                 <p className='font-medium'>
// //                   {currentRow.aiUsage.tokensUsed.toLocaleString()}
// //                 </p>
// //               </div>
// //               <div>
// //                 <p className='text-sm text-muted-foreground'>Cost</p>
// //                 <p className='font-medium'>
// //                   ${currentRow.aiUsage.cost.toFixed(2)}
// //                 </p>
// //               </div>
// //             </div>
// //           </div>

// //           {/* Dates */}
// //           <div className='grid grid-cols-2 gap-4'>
// //             <div>
// //               <p className='text-sm text-muted-foreground'>Signup Date</p>
// //               <p className='font-medium'>
// //                 {format(new Date(currentRow.signupDate), 'PPP')}
// //               </p>
// //             </div>
// //             <div>
// //               <p className='text-sm text-muted-foreground'>Last Login</p>
// //               <p className='font-medium'>
// //                 {currentRow.lastLogin
// //                   ? format(new Date(currentRow.lastLogin), 'PPP')
// //                   : 'Never'}
// //               </p>
// //             </div>
// //             <div>
// //               <p className='text-sm text-muted-foreground'>Last Active</p>
// //               <p className='font-medium'>
// //                 {currentRow.lastActive
// //                   ? format(new Date(currentRow.lastActive), 'PPP')
// //                   : 'Never'}
// //               </p>
// //             </div>
// //             <div>
// //               <p className='text-sm text-muted-foreground'>SRS Last Reset</p>
// //               <p className='font-medium'>
// //                 {currentRow.srsState.lastResetAt
// //                   ? format(new Date(currentRow.srsState.lastResetAt), 'PPP')
// //                   : 'Never'}
// //               </p>
// //             </div>
// //           </div>
// //         </div>

// //         <div className='flex justify-end'>
// //           <Button onClick={() => onOpenChange(false)}>Close</Button>
// //         </div>
// //       </DialogContent>
// //     </Dialog>
// //   )
// // }
