import { useNavigate, useSearch } from '@tanstack/react-router'
import { Bell } from 'lucide-react'
import { type NavigateFn } from '@/hooks/use-table-url-state'
import { SystemAnnouncementsDialogs } from './components/system-announcements-dialogs'
import { SystemAnnouncementsProvider } from './components/system-announcements-provider'
import { SystemAnnouncementsTable } from './components/system-announcements-table'
import { systemAnnouncements } from './data/announcements'
import { type SystemAnnouncement } from './data/schema'

function SystemAnnouncementsContent() {
  const search = useSearch({ strict: false }) as Record<string, unknown>
  const navigate = useNavigate() as NavigateFn

  const data: SystemAnnouncement[] = systemAnnouncements

  return (
    <div className='flex-1 space-y-4 p-8 pt-6'>
      <div className='flex items-center justify-between space-y-2'>
        <div className='flex items-center gap-2'>
          <Bell className='h-8 w-8' />
          <h2 className='text-3xl font-bold tracking-tight'>
            System Announcements
          </h2>
        </div>
      </div>

      <SystemAnnouncementsTable
        data={data}
        search={search}
        navigate={navigate}
      />
      <SystemAnnouncementsDialogs />
    </div>
  )
}

export default function SystemAnnouncements() {
  return (
    <SystemAnnouncementsProvider>
      <SystemAnnouncementsContent />
    </SystemAnnouncementsProvider>
  )
}
