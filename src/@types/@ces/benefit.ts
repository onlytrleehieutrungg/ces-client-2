export type BenefitData = {
  id: number
  name: string
  description: string
  type: number
  unitPrice: number
  status: number
  companyId: number
  company: {
    id: number
    name: string
    address: string
    status: number
    imageUrl: string
    contactPersonId: string
    limits: number
    used: number
    expiredDate: string
    createdAt: string
    updatedAt: string
    createdBy: string
  }
}

export type BenefitPayload = {
  name: string
  description: string
  type: number
  unitPrice: number
}
