// ----------------------------------------------------------------------

import { Container } from '@mui/material'
import { capitalCase, paramCase } from 'change-case'
import { useRouter } from 'next/router'
import { _userList } from 'src/_mock'
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs'
import LoadingScreen from 'src/components/LoadingScreen'
import Page from 'src/components/Page'
import Layout from 'src/layouts'
import AccountNewEditForm from 'src/sections/@ces/account/AccountNewEditForm'
import useSWR from 'swr'

AccountEditPage.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>
}

// ----------------------------------------------------------------------

export default function AccountEditPage() {
  const { query } = useRouter()

  const { accountId } = query

  const { data } = useSWR(`/account/${accountId}`)

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

        {data && <AccountNewEditForm isEdit currentUser={data?.data} />}
      </Container>
    </Page>
  )
}
