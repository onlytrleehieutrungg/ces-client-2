import axiosClient from './axiosClient'

export const authApi = {
  getMe() {
    return axiosClient.get(`/login/me`)
  },
}
