import { Params, Role } from 'src/@types/@ces'
import { benefitApi } from 'src/api-client'
import useSWR, { SWRConfiguration } from 'swr'
import useAuth from '../useAuth'

type UseBenefitProps = {
  params?: Partial<Params>
  options?: SWRConfiguration
  id?: string
}

export function useBenefitList({ options, params = { Page: 1 } }: UseBenefitProps) {
  const { user } = useAuth()
  const { data, error, mutate } = useSWR(
    ['benefit-list', params],
    () => (user?.role === Role['Enterprise Admin'] ? benefitApi.getAll(params!) : null),
    {
      // dedupingInterval: 60 * 1000 * 60,
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
