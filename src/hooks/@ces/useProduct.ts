import { Params } from 'src/@types/@ces'
import { Product } from 'src/@types/@ces/product'
import { productApi } from 'src/api-client/product'
import useSWR, { SWRConfiguration } from 'swr'

type UseProductProps = {
  params?: Partial<Params>
  options?: SWRConfiguration
  id?: string
}
export function useProduct({ params = { Page: '1' }, options }: UseProductProps) {
  const { data, error, mutate } = useSWR(['/product', params], () => productApi.getAll(params!), {
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
  })
  // const fetcher: Fetcher<Product[]> = () => productApi.getAll()
  // async function createProduct(payload: Product) {
  //   await productApi.create(payload)
  // }
  // async function updateProduct(id: string, payload: Product) {
  //   await productApi.update(id, payload)
  // }

  return {
    data,
    error,
    mutate,
    // createProduct,
    // updateProduct,
  }
}

export function useProductDetail({ id, options }: UseProductProps) {
  const { data, error, mutate } = useSWR(['product-detail', id], () => productApi.getById(id!), {
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
    mutate,
  }
}
