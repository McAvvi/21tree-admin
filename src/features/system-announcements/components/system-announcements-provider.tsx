import React, { useState } from 'react'
import useDialogState from '@/hooks/use-dialog-state'
import { type SystemAnnouncement } from '../data/schema'

type SystemAnnouncementsDialogType =
  'view' | 'edit' | 'schedule' | 'archive' | 'delete'

type SystemAnnouncementsContextType = {
  open: SystemAnnouncementsDialogType | null
  setOpen: (str: SystemAnnouncementsDialogType | null) => void
  currentRow: SystemAnnouncement | null
  setCurrentRow: React.Dispatch<React.SetStateAction<SystemAnnouncement | null>>
  refreshData: () => void
}

const SystemAnnouncementsContext =
  React.createContext<SystemAnnouncementsContextType | null>(null)

export function SystemAnnouncementsProvider({
  children,
  refreshData = () => {},
}: {
  children: React.ReactNode
  refreshData?: () => void
}) {
  const [open, setOpen] = useDialogState<SystemAnnouncementsDialogType>(null)
  const [currentRow, setCurrentRow] = useState<SystemAnnouncement | null>(null)

  return (
    <SystemAnnouncementsContext.Provider
      value={{ open, setOpen, currentRow, setCurrentRow, refreshData }}
    >
      {children}
    </SystemAnnouncementsContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useSystemAnnouncements = () => {
  const systemAnnouncementsContext = React.useContext(
    SystemAnnouncementsContext
  )

  if (!systemAnnouncementsContext) {
    throw new Error(
      'useSystemAnnouncements has to be used within <SystemAnnouncementsProvider>'
    )
  }

  return systemAnnouncementsContext
}
