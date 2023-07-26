// @mui
import { Card, Grid, Stack, useTheme } from '@mui/material'
import { useState } from 'react'
import { AccountData, PaymentPayload } from 'src/@types/@ces'
import { useMe } from 'src/hooks/@ces'
import { useOrderByCompanyId, usePayment } from 'src/hooks/@ces/usePayment'
// @types
import { CreditCard, UserAddressBook, UserInvoice } from '../../../../@types/user'
import AccountBillingInvoiceHistory from './AccountBillingInvoiceHistory'
import AccountOrderHistory from './AccountOrderHistory'
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
  const [open, setOpen] = useState(false)
  const { data } = useMe({})
  const { data: payments } = usePayment({})
  const usedPayload = data?.wallets.map((u) => u?.used)[0]
  const balance = data?.wallets.map((u) => u?.balance)[0]
  const limit = data?.wallets.map((u) => u?.limits)[0]
  const accountId = data?.id
  const compId = data?.companyId
  const { data: orders } = useOrderByCompanyId({ companyId: compId })
  payload = {
    used: usedPayload,
    accountId: accountId!,
    paymentid: '05C93858-F520-4391-B72B-D48BC5F2990B',
  }
  const theme = useTheme()

  return (
    <Grid container spacing={5}>
      <Grid item xs={12} md={8}>
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
          {/* <AccountBillingPaymentMethod
            cards={cards}
            isOpen={open}
            data={data}
            onOpen={() => setOpen(!open)}
            onCancel={() => setOpen(false)}
            handlePayment={handlePayment}
          /> */}
        </Stack>

        <Card sx={{ mt: 5 }}>
          <AccountOrderHistory order={orders?.data} />
        </Card>
      </Grid>
      <Grid item xs={12} md={4}>
        <AccountBillingInvoiceHistory Transactions={payments?.data} />
      </Grid>
    </Grid>
  )
}
