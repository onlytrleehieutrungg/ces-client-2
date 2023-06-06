import { Product } from 'src/@types/product'
import { productApi } from 'src/api-client/product'
import useSWR from 'swr'
import { Fetcher, PublicConfiguration } from 'swr/_internal'

export function useProduct(options?: Partial<PublicConfiguration>) {
  const {
    data: products,
    error,
    mutate,
  } = useSWR('/product', {
    ...options,
  })
  // const fetcher: Fetcher<Product[]> = () => productApi.getAll()
  async function createProduct(payload: Product) {
    await productApi.create(payload)
  }
  async function updateProduct(id: string, payload: Product) {
    await productApi.update(id, payload)
  }

  return {
    products,
    error,
    mutate,
    createProduct,
    updateProduct,
  }
}
