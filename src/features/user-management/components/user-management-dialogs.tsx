import { CreditManagementDialog } from './credit-management-dialog'
import { DeleteUserDialog } from './delete-user-dialog'
import { ExportDataDialog } from './export-data-dialog'
import { ImpersonateDialog } from './impersonate-dialog'
import { ResetSRSDialog } from './reset-srs-dialog'
import { SuspendUserDialog } from './suspend-user-dialog'
import { TierChangeDialog } from './tier-change-dialog'
import { UserDetailDialog } from './user-detail-dialog'
import { useUserManagement } from './user-management-provider'

export function UserManagementDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useUserManagement()
  return (
    <>
      <UserDetailDialog
        key='user-view'
        open={open === 'view'}
        onOpenChange={() => setOpen('view')}
        currentRow={currentRow}
      />

      <CreditManagementDialog
        key='user-credits'
        open={open === 'credits'}
        onOpenChange={() => setOpen('credits')}
        currentRow={currentRow}
      />

      <TierChangeDialog
        key='user-tier'
        open={open === 'tier'}
        onOpenChange={() => setOpen('tier')}
        currentRow={currentRow}
      />

      <ImpersonateDialog
        key='user-impersonate'
        open={open === 'impersonate'}
        onOpenChange={() => setOpen('impersonate')}
        currentRow={currentRow}
      />

      <SuspendUserDialog
        key='user-suspend'
        open={open === 'suspend'}
        onOpenChange={() => setOpen('suspend')}
        currentRow={currentRow}
      />

      <ResetSRSDialog
        key='user-reset-srs'
        open={open === 'reset-srs'}
        onOpenChange={() => setOpen('reset-srs')}
        currentRow={currentRow}
      />

      <ExportDataDialog
        key='user-export'
        open={open === 'export'}
        onOpenChange={() => setOpen('export')}
        currentRow={currentRow}
      />

      <DeleteUserDialog
        key='user-delete'
        open={open === 'delete'}
        onOpenChange={() => {
          setOpen('delete')
          setTimeout(() => {
            setCurrentRow(null)
          }, 500)
        }}
        currentRow={currentRow}
      />
    </>
  )
}

// import { CreditManagementDialog } from './credit-management-dialog'
// import { DeleteUserDialog } from './delete-user-dialog'
// import { ExportDataDialog } from './export-data-dialog'
// import { ImpersonateDialog } from './impersonate-dialog'
// import { ResetSRSDialog } from './reset-srs-dialog'
// import { SuspendUserDialog } from './suspend-user-dialog'
// import { TierChangeDialog } from './tier-change-dialog'
// import { UserDetailDialog } from './user-detail-dialog'
// import { useUserManagement } from './user-management-provider'

// export function UserManagementDialogs() {
//   const { open, setOpen, currentRow, setCurrentRow } = useUserManagement()
//   return (
//     <>
//       <UserDetailDialog
//         key='user-view'
//         open={open === 'view'}
//         onOpenChange={() => setOpen('view')}
//         currentRow={currentRow}
//       />

//       <CreditManagementDialog
//         key='user-credits'
//         open={open === 'credits'}
//         onOpenChange={() => setOpen('credits')}
//         currentRow={currentRow}
//       />

//       <TierChangeDialog
//         key='user-tier'
//         open={open === 'tier'}
//         onOpenChange={() => setOpen('tier')}
//         currentRow={currentRow}
//       />

//       <ImpersonateDialog
//         key='user-impersonate'
//         open={open === 'impersonate'}
//         onOpenChange={() => setOpen('impersonate')}
//         currentRow={currentRow}
//       />

//       <SuspendUserDialog
//         key='user-suspend'
//         open={open === 'suspend'}
//         onOpenChange={() => setOpen('suspend')}
//         currentRow={currentRow}
//       />

//       <ResetSRSDialog
//         key='user-reset-srs'
//         open={open === 'reset-srs'}
//         onOpenChange={() => setOpen('reset-srs')}
//         currentRow={currentRow}
//       />

//       <ExportDataDialog
//         key='user-export'
//         open={open === 'export'}
//         onOpenChange={() => setOpen('export')}
//         currentRow={currentRow}
//       />

//       <DeleteUserDialog
//         key='user-delete'
//         open={open === 'delete'}
//         onOpenChange={() => {
//           setOpen('delete')
//           setTimeout(() => {
//             setCurrentRow(null)
//           }, 500)
//         }}
//         currentRow={currentRow}
//       />
//     </>
//   )
// }
