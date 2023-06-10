// ----------------------------------------------------------------------

import { Container } from '@mui/material'
import { capitalCase, paramCase } from 'change-case'
import { useRouter } from 'next/router'
import { _userList } from 'src/_mock'
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs'
import Page from 'src/components/Page'
import Layout from 'src/layouts'
import UserNewEditForm from 'src/sections/@dashboard/user/UserNewEditForm'

AccountEditPage.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>
}

// ----------------------------------------------------------------------

export default function AccountEditPage() {
  const { query } = useRouter()

  const { accountId } = query

  const currentUser = _userList.find((user) => paramCase(user.name) === accountId)

  return (
    <Page title="User: Edit user">
      <Container>
        <HeaderBreadcrumbs
          heading="Edit user"
          links={[
            { name: 'Dashboard', href: '' },
            { name: 'User', href: '' },
            { name: capitalCase(accountId as string) },
          ]}
        />

        <UserNewEditForm isEdit currentUser={currentUser} />
      </Container>
    </Page>
  )
}
