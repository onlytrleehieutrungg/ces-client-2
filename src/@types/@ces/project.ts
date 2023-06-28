export type ProjectData = {
  id: string
  name: string
  address: string
  updatedAt: string | null
  createdAt: string | null
  status: number
  imageUrl: string
  companyId: number
  groupAccount: {
    id: string
    groupId: string
    accountId: string
    account: {
      id: string
      name: string
      email: string
      address: string
      phone: string
      updatedAt: string
      createdAt: string
      imageUrl: string
      status: number
      roleId: number
      companyId: number
      wallets: any
    }
    group: null
  }[]
}

export type ProjectPayload = {
  name: string
  address: string
  status?: number
  imageUrl: string
}

export type AddProjectMemberPayload = {
  groupId: string
  accountId: string[]
}

export enum ProjectStatus {
  'Active' = 1,
  'In Active' = 2,
  // 'Deleted' = 3,
}

const filterStatusOptions = (filterFn: (value: ProjectStatus) => boolean) =>
  Object.entries(ProjectStatus)
    .filter(([_, value]) => typeof value === 'number' && filterFn(value))
    .map(([key, value]) => ({ code: value as number, label: key }))

export const PROJECT_STATUS_OPTIONS = [
  { code: 'all', label: 'All' },
  ...filterStatusOptions(() => true),
]

export const PROJECT_STATUS_OPTIONS_FORM = filterStatusOptions((value) =>
  [ProjectStatus['Active'], ProjectStatus['In Active']].includes(value)
)
