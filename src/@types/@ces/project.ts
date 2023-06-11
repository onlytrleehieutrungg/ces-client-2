export type ProjectData = {
  id: string
  name: string
  address: string
  updatedAt: string | null
  createdAt: string | null
  status: number
  imageUrl: string
  companyId: number
  projectAccounts: {
    id: string
    projectId: string
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
    project: null
  }[]
}

export type ProjectPayload = {
  name: string
  address: string
  status?: number
  imageUrl: string
}

export type AddProjectMemberPayload = {
  projectId: string
  accountId: string[]
}
