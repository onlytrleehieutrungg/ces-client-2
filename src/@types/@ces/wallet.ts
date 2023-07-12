export type UpdateWalletBalancePayLoad = {
  id: string
  benefitId: string
  balance?: number
  type?: number
  orderId?: string
}

export type WalletData = {
  id: string
  name: string
  status: number
  used: number
  limits: number
  balance: number
  createdAt: string
  updatedAt?: string
  createdBy: string
  updatedBy?: string
}
