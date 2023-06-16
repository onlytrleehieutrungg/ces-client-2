import { Params } from 'src/@types/@ces'
import { orderApi } from 'src/api-client/order'
import { productApi } from 'src/api-client/product'
import useSWR, { SWRConfiguration } from 'swr'

type UseOrderProps = {
  params?: Partial<Params>
  options?: SWRConfiguration
  id?: string
}
export function useOrder({ params = { Page: '1' }, options }: UseOrderProps) {
  const { data, error, mutate, isLoading } = useSWR(
    ['/order', params],
    () => orderApi.getAll(params!),
    {
      // revalidateOnFocus: false,
      // dedupingInterval: 10 * 1000, // 10s
      keepPreviousData: true,
      fallbackData: {
        code: 0,
        message: '',
        metaData: null,
        data: [],
      },
      ...options,
    }
  )

  return {
    data,
    error,
    mutate,
    isLoading,
  }
}

export function useOrderDetail({ id, options }: UseOrderProps) {
  const { data, error, mutate, isLoading } = useSWR(
    ['order-detail', id],
    () => orderApi.getById(id!),
    {
      keepPreviousData: true,
      fallbackData: {
        code: 0,
        message: '',
        metaData: null,
        data: {},
      },
      ...options,
    }
  )

  return {
    data,
    error,
    mutate,
    isLoading
  }
}
