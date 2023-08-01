// @mui
import { Stack, Typography } from '@mui/material'
import { TransactionHistory } from 'src/@types/@ces'
import LoadingTable from 'src/utils/loadingTable'
// utils
import { fCurrency } from '../../../../utils/formatNumber'
import { fDateVN } from '../../../../utils/formatTime'

// ----------------------------------------------------------------------

type Props = {
  Transactions?: TransactionHistory[]
  isLoading: boolean
}

export default function AccountBillingInvoiceHistory({ Transactions, isLoading }: Props) {
  return (
    <Stack spacing={3} alignItems="flex-end">
      <Typography variant="subtitle1" sx={{ width: 1 }}>
        Payment History
      </Typography>

      <Stack spacing={2} sx={{ width: 1 }}>
        <LoadingTable isValidating={isLoading} />
        {Transactions?.length == 0 ? (
          <Typography variant="caption">No payment yet!</Typography>
        ) : (
          Transactions?.map((x) => (
            <Stack key={x.id} direction="row" justifyContent="space-between" sx={{ width: 1 }}>
              <Typography variant="body2" sx={{ minWidth: 100 }}>
                {fDateVN(x.createdAt)}
              </Typography>
              <Typography variant="body2">{fCurrency(x.total)}đ</Typography>
              <Typography>{x.type == 3 ? 'ZALOPAY' : 'VNPAY'}</Typography>
            </Stack>
          ))
        )}
      </Stack>
      {/* <Button size="small" endIcon={<Iconify icon={'eva:arrow-ios-forward-fill'} />}>
        All history
      </Button> */}
    </Stack>
  )
}
