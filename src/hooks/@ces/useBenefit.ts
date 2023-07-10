import { Params } from 'src/@types/@ces'
import { benefitApi } from 'src/api-client'
import useSWR, { SWRConfiguration } from 'swr'

type UseBenefitProps = {
  params?: Partial<Params>
  options?: SWRConfiguration
  id?: string
}

export function useBenefitList({ options, params = { Page: '1' } }: UseBenefitProps) {
  const { data, error, mutate } = useSWR(
    ['benefit-list', params],
    () => benefitApi.getAll(params!),
    {
      dedupingInterval: 60 * 1000 * 60,
      // dedupingInterval: 10 * 1000, // 10s
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
  }
}

export function useBenefitDetails({ id, options }: UseBenefitProps) {
  const { data, error, mutate } = useSWR(['benefit', id], () => benefitApi.getById(id!), {
    // keepPreviousData: true,
    // fallbackData: {
    //   code: 0,
    //   message: '',
    //   metaData: null,
    //   data: {},
    // },
    ...options,
  })

  return {
    data,
    error,
    mutate,
  }
}
