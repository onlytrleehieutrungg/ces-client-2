export type BaseResponse<T> = {
  code?: number
  message?: string
  metaData?: any
  data?: T
}

export type Params = {
  Status?: number
  Name?: string
  Page: number
  Size: number
  Sort: string
  Order: string
}

export type Paging = {
  Page: number
  Size: number
}
