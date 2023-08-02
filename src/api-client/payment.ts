import { AxiosResponse } from 'axios'
import {
  BaseResponse,
  MonthlyOrder,
  Params,
  PaymentPayload,
  TransactionHistory,
} from 'src/@types/@ces'
import axiosClient from './axiosClient'

export const paymentApi = {
  pay: (payload: PaymentPayload) => axiosClient.post(`/payment`, payload),
  eatransaction: (
    companyId: string,
    params: Partial<Params>
  ): Promise<BaseResponse<TransactionHistory[]>> =>
    axiosClient.get(`/transaction?companyId=${companyId}`, { params }),
  satransaction: (params: Partial<Params>): Promise<BaseResponse<TransactionHistory[]>> =>
    axiosClient.get(`/transaction`, { params }),
  orders: (companyId: string): Promise<AxiosResponse<MonthlyOrder>> =>
    axiosClient.get(`/payment/total-order/${companyId}`),
}
