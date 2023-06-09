import { Container } from '@mui/material'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'
import { ProjectPayload } from 'src/@types/@ces'
import { projectApi } from 'src/api-client'
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs'
import Page from 'src/components/Page'
import useSettings from 'src/hooks/useSettings'
import Layout from 'src/layouts'
import { PATH_CES } from 'src/routes/paths'
import ProjectNewEditForm from 'src/sections/@ces/project/ProjectNewEditForm'
// ----------------------------------------------------------------------

ProjectCreatePage.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>
}

// ----------------------------------------------------------------------

export default function ProjectCreatePage() {
  const { themeStretch } = useSettings()

  const { enqueueSnackbar } = useSnackbar()

  const { push } = useRouter()

  // const { create } = useProject()

  const handleCreateProjectSubmit = async (payload: ProjectPayload) => {
    try {
      await projectApi.create(payload)

      enqueueSnackbar('Create success!')
      push(PATH_CES.project.root)
    } catch (error) {
      enqueueSnackbar('Create failed!')
      console.error(error)
    }
  }

  return (
    <Page title="Project: Create a new project">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Create a new project"
          links={[
            { name: 'Dashboard', href: '' },
            { name: 'Project', href: '' },
            { name: 'New Project' },
          ]}
        />
        <ProjectNewEditForm onSubmit={handleCreateProjectSubmit} />
      </Container>
    </Page>
  )
}
