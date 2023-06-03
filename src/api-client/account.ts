import { AccountPayload } from 'src/@types/@ces/account'
import axiosClient from './axiosClient'

export const accountApi = {
  getAll() {},
  getById(id: string) {
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
}
