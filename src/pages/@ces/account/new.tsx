import { Container } from '@mui/material'
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs'
import Page from 'src/components/Page'
import Layout from 'src/layouts'
import AccountNewEditForm from 'src/sections/@ces/account/AccountNewEditForm'
// ----------------------------------------------------------------------

AccountCreatePage.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>
}

// ----------------------------------------------------------------------

export default function AccountCreatePage() {
  return (
    <Page title="Account: Create a new Account">
      <Container>
        <HeaderBreadcrumbs
          heading="Create a new Account"
          links={[
            { name: 'Dashboard', href: '' },
            { name: 'Account', href: '' },
            { name: 'New Account' },
          ]}
        />
        <AccountNewEditForm />
      </Container>
    </Page>
  )
}
