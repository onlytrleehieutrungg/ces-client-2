import { Product } from "./product"

export type Order = {
  id: string
  total: number
  address: string
  updatedAt: string
  createdAt: string
  status: number
  note: string
  code: string
  debtStatus: number
  accountId: string
  orderDetail: OrderDetail[]
}

export type OrderDetail = {
  price: number
  quantity: number
  createAt: string
  notes: string
  productId: string 
  product: Product
}


