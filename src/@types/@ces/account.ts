export type AccountData = {
  id: string
  name: string
  email: string
  address: string
  phone: string
  imageUrl: string
  status: number
  roleId: number
  companyId: number
  updatedAt: string
  createdAt: string
  wallets?: AccountWalletData[]
}

export type AccountPayload = {
  name: string
  email: string
  address: string
  phone: string
  imageUrl: string
  password: string
  roleId: number
  companyId?: number | null
  status?: number
}

export type AccountWalletData = {
  id: string
  name: string
  type: number
  balance: number
  accountId: string
}
