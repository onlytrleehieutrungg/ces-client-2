import { useState } from 'react'
// @mui
import { Box, Grid, Card, Button, Typography, Stack } from '@mui/material'
// @types
import { CreditCard, UserAddressBook, UserInvoice } from '../../../../@types/user'
//
import AccountBillingPaymentMethod from './AccountBillingPaymentMethod'
import AccountBillingInvoiceHistory from './AccountBillingInvoiceHistory'
import { useMe } from 'src/hooks/@ces'
import { AccountData, PaymentPayload } from 'src/@types/@ces'
import { paymentApi } from 'src/api-client/payment'
import AccountOrderHistory from './AccountOrderHistory'
import { useOrderByCompanyId, usePayment } from 'src/hooks/@ces/usePayment'

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
  const accountId = data?.id
  const compId = data?.companyId
  const { data: orders } = useOrderByCompanyId({ companyId: compId })
  async function handlePayment() {
    payload = {
      used: usedPayload,
      accountId: accountId!,
      paymentid: '05C93858-F520-4391-B72B-D48BC5F2990B',
    }
    try {
      await paymentApi.pay(payload).then((res) => {
        console.log('log res.data', res.data)
        window.location.href = `${res.data?.url}`
      })
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Grid container spacing={5}>
      <Grid item xs={12} md={8}>
        <Stack spacing={3}>
          <Card sx={{ p: 3 }}>
            <Typography
              variant="overline"
              sx={{ mb: 3, display: 'block', color: 'text.secondary' }}
            >
              Payment Action
            </Typography>
            <Box
              sx={{
                mt: { xs: 2, sm: 0 },
                position: { sm: 'absolute' },
                top: { sm: 24 },
                right: { sm: 24 },
              }}
            >
              <Button onClick={handlePayment} variant="contained">
                Monthly Payment
              </Button>
            </Box>
            <Typography variant="h4">Company Wallet</Typography>
          </Card>
          <AccountBillingPaymentMethod
            cards={cards}
            isOpen={open}
            data={data}
            onOpen={() => setOpen(!open)}
            onCancel={() => setOpen(false)}
          />

          {/* <AccountBillingAddressBook addressBook={addressBook} /> */}
        </Stack>

        <Card sx={{ p: 3 }}>
          <AccountOrderHistory order={orders?.data} />
          {/* <Box
            sx={{
              mt: { xs: 2, sm: 0 },
              position: { sm: 'absolute' },
              top: { sm: 24 },
              right: { sm: 24 },
            }}
          >
            <Button color="inherit" variant="outlined">
              View report
            </Button>
          </Box> */}
        </Card>
      </Grid>
      <Grid item xs={12} md={4}>
        <AccountBillingInvoiceHistory Transactions={payments?.data} />
      </Grid>
    </Grid>
  )
}
