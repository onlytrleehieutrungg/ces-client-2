// @mui
import {
  Box,
  Button,
  Card,
  Divider,
  Grid,
  MenuItem,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material'
import { styled, useTheme } from '@mui/material/styles'
import { toNumber } from 'lodash'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { Debt } from 'src/@types/@ces'
import { DebtStatus } from 'src/@types/@ces/debt'
//
import { Order, Status } from 'src/@types/@ces/order'
import { fCurrency } from 'src/utils/formatNumber'
import { fDate } from 'src/utils/formatTime'
// utils
// components
import Label from '../../../../components/Label'
import Scrollbar from '../../../../components/Scrollbar'

// ----------------------------------------------------------------------

const RowResultStyle = styled(TableRow)(({ theme }) => ({
  '& td': {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
}))

// ----------------------------------------------------------------------

type Props = {
  debt?: Debt
}

export default function DebtDetails({ debt }: Props) {
  const theme = useTheme()
  const [changeStatus, setChangeStatus] = useState(false)
  const [statusValue, setStatusValue] = useState<number>()
  const { query, push } = useRouter()
  if (!debt) {
    return null
  }
  const rs = Object.values(DebtStatus)

  const { id, name, total, status, infoPayment, company, createdAt, updatedAt } = debt

  const handleUpdateStatus = () => {
    setChangeStatus(!changeStatus)
  }

  return (
    <>
      <Card sx={{ pt: 2, px: 2 }}>
        <Grid container>
          <Grid item xs={12} sm={12} sx={{ mb: 5 }}>
            <Box sx={{ textAlign: { sm: 'left' } }}>
              {!changeStatus ? (
                <Label
                  variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                  color={(status === 0 && 'info') || (status === 1 && 'primary') || 'default'}
                  sx={{ textTransform: 'uppercase', mb: 1 }}
                >
                  {rs[status]}
                </Label>
              ) : (
                <TextField
                  fullWidth
                  select
                  label="Status"
                  // value={filterStatus}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setStatusValue(toNumber(e.target.value))
                  }
                  SelectProps={{
                    MenuProps: {
                      sx: { '& .MuiPaper-root': { maxHeight: 260 } },
                    },
                  }}
                  sx={{
                    maxWidth: { sm: 240 },
                    textTransform: 'capitalize',
                  }}
                >
                  {rs.map((value, index) => (
                    <MenuItem
                      key={index}
                      value={index}
                      sx={{
                        mx: 1,
                        my: 0.5,
                        borderRadius: 0.75,
                        typography: 'body2',
                        textTransform: 'capitalize',
                      }}
                    >
                      {value}
                    </MenuItem>
                  ))}
                </TextField>
              )}

              <Typography variant="h6">{`DBT-${id}`}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
            <Typography paragraph variant="overline" sx={{ color: 'text.disabled' }}>
              Debt Information
            </Typography>
            <Typography variant="body2">Name: {company?.name}</Typography>
            <Typography variant="body2">Address: {company?.address}</Typography>
            <Typography variant="body2">Email: {company?.name}</Typography>
            <Typography variant="body2">InforPayment: {infoPayment}</Typography>
          </Grid>

          <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
            <Typography paragraph variant="overline" sx={{ color: 'text.disabled' }}>
              Date create
            </Typography>
            <Typography variant="body2">{fDate(createdAt!)}</Typography>
            <Typography paragraph variant="overline" sx={{ color: 'text.disabled' }}>
              Date update
            </Typography>
            <Typography variant="body2">{fDate(updatedAt!)}</Typography>
          </Grid>
        </Grid>

        <Scrollbar>
          <TableContainer sx={{ minWidth: 960 }}>
            <Table>
              <TableHead
                sx={{
                  borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
                  '& th': { backgroundColor: 'transparent' },
                }}
              >
                <TableRow>
                  <TableCell width={40}>ID</TableCell>
                  <TableCell align="left">Company</TableCell>
                  <TableCell align="left">Note</TableCell>
                  <TableCell align="right">Used</TableCell>

                  <TableCell align="right">Total</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                <TableRow
                  sx={{
                    borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
                  }}
                >
                  <TableCell>{id}</TableCell>
                  <TableCell align="left">{company?.name}</TableCell>
                  <TableCell align="left">{name}</TableCell>
                  <TableCell align="left">{company?.used}</TableCell>
                  <TableCell align="right">{fCurrency(total)}</TableCell>
                </TableRow>

                <RowResultStyle>
                  <TableCell colSpan={3} />
                  <TableCell align="right">
                    <Box sx={{ mt: 2 }} />
                    <Typography>Subtotal</Typography>
                  </TableCell>
                  <TableCell align="right" width={120}>
                    <Box sx={{ mt: 2 }} />
                    <Typography>{fCurrency(total)}</Typography>
                  </TableCell>
                </RowResultStyle>

                <RowResultStyle>
                  <TableCell colSpan={3} />
                  <TableCell align="right">
                    <Typography>Services</Typography>
                  </TableCell>
                  <TableCell align="right" width={120}>
                    <Typography sx={{ color: 'error.main' }}>
                      {/* {discount && fCurrency(-discount)} */}Nah
                    </Typography>
                  </TableCell>
                </RowResultStyle>
                <RowResultStyle>
                  <TableCell colSpan={3} />
                  <TableCell align="right">
                    <Typography variant="h6">Total</Typography>
                  </TableCell>
                  <TableCell align="right" width={140}>
                    <Typography variant="h6">{fCurrency(total)}</Typography>
                  </TableCell>
                </RowResultStyle>
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <Divider sx={{ mt: 5 }} />
      </Card>
    </>
  )
}
