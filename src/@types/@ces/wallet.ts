export type UpdateWalletBalancePayLoad = {
  id: string
  benefitId: number
  balance: number
  type: number
  orderId: string
}

export type WalletData = {
  id: string
  name: string
  status: number
  type: number
  balance: number
  createdAt: string
  updatedAt?: string
  createdBy: string
  updatedBy?: string
}
