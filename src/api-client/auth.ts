import { AccountData } from 'src/@types/@ces'
import axiosClient from './axiosClient'

export const authApi = {
  getMe(): Promise<AccountData> {
    return axiosClient.get(`/login/me`)
  },
}
