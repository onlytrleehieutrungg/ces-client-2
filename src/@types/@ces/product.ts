import { Category } from './category'

export type Product = {
  id: string
  name: string
  price: number
  imageUrl: string
  quantity: number
  status: string
  updatedAt: string
  createdAt: string
  notes: string
  description: string
  serviceDuration: string
  type: string
  categoryId: string
  category: Category
}
