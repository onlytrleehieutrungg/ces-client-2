import { Product } from 'src/@types/product'
import axiosClient from './axiosClient'

export const productApi = {
  getAll: async () => {
    const res = await axiosClient.get<Product[]>('/product')
    return res.data
  },
  getById(id: string) {
    return axiosClient.get(`/product/${id}`)
  },
  create(payload: Product) {
    return axiosClient.post('/product', payload)
  },
  delete(id: string) {
    return axiosClient.delete(`/product/${id}`)
  },
  update(id: string, payload: Product) {
    return axiosClient.put(`/account/${id}`, payload)
  },
}
