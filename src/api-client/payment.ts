import { BaseResponse, Params, PaymentPayload, TransactionHistory } from 'src/@types/@ces'
import axiosClient from './axiosClient'

export const paymentApi = {
  pay: (payload: PaymentPayload) => axiosClient.post(`/payment`, payload),
  transaction: (params: Partial<Params>): Promise<BaseResponse<TransactionHistory[]>> =>
    axiosClient.get(`/transaction/wallet-transaction?Type=3&Status=1&Sort=CreatedAt&Order=desc`),
  orders: (companyId: number) => axiosClient.post(`/payment/total-order/${companyId}`),
  //
}
