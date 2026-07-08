// import { useState } from 'react'
import { useNavigate, useSearch } from '@tanstack/react-router'
import { Users } from 'lucide-react'
import { type NavigateFn } from '@/hooks/use-table-url-state'
import { UserManagementDialogs } from './components/user-management-dialogs'
import {
  UserManagementProvider,
  // useUserManagement,
} from './components/user-management-provider'
import { UserManagementTable } from './components/user-management-table'
import { type UserProfile } from './data/schema'

function UserManagementContent() {
  // ✅ Get search and navigate from router
  const search = useSearch({ strict: false }) as Record<string, unknown>
  // const navigate = useNavigate()
  const navigate = useNavigate() as NavigateFn // ✅ Cast to correct type

  // ✅ You need to provide data - where does it come from?
  // Option A: If you have it in state, use it here
  // Option B: If you fetch it, do it here
  // For now, using empty array as placeholder
  const data: UserProfile[] = [] // ← Replace with your actual data source

  return (
    <div className='flex-1 space-y-4 p-8 pt-6'>
      <div className='flex items-center justify-between space-y-2'>
        <div className='flex items-center gap-2'>
          <Users className='h-8 w-8' />
          <h2 className='text-3xl font-bold tracking-tight'>User Management</h2>
        </div>
      </div>

      {/* <UserManagementTable /> */}
      <UserManagementTable data={data} search={search} navigate={navigate} />
      <UserManagementDialogs />
    </div>
  )
}

export default function UserManagement() {
  return (
    <UserManagementProvider>
      <UserManagementContent />
    </UserManagementProvider>
  )
}
