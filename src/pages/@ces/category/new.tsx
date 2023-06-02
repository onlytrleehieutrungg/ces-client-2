import { Container } from '@mui/material'
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs'
import Page from 'src/components/Page'
import Layout from 'src/layouts'
import AccountNewEditForm from 'src/sections/@ces/account/AccountNewEditForm'
import CategoryNewEditForm from 'src/sections/@ces/category/CategoryNewEditForm'
// ----------------------------------------------------------------------

AccountCreatePage.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>
}

// ----------------------------------------------------------------------

export default function AccountCreatePage() {
  return (
    <Page title="Category: Create a new Category">
      <Container>
        <HeaderBreadcrumbs
          heading="Create a new Category"
          links={[
            { name: 'Dashboard', href: '' },
            { name: 'Category', href: '' },
            { name: 'New Category' },
          ]}
        />
        <CategoryNewEditForm />
      </Container>
    </Page>
  )
}
