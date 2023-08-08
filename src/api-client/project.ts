import {
  AccountData,
  AddProjectMemberPayload,
  BaseResponse,
  Params,
  ProjectData,
  ProjectPayload,
} from 'src/@types/@ces'
import axiosClient from './axiosClient'

export const projectApi = {
  getAll(params: Partial<Params>): Promise<BaseResponse<ProjectData[]>> {
    return axiosClient.get(`/group`, { params })
  },

  getById(id: string): Promise<BaseResponse<ProjectData>> {
    return axiosClient.get(`/group/${id}`)
  },

  create(payload: ProjectPayload) {
    return axiosClient.post('/group', payload)
  },

  delete(id: string) {
    return axiosClient.delete(`/group/${id}`)
  },

  update(id: string, payload: ProjectPayload) {
    return axiosClient.put(`/group/${id}`, payload)
  },

  getAllMemberInGroup(
    benefitId: string,
    params: Partial<Params>
  ): Promise<BaseResponse<AccountData[]>> {
    return axiosClient.get(`/group/${benefitId}/employees`, { params })
  },

  getAllMemberNotInGroup(
    benefitId: string,
    params: Partial<Params>
  ): Promise<
    BaseResponse<
      {
        id: string
        companyId: number
        accountId: string
        supplierName: string
        supplierAddress: string
        status: number
        createdAt: string
        updatedAt: string
        account: AccountData
      }[]
    >
  > {
    return axiosClient.get(`/group/employees-not-in-group/${benefitId}`, { params })
  },

  addMember(payload: AddProjectMemberPayload) {
    return axiosClient.post(`/group/members`, payload)
  },

  removeMember(payload: AddProjectMemberPayload) {
    return axiosClient.delete(`/group/members/remove`, { data: payload })
  },

  transferMoney(id: string) {
    return axiosClient.post(`/group/${id}/employees`)
  },

  getByAccountId(id: string): Promise<BaseResponse<ProjectData[]>> {
    return axiosClient.get(`/group/get-by-employee/${id}`)
  },
}
