import { type ContentItem } from './schema'

export const initialContent: ContentItem[] = [
  {
    id: '1',
    name: 'Marketing Templates',
    type: 'folder',
    path: '/marketing-templates',
    parentId: null,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
  },
  {
    id: '2',
    name: 'Email Campaign',
    type: 'template',
    path: '/marketing-templates/email-campaign',
    parentId: '1',
    createdAt: '2024-01-16T10:00:00Z',
    updatedAt: '2024-01-16T10:00:00Z',
  },
  {
    id: '3',
    name: 'Social Media',
    type: 'template',
    path: '/marketing-templates/social-media',
    parentId: '1',
    createdAt: '2024-01-17T10:00:00Z',
    updatedAt: '2024-01-17T10:00:00Z',
  },
  {
    id: '4',
    name: 'Product Templates',
    type: 'folder',
    path: '/product-templates',
    parentId: null,
    createdAt: '2024-01-18T10:00:00Z',
    updatedAt: '2024-01-18T10:00:00Z',
  },
  {
    id: '5',
    name: 'Landing Page',
    type: 'template',
    path: '/product-templates/landing-page',
    parentId: '4',
    createdAt: '2024-01-19T10:00:00Z',
    updatedAt: '2024-01-19T10:00:00Z',
  },
]
