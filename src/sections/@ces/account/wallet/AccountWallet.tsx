import { MouseEvent, useEffect, useState } from 'react'
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
  DialogTitle,
  Grid,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material'
import { useSnackbar } from 'notistack'
import { useForm } from 'react-hook-form'
import { WalletData } from 'src/@types/@ces'
import { UserInvoice } from 'src/@types/user'
import { walletApi } from 'src/api-client'
import Image from 'src/components/Image'
import { FormProvider, RHFTextField } from 'src/components/hook-form'
import { AccountBillingInvoiceHistory } from 'src/sections/@dashboard/user/account'
import { confirmDialog } from 'src/utils/confirmDialog'
import { fCurrency } from 'src/utils/formatNumber'

// ----------------------------------------------------------------------

type Props = {
  mutate?: any
  invoices: UserInvoice[]
  wallet?: WalletData
}

export default function AccountWallet({ invoices, wallet, mutate }: Props) {
  const { enqueueSnackbar } = useSnackbar()

  const [openWallet, setOpenWallet] = useState(false)
  const [currentWallet, setCurrentWallet] = useState<WalletData>()
  const [loading, setLoading] = useState(false)
  const [alignment, setAlignment] = useState(0)

  const handleChange = (event: MouseEvent<HTMLElement>, newAlignment: number) => {
    if (newAlignment) {
      setValue('balance', newAlignment)

      setAlignment(newAlignment)
    }
  }

  const handleClickOpen = (wallet: WalletData) => {
    setCurrentWallet(wallet)
    setOpenWallet(true)
  }

  const handleClose = () => {
    setOpenWallet(false)
  }

  const NewUserSchema = Yup.object().shape({
    balance: Yup.number().required('balance is required'),
  })

  // const defaultValues = useMemo(
  //   () => ({
  //     balance: alignment || 0,
  //   }),
  //   [alignment]
  // )
  const defaultValues = {
    balance: alignment || 0,
  }

  const methods = useForm<any>({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  })

  const {
    setValue,
    reset,
    handleSubmit,
    // formState: { isSubmitting },
  } = methods

  useEffect(() => {
    if (currentWallet) {
      reset(defaultValues)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentWallet])

  const onSubmit = async (payload: any) => {
    confirmDialog('', async () => {
      try {
        setLoading(true)
        await walletApi.updateBalance(currentWallet?.id || '', Math.abs(payload?.balance), {
          type: Math.sign(payload?.balance) === 1 ? 1 : 2,
        })
        await mutate()
        setAlignment(0)
        setLoading(false)
        handleClose()
        enqueueSnackbar(`Update wallet ${currentWallet?.name} success!`)
      } catch (error) {
        // enqueueSnackbar('Update failed!')
        console.error(error)
      }
    })
  }

  return (
    <Grid container spacing={5}>
      <Grid item xs={12} md={8}>
        <Stack spacing={3}>
          {wallet && (
            <Card key={wallet.id} sx={{ p: 3 }}>
              <Stack direction={'row'} alignItems={'center'} spacing={1} mb={3}>
                <Image alt="icon" src={'/assets/icons/ic_wallet.png'} sx={{ maxWidth: 36 }} />
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
          )}

          {/* <AccountBillingWallet
            wallets={wallets}
            isOpen={open}
            onOpen={() => setOpen(!open)}
            onCancel={() => setOpen(false)}
          /> */}
        </Stack>
      </Grid>

      <Dialog open={openWallet} onClose={handleClose} fullWidth>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>Add funds</DialogTitle>
          <DialogContent>
            <ToggleButtonGroup
              sx={{ my: 2 }}
              fullWidth
              color="primary"
              value={alignment}
              exclusive
              onChange={handleChange}
              aria-label="Money"
            >
              <ToggleButton value={100}>100</ToggleButton>
              <ToggleButton value={500}>500</ToggleButton>
              <ToggleButton value={1000}>1000</ToggleButton>
              <ToggleButton value={2000}>2000</ToggleButton>
              <ToggleButton value={5000}>5000</ToggleButton>
            </ToggleButtonGroup>

            <RHFTextField name="balance" label="Balance" type="number" />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="inherit">
              Cancel
            </Button>
            <LoadingButton type="submit" variant="contained" loading={loading}>
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
