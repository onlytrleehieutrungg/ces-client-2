import { AccountPayload } from 'src/@types/@ces/account'
import { accountApi } from 'src/api-client'
import useSWR from 'swr'
import { PublicConfiguration } from 'swr/_internal'

export function useAccount(options?: Partial<PublicConfiguration>) {
  const {
    data: accounts,
    error,
    mutate,
  } = useSWR('/account', {
    ...options,
  })

  async function createAccount(payload: AccountPayload) {
    await accountApi.create(payload)
  }
  async function updateAccount(id: string, payload: AccountPayload) {
    await accountApi.update(id, payload)
  }

  return {
    accounts,
    error,
    mutate,
    createAccount,
    updateAccount,
  }
}
