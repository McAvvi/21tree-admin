import { ContentDialogs } from '@/features/content/components/content-dialog'
import { ContentPrimaryButtons } from '@/features/content/components/content-primary-button'
// Add the 's' to match the filenames created earlier
import { ContentProvider } from '@/features/content/components/content-provider'
import { ContentTable } from '@/features/content/components/content-table'
import { defaultData } from '@/features/content/data/data'

export function ContentPage() {
  return (
    <ContentProvider initialData={defaultData}>
      <div className='flex flex-1 flex-col gap-4 sm:gap-6'>
        <div className='flex flex-wrap items-end justify-between gap-2'>
          <div className='space-y-1'>
            <h2 className='text-2xl font-bold tracking-tight'>
              Content Management
            </h2>
            <p className='text-muted-foreground'>
              Manage your templates, folders, and site content.
            </p>
          </div>
          <ContentPrimaryButtons />
        </div>
        <ContentTable />
      </div>
      <ContentDialogs />
    </ContentProvider>
  )
}
