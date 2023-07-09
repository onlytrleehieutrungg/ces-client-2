import { Params } from 'src/@types/@ces'
import { companyApi } from 'src/api-client'
import useSWR, { SWRConfiguration } from 'swr'

type UseCompanyProps = {
  params?: Partial<Params>
  options?: SWRConfiguration
  id?: string
}

export function useCompanyList({ options, params = { Page: '1' } }: UseCompanyProps) {
  const { data, error, mutate } = useSWR(
    ['company-list', params],
    () => companyApi.getAll(params!),
    {
      revalidateOnFocus: false,
      dedupingInterval: 60 * 60 * 1000, // 3600s = 1h
      // keepPreviousData: true,
      // fallbackData: {
      //   code: 0,
      //   message: '',
      //   metaData: null,
      //   data: [],
      // },
      ...options,
    }
  )

  return {
    data,
    error,
    mutate,
    // create,
    // update,
  }
}
