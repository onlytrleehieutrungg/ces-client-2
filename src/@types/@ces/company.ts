export type CompanyData = {
  id: string
  name: string
  address: string
  status: number
  updatedAt: string
  createdAt: string
  imageUrl: string
  contactPerson: string
  phone: string
}

export type CompanyPayload = {
  name: string
  address: string
  status: number
  imageUrl?: string | null
  contactPerson: string
  phone: string
}
