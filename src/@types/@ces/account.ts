export type AccountData = {
  id: string
  name: string
  email: string
  address: string
  phone: string
  imageUrl: string
  status: 1 | 2 | 3
  roleId: 1 | 2 | 3
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
  status?: any
}

export type AccountWalletData = {
  id: string
  name: string
  type: 1 | 2
  balance: number
  accountId: string
}
