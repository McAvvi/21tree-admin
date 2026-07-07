import { ContentActionDialog } from './content-action-dialog'
import { useContent } from './content-provider'

export function ContentDialogs() {
  const { open, setOpen } = useContent()
  return (
    <>
      <ContentActionDialog
        key='content-add-folder'
        open={open === 'addFolder'}
        onOpenChange={() => setOpen('addFolder')}
        dialogType='addFolder'
      />

      <ContentActionDialog
        key='content-add-template'
        open={open === 'addTemplate'}
        onOpenChange={() => setOpen('addTemplate')}
        dialogType='addTemplate'
      />
    </>
  )
}
