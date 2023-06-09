// ----------------------------------------------------------------------

import { Container } from '@mui/material'
import { capitalCase, paramCase } from 'change-case'
import { useRouter } from 'next/router'
import { _userList } from 'src/_mock'
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs'
import Page from 'src/components/Page'
import Layout from 'src/layouts'
import AccountNewEditForm from 'src/sections/@ces/account/AccountNewEditForm'
import { Category } from '..'
import CategoryNewEditForm from 'src/sections/@ces/category/CategoryNewEditForm'

CategoryEditPage.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>
}

// ----------------------------------------------------------------------

export default function CategoryEditPage() {
  const { query } = useRouter()

  const categoryData: Category[] = [
    {
      Id: '1',
      Name: 'Category A',
      Description: 'This is Category A',
      UpdatedAt: '2023-05-30',
      CreatedAt: '2023-05-29',
      Status: 'Active'
    },
    {
      Id: '2',
      Name: 'Category B',
      Description: 'This is Category B',
      UpdatedAt: '2023-05-28',
      CreatedAt: '2023-05-27',
      Status: 'Inactive'
    },
    // Add more category mock data as needed...
  ];
  const { categoryId } = query

  const currentUser = categoryData.find((category) => paramCase(category.Id) === categoryId)

  return (
    <Page title="Category: Edit category">
      <Container>
        <HeaderBreadcrumbs
          heading="Edit category"
          links={[
            { name: 'Dashboard', href: '' },
            { name: 'Category', href: '' },
            { name: capitalCase(categoryId as string) },
          ]}
        />

        <CategoryNewEditForm isEdit currentUser={currentUser} />
      </Container>
    </Page>
  )
}
