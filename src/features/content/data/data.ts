// import ContentData from '../types'
import { type ContentData } from '../types'

export const defaultData: ContentData = {
  items: [
    {
      id: '1',
      title: 'Marketing Templates',
      type: 'folder',
      status: 'published',
      updatedAt: '2024-01-15',
      author: 'Admin',
    },
    {
      id: '2',
      title: 'Homepage V2',
      type: 'template',
      status: 'draft',
      updatedAt: '2024-01-14',
      author: 'John Doe',
    },
    {
      id: '3',
      title: 'About Us',
      type: 'page',
      status: 'published',
      updatedAt: '2024-01-10',
      author: 'Jane Smith',
    },
    {
      id: '4',
      title: 'Q1 Report',
      type: 'template',
      status: 'archived',
      updatedAt: '2024-01-05',
      author: 'Admin',
    },
  ],
  total: 4,
}
