import { Params } from "src/@types/@ces"
import { reportApi } from "src/api-client"
import useSWR, { SWRConfiguration } from "swr"

type UseAccountProps = {
  params?: Partial<Params>
  options?: SWRConfiguration
  id?: string
  disabled?: boolean
}

export function useReportSA({ options, params, disabled = false }: UseAccountProps) {
  const { data, error, mutate, isValidating, isLoading } = useSWR(
    disabled ? null : ['report-list', params],
    () => reportApi.getAllSA(params!),
    {
      // dedupingInterval: 10 * 1000, // 10s
      revalidateOnFocus: true,
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
    isValidating,
    isLoading,

  }
}

export function useReportEA({ options, params, disabled = false }: UseAccountProps) {
  const { data, error, mutate, isValidating, isLoading } = useSWR(
    disabled ? null : ['report-list', params],
    () => reportApi.getAllEA(params!),
    {
      // dedupingInterval: 10 * 1000, // 10s
      revalidateOnFocus: true,
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
    isValidating,
    isLoading,

  }
}
