import { Checkbox, MenuItem, TableCell, TableRow } from '@mui/material'
// @mui
import { useTheme } from '@mui/material/styles'
import { useState } from 'react'
import { Order, Status } from 'src/@types/@ces/order'
import Iconify from 'src/components/Iconify'
import Label from 'src/components/Label'
import { TableMoreMenu } from 'src/components/table'
type Props = {
  row: Order
  selected: boolean
  onSelectRow: VoidFunction
  onViewRow: VoidFunction
  isValidating?: boolean
}

export default function OrderTableRow({
  row,
  isValidating,
  selected,
  onSelectRow,
  onViewRow,
}: Props) {
  const theme = useTheme()

  const { id, total, address, note, status } = row

  const [openMenu, setOpenMenuActions] = useState<HTMLElement | null>(null)

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setOpenMenuActions(event.currentTarget)
  }

  const handleCloseMenu = () => {
    setOpenMenuActions(null)
  }

  const mapStatus = (status: number) => {
    const rs = Object.values(Status)
    return rs[status]
  }

  return (
    <TableRow hover selected={selected}>
      <TableCell padding="checkbox">
        <Checkbox checked={selected} onClick={onSelectRow} />
      </TableCell>

      <TableCell align="left">{id}</TableCell>
      <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
        {total}
      </TableCell>
      <TableCell align="left">{address}</TableCell>
      <TableCell align="left">
        <Label
          variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
          color={
            (mapStatus(status) === 'New' && 'primary') ||
            (mapStatus(status) === 'Waiting for ship' && 'info') ||
            (mapStatus(status) === 'Complete' && 'success') ||
            (mapStatus(status) === 'Confirm' && 'warning') ||
            (mapStatus(status) === 'Cancel' && 'error') ||
            'default'
          }
          sx={{ textTransform: 'capitalize' }}
        >
          {mapStatus(status)}
        </Label>
      </TableCell>
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
