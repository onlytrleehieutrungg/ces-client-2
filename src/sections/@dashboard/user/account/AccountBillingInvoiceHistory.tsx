// @mui
import { Stack, Link, Button, Typography } from '@mui/material'
// utils
import { fDate } from '../../../../utils/formatTime'
import { fCurrency } from '../../../../utils/formatNumber'
// @types
import { UserInvoice } from '../../../../@types/user'
// components
import Iconify from '../../../../components/Iconify'
import { usePayment } from 'src/hooks/@ces/usePayment'

// ----------------------------------------------------------------------

type Props = {
  invoices: UserInvoice[]
}

export default function AccountBillingInvoiceHistory({ invoices }: Props) {
  const { data, mutate, isLoading } = usePayment({})
  return (
    <Stack spacing={3} alignItems="flex-end">
      <Typography variant="subtitle1" sx={{ width: 1 }}>
        Payment History
      </Typography>

      <Stack spacing={2} sx={{ width: 1 }}>
        {data?.data?.map((x) => (
          <Stack key={x.id} direction="row" justifyContent="space-between" sx={{ width: 1 }}>
            <Typography variant="body2" sx={{ minWidth: 160 }}>
              {fDate(x.createdAt)}
            </Typography>
            <Typography variant="body2">{fCurrency(x.total)} đ</Typography>
            <Typography>Zalo Pay</Typography>
          </Stack>
        ))}
      </Stack>

      <Button size="small" endIcon={<Iconify icon={'eva:arrow-ios-forward-fill'} />}>
        All history
      </Button>
    </Stack>
  )
}
