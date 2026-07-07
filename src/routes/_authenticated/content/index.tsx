import { getRouteApi } from '@tanstack/react-router'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { ConfigDrawer } from '@/components/config-drawer'
import { ContentProvider } from './components/content-provider'
import { ContentDialogs } from './components/content-dialogs'
import { ContentPrimaryButtons } from './components/content-primary-buttons'
import { ContentTable } from './components/content-table'
import { initialContent } from './data/data'

export const Route = getRouteApi('/_authenticated/content')({
  component: ContentManagement,
})

function ContentManagement() {
  return (
    <ContentProvider>
      <Header fixed>
        <Search className='me-auto' />
        <ThemeSwitch />
        <ConfigDrawer />
        <ProfileDropdown />
      </Header>

      <Main className='flex flex-1 flex-col gap-4 sm:gap-6'>
        <div className='flex flex-wrap items-end justify-between gap-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>
              Content Management
            </h2>
            <p className='text-muted-foreground'>
              Manage your templates and folders here.
            </p>
          </div>
          <ContentPrimaryButtons />
        </div>
        <ContentTable data={initialContent} />
      </Main>

      <ContentDialogs />
    </ContentProvider>
  )
}
