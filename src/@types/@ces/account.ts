import { WalletData } from './wallet'

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
  wallet?: WalletData
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

export enum Role {
  'System Admin' = 1,
  'Supplier Admin' = 2,
  'Enterprise Admin' = 3,
  'Employee' = 4,
}

const filterRoleOptions = (filterFn: (value: Role) => boolean) =>
  Object.entries(Role)
    .filter(([_, value]) => typeof value === 'number' && filterFn(value))
    .map(([key, value]) => ({ code: value as number, label: key }))

export const ROLE_OPTIONS_SA = [
  { code: 'all', label: 'All' },
  ...filterRoleOptions((value) =>
    [Role['Supplier Admin'], Role['Enterprise Admin']].includes(value)
  ),
]
export const ROLE_OPTIONS_EA = [
  { code: 'all', label: 'All' },
  ...filterRoleOptions((value) => [Role['Employee']].includes(value)),
]

export const ROLE_OPTIONS_FORM_EA = filterRoleOptions((value) => [Role['Employee']].includes(value))

export const ROLE_OPTIONS_FORM_SA = filterRoleOptions((value) =>
  [Role['Supplier Admin'], Role['Enterprise Admin']].includes(value)
)

export enum AccountStatus {
  'Active' = 1,
  'In Active' = 2,
  'Deleted' = 3,
}

const filterStatusOptions = (filterFn: (value: AccountStatus) => boolean) =>
  Object.entries(AccountStatus)
    .filter(([_, value]) => typeof value === 'number' && filterFn(value))
    .map(([key, value]) => ({ code: value as number, label: key }))

export const ACCOUNT_STATUS_OPTIONS_SA = [
  { code: 'all', label: 'All' },
  ...filterStatusOptions(() => true),
]

export const ACCOUNT_STATUS_OPTIONS_FORM = filterStatusOptions((value) =>
  [AccountStatus['Active'], AccountStatus['In Active']].includes(value)
)
