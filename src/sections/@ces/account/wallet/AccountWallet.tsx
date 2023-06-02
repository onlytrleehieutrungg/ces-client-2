import { useState } from 'react'
// @mui
import { Box, Button, Card, Grid, Stack, Typography } from '@mui/material'
import { UserInvoice } from 'src/@types/user'
import { AccountBillingInvoiceHistory } from 'src/sections/@dashboard/user/account'
import AccountBillingWallet from './AccountBillingWallet'
import { AccountWalletData } from 'src/@types/@ces/account'
import Image from 'src/components/Image'
import { fCurrency } from 'src/utils/formatNumber'
// @types
//

// ----------------------------------------------------------------------

type Props = {
  invoices: UserInvoice[]
  wallets: AccountWalletData[]
}

export default function AccountWallet({ invoices, wallets }: Props) {
  const [open, setOpen] = useState(false)

  return (
    <Grid container spacing={5}>
      <Grid item xs={12} md={8}>
        <Stack spacing={3}>
          {wallets.map((wallet) => (
            <Card key={wallet.id} sx={{ p: 3 }}>
              <Stack direction={'row'} alignItems={'center'} spacing={1} mb={3}>
                <Image
                  alt="icon"
                  src={
                    wallet.type === 1
                      ? '/assets/icons/ic_food_wallet.png'
                      : wallet.type === 2
                      ? '/assets/icons/ic_stationery_wallet.png'
                      : '/assets/icons/ic_wallet.png'
                  }
                  sx={{ maxWidth: 36 }}
                />
                <Typography
                  variant="overline"
                  sx={{ mb: 3, display: 'block', color: 'text.secondary' }}
                >
                  {wallet.name}
                </Typography>
              </Stack>
              <Typography variant="h5">{fCurrency(wallet.balance)}</Typography>
              <Box
                sx={{
                  mt: { xs: 2, sm: 0 },
                  position: { sm: 'absolute' },
                  top: { sm: 24 },
                  right: { sm: 24 },
                }}
              >
                <Button size="small" variant="outlined">
                  Add fund
                </Button>
              </Box>
            </Card>
          ))}

          <AccountBillingWallet
            wallets={wallets}
            isOpen={open}
            onOpen={() => setOpen(!open)}
            onCancel={() => setOpen(false)}
          />
        </Stack>
      </Grid>

      <Grid item xs={12} md={4}>
        <AccountBillingInvoiceHistory invoices={invoices} />
      </Grid>
    </Grid>
  )
}
