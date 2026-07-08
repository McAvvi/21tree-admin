export interface ContentItem {
  id: string
  title: string
  type: 'folder' | 'template' | 'page'
  status: 'published' | 'draft' | 'archived'
  updatedAt: string
  author: string
}

export interface ContentData {
  items: ContentItem[]
  total: number
}
