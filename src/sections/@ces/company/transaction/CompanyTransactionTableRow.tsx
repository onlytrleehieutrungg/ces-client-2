import { Checkbox, MenuItem, TableCell, TableRow, Typography } from '@mui/material'
import { useState } from 'react'
import { TransactionHistory } from 'src/@types/@ces'
import { ReceiptStatus } from 'src/@types/@ces/debt'
import Iconify from 'src/components/Iconify'
import { TableMoreMenu } from 'src/components/table'
import { fNumber } from 'src/utils/formatNumber'
import { fDateVN, fTime } from 'src/utils/formatTime'

type Props = {
  row: TransactionHistory
  selected: boolean
  onViewRow: VoidFunction
  onSelectRow: VoidFunction
  onDeleteRow: VoidFunction
  isValidating?: boolean
}

export default function CompanyTransactionTableRow({
  row,
  selected,
  onViewRow,
  onSelectRow,
  onDeleteRow,
  isValidating,
}: Props) {
  // const theme = useTheme()

  const { invoiceId, total, type, status, createdAt } = row

  const [openMenu, setOpenMenuActions] = useState<HTMLElement | null>(null)

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setOpenMenuActions(event.currentTarget)
  }

  const handleCloseMenu = () => {
    setOpenMenuActions(null)
  }
  const mapStatus = (status: number) => {
    const rs = Object.values(ReceiptStatus)
    return rs[status]
  }

  if (isValidating) {
    return null
  }
  return (
    <TableRow hover selected={selected}>
      <TableCell padding="checkbox">
        <Checkbox checked={selected} onClick={onSelectRow} />
      </TableCell>

      <TableCell align="left">INV-{invoiceId}</TableCell>

      <TableCell align="left">
        <Typography variant="inherit" noWrap sx={{ color: 'text.primary' }}>
          {fDateVN(createdAt)}
        </Typography>
        <Typography variant="inherit" noWrap sx={{ color: 'text.secondary' }}>
          {fTime(createdAt)}
        </Typography>
      </TableCell>
      {/* <TableCell align="left">{description}</TableCell> */}

      <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
        {fNumber(total)}
      </TableCell>

      <TableCell align="left">
        {type === 3 ? 'ZALOPAY' : type === 5 ? 'VNPAY' : type == 6 ? 'Banking' : 'Payment Method'}
      </TableCell>

      <TableCell align="left" sx={{ textTransform: 'capitalize' }} />

      <TableCell align="right">
        <TableMoreMenu
          open={openMenu}
          onOpen={handleOpenMenu}
          onClose={handleCloseMenu}
          actions={
            <>
              <MenuItem
                onClick={() => {
                  onViewRow()
                  handleCloseMenu()
                }}
              >
                <Iconify icon={'eva:eye-fill'} />
                View
              </MenuItem>
            </>
          }
        />
      </TableCell>
    </TableRow>
  )
}
