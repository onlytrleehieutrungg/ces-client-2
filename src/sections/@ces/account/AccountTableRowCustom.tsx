// @mui
import { Avatar, Button, Checkbox, MenuItem, TableCell, TableRow, Typography } from '@mui/material'
import { useState } from 'react'
import { AccountData } from 'src/@types/@ces/account'
import Iconify from 'src/components/Iconify'
import { TableMoreMenu } from 'src/components/table'

// @types
// import { UserManager } from '../../../../@types/user';
// // components
// import Label from '../../../../components/Label';
// import Iconify from '../../../../components/Iconify';
// import { TableMoreMenu } from '../../../../components/table';

// ----------------------------------------------------------------------

type Props = {
  row: AccountData
  selected: boolean
  onEditRow: VoidFunction
  onSelectRow: VoidFunction
  onDeleteRow: VoidFunction
  onClickRow?: VoidFunction
  onAddMemberRow?: any
  isMember?: boolean
}

export default function AccountTableRowCustom({
  isMember,
  row,
  selected,
  onEditRow,
  onSelectRow,
  onDeleteRow,
  onClickRow,
  onAddMemberRow,
}: Props) {
  const { name, imageUrl, email } = row

  const [openMenu, setOpenMenuActions] = useState<HTMLElement | null>(null)

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setOpenMenuActions(event.currentTarget)
  }

  const handleCloseMenu = () => {
    setOpenMenuActions(null)
  }

  return (
    <TableRow hover selected={selected} sx={{ cursor: 'pointer' }} onClick={onClickRow}>
      <TableCell
        padding="checkbox"
        onClick={(e) => {
          e.stopPropagation()
        }}
      >
        <Checkbox
          checked={selected}
          onClick={(e) => {
            e.stopPropagation()
            onSelectRow()
          }}
        />
      </TableCell>

      <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar alt={name} src={imageUrl} sx={{ mr: 2 }} />
        <Typography variant="subtitle2" noWrap>
          {name}
        </Typography>
      </TableCell>

      <TableCell align="left">{email}</TableCell>

      <TableCell
        align="right"
        onClick={(e) => {
          e.stopPropagation()
        }}
      >
        {!isMember ? (
          <Button variant="text" onClick={() => onAddMemberRow(row.id)}>
            Add
          </Button>
        ) : (
          <Button variant="text" disabled>
            Member
          </Button>
        )}
        <TableMoreMenu
          open={openMenu}
          onOpen={handleOpenMenu}
          onClose={handleCloseMenu}
          actions={
            <>
              {isMember && (
                <MenuItem
                  onClick={() => {
                    onDeleteRow()
                    handleCloseMenu()
                  }}
                  sx={{ color: 'error.main' }}
                >
                  <Iconify icon={'eva:trash-2-outline'} />
                  Remove
                </MenuItem>
              )}

              <MenuItem
                onClick={() => {
                  onEditRow()
                  handleCloseMenu()
                }}
              >
                <Iconify icon={'eva:edit-fill'} />
                View details
              </MenuItem>
            </>
          }
        />
      </TableCell>
    </TableRow>
  )
}
