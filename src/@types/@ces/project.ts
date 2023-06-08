export type ProjectData = {
  id: string
  name: string
  address: string
  updatedAt: string | null
  createdAt: string | null
  status: number
  imageUrl: string
  companyId: number
  projectAccount: any
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
