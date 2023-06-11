import NextLink from 'next/link'
import Page from 'src/components/Page'
import Layout from 'src/layouts'
// @mui
import {
  Box,
  Button,
  Card,
  Container,
  Divider,
  FormControlLabel,
  IconButton,
  Switch,
  Tab,
  Table,
  TableBody,
  TableContainer,
  TablePagination,
  Tabs,
  Tooltip,
} from '@mui/material'
import { paramCase } from 'change-case'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
// import { UserManager } from 'src/@types/user'
// import { _userList } from 'src/_mock'
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs'
import Iconify from 'src/components/Iconify'
import Scrollbar from 'src/components/Scrollbar'
import {
  TableEmptyRows,
  TableHeadCustom,
  TableNoData,
  TableSelectedActions,
} from 'src/components/table'
import useTable, { emptyRows, getComparator } from 'src/hooks/useTable'
import useTabs from 'src/hooks/useTabs'
import { PATH_CES } from 'src/routes/paths'
import AccountTableRow from 'src/sections/@ces/account/AccountTableRow'
import { UserTableToolbar } from 'src/sections/@dashboard/user/list'
import { confirmDialog } from 'src/utils/confirmDialog'
import { RouterGuard, UserRole } from 'src/guards/RouterGuard'
import { type } from 'os'
import ProductTableRow from 'src/sections/@ces/product/ProductTableRow'
import { productApi } from 'src/api-client/product'
import { Product } from 'src/@types/@ces/product'
import { useProduct } from 'src/hooks/@ces/useProduct'
import useSWR from 'swr'
import { useSnackbar } from 'notistack'

// ----------------------------------------------------------------------

const STATUS_OPTIONS = ['all', '1', '2', '3']

const ROLE_OPTIONS = ['all', '1', '2', '3']






// const TABLE_HEAD = Object.keys(jsonData).map((key) => ({
//   id: key.toLowerCase(),
//   label: key.charAt(0).toUpperCase() + key.slice(1),
//   align: 'left'
// }));

const TABLE_HEAD = [
  { id: 'Name', label: 'Name', align: 'left' },
  { id: 'Description', label: 'Description', align: 'left' },
  { id: 'Price', label: 'Price', align: 'left' },
  { id: 'Quantity', label: 'Quantity', align: 'left' },
  { id: 'category.name', label: 'Carogory', align: 'left' },
]

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

ProductPage.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>
}

// ----------------------------------------------------------------------

export default function ProductPage() {
  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,
    setPage,
    //
    selected,
    setSelected,
    onSelectRow,
    onSelectAllRows,
    //
    onSort,
    onChangeDense,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable()

  const { push } = useRouter()
  const { data, mutate } = useProduct({})

  const tableData: Product[] = data?.data ?? []

  const [filterName, setFilterName] = useState('')
  const [filterRole, setFilterRole] = useState('all')

  const { currentTab: filterStatus, onChangeTab: onChangeFilterStatus } = useTabs('all')
  const { enqueueSnackbar } = useSnackbar()
  const handleFilterName = (filterName: string) => {
    setFilterName(filterName)
    setPage(0)
  }

  const handleFilterRole = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterRole(event.target.value)
  }

  const handleDeleteRow = (id: string) => {
    confirmDialog('Do you really want to delete this product ?', async () => {
      try {
        await productApi.delete(id)
        mutate()
        enqueueSnackbar('Delete successfull')
      } catch (error) {
        enqueueSnackbar('Delete failed')
        console.error(error)
      }
    })
  }

  const handleDeleteRows = (selected: string[]) => {
    const deleteRows = tableData.filter((row) => !selected.includes(row.id))
    setSelected([])
    console.log('delete all account action')
  }

  const handleEditRow = (id: string) => {
    push(PATH_CES.product.edit(paramCase(id)))
  }

  const dataFiltered = applySortFilter({
    tableData,
    comparator: getComparator(order, orderBy),
    filterName,
    filterRole,
    filterStatus,
  })



  const denseHeight = dense ? 52 : 72

  const isNotFound =
    (!dataFiltered.length && !!filterName) ||
    (!dataFiltered.length && !!filterRole) ||
    (!dataFiltered.length && !!filterStatus)
  return (
    // <RouterGuard acceptRoles={[UserRole.EMPLOYEEA]}>
    <Page title="Product: List">
      <Container>
        <HeaderBreadcrumbs
          heading="Product List"
          links={[
            { name: 'Dashboard', href: '' },
            { name: 'Product', href: '' },
            { name: 'List' },
          ]}
          action={
            <NextLink href={PATH_CES.product.new} passHref>
              <Button variant="contained" startIcon={<Iconify icon={'eva:plus-fill'} />}>
                New Product
              </Button>
            </NextLink>
          }
        />
        <Card>
          <Tabs
            allowScrollButtonsMobile
            variant="scrollable"
            scrollButtons="auto"
            value={filterStatus}
            onChange={onChangeFilterStatus}
            sx={{ px: 2, bgcolor: 'background.neutral' }}
          >
            {STATUS_OPTIONS.map((tab) => (
              <Tab disableRipple key={tab} label={tab} value={tab} />
            ))}
          </Tabs>

          <Divider />

          <UserTableToolbar
            filterName={filterName}
            filterRole={filterRole}
            onFilterName={handleFilterName}
            onFilterRole={handleFilterRole}
            optionsRole={ROLE_OPTIONS}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800, position: 'relative' }}>
              {selected.length > 0 && (
                <TableSelectedActions
                  dense={dense}
                  numSelected={selected.length}
                  rowCount={tableData.length}
                  onSelectAllRows={(checked) =>
                    onSelectAllRows(
                      checked,
                      tableData.map((row) => `${row.id}`)
                    )
                  }
                  actions={
                    <Tooltip title="Delete">
                      <IconButton color="primary" onClick={() => handleDeleteRows(selected)}>
                        <Iconify icon={'eva:trash-2-outline'} />
                      </IconButton>
                    </Tooltip>
                  }
                />
              )}

              <Table size={dense ? 'small' : 'medium'}>
                <TableHeadCustom
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={tableData.length}
                  numSelected={selected.length}
                  onSort={onSort}
                  onSelectAllRows={(checked) =>
                    onSelectAllRows(
                      checked,
                      tableData.map((row) => `${row.id}`)
                    )
                  }
                />
                <TableBody>
                  {dataFiltered
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => (
                      <ProductTableRow
                        key={`${row.id}`}
                        row={row}
                        selected={selected.includes(`${row.id}`)}
                        onSelectRow={() => onSelectRow(`${row.id}`)}
                        onDeleteRow={() => handleDeleteRow(`${row.id}`)}
                        onEditRow={() => handleEditRow(row.id)}
                      />
                    ))}

                  <TableEmptyRows
                    height={denseHeight}
                    emptyRows={emptyRows(page, rowsPerPage, tableData.length)}
                  />

                  <TableNoData isNotFound={isNotFound} />
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>

          <Box sx={{ position: 'relative' }}>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={dataFiltered.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={onChangePage}
              onRowsPerPageChange={onChangeRowsPerPage}
            />

            <FormControlLabel
              control={<Switch checked={dense} onChange={onChangeDense} />}
              label="Dense"
              sx={{ px: 3, py: 1.5, top: 0, position: { md: 'absolute' } }}
            />
          </Box>
        </Card>
      </Container>
    </Page>
    // </RouterGuard>
  )
}

// ----------------------------------------------------------------------

function applySortFilter({
  tableData,
  comparator,
  filterName,
  filterStatus,
  filterRole,
}: {
  tableData: Product[]
  comparator: (a: any, b: any) => number
  filterName: string
  filterStatus: string
  filterRole: string
}) {
  const stabilizedThis = tableData.map((el, index) => [el, index] as const)

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) return order
    return a[1] - b[1]
  })

  tableData = stabilizedThis.map((el) => el[0])

  if (filterName) {
    tableData = tableData.filter(
      (item: Record<string, any>) =>
        item.Name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
    )
  }

  if (filterStatus !== 'all') {
    tableData = tableData.filter((item: Record<string, any>) => item.Status == filterStatus)
  }

  if (filterRole !== 'all') {
    tableData = tableData.filter((item: Record<string, any>) => item.Role == filterRole)
  }

  return tableData
}
