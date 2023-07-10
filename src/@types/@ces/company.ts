export type CompanyData = {
  id: string
  name: string
  address: string
  status: number
  limits: number
  used: number
  updatedAt: string
  createdAt: string
  imageUrl: string
  contactPersonId: string
  phone: string
  expiredDate: string
}

export type CompanyPayload = {
  name: string
  address: string
  imageUrl?: string | null
  limits: number
  expiredDate: string
}
