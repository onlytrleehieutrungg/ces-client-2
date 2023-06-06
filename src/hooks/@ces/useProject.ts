import { ProjectPayload } from 'src/@types/@ces'
import { projectApi } from 'src/api-client/project'
import useSWR from 'swr'
import { PublicConfiguration } from 'swr/_internal'

export function useProject(id?: string, options?: Partial<PublicConfiguration>) {
  const { data, error, mutate } = useSWR(id ? `/project/${id}` : '/project', {
    ...options,
  })

  async function create(payload: ProjectPayload) {
    await projectApi.create(payload)
  }
  async function update(id: string, payload: ProjectPayload) {
    await projectApi.update(id, payload)
  }
  async function remove(id: string) {
    await projectApi.delete(id)
  }

  return {
    data,
    error,
    mutate,
    create,
    update,
    remove,
  }
}
