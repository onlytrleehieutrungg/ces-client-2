import {
  AccountData,
  AccountPayload,
  BaseResponse,
  ChangePasswordPayload,
  Params,
} from 'src/@types/@ces'
import axiosClient from './axiosClient'

export const accountApi = {
  getAll(params: Partial<Params>): Promise<BaseResponse<AccountData[]>> {
    return axiosClient.get(`/account`, { params })
  },
  getAllByRoleId(roleId: string, params: Partial<Params>): Promise<BaseResponse<AccountData[]>> {
    return axiosClient.get(`/account?role=${roleId}`, { params })
  },
  getById(id: string): Promise<BaseResponse<AccountData>> {
    return axiosClient.get(`/account/${id}`)
  },
  create(payload: AccountPayload) {
    return axiosClient.post('/account', payload)
  },
  delete(id: string) {
    return axiosClient.delete(`/account/${id}`)
  },
  update(id: string, payload: AccountPayload) {
    return axiosClient.put(`/account/${id}`, payload)
  },
  updatePassword(payload: ChangePasswordPayload) {
    return axiosClient.put(`/account/password`, payload)
  },
}
