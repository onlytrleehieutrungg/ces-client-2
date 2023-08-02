// ----------------------------------------------------------------------

import { Container } from '@mui/material'
import { capitalCase } from 'change-case'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'
import { CompanyPayload, Role } from 'src/@types/@ces'
import { companyApi } from 'src/api-client'
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs'
import Page from 'src/components/Page'
import RoleBasedGuard from 'src/guards/RoleBasedGuard'
import { useCompanyDetails } from 'src/hooks/@ces'
import Layout from 'src/layouts'
import { PATH_CES } from 'src/routes/paths'
import CompanyNewEditForm from 'src/sections/@ces/company/CompanyNewEditForm'

ProductEditPage.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>
}

// ----------------------------------------------------------------------

export default function ProductEditPage() {
  const { query, push } = useRouter()
  const { enqueueSnackbar } = useSnackbar()
  const { companyId } = query

  const { data, mutate } = useCompanyDetails({ id: `${companyId}` })

  const handleEditCompanySubmit = async (payload: CompanyPayload) => {
    try {
      await companyApi.update(`${companyId}`, payload)
      // mutateList()
      mutate()
      enqueueSnackbar('Update success!')
      push(PATH_CES.company.root)
    } catch (error) {
      enqueueSnackbar('Update failed!', { variant: 'error' })
      console.error(error)
    }
  }
  return (
    <RoleBasedGuard hasContent roles={[Role['System Admin']]}>
      <Page title="Company: Edit Company">
        <Container>
          <HeaderBreadcrumbs
            heading="Edit Company"
            links={[
              { name: 'Dashboard', href: '' },
              { name: 'Company', href: '' },
              { name: capitalCase(companyId as string) },
            ]}
          />
          {!data ? (
            <>Loading...</>
          ) : (
            <CompanyNewEditForm
              isEdit
              currentUser={data?.data}
              onSubmit={handleEditCompanySubmit}
            />
          )}
        </Container>
      </Page>
    </RoleBasedGuard>
  )
}
