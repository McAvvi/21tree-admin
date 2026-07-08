import { useSystemAnnouncements } from './system-announcements-provider'

export function SystemAnnouncementsDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useSystemAnnouncements()
  return (
    <>
      {/* View Announcement Dialog */}
      <div key='announcement-view'>
        {open === 'view' && currentRow && (
          <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'>
            <div className='w-full max-w-lg rounded-lg bg-background p-6 shadow-lg'>
              <h3 className='text-lg font-semibold'>{currentRow.title}</h3>
              <p className='mt-2 text-sm text-muted-foreground'>
                {currentRow.description}
              </p>
              <div className='mt-4 flex justify-end gap-2'>
                <button
                  onClick={() => setOpen(null)}
                  className='rounded-md px-4 py-2 text-sm hover:bg-muted'
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Edit Announcement Dialog - Placeholder */}
      <div key='announcement-edit'>
        {open === 'edit' && (
          <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'>
            <div className='w-full max-w-lg rounded-lg bg-background p-6 shadow-lg'>
              <h3 className='text-lg font-semibold'>Edit Announcement</h3>
              <p className='mt-2 text-sm text-muted-foreground'>
                Edit dialog placeholder - implement form here
              </p>
              <div className='mt-4 flex justify-end gap-2'>
                <button
                  onClick={() => setOpen(null)}
                  className='rounded-md px-4 py-2 text-sm hover:bg-muted'
                >
                  Cancel
                </button>
                <button className='rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground hover:bg-primary/90'>
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Schedule Dialog - Placeholder */}
      <div key='announcement-schedule'>
        {open === 'schedule' && (
          <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'>
            <div className='w-full max-w-lg rounded-lg bg-background p-6 shadow-lg'>
              <h3 className='text-lg font-semibold'>Schedule Announcement</h3>
              <p className='mt-2 text-sm text-muted-foreground'>
                Schedule dialog placeholder - implement date picker here
              </p>
              <div className='mt-4 flex justify-end gap-2'>
                <button
                  onClick={() => setOpen(null)}
                  className='rounded-md px-4 py-2 text-sm hover:bg-muted'
                >
                  Cancel
                </button>
                <button className='rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground hover:bg-primary/90'>
                  Schedule
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Archive Dialog - Placeholder */}
      <div key='announcement-archive'>
        {open === 'archive' && (
          <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'>
            <div className='w-full max-w-lg rounded-lg bg-background p-6 shadow-lg'>
              <h3 className='text-lg font-semibold'>Archive Announcement</h3>
              <p className='mt-2 text-sm text-muted-foreground'>
                Are you sure you want to archive this announcement?
              </p>
              <div className='mt-4 flex justify-end gap-2'>
                <button
                  onClick={() => setOpen(null)}
                  className='rounded-md px-4 py-2 text-sm hover:bg-muted'
                >
                  Cancel
                </button>
                <button className='rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground hover:bg-primary/90'>
                  Archive
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Delete Announcement Dialog */}
      <div key='announcement-delete'>
        {open === 'delete' && (
          <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'>
            <div className='w-full max-w-lg rounded-lg bg-background p-6 shadow-lg'>
              <h3 className='text-lg font-semibold text-destructive'>
                Delete Announcement
              </h3>
              <p className='mt-2 text-sm text-muted-foreground'>
                Are you sure you want to delete this announcement? This action
                cannot be undone.
              </p>
              <div className='mt-4 flex justify-end gap-2'>
                <button
                  onClick={() => {
                    setOpen(null)
                    setTimeout(() => {
                      setCurrentRow(null)
                    }, 500)
                  }}
                  className='rounded-md px-4 py-2 text-sm hover:bg-muted'
                >
                  Cancel
                </button>
                <button className='text-destructive-foreground rounded-md bg-destructive px-4 py-2 text-sm hover:bg-destructive/90'>
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
