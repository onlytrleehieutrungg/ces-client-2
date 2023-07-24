// @mui
import {
  Box,
  Card,
  Stack,
  Paper,
  Button,
  Collapse,
  TextField,
  Typography,
  IconButton,
} from '@mui/material'
import { LoadingButton } from '@mui/lab'
// @types
import { CreditCard } from '../../../../@types/user'
// components
import Image from '../../../../components/Image'
import Iconify from '../../../../components/Iconify'
import { AccountData } from 'src/@types/@ces'
import { fCurrency } from 'src/utils/formatNumber'

// ----------------------------------------------------------------------

type Props = {
  cards: CreditCard[]
  isOpen: boolean
  data?: AccountData
  onOpen: VoidFunction
  onCancel: VoidFunction
}

export default function AccountBillingPaymentMethod({
  cards,
  isOpen,
  data,
  onOpen,
  onCancel,
}: Props) {
  return (
    <Card sx={{}}>
      {' '}
      <Stack sx={{ px: 3, pt: 3 }}>
        <Typography variant="h6">Company Wallet</Typography>
      </Stack>
      <Stack spacing={2} sx={{ p: 3 }} direction={{ xs: 'column', md: 'row' }}>
        {data?.wallets?.map((x) => (
          <>
            <Paper
              key={x.id}
              sx={{
                p: 3,
                width: 1,
                position: 'relative',
                border: (theme) => `solid 4px ${theme.palette.grey[50032]}`,
              }}
            >
              Balance
              <Typography variant="subtitle1">{fCurrency(x.balance)} đ</Typography>
              <IconButton
                sx={{
                  top: 8,
                  right: 8,
                  position: 'absolute',
                }}
              >
                <Iconify icon={'eva:more-vertical-fill'} width={20} height={20} />
              </IconButton>
            </Paper>
            <Paper
              key={x.id}
              sx={{
                p: 3,
                width: 1,
                position: 'relative',
                border: (theme) => `solid 4px ${theme.palette.grey[50032]}`,
              }}
            >
              Used
              <Typography variant="subtitle1">{fCurrency(x.used)} đ</Typography>
              <IconButton
                sx={{
                  top: 8,
                  right: 8,
                  position: 'absolute',
                }}
              >
                <Iconify icon={'eva:more-vertical-fill'} width={20} height={20} />
              </IconButton>
            </Paper>
          </>
        ))}
      </Stack>
      {/* <Box sx={{ mt: 3 }}>
        <Button size="small" startIcon={<Iconify icon={'eva:plus-fill'} />} onClick={onOpen}>
          Add new card
        </Button>
      </Box> */}
      <Collapse in={isOpen}>
        <Box
          sx={{
            padding: 3,
            marginTop: 3,
            borderRadius: 1,
            bgcolor: 'background.neutral',
          }}
        >
          <Stack spacing={3}>
            <Typography variant="subtitle1">Add new card</Typography>

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <TextField fullWidth label="Name on card" />

              <TextField fullWidth label="Card number" />
            </Stack>

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <TextField fullWidth label="Expiration date" placeholder="MM/YY" />

              <TextField fullWidth label="Cvv" />
            </Stack>

            <Stack direction="row" justifyContent="flex-end" spacing={1.5}>
              <Button color="inherit" variant="outlined" onClick={onCancel}>
                Cancel
              </Button>
              <LoadingButton type="submit" variant="contained" onClick={onCancel}>
                Save Change
              </LoadingButton>
            </Stack>
          </Stack>
        </Box>
      </Collapse>
    </Card>
  )
}
