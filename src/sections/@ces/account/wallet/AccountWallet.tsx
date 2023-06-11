import { useEffect, useMemo, useState } from 'react'
import * as Yup from 'yup'
// @mui
import { yupResolver } from '@hookform/resolvers/yup'
import { LoadingButton } from '@mui/lab'
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
  Typography,
} from '@mui/material'
import { useForm } from 'react-hook-form'
import { AccountWalletData } from 'src/@types/@ces/account'
import { UserInvoice } from 'src/@types/user'
import Image from 'src/components/Image'
import { FormProvider, RHFTextField } from 'src/components/hook-form'
import { AccountBillingInvoiceHistory } from 'src/sections/@dashboard/user/account'
import { fCurrency } from 'src/utils/formatNumber'
import { walletApi } from 'src/api-client'

// ----------------------------------------------------------------------

type Props = {
  mutate?: any
  invoices: UserInvoice[]
  wallets?: AccountWalletData[]
}

export default function AccountWallet({ invoices, wallets, mutate }: Props) {
  // const { enqueueSnackbar } = useSnackbar()

  const [openWallet, setOpenWallet] = useState(false)
  const [currentWallet, setCurrentWallet] = useState<AccountWalletData>()

  const handleClickOpen = (wallet: AccountWalletData) => {
    setCurrentWallet(wallet)
    setOpenWallet(true)
  }

  const handleClose = () => {
    setOpenWallet(false)
  }

  const NewUserSchema = Yup.object().shape({
    balance: Yup.number().required('balance is required'),
  })

  const defaultValues = useMemo(
    () => ({
      balance: currentWallet?.balance || 0,
    }),
    [currentWallet]
  )

  const methods = useForm<any>({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  })

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods

  useEffect(() => {
    if (currentWallet) {
      reset(defaultValues)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentWallet])

  const onSubmit = async (payload: any) => {
    try {
      await walletApi.updateBalance(currentWallet?.id || '', Math.abs(payload?.balance), {
        type: Math.sign(payload?.balance) === 1 ? 1 : 2,
      })
      mutate()
      // enqueueSnackbar(`Update wallet ${currentWallet?.name} success!`)
    } catch (error) {
      // enqueueSnackbar('Update failed!')
      console.error(error)
    }
  }

  return (
    <Grid container spacing={5}>
      <Grid item xs={12} md={8}>
        <Stack spacing={3}>
          {wallets?.map((wallet) => (
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
                <Button size="small" variant="outlined" onClick={() => handleClickOpen(wallet)}>
                  Add fund
                </Button>
              </Box>
            </Card>
          ))}

          {/* <AccountBillingWallet
            wallets={wallets}
            isOpen={open}
            onOpen={() => setOpen(!open)}
            onCancel={() => setOpen(false)}
          /> */}
        </Stack>
      </Grid>

      <Dialog open={openWallet} onClose={handleClose}>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>Add funds</DialogTitle>
          <DialogContent>
            <DialogContentText mt={1} mb={2}>
              Add funds to this wallet
            </DialogContentText>
            <RHFTextField name="balance" label="Balance" type="number" />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="inherit">
              Cancel
            </Button>
            <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
              Add
            </LoadingButton>
          </DialogActions>
        </FormProvider>
      </Dialog>

      <Grid item xs={12} md={4}>
        <AccountBillingInvoiceHistory invoices={invoices} />
      </Grid>
    </Grid>
  )
}
