import {
  AddProjectMemberPayload,
  BaseResponse,
  Params,
  ProjectData,
  ProjectPayload,
} from 'src/@types/@ces'
import axiosClient from './axiosClient'

export const projectApi = {
  getAll(params: Partial<Params>): Promise<BaseResponse<ProjectData[]>> {
    return axiosClient.get(`/project`, { params })
  },

  getById(id: string): Promise<BaseResponse<ProjectData>> {
    return axiosClient.get(`/project/${id}`)
  },

  create(payload: ProjectPayload) {
    return axiosClient.post('/project', payload)
  },

  delete(id: string) {
    return axiosClient.delete(`/project/${id}`)
  },

  update(id: string, payload: ProjectPayload) {
    return axiosClient.put(`/project/${id}`, payload)
  },

  addMember(payload: AddProjectMemberPayload) {
    return axiosClient.post(`/project/members`, payload)
  },

  removeMember(payload: AddProjectMemberPayload) {
    return axiosClient.delete(`/project/members/remove`, { data: payload })
  },
}
