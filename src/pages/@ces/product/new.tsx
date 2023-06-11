import { Container } from '@mui/material'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'
import { Product } from 'src/@types/@ces'
import { productApi } from 'src/api-client/product'
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs'
import Page from 'src/components/Page'
import Layout from 'src/layouts'
import { PATH_CES } from 'src/routes/paths'
import AccountNewEditForm from 'src/sections/@ces/account/AccountNewEditForm'
import ProductNewEditForm from 'src/sections/@ces/product/ProductNewEditForm'
// ----------------------------------------------------------------------

ProductCreatePage.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>
}

// ----------------------------------------------------------------------

export default function ProductCreatePage() {
  const { enqueueSnackbar } = useSnackbar()
  const { push } = useRouter()
  const handleCreateProductSubmit = async (payload: Product) => {
    try {
      await productApi.create(payload)
      // await create(payload)
      enqueueSnackbar('Create success!')
      push(PATH_CES.product.root)
    } catch (error) {
      enqueueSnackbar('Create failed!')
      console.error(error)
    }
  }

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
        <ProductNewEditForm onSubmit={handleCreateProductSubmit} />
      </Container>
    </Page>
  )
}
