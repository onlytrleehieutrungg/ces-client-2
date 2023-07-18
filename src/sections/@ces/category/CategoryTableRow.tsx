import { Avatar, Checkbox, MenuItem, TableCell, TableRow, Typography } from '@mui/material'
// @mui
import { useTheme } from '@mui/material/styles'
import { useState } from 'react'
import { Category } from 'src/@types/@ces'
import Iconify from 'src/components/Iconify'
import { TableMoreMenu } from 'src/components/table'
// @types

// components

// ------------------------------------------------------d----------------

type Props = {
  row: Category
  selected: boolean
  isValidating?: boolean
  onEditRow: VoidFunction
  onSelectRow: VoidFunction
  onDeleteRow: VoidFunction
}

export default function CategoryTableRow({
  row,
  selected,
  onEditRow,
  isValidating,
  onSelectRow,
  onDeleteRow,
}: Props) {
  const theme = useTheme()

  const { name, description, imageUrl } = row

  const [openMenu, setOpenMenuActions] = useState<HTMLElement | null>(null)

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setOpenMenuActions(event.currentTarget)
  }

  const handleCloseMenu = () => {
    setOpenMenuActions(null)
  }

  if (isValidating) {
    return null
  }

  return (
    <TableRow hover selected={selected}>
      <TableCell padding="checkbox">
        <Checkbox checked={selected} onClick={onSelectRow} />
      </TableCell>
      <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar alt={name} src={imageUrl} sx={{ mr: 2 }} />
        <Typography variant="subtitle2" noWrap>
          {name}
        </Typography>
      </TableCell>

      {/* <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar alt={Name} src={avatarUrl} sx={{ mr: 2 }} />
                <Typography variant="subtitle2" noWrap>
                    {Name}
                </Typography>
            </TableCell> */}
      <TableCell align="left">{name}</TableCell>
      <TableCell align="left">{description}</TableCell>
      {/* <TableCell align="left">{status}</TableCell> */}

      {/* <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
                {Quantity}
            </TableCell>
            <TableCell align="left">{CategoryId}</TableCell> */}
      {/* <TableCell align="center">
                <Iconify
                    icon={isVerified ? 'eva:checkmark-circle-fill' : 'eva:clock-outline'}
                    sx={{
                        width: 20,
                        height: 20,
                        color: 'success.main',
                        ...(!isVerified && { color: 'warning.main' }),
                    }}
                />
            </TableCell> */}

      {/* <TableCell align="left">
                <Label
                    variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                    color={(status === 'banned' && 'error') || 'success'}
                    sx={{ textTransform: 'capitalize' }}
                >
                    {status}
                </Label>
            </TableCell> */}

      <TableCell align="right">
        <TableMoreMenu
          open={openMenu}
          onOpen={handleOpenMenu}
          onClose={handleCloseMenu}
          actions={
            <>
              <MenuItem
                onClick={() => {
                  onDeleteRow()
                  handleCloseMenu()
                }}
                sx={{ color: 'error.main' }}
              >
                <Iconify icon={'eva:trash-2-outline'} />
                Delete
              </MenuItem>
              <MenuItem
                onClick={() => {
                  onEditRow()
                  handleCloseMenu()
                }}
              >
                <Iconify icon={'eva:edit-fill'} />
                Edit
              </MenuItem>
            </>
          }
        />
      </TableCell>
    </TableRow>
  )
}
