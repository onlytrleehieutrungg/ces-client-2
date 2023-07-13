// ----------------------------------------------------------------------

import { Container } from '@mui/material'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'
import { Role } from 'src/@types/@ces'
import { ProductPayload } from 'src/@types/@ces/product'
import { productApi } from 'src/api-client/product'
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs'
import LoadingScreen from 'src/components/LoadingScreen'
import Page from 'src/components/Page'
import RoleBasedGuard from 'src/guards/RoleBasedGuard'
import { useProductDetail } from 'src/hooks/@ces/useProduct'
import Layout from 'src/layouts'
import { PATH_CES } from 'src/routes/paths'
import ProductNewEditForm from 'src/sections/@ces/product/ProductNewEditForm'

ProductEditPage.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>
}

// ----------------------------------------------------------------------

export default function ProductEditPage() {
  const { query, push } = useRouter()
  const { enqueueSnackbar } = useSnackbar()
  const { productId } = query
  const { data, isLoading, mutate } = useProductDetail({ id: `${productId}` })
  if (isLoading) {
    return <LoadingScreen />
  }
  const handleEditProductSubmit = async (payload: ProductPayload) => {
    try {
      await productApi.update(`${productId}`, payload)
      enqueueSnackbar('Update success!')
      push(PATH_CES.product.root)
      mutate();
    } catch (error) {
      enqueueSnackbar('Update failed!', { variant: 'error' })
    }
  }
  return (
    <RoleBasedGuard hasContent roles={[Role['Supplier Admin']]}>
      <Page title="Product: Edit Product">
        <Container>
          <HeaderBreadcrumbs
            heading="Edit Product"
            links={[
              { name: 'Dashboard', href: '' },
              { name: 'Product', href: '' },
              { name: data?.data?.name },
            ]}
          />
          {data && (
            <ProductNewEditForm
              isEdit
              currentUser={data?.data}
              onSubmit={handleEditProductSubmit}
            />
          )}
        </Container>
      </Page>
    </RoleBasedGuard>
  )
}
