import { Params } from 'src/@types/@ces'
import { categoryApi } from 'src/api-client/category'
import useSWR, { SWRConfiguration } from 'swr'

type UseCategoryProps = {
  params?: Partial<Params>
  options?: SWRConfiguration
  id?: string
}

export function useCategoryList({ options, params = { Page: '1' } }: UseCategoryProps) {
  const { data, error, mutate, isLoading } = useSWR(
    ['category-list', params],
    () => categoryApi.getAll(params!),
    {
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

export function useCategoryDetails({ id, options }: UseCategoryProps) {
  const { data, error, mutate,isLoading } = useSWR(['categoryId', id], () => categoryApi.getById(id!), {
    keepPreviousData: true,
    fallbackData: {
      code: 0,
      message: '',
      metaData: null,
      data: {},
    },
    ...options,
  })

  return {
    data,
    error,
    isLoading,
    mutate,
  }
}
