import { Container } from '@mui/material'
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs'
import Page from 'src/components/Page'
import Layout from 'src/layouts'
import AccountNewEditForm from 'src/sections/@ces/account/AccountNewEditForm'
import ProductNewEditForm from 'src/sections/@ces/product/ProductNewEditForm'
// ----------------------------------------------------------------------

ProductCreatePage.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>
}

// ----------------------------------------------------------------------

export default function ProductCreatePage() {
  return (
    <Page title="Product: Create a new Product">
      <Container>
        <HeaderBreadcrumbs
          heading="Create a new Product"
          links={[
            { name: 'Dashboard', href: '' },
            { name: 'Product', href: '' },
            { name: 'New Product' },
          ]}
        />
        <ProductNewEditForm />
      </Container>
    </Page>
  )
}
