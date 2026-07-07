import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { showSubmittedData } from '@/lib/show-submitted-data'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

const formSchema = z.object({
  name: z.string().min(1, 'Name is required.'),
  description: z.string().optional(),
  content: z.string().optional(),
})

type ContentForm = z.infer<typeof formSchema>

type ContentActionDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  dialogType: 'addFolder' | 'addTemplate'
}

export function ContentActionDialog({
  open,
  onOpenChange,
  dialogType,
}: ContentActionDialogProps) {
  const isFolder = dialogType === 'addFolder'
  const form = useForm<ContentForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      content: '',
    },
  })

  const onSubmit = (values: ContentForm) => {
    form.reset()
    showSubmittedData(values, isFolder ? 'Folder created:' : 'Template created:')
    onOpenChange(false)
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(state) => {
        form.reset()
        onOpenChange(state)
      }}
    >
      <DialogContent className='sm:max-w-lg'>
        <DialogHeader className='text-start'>
          <DialogTitle>
            {isFolder ? 'Create New Folder' : 'Create New Template'}
          </DialogTitle>
          <DialogDescription>
            {isFolder
              ? 'Create a new folder to organize your content. '
              : 'Create a new template with your content. '}
            Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className='w-[calc(100%+0.75rem)] overflow-y-auto py-1 pe-3'>
          <Form {...form}>
            <form
              id='content-form'
              onSubmit={form.handleSubmit(onSubmit)}
              className='space-y-4 px-0.5'
            >
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'>
                    <FormLabel className='col-span-2 text-end'>
                      {isFolder ? 'Folder Name' : 'Template Name'}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={
                          isFolder ? 'e.g., Marketing' : 'e.g., Email Campaign'
                        }
                        className='col-span-4'
                        autoComplete='off'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className='col-span-4 col-start-3' />
                  </FormItem>
                )}
              />
              {!isFolder && (
                <>
                  <FormField
                    control={form.control}
                    name='description'
                    render={({ field }) => (
                      <FormItem className='grid grid-cols-6 items-start space-y-0 gap-x-4 gap-y-1'>
                        <FormLabel className='col-span-2 text-end'>
                          Description
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder='Brief description of the template'
                            className='col-span-4 min-h-[80px]'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className='col-span-4 col-start-3' />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='content'
                    render={({ field }) => (
                      <FormItem className='grid grid-cols-6 items-start space-y-0 gap-x-4 gap-y-1'>
                        <FormLabel className='col-span-2 text-end'>
                          Content
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder='Enter your template content here...'
                            className='col-span-4 min-h-[150px] font-mono'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className='col-span-4 col-start-3' />
                      </FormItem>
                    )}
                  />
                </>
              )}
            </form>
          </Form>
        </div>
        <DialogFooter>
          <Button type='submit' form='content-form'>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
