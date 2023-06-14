// @mui
import {
  Box, Button, Card, Divider, Grid, MenuItem, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography
} from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { toNumber } from 'lodash';
import { useRouter } from 'next/router';
import { useState } from 'react';
//
import { Order, Status } from 'src/@types/@ces/order';
import { fCurrency } from 'src/utils/formatNumber';
import { fDate } from 'src/utils/formatTime';
// utils
// components
import Label from '../../../../components/Label';
import Scrollbar from '../../../../components/Scrollbar';


// ----------------------------------------------------------------------

const RowResultStyle = styled(TableRow)(({ theme }) => ({
  '& td': {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
}));

// ----------------------------------------------------------------------

type Props = {
  order?: Order;
  handleEditOrderSubmit: (id: string, status: number) => void
};

export default function OrderDetails({ order, handleEditOrderSubmit }: Props) {
  const theme = useTheme();
  const [changeStatus, setChangeStatus] = useState(false)
  const [statusValue, setStatusValue] = useState<number>()
  const { query, push } = useRouter()
  if (!order) {
    return null;
  }
  const rs = Object.values(Status)

  const {
    id,
    total,
    address,
    updatedAt,
    createdAt,
    status,
    note,
    code,
    debtStatus,
    account,
    orderDetails
  } = order;

  const handleUpdateStatus = () => {
    setChangeStatus(!changeStatus);
  }
  const handleUpdate = () => {
    handleEditOrderSubmit(id, statusValue!)
    setChangeStatus(!changeStatus)
  }


  return (
    <>
      <Card sx={{ pt: 5, px: 5 }}>
        <Grid container>
          <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
            <Box sx={{ textAlign: { sm: 'left' } }}>
              {!changeStatus ? <Label
                variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                color={
                  (status === 0 && 'primary') ||
                  (status === 1 && 'warning') ||
                  (status === 2 && 'info') ||
                  (status === 3 && 'success') ||
                  (status === 4 && 'error') ||
                  'default'
                }
                sx={{ textTransform: 'uppercase', mb: 1 }}
              >
                {rs[status]}
              </Label> : <TextField
                fullWidth
                select
                label="Status"
                // value={filterStatus}
                onChange={((e: React.ChangeEvent<HTMLInputElement>) => setStatusValue(toNumber(e.target.value))
                )}
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
              }


              <Typography variant="h6">{`INV-${id}`}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} sx={{ mb: 5 }}>

            <Stack justifyContent="flex-end" direction="row" sx={{ textAlign: { sm: 'right' } }} spacing={2}>
              {changeStatus ? <Button variant="contained" size='large' onClick={handleUpdate} >
                Save
              </Button> : ''}

              <Button variant="contained" color={changeStatus ? "inherit" : 'primary'} size="large" onClick={handleUpdateStatus}>
                {changeStatus ? "Cancel" : 'Update'}
              </Button>

            </Stack>

          </Grid>


          <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
            <Typography paragraph variant="overline" sx={{ color: 'text.disabled' }}>
              Customer Information
            </Typography>
            <Typography variant="body2">Name: {account?.name}</Typography>
            <Typography variant="body2">Address: {account?.address}</Typography>
            <Typography variant="body2">Email: {account?.email}</Typography>
            <Typography variant="body2">Phone: {account?.phone}</Typography>
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
                  <TableCell width={40}>#</TableCell>
                  <TableCell align="left">Product</TableCell>
                  <TableCell align="left">Qty</TableCell>
                  <TableCell align="right">Unit price</TableCell>
                  <TableCell align="right">Total</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {orderDetails?.map((row: any, index: any) => (
                  <TableRow
                    key={index}
                    sx={{
                      borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
                    }}
                  >
                    <TableCell>{index + 1}</TableCell>
                    <TableCell align="left">
                      <Box sx={{ maxWidth: 560 }}>
                        <Typography variant="subtitle2">{row?.product?.name}</Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                          {row?.product?.notes}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell align="left">{row?.quantity}</TableCell>
                    <TableCell align="right">{fCurrency(row?.product?.price)}</TableCell>
                    <TableCell align="right">{fCurrency(row.price)}</TableCell>
                  </TableRow>
                ))}

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
                    <Typography>Discount</Typography>
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
                    <Typography>Taxes</Typography>
                  </TableCell>
                  <TableCell align="right" width={120}>
                    <Typography>
                      {/* {taxes && fCurrency(taxes)} */}
                      0
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
  );
}
