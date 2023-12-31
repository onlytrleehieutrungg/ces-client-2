export type Debt = {
  id: string
  name: string
  total: number
  status: number
  infoPayment: string
  createdAt: string
  updatedAt: string
  companyId: string
  company: Company
}

export type Company = {
  id: number
  name: string
  address: string
  contactPersonId: string
  status: number
  updatedAt: string
  createdAt: string
  imageUrl: string
  contactPerson: string
  phone: string
  limits: number
  used: number
  expiredDate: string
}

export enum ReceiptStatus {
  NEW = 'New',
  PAID = "Paid"
}
