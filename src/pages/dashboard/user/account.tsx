import { capitalCase } from 'change-case'
// @mui
import { Box, Container, Tab, Tabs } from '@mui/material'
// routes
import { PATH_DASHBOARD } from '../../../routes/paths'
// hooks
import useSettings from '../../../hooks/useSettings'
import useTabs from '../../../hooks/useTabs'
// _mock_
import { _userAbout, _userAddressBook, _userInvoices, _userPayment } from '../../../_mock'
// layouts
import Layout from '../../../layouts'
// components
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs'
import Iconify from '../../../components/Iconify'
import Page from '../../../components/Page'
// sections
import { useSnackbar } from 'notistack'
import { ChangePasswordPayload } from 'src/@types/@ces'
import { accountApi } from 'src/api-client'
import AccountChangePasswordForm from 'src/sections/@ces/account/AccountChangePasswordForm'
import {
  AccountBilling,
  AccountGeneral,
  AccountNotifications,
  AccountSocialLinks,
} from '../../../sections/@dashboard/user/account'

// ----------------------------------------------------------------------

UserAccount.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>
}

// ----------------------------------------------------------------------

export default function UserAccount() {
  const { themeStretch } = useSettings()
  const { enqueueSnackbar } = useSnackbar()

  const { currentTab, onChangeTab } = useTabs('general')

  const handleChangePasswordSubmit = async (payload: ChangePasswordPayload) => {
    try {
      await accountApi.updatePassword(payload)
      // push(PATH_CES.account.detail(`${accountId}`))
      enqueueSnackbar('Update success!')
    } catch (error) {
      enqueueSnackbar('Update failed!')
      console.error(error)
    }
  }

  const ACCOUNT_TABS = [
    {
      value: 'general',
      icon: <Iconify icon={'ic:round-account-box'} width={20} height={20} />,
      component: <AccountGeneral />,
    },
    {
      value: 'change password',
      icon: <Iconify icon={'ic:round-vpn-key'} width={20} height={20} />,
      component: <AccountChangePasswordForm onSubmit={handleChangePasswordSubmit} />,
    },
    {
      value: 'billing',
      icon: <Iconify icon={'ic:round-receipt'} width={20} height={20} />,
      component: (
        <AccountBilling
          cards={_userPayment}
          addressBook={_userAddressBook}
          invoices={_userInvoices}
        />
      ),
    },
    {
      value: 'notifications',
      icon: <Iconify icon={'eva:bell-fill'} width={20} height={20} />,
      component: <AccountNotifications />,
    },
    {
      value: 'social_links',
      icon: <Iconify icon={'eva:share-fill'} width={20} height={20} />,
      component: <AccountSocialLinks myProfile={_userAbout} />,
    },
    // {
    //   value: 'change_password',
    //   icon: <Iconify icon={'ic:round-vpn-key'} width={20} height={20} />,
    //   component: <AccountChangePassword />,
    // },
  ]

  return (
    <Page title="User: Account Settings">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Account"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'User', href: PATH_DASHBOARD.user.root },
            { name: 'Account Settings' },
          ]}
        />

        <Tabs
          allowScrollButtonsMobile
          variant="scrollable"
          scrollButtons="auto"
          value={currentTab}
          onChange={onChangeTab}
        >
          {ACCOUNT_TABS.map((tab) => (
            <Tab
              disableRipple
              key={tab.value}
              label={capitalCase(tab.value)}
              icon={tab.icon}
              value={tab.value}
            />
          ))}
        </Tabs>

        <Box sx={{ mb: 5 }} />

        {ACCOUNT_TABS.map((tab) => {
          const isMatched = tab.value === currentTab
          return isMatched && <Box key={tab.value}>{tab.component}</Box>
        })}
      </Container>
    </Page>
  )
}
