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
    axiosClient.get(
      `/transaction/wallet-transaction?page=1&size=10&paymentType=1&companyId=${companyId}&Sort=CreatedAt&Order=desc`
    ),
  satransaction: (params: Partial<Params>): Promise<BaseResponse<TransactionHistory[]>> =>
    axiosClient.get(
      `/transaction/wallet-transaction?page=1&size=10&paymentType=1&Sort=CreatedAt&Order=desc`
    ),
  orders: (companyId: string): Promise<AxiosResponse<MonthlyOrder>> =>
    axiosClient.get(`/payment/total-order/${companyId}`),
}
