// @mui
import { Button, Stack, Typography } from '@mui/material'
// utils
import { fCurrency } from '../../../../utils/formatNumber'
import { fDate } from '../../../../utils/formatTime'
// @types
import { UserInvoice } from '../../../../@types/user'
// components
import { useOrderByCompanyId, usePayment } from 'src/hooks/@ces/usePayment'
import Iconify from '../../../../components/Iconify'
import { useMe } from 'src/hooks/@ces'
import { MonthlyOrder } from 'src/@types/@ces'

// ----------------------------------------------------------------------

type Props = {
  order?: MonthlyOrder
}

export default function AccountOrderHistory({ order }: Props) {
  return (
    <Stack spacing={3} sx={{ p: 3 }} alignItems="flex-end">
      <Typography variant="subtitle1" sx={{ width: 1 }}>
        Orders in month
      </Typography>

      <Stack spacing={2} sx={{ width: 1 }}>
        {order?.orders?.map((x) => (
          <Stack key={x.id} direction="row" justifyContent="space-between" sx={{ width: 1 }}>
            <Typography variant="body2" sx={{ minWidth: 160 }}>
              {x.orderCode}
            </Typography>{' '}
            <Typography variant="body2" sx={{ minWidth: 80 }}>
              {fDate(x.createdAt)}
            </Typography>
            <Typography variant="body2">{fCurrency(x.total)} đ</Typography>
            {/* <Typography>Zalo Pay</Typography> */}
          </Stack>
        ))}
      </Stack>

      <Button size="small" endIcon={<Iconify icon={'eva:arrow-ios-forward-fill'} />}>
        All history
      </Button>
    </Stack>
  )
}
