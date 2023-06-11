import { BaseResponse, Params } from 'src/@types/@ces'
import { Product } from 'src/@types/@ces/product'
import axiosClient from './axiosClient'

export const productApi = {
  getAll(params: Partial<Params>): Promise<BaseResponse<Product[]>> {
    return axiosClient.get('/product', { params })
  },
  getById(id: string) {
    return axiosClient.get(`/product/${id}`)
  },
  create: async (payload: Product) => await axiosClient.post('/product', payload),
  delete: async (id: string) => await axiosClient.delete(`/product/${id}`),
  update: async (id: string, payload: Product) => await axiosClient.put(`/product/${id}`, payload),
}
