import { BaseResponse, Category, Params } from 'src/@types/@ces'
import axiosClient from './axiosClient'

export const categoryApi = {
  getAll(params: Partial<Params>): Promise<BaseResponse<Category[]>> {
    return axiosClient.get('/category', { params })
  },
  getById(id: string) {
    return axiosClient.get(`/category/${id}`)
  },
  create: async (payload: Category) => await axiosClient.post('/category', payload),
  delete: async (id: number) => await axiosClient.delete(`/category/${id}`),
  update: async (id: string, payload: Category) =>
    await axiosClient.put(`/category/${id}`, payload),
}
