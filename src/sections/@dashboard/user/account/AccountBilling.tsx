import { useState } from 'react'
// @mui
import { Box, Grid, Card, Button, Typography, Stack } from '@mui/material'
// @types
import { CreditCard, UserAddressBook, UserInvoice } from '../../../../@types/user'
//
import AccountBillingAddressBook from './AccountBillingAddressBook'
import AccountBillingPaymentMethod from './AccountBillingPaymentMethod'
import AccountBillingInvoiceHistory from './AccountBillingInvoiceHistory'
import { useMe } from 'src/hooks/@ces'
import { AccountData } from 'src/@types/@ces'

// ----------------------------------------------------------------------

type Props = {
  cards: CreditCard[]
  invoices: UserInvoice[]
  addressBook: UserAddressBook[]
  data?: AccountData
}

export default function AccountBilling({ cards, addressBook, invoices }: Props) {
  const [open, setOpen] = useState(false)
  const { data } = useMe({})

  return (
    <Grid container spacing={5}>
      <Grid item xs={12} md={8}>
        <Stack spacing={3}>
          <Card sx={{ p: 3 }}>
            <Typography
              variant="overline"
              sx={{ mb: 3, display: 'block', color: 'text.secondary' }}
            >
              Payment Plan{' '}
            </Typography>
            <Typography variant="h4">Company Wallet</Typography>
            <Box
              sx={{
                mt: { xs: 2, sm: 0 },
                position: { sm: 'absolute' },
                top: { sm: 24 },
                right: { sm: 24 },
              }}
            >
              <Button size="small" color="inherit" variant="outlined" sx={{ mr: 1 }}>
                View Order
              </Button>
              <Button size="small" variant="outlined">
                Pay Used
              </Button>
            </Box>
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
      </Grid>

      <Grid item xs={12} md={4}>
        <AccountBillingInvoiceHistory invoices={invoices} />
      </Grid>
    </Grid>
  )
}
