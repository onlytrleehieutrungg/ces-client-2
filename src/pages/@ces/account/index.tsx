import NextLink from 'next/link'
import Page from 'src/components/Page'
import Layout from 'src/layouts'
// @mui
import { Button, Container } from '@mui/material'
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs'
import Iconify from 'src/components/Iconify'
import useSettings from 'src/hooks/useSettings'
import { PATH_CES } from 'src/routes/paths'
import AccountTable from 'src/sections/@ces/account/AccountTable'

// ----------------------------------------------------------------------

AccountPage.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>
}

// ----------------------------------------------------------------------

export default function AccountPage() {
  const { themeStretch } = useSettings()

  return (
    <Page title="Account: List">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Account List"
          links={[{ name: 'Dashboard', href: '' }, { name: 'Account', href: '' }, { name: 'List' }]}
          action={
            <NextLink href={PATH_CES.account.new} passHref>
              <Button variant="contained" startIcon={<Iconify icon={'eva:plus-fill'} />}>
                New Account
              </Button>
            </NextLink>
          }
        />

        <AccountTable />
      </Container>
    </Page >
  )
}

// ----------------------------------------------------------------------
