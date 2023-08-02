import { Params } from 'src/@types/@ces'
import { categoryApi } from 'src/api-client/category'
import useSWR, { SWRConfiguration } from 'swr'

type UseCategoryProps = {
  params?: Partial<Params>
  options?: SWRConfiguration
  id?: string
}

export function useCategoryList({ options, params }: UseCategoryProps) {
  const { data, error, mutate, isLoading, isValidating } = useSWR(
    ['category', params],
    () => categoryApi.getAll(params!),
    {
      ...options,
    }
  )

  return {
    data,
    error,
    isLoading,
    mutate,
    isValidating,
  }
}

export function useCategoryDetails({ id, options }: UseCategoryProps) {
  const { data, error, mutate, isLoading } = useSWR(
    ['categoryId', id],
    () => categoryApi.getById(id!),
    {
      refreshInterval: 0,
      revalidateOnFocus: false,
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
    isLoading,
    mutate,
  }
}
