import { CompanyData } from './company'

export type BenefitData = {
  id: string
  name: string
  description: string
  type: number
  unitPrice: number
  status: number
  companyId: number
  company: CompanyData
}

export type BenefitPayload = {
  name: string
  description: string
  type: number
  unitPrice: number
}
