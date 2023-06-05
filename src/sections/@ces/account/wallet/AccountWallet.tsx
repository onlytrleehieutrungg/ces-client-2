import { useState } from 'react'
// @mui
import {
  Box,
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { UserInvoice } from 'src/@types/user'
import { AccountBillingInvoiceHistory } from 'src/sections/@dashboard/user/account'
import AccountBillingWallet from './AccountBillingWallet'
import { AccountWalletData } from 'src/@types/@ces/account'
import Image from 'src/components/Image'
import { fCurrency } from 'src/utils/formatNumber'
import { useForm } from 'react-hook-form'
import { FormProvider, RHFTextField } from 'src/components/hook-form'
// @types
//

// ----------------------------------------------------------------------

type Props = {
  invoices: UserInvoice[]
  wallets: AccountWalletData[]
}

export default function AccountWallet({ invoices, wallets }: Props) {
  const [open, setOpen] = useState(false)

  const [openWallet, setOpenWallet] = useState(false)

  const handleClickOpen = () => {
    setOpenWallet(true)
  }

  const handleClose = () => {
    setOpenWallet(false)
  }

  const methods = useForm<any>({
    // resolver: yupResolver(NewUserSchema),
    // defaultValues: {
    // },
  })

  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods

  const values = watch()

  const onSubmit = async (payload: any) => {
    try {
      console.log(payload)
      // if (!isEdit) {
      //   await accountApi.create(payload)
      // } else {
      //   currentUser && (await accountApi.update(currentUser.id, payload))
      // }
      // enqueueSnackbar(!isEdit ? 'Create success!' : 'Update success!')
      // push(PATH_CES.account.root)
    } catch (error) {
      // enqueueSnackbar(!isEdit ? 'Create failed!' : 'Update failed!')
      console.error(error)
    }
  }

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
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
                  <Button size="small" variant="outlined" onClick={handleClickOpen}>
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

        <Dialog open={openWallet} onClose={handleClose}>
          <DialogTitle>Add funds</DialogTitle>
          <DialogContent>
            <DialogContentText>Add funds to this wallet</DialogContentText>
            {/* <TextField
              autoFocus
              fullWidth
              type="email"
              margin="dense"
              variant="outlined"
              label="Email Address"
            /> */}
            <RHFTextField name="balance" label="Balance" />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="inherit">
              Cancel
            </Button>
            <Button type="submit" variant="contained">
              Add
            </Button>
          </DialogActions>
        </Dialog>

        <Grid item xs={12} md={4}>
          <AccountBillingInvoiceHistory invoices={invoices} />
        </Grid>
      </Grid>
    </FormProvider>
  )
}
