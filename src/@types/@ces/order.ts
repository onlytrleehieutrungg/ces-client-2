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
  employee: Employee
  orderDetails: OrderDetail[]
}

export type Employee = {
  account: AccountData
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
  ALL = '',
  NEW = 'New',
  WFP = 'Confirm',
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
