import { BaseResponse, Params } from 'src/@types/@ces'
import { ReportEAData, ReportSAData } from 'src/@types/@ces/report'
import axiosClient from './axiosClient'

export const reportApi = {
  getAllSA(params: Partial<Params>): Promise<BaseResponse<ReportSAData>> {
    return axiosClient.get(`report/sa`, { params })
  },

  getAllEA(params: Partial<Params>): Promise<BaseResponse<ReportEAData>> {
    return axiosClient.get(`report/ea`, { params })
  },
}
