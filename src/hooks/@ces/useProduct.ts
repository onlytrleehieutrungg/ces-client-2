import { Params } from 'src/@types/@ces'
import { productApi } from 'src/api-client/product'
import useSWR, { SWRConfiguration } from 'swr'

type UseProductProps = {
  params?: Partial<Params>
  options?: SWRConfiguration
  id?: string
}
export function useProduct({ params, options }: UseProductProps) {
  const { data, error, mutate, isLoading, isValidating } = useSWR(
    ['/product', params],
    () => productApi.getAll(params!),
    {
      refreshInterval: 0,
      revalidateOnFocus: false,
      dedupingInterval: 10 * 1000, // 10s
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
    isValidating,
    mutate,
    isLoading,
  }
}

export function useProductDetail({ id, options }: UseProductProps) {
  const { data, error, mutate, isLoading } = useSWR(
    ['product-detail', id],
    () => productApi.getById(id!),
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
    isLoading,
  }
}
