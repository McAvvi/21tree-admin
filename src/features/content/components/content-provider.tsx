// import { createContext, useContext, useState, type ReactNode } from 'react'
// import { ContentData, ContentItem } from '../types'
import { createContext, useContext, useState, type ReactNode } from 'react'
import type { ContentData, ContentItem } from '../types'

interface ContentContextType extends ContentData {
  addItem: (item: ContentItem) => void
  updateItem: (id: string, item: Partial<ContentItem>) => void
  deleteItem: (id: string) => void
  selectedItems: string[]
  toggleSelectItem: (id: string) => void
  clearSelection: () => void
}

const ContentContext = createContext<ContentContextType | undefined>(undefined)

interface ContentProviderProps {
  children: ReactNode
  initialData: ContentData
}

export function ContentProvider({
  children,
  initialData,
}: ContentProviderProps) {
  const [items, setItems] = useState<ContentItem[]>(initialData.items)
  const [selectedItems, setSelectedItems] = useState<string[]>([])

  const addItem = (item: ContentItem) => {
    setItems((prev) => [item, ...prev])
  }

  const updateItem = (id: string, updates: Partial<ContentItem>) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updates } : item))
    )
  }

  const deleteItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id))
    setSelectedItems((prev) => prev.filter((itemId) => itemId !== id))
  }

  const toggleSelectItem = (id: string) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    )
  }

  const clearSelection = () => {
    setSelectedItems([])
  }

  return (
    <ContentContext.Provider
      value={{
        items,
        total: items.length,
        addItem,
        updateItem,
        deleteItem,
        selectedItems,
        toggleSelectItem,
        clearSelection,
      }}
    >
      {children}
    </ContentContext.Provider>
  )
}

export function useContent() {
  const context = useContext(ContentContext)
  if (!context) {
    throw new Error('useContent must be used within a ContentProvider')
  }
  return context
}
