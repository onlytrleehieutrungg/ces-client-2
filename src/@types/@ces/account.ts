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

export enum Role {
  'System Admin',
  'Supplier Admin',
  'Enterprise Admin',
  'Employee',
}

export const ROLE_OPTIONS_SA = [
  { code: 'all', label: 'All' },
  ...Object.entries(Role)
    .filter(([_, value]) => typeof value === 'number')
    .map(([key, value]) => ({
      code: value as number,
      label: key,
    })),
]

export enum AccountStatus {
  'Active' = 1,
  'In Active' = 2,
  'Deleted' = 3,
}

export const ACCOUNT_STATUS_OPTIONS = [
  { code: 'all', label: 'All' },
  ...Object.entries(AccountStatus)
    .filter(([_, value]) => typeof value === 'number')
    .map(([key, value]) => ({
      code: value as number,
      label: key,
    })),
]
