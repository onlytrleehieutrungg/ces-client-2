export type CompanyData = {
  id: string
  name: string
  address: string
  status: number
  imageUrl: string
  contactPerson: string
  limits: number
  used: number
  expiredDate: string
  createdAt: string
  updatedAt: string
  createdBy: string
  updatedBy: string
}

export type CompanyPayload = {
  name: string
  address: string
  status: number
  imageUrl?: string | null
  contactPerson: string
  phone: string
}
