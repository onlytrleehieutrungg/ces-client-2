import { Container } from '@mui/material'
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

AccountCreatePage.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>
}

// ----------------------------------------------------------------------

export default function AccountCreatePage() {
  const { themeStretch } = useSettings()

  const { enqueueSnackbar } = useSnackbar()

  const { push } = useRouter()

  const { create } = useAccount()

  const handleCreateAccountSubmit = async (payload: AccountPayload) => {
    try {
      await create(payload)

      enqueueSnackbar('Create success!')
      push(PATH_CES.account.root)
    } catch (error) {
      enqueueSnackbar('Create failed!')
      console.error(error)
    }
  }

  return (
    <Page title="Account: Create a new Account">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Create a new Account"
          links={[
            { name: 'Dashboard', href: PATH_CES.root },
            { name: 'Account', href: PATH_CES.account.root },
            { name: 'New Account' },
          ]}
        />
        <AccountNewEditForm onSubmit={handleCreateAccountSubmit} />
      </Container>
    </Page>
  )
}
