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
      keepPreviousData: true,
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

export function useProjectDetails({ id, options }: UseProjectProps) {
  const { data, error, mutate } = useSWR(['project', id], () => projectApi.getById(id!), {
    keepPreviousData: true,
    ...options,
  })

  return {
    data,
    error,
    mutate,
  }
}

export function useProjectByAccountId({ id, options }: UseProjectProps) {
  const { data, error, mutate } = useSWR(
    ['project-accountId', id],
    () => projectApi.getByAccountId(id!),
    {
      keepPreviousData: true,
      ...options,
    }
  )

  return {
    data,
    error,
    mutate,
  }
}

export function useProjectListMemberInGroup({ id, options, params }: UseProjectProps) {
  const { data, isLoading, error, mutate } = useSWR(
    ['list-member-in-group', { id, params }],
    () => projectApi.getAllMemberInGroup(id!, params!),
    {
      keepPreviousData: true,
      ...options,
    }
  )

  return {
    data,
    isLoading,
    error,
    mutate,
  }
}

export function useProjectListMemberNotInGroup({ id, options, params }: UseProjectProps) {
  const { data, isLoading, error, mutate } = useSWR(
    ['list-member-not-in-group', { id, params }],
    () => projectApi.getAllMemberNotInGroup(id!, params!),
    {
      keepPreviousData: true,
      ...options,
    }
  )

  return {
    data,
    isLoading,
    error,
    mutate,
  }
}
