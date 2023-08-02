import { Category } from './category'

export type Product = {
  id: string
  name: string
  price: number
  imageUrl: string
  quantity: number
  status: number
  updatedAt: string
  createdAt: string
  notes: string
  description: string
  serviceDuration: string
  type: string
  categoryId: string
  category: Category
}

export type ProductPayload = {
  name: string
  price: number
  imageUrl: string
  quantity: number
  description: string
  status: number
  categoryId: string
}


