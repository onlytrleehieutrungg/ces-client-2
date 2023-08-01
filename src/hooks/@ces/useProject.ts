import { Params } from 'src/@types/@ces'
import { projectApi } from 'src/api-client/project'
import useSWR, { SWRConfiguration } from 'swr'

type UseProjectProps = {
  params?: Partial<Params>
  options?: SWRConfiguration
  id?: string
}

export function useProjectList({ params, options }: UseProjectProps) {
  const { data, error, mutate, isValidating, isLoading } = useSWR(
    ['project-list', params],
    () => projectApi.getAll(params!),
    {
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
    }
  )

  // async function create(payload: ProjectPayload) {
  //   await projectApi.create(payload)
  // }
  // async function update(id: string, payload: ProjectPayload) {
  //   await projectApi.update(id, payload)
  // }
  // async function remove(id: string) {
  //   await projectApi.delete(id)
  // }
  // async function addMember(payload: AddProjectMemberPayload) {
  //   await projectApi.addMember(payload)
  // }

  return {
    data,
    error,
    mutate,
    isValidating,
    isLoading,
    // create,
    // update,
    // remove,
    // addMember,
  }
}

export function useProjectDetails({ id, options }: UseProjectProps) {
  const { data, error, mutate } = useSWR(['project', id], () => projectApi.getById(id!), {
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
