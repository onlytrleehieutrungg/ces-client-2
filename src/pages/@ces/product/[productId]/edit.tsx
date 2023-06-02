// ----------------------------------------------------------------------

import { Container } from '@mui/material'
import { capitalCase, paramCase } from 'change-case'
import { useRouter } from 'next/router'
import { _userList } from 'src/_mock'
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs'
import Page from 'src/components/Page'
import Layout from 'src/layouts'
import AccountNewEditForm from 'src/sections/@ces/account/AccountNewEditForm'
import { Product } from '..'
import ProductNewEditForm from 'src/sections/@ces/product/ProductNewEditForm'

ProductEditPage.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>
}

// ----------------------------------------------------------------------

export default function ProductEditPage() {
  const { query } = useRouter()

  const { productId } = query
  const productData: Product[] = [
    {
      Id: '1',
      Price: 10.99,
      Quantity: 5,
      avatarUrl: "sadsad",
      Name: 'Product A',
      Status: 'Active',
      UpdatedAt: '2023-05-30',
      CreatedAt: '2023-05-29',
      Description: 'This is Product A',
      ServiceDuration: '1 year',
      Type: 'Type A',
      CategoryId: '1'
    },
    {
      Id: '2',
      Price: 19.99,
      Quantity: 10,
      avatarUrl: "avatarUrl",
      Name: 'Product B',
      Status: 'Inactive',
      UpdatedAt: '2023-05-28',
      CreatedAt: '2023-05-27',
      Description: 'This is Product B',
      ServiceDuration: '6 months',
      Type: 'Type B',
      CategoryId: '2'
    },
    // Add more product mock data as needed...
  ];
  const currentUser = productData.find((product) => paramCase(product.Name) === productId)
  console.log(currentUser);

  return (
    <Page title="Product: Edit Product">
      <Container>
        <HeaderBreadcrumbs
          heading="Edit Product"
          links={[
            { name: 'Dashboard', href: '' },
            { name: 'Product', href: '' },
            { name: capitalCase(productId as string) },
          ]}
        />
        <ProductNewEditForm isEdit currentUser={currentUser} />
      </Container>
    </Page>
  )
}
