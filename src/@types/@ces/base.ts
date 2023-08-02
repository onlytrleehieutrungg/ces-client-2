export type BaseResponse<T> = {
  code?: number
  message?: string
  metaData?: any
  data?: T
}

export type Params = {
  Status?: number
  Name?: string
  ProductName: string
  Page: number
  Size: number
  Sort: string
  PaymentType: string
  Type: string
  Order: string
  CompanyId: string
  OrderCode: string
  CategoryId: string
}

export type Paging = {
  Page: number
  Size: number
}
