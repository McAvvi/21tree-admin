import React, { useState } from 'react'
import useDialogState from '@/hooks/use-dialog-state'
import { type UserProfile } from '../data/schema'

type UserManagementDialogType =
  | 'view'
  | 'credits'
  | 'tier'
  | 'impersonate'
  | 'suspend'
  | 'reset-srs'
  | 'export'
  | 'delete'

type UserManagementContextType = {
  open: UserManagementDialogType | null
  setOpen: (str: UserManagementDialogType | null) => void
  currentRow: UserProfile | null
  setCurrentRow: React.Dispatch<React.SetStateAction<UserProfile | null>>
  refreshData: () => void
}

const UserManagementContext =
  React.createContext<UserManagementContextType | null>(null)

export function UserManagementProvider({
  children,
  refreshData = () => {}, // ✅ Make it optional with default no-op
}: {
  children: React.ReactNode
  refreshData?: () => void // ✅ Make it optional
}) {
  const [open, setOpen] = useDialogState<UserManagementDialogType>(null)
  const [currentRow, setCurrentRow] = useState<UserProfile | null>(null)

  return (
    <UserManagementContext.Provider
      value={{ open, setOpen, currentRow, setCurrentRow, refreshData }}
    >
      {children}
    </UserManagementContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useUserManagement = () => {
  const userManagementContext = React.useContext(UserManagementContext)

  if (!userManagementContext) {
    throw new Error(
      'useUserManagement has to be used within <UserManagementProvider>'
    )
  }

  return userManagementContext
}

// export function UserManagementProvider({
//   children,
//   refreshData,
// }: {
//   children: React.ReactNode
//   refreshData: () => void
// }) {
//   const [open, setOpen] = useDialogState<UserManagementDialogType>(null)
//   const [currentRow, setCurrentRow] = useState<UserProfile | null>(null)

//   return (
//     <UserManagementContext.Provider
//       value={{ open, setOpen, currentRow, setCurrentRow, refreshData }}
//     >
//       {children}
//     </UserManagementContext.Provider>
//   )
// }

// eslint-disable-next-line react-refresh/only-export-components

// export const useUserManagement = () => {
//   const userManagementContext = React.useContext(UserManagementContext)

//   if (!userManagementContext) {
//     throw new Error(
//       'useUserManagement has to be used within <UserManagementProvider>'
//     )
//   }

//   return userManagementContext
// }

//------------

// import React, { useState } from 'react'
// import useDialogState from '@/hooks/use-dialog-state'
// import { type UserProfile } from '../data/schema'

// type UserManagementDialogType =
//   | 'view'
//   | 'credits'
//   | 'tier'
//   | 'impersonate'
//   | 'suspend'
//   | 'reset-srs'
//   | 'export'
//   | 'delete'

// type UserManagementContextType = {
//   open: UserManagementDialogType | null
//   setOpen: (str: UserManagementDialogType | null) => void
//   currentRow: UserProfile | null
//   setCurrentRow: React.Dispatch<React.SetStateAction<UserProfile | null>>
// }

// const UserManagementContext =
//   React.createContext<UserManagementContextType | null>(null)

// export function UserManagementProvider({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   const [open, setOpen] = useDialogState<UserManagementDialogType>(null)
//   const [currentRow, setCurrentRow] = useState<UserProfile | null>(null)

//   return (
//     <UserManagementContext value={{ open, setOpen, currentRow, setCurrentRow }}>
//       {children}
//     </UserManagementContext>
//   )
// }

// // eslint-disable-next-line react-refresh/only-export-components
// export const useUserManagement = () => {
//   const userManagementContext = React.useContext(UserManagementContext)

//   if (!userManagementContext) {
//     throw new Error(
//       'useUserManagement has to be used within <UserManagementProvider>'
//     )
//   }

//   return userManagementContext
// }
