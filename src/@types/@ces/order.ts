import { AccountData } from './account'
import { Product } from './product'

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
  account: AccountData
  orderDetails: OrderDetail[]
}

export type OrderDetail = {
  price: number
  quantity: number
  createAt: string
  notes: string
  productId: string
  product: Product
}
export enum Status {
  NEW = 'New',
  WFP = 'Waiting for payment',
  WFS = 'Waiting for ship',
  COMPLETE = 'Complete',
  CANCEL = 'Cancel',
}
export enum DebtStatus {
  NOTPAYMENT = 'Not Payment',
  COMPLETE = 'Complete',
  CANCEL = 'Cancel',
}
export enum ProductStatus {
  ACTIVE = 'Active',
  INACTIVE = 'InActive',
}
