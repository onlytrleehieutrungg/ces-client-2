import { Container } from '@mui/material'
import { Role } from 'src/@types/@ces'
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs'
import Page from 'src/components/Page'
import RoleBasedGuard from 'src/guards/RoleBasedGuard'
import Layout from 'src/layouts'
import UserNewEditForm from 'src/sections/@dashboard/user/UserNewEditForm'
// ----------------------------------------------------------------------

AccountCreatePage.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>
}

// ----------------------------------------------------------------------

export default function AccountCreatePage() {
  return (
    <RoleBasedGuard hasContent roles={[Role['Supplier Admin']]}>
      <Page title="User: Create a new user">
        <Container>
          <HeaderBreadcrumbs
            heading="Create a new user"
            links={[
              { name: 'Dashboard', href: '' },
              { name: 'User', href: '' },
              { name: 'New user' },
            ]}
          />
          <UserNewEditForm />
        </Container>
      </Page>
    </RoleBasedGuard>
  )
}
