import { Avatar, Checkbox, MenuItem, TableCell, TableRow, Typography } from '@mui/material'
// @mui
import { useTheme } from '@mui/material/styles'
import { useState } from 'react'
import { Debt } from 'src/@types/@ces'
import { ReceiptStatus } from 'src/@types/@ces/debt'
import Iconify from 'src/components/Iconify'
import Label from 'src/components/Label'
import { TableMoreMenu } from 'src/components/table'
// @types

// components

// ------------------------------------------------------d----------------

type Props = {
  row: Debt
  selected: boolean
  onViewRow: VoidFunction
  onSelectRow: VoidFunction
  onDeleteRow: VoidFunction
}

export default function DebtTableRow({
  row,
  selected,
  onViewRow,
  onSelectRow,
  onDeleteRow,
}: Props) {
  const theme = useTheme()

  const { name, total, company, status } = row

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
  return (
    <TableRow hover selected={selected}>
      <TableCell padding="checkbox">
        <Checkbox checked={selected} onClick={onSelectRow} />
      </TableCell>

      <TableCell align="left">{company?.name}</TableCell>
      <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
        {total}
      </TableCell>
      <TableCell align="left">{name}</TableCell>

      <TableCell align="left">
        {' '}
        <Label
          variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
          color={
            (mapStatus(status) === 'New' && 'info') ||
            (mapStatus(status) === 'Paid' && 'primary') ||
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
