import { useState } from 'react'
import { sentenceCase } from 'change-case'
// @mui
import { useTheme } from '@mui/material/styles'
import {
  Box,
  Card,
  Table,
  Button,
  Divider,
  MenuItem,
  TableRow,
  TableBody,
  TableCell,
  CardProps,
  CardHeader,
  TableContainer,
} from '@mui/material'
// utils
import { fCurrency } from '../../../../../utils/formatNumber'
// components
// import Label from '../../../../../components/Label'
import Iconify from '../../../../../components/Iconify'
// import Scrollbar from '../../../../../components/Scrollbar'
import { TableMoreMenu, TableHeadCustom } from '../../../../../components/table'
import Scrollbar from 'src/components/Scrollbar'
import Label from 'src/components/Label'
import { Order } from 'src/@types/@ces'
import { fDateVN } from 'src/utils/formatTime'
import { PATH_CES } from 'src/routes/paths'
import { useRouter } from 'next/router'

// ----------------------------------------------------------------------

type RowProps = {
  id: string
  category: string
  price: number
  status: string
}

interface Props extends CardProps {
  title?: string
  subheader?: string
  // tableData: RowProps[]
  tableData: Order[]
  tableLabels: any
}

export default function AppOrder({ title, subheader, tableData, tableLabels, ...other }: Props) {
  const { push } = useRouter()

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} sx={{ mb: 3 }} />

      <Scrollbar>
        <TableContainer sx={{ minWidth: 720 }}>
          <Table>
            <TableHeadCustom headLabel={tableLabels} />

            <TableBody>
              {tableData.map((row) => (
                <AppNewInvoiceRow key={row.id} row={row} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Scrollbar>

      <Divider />

      <Box sx={{ p: 2, textAlign: 'right' }}>
        <Button
          size="small"
          color="inherit"
          endIcon={<Iconify icon={'eva:arrow-ios-forward-fill'} />}
          onClick={() => {
            push(PATH_CES.order.root)
          }}
        >
          View All
        </Button>
      </Box>
    </Card>
  )
}

// ----------------------------------------------------------------------

type AppNewInvoiceRowProps = {
  row: Order
}

function AppNewInvoiceRow({ row }: AppNewInvoiceRowProps) {
  const theme = useTheme()

  const [openMenu, setOpenMenuActions] = useState<HTMLElement | null>(null)

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setOpenMenuActions(event.currentTarget)
  }

  const handleCloseMenu = () => {
    setOpenMenuActions(null)
  }

  const handleDownload = () => {
    handleCloseMenu()
    console.log('DOWNLOAD', row.id)
  }

  const handlePrint = () => {
    handleCloseMenu()
    console.log('PRINT', row.id)
  }

  const handleShare = () => {
    handleCloseMenu()
    console.log('SHARE', row.id)
  }

  const handleDelete = () => {
    handleCloseMenu()
    console.log('DELETE', row.id)
  }

  return (
    <TableRow>
      <TableCell>{`${row.orderCode}`}</TableCell>

      <TableCell>{row.employeeName}</TableCell>

      <TableCell>{fDateVN(row.createdAt)}</TableCell>
      <TableCell>{fCurrency(row.total)}đ</TableCell>

      {/* <TableCell>
        <Label
          variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
          color={
            (row.status === 'in_progress' && 'warning') ||
            (row.status === 'out_of_date' && 'error') ||
            'success'
          }
        >
          {sentenceCase(row.status)}
        </Label>
      </TableCell> */}

      <TableCell align="right">
        <TableMoreMenu
          open={openMenu}
          onOpen={handleOpenMenu}
          onClose={handleCloseMenu}
          actions={
            <>
              <MenuItem onClick={handleDownload}>
                <Iconify icon={'eva:download-fill'} />
                Download
              </MenuItem>

              <MenuItem onClick={handlePrint}>
                <Iconify icon={'eva:printer-fill'} />
                Print
              </MenuItem>

              <MenuItem onClick={handleShare}>
                <Iconify icon={'eva:share-fill'} />
                Share
              </MenuItem>

              <Divider sx={{ borderStyle: 'dashed' }} />

              <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
                <Iconify icon={'eva:trash-2-outline'} />
                Delete
              </MenuItem>
            </>
          }
        />
      </TableCell>
    </TableRow>
  )
}
