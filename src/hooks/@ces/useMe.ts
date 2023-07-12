import { authApi } from 'src/api-client'
import useSWR, { SWRConfiguration } from 'swr'

type UseMeProps = {
  options?: SWRConfiguration
}

export function useMe({ options }: UseMeProps) {
  const { data, error } = useSWR(['me'], () => authApi.getMe(), {
    refreshInterval: 6 * 10 * 1000,
    // revalidateOnFocus: false,
    // dedupingInterval: 10 * 1000, // 10s
    // keepPreviousData: true,
    // fallbackData: {
    //   code: 0,
    //   message: '',
    //   metaData: null,
    //   data: [],
    // },
    ...options,
  })

  return {
    data,
    error,
  }
}
