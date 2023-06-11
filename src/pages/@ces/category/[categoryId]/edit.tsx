// ----------------------------------------------------------------------

import { Container } from '@mui/material'
import { capitalCase, paramCase } from 'change-case'
import { useRouter } from 'next/router'
import { _userList } from 'src/_mock'
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs'
import Page from 'src/components/Page'
import Layout from 'src/layouts'
import AccountNewEditForm from 'src/sections/@ces/account/AccountNewEditForm'
import CategoryNewEditForm from 'src/sections/@ces/category/CategoryNewEditForm'
import { useSnackbar } from 'notistack'
import { useCategoryDetails } from 'src/hooks/@ces/useCategory'
import { Category } from 'src/@types/@ces'
import { categoryApi } from 'src/api-client/category'
import { PATH_CES } from 'src/routes/paths'

CategoryEditPage.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>
}

// ----------------------------------------------------------------------

export default function CategoryEditPage() {
  const { query, push } = useRouter()
  const { enqueueSnackbar } = useSnackbar()
  const { categoryId } = query
  const { data } = useCategoryDetails({ id: `${categoryId}` })
  // const name = data?.data?.name.toString().toUpperCase()

  const handleEditCategorySubmit = async (payload: Category) => {
    try {
      await categoryApi.update(`${categoryId}`, payload)
      // await update(data?.data.id, payload)
      enqueueSnackbar('Update success!')
      push(PATH_CES.category.root)
    } catch (error) {
      enqueueSnackbar('Update failed!')
      console.error(error)
    }
  }

  return (
    <Page title="Category: Edit category">
      <Container>
        <HeaderBreadcrumbs
          heading="Edit category"
          links={[
            { name: 'Dashboard', href: '' },
            { name: 'Category', href: '' },
            { name: data?.data?.name },
          ]}
        />

        <CategoryNewEditForm isEdit currentUser={data?.data} onSubmit={handleEditCategorySubmit} />
      </Container>
    </Page>
  )
}
