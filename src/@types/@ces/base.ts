export type BaseResponse<T> = {
  code?: number
  message?: string
  metaData?: any
  data?: T
}

export type Params = {
  Page: string
  Size: string
  Sort: string
  Order: string
}
