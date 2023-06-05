import { AccountPayload } from 'src/@types/@ces/account'
import { accountApi } from 'src/api-client'
import useSWR from 'swr'
import { PublicConfiguration } from 'swr/_internal'

export function useAccount(id?: string, options?: Partial<PublicConfiguration>) {
  const { data, error, mutate } = useSWR(id ? `/account/${id}` : '/account', {
    ...options,
  })

  async function create(payload: AccountPayload) {
    await accountApi.create(payload)
  }
  async function update(id: string, payload: AccountPayload) {
    await accountApi.update(id, payload)
  }

  return {
    data,
    error,
    mutate,
    create,
    update,
  }
}
