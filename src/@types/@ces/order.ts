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
  id: string
  price: number
  quantity: number
  createAt: string
  notes: string
  productId: string
  orderId: string
  product: Product[]
}

export type Product = {
  id: string
  quantity: number
  name: string
  status: number
  description: string
  serviceDuration: string
  type: number
  imageUrl: string
  categoryId: string
}
