// ----------------------------------------------------------------------

import { Container } from '@mui/material'
import { capitalCase } from 'change-case'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'
import { ProjectPayload } from 'src/@types/@ces'
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs'
import Page from 'src/components/Page'
import { useProject } from 'src/hooks/@ces'
import useSettings from 'src/hooks/useSettings'
import Layout from 'src/layouts'
import { PATH_CES } from 'src/routes/paths'
import ProjectNewEditForm from 'src/sections/@ces/project/ProjectNewEditForm'

ProjectEditPage.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>
}

// ----------------------------------------------------------------------

export default function ProjectEditPage() {
  const { themeStretch } = useSettings()

  const { enqueueSnackbar } = useSnackbar()

  const { query, push } = useRouter()
  const { projectId } = query

  const { data, update } = useProject(`${projectId}`)

  const handleEditProjectSubmit = async (payload: ProjectPayload) => {
    try {
      await update(data?.data.id, payload)

      enqueueSnackbar('Update success!')
      push(PATH_CES.project.root)
    } catch (error) {
      enqueueSnackbar('Update failed!')
      console.error(error)
    }
  }

  return (
    <Page title="Project: Edit project">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Edit project"
          links={[
            { name: 'Dashboard', href: '' },
            { name: 'Project', href: '' },
            { name: capitalCase(projectId as string) },
          ]}
        />

        <ProjectNewEditForm isEdit currentUser={data?.data} onSubmit={handleEditProjectSubmit} />
      </Container>
    </Page>
  )
}
