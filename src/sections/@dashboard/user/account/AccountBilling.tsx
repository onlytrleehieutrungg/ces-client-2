// @mui
import { Card, Grid, Stack, useTheme } from '@mui/material'
import { AccountData, PaymentPayload } from 'src/@types/@ces'
import { useMe } from 'src/hooks/@ces'
import { usePayment } from 'src/hooks/@ces/usePayment'
// @types
import { CreditCard, UserAddressBook, UserInvoice } from '../../../../@types/user'
import AccountBillingInvoiceHistory from './AccountBillingInvoiceHistory'
import BalanceAnalytic from './balanceAnalytic'
import UsedAnalytic from './usedAnalytic'

// ----------------------------------------------------------------------

type Props = {
  cards: CreditCard[]
  invoices: UserInvoice[]
  addressBook: UserAddressBook[]
  data?: AccountData
  payload?: PaymentPayload
}

export default function AccountBilling({ cards, addressBook, invoices, payload }: Props) {
  const { data } = useMe({})
  const usedPayload = data?.wallets.map((u) => u?.used)[0]
  const balance = data?.wallets.map((u) => u?.balance)[0]
  const limit = data?.wallets.map((u) => u?.limits)[0]
  const accountId = data?.id
  const compId = data?.companyId.toString()
  // const { data: orders, isLoading } = useOrderByCompanyId({ companyId: compId })
  const { data: payments, isLoading: isPaymentLoading } = usePayment({ companyId: compId })

  payload = {
    used: usedPayload,
    accountId: accountId!,
    paymentid: '05C93858-F520-4391-B72B-D48BC5F2990B',
  }
  const theme = useTheme()

  return (
    <Grid container spacing={5}>
      <Grid item xs={12} md={7}>
        <Stack spacing={2}>
          <Card sx={{ mb: 1 }}>
            <BalanceAnalytic
              title="Balance"
              balance={balance!}
              limit={limit!}
              icon="ic:round-receipt"
              color={theme.palette.success.main}
            />
          </Card>
          <Card sx={{ mb: 2 }}>
            <UsedAnalytic
              color={theme.palette.info.main}
              title="Used"
              used={usedPayload!}
              data={data}
              payLoad={payload}
            />
          </Card>
        </Stack>

        {/* <Card sx={{ mt: 5 }}>
          <AccountOrderHistory order={orders?.data} isLoading={isLoading} />
        </Card> */}
      </Grid>
      <Grid item xs={12} md={5}>
        <AccountBillingInvoiceHistory Transactions={payments?.data} isLoading={isPaymentLoading} />
      </Grid>
    </Grid>
  )
}
