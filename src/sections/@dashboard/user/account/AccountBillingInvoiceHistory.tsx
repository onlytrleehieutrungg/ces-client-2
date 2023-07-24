// @mui
import { Button, Stack, Typography } from '@mui/material'
// utils
import { fCurrency } from '../../../../utils/formatNumber'
import { fDate } from '../../../../utils/formatTime'
// @types
import { UserInvoice } from '../../../../@types/user'
// components
import { usePayment } from 'src/hooks/@ces/usePayment'
import Iconify from '../../../../components/Iconify'
import { MonthlyOrder, TransactionHistory } from 'src/@types/@ces'

// ----------------------------------------------------------------------

type Props = {
  Transactions?: TransactionHistory[]
}

export default function AccountBillingInvoiceHistory({ Transactions }: Props) {
  return (
    <Stack spacing={3} alignItems="flex-end">
      <Typography variant="subtitle1" sx={{ width: 1 }}>
        Payment History
      </Typography>

      <Stack spacing={2} sx={{ width: 1 }}>
        {Transactions?.map((x) => (
          <Stack key={x.id} direction="row" justifyContent="space-between" sx={{ width: 1 }}>
            <Typography variant="body2" sx={{ minWidth: 100 }}>
              {fDate(x.createdAt)}
            </Typography>
            <Typography variant="body2">{fCurrency(x.total)} đ</Typography>
            <Typography>{x.type == 3 ? 'ZALOPAY' : 'VNPAY'}</Typography>
          </Stack>
        ))}
      </Stack>

      <Button size="small" endIcon={<Iconify icon={'eva:arrow-ios-forward-fill'} />}>
        All history
      </Button>
    </Stack>
  )
}
