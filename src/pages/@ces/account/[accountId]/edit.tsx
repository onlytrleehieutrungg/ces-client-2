import { Container } from '@mui/material'
import { capitalCase } from 'change-case'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'
import { AccountPayload } from 'src/@types/@ces'
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs'
import Page from 'src/components/Page'
import { useAccount } from 'src/hooks/@ces'
import useSettings from 'src/hooks/useSettings'
import Layout from 'src/layouts'
import { PATH_CES } from 'src/routes/paths'
import AccountNewEditForm from 'src/sections/@ces/account/AccountNewEditForm'

// ----------------------------------------------------------------------

AccountEditPage.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>
}

// ----------------------------------------------------------------------

export default function AccountEditPage() {
  const { themeStretch } = useSettings()

  const { enqueueSnackbar } = useSnackbar()

  const { query, push } = useRouter()
  const { accountId } = query

  const { data, update } = useAccount(`${accountId}`)

  const handleEditAccountSubmit = async (payload: AccountPayload) => {
    try {
      await update(data?.data.id, payload)

      enqueueSnackbar('Update success!')
      push(PATH_CES.account.root)
    } catch (error) {
      enqueueSnackbar('Update failed!')
      console.error(error)
    }
  }

  return (
    <Page title="Account: Edit account">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Edit account"
          links={[
            { name: 'Dashboard', href: '' },
            { name: 'Account', href: '' },
            { name: capitalCase(accountId as string) },
          ]}
        />

        {data && (
          <AccountNewEditForm isEdit currentUser={data?.data} onSubmit={handleEditAccountSubmit} />
        )}
      </Container>
    </Page>
  )
}
