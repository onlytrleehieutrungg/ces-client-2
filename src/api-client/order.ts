import { BaseResponse, Params } from 'src/@types/@ces'
import { Order } from 'src/@types/@ces/order'
import axiosClient from './axiosClient'

export const orderApi = {
  getAll(params: Partial<Params>): Promise<BaseResponse<Order[]>> {
    return axiosClient.get('/order', { params })
  },
  getById(id: string) {
    return axiosClient.get(`/order/${id}`)
  },
  create: async (payload: Order) => await axiosClient.post('/order', payload),
  delete: async (id: string) => await axiosClient.delete(`/order/${id}`),
  update: async (id: string, payload: Order) => await axiosClient.put(`/order/${id}`, payload),
}
