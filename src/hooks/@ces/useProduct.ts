import { Params } from 'src/@types/@ces'
import { productApi } from 'src/api-client/product'
import useSWR, { SWRConfiguration } from 'swr'

type UseProductProps = {
  params?: Partial<Params>
  options?: SWRConfiguration
  id?: string
  supplierId?: string
}
export function useProduct({ params, options }: UseProductProps) {
  const { data, error, mutate, isLoading, isValidating } = useSWR(
    ['/product', params],
    () => productApi.getAll(params!),
    {
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

export function useProductBySupplierId({ params, options, supplierId }: UseProductProps) {
  const { data, error, mutate, isLoading, isValidating } = useSWR(
    ['/product-supplierId', params],
    () => productApi.getBySupplierId(supplierId!, params!),
    {
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
