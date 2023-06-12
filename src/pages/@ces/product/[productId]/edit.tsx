// ----------------------------------------------------------------------

import { Container } from '@mui/material'
import { useRouter } from 'next/router'
import { _userList } from 'src/_mock'
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs'
import Page from 'src/components/Page'
import Layout from 'src/layouts'
import ProductNewEditForm from 'src/sections/@ces/product/ProductNewEditForm'
import { useProductDetail } from 'src/hooks/@ces/useProduct'
import { PATH_CES } from 'src/routes/paths'
import { productApi } from 'src/api-client/product'
import { Product } from 'src/@types/@ces/product'
import { useSnackbar } from 'notistack'

ProductEditPage.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>
}

// ----------------------------------------------------------------------

export default function ProductEditPage() {
  const { query, push } = useRouter()
  const { enqueueSnackbar } = useSnackbar()
  const { productId } = query
  const { data } = useProductDetail({ id: `${productId}` })
  const handleEditProductSubmit = async (payload: Product) => {
    try {
      await productApi.update(`${productId}`, payload)
      // await update(data?.data.id, payload)
      enqueueSnackbar('Update success!')
      push(PATH_CES.product.root)
    } catch (error) {
      enqueueSnackbar('Update failed!')
      console.error(error)
    }
  }


  return (
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
          <ProductNewEditForm isEdit currentUser={data?.data} onSubmit={handleEditProductSubmit} />
        )}
      </Container>
    </Page>
  )
}
