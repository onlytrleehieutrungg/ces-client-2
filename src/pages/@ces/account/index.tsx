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
import { useState } from 'react'
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

// ----------------------------------------------------------------------

const STATUS_OPTIONS = ['all', '1', '2', '3']

const ROLE_OPTIONS = ['all', '1', '2', '3']

interface UserData {
  Id: number
  Name: string
  Email: string
  Address: string
  Phone: string
  UpdatedAt: string
  CreatedAt: string
  ImageUrl: string
  Status: number
  Role: number
  CompanyId: number
  Password: string
}

const account_list: UserData[] = [
  {
    Id: 101,
    Name: 'John Doe',
    Email: 'johndoe@example.com',
    Address: '123 Main Street',
    Phone: '123-456-7890',
    UpdatedAt: '2023-05-26T10:30:00',
    CreatedAt: '2023-05-25T15:45:00',
    ImageUrl: 'https://example.com/images/johndoe.jpg',
    Status: 1,
    Role: 3,
    CompanyId: 1,
    Password: 'hashed_password_101',
  },
  {
    Id: 102,
    Name: 'Jane Smith',
    Email: 'janesmith@example.com',
    Address: '456 Elm Street',
    Phone: '987-654-3210',
    UpdatedAt: '2023-05-26T09:15:00',
    CreatedAt: '2023-05-24T11:20:00',
    ImageUrl: 'https://example.com/images/janesmith.jpg',
    Status: 1,
    Role: 3,
    CompanyId: 1,
    Password: 'hashed_password_102',
  },
  {
    Id: 103,
    Name: 'Michael Johnson',
    Email: 'michaeljohnson@example.com',
    Address: '789 Oak Street',
    Phone: '555-123-4567',
    UpdatedAt: '2023-05-26T08:00:00',
    CreatedAt: '2023-05-23T09:00:00',
    ImageUrl: 'https://example.com/images/michaeljohnson.jpg',
    Status: 1,
    Role: 3,
    CompanyId: 1,
    Password: 'hashed_password_103',
  },
]

// const TABLE_HEAD = Object.keys(jsonData).map((key) => ({
//   id: key.toLowerCase(),
//   label: key.charAt(0).toUpperCase() + key.slice(1),
//   align: 'left'
// }));

const TABLE_HEAD = [
  { id: 'Name', label: 'Name', align: 'left' },
  { id: 'Email', label: 'Email', align: 'left' },
  { id: 'Phone', label: 'Phone', align: 'left' },
  { id: 'Status', label: 'Status', align: 'left' },
  { id: '' },
]

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

AccountPage.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>
}

// ----------------------------------------------------------------------

export default function AccountPage() {
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

  const [tableData, setTableData] = useState(account_list)

  const [filterName, setFilterName] = useState('')

  const [filterRole, setFilterRole] = useState('all')

  const { currentTab: filterStatus, onChangeTab: onChangeFilterStatus } = useTabs('all')

  const handleFilterName = (filterName: string) => {
    setFilterName(filterName)
    setPage(0)
  }

  const handleFilterRole = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterRole(event.target.value)
  }

  const handleDeleteRow = (id: string) => {
    confirmDialog('Do you really want to delete this account ?', () => {
      // const deleteRow = tableData.filter((row) => row.id !== id)
      // setSelected([])
      // setTableData(deleteRow)
      console.log('delete account action')
    })
  }

  const handleDeleteRows = (selected: string[]) => {
    // const deleteRows = tableData.filter((row) => !selected.includes(row.id))
    // setSelected([])
    // setTableData(deleteRows)
    console.log('delete all account action')
  }

  const handleEditRow = (id: string) => {
    push(PATH_CES.account.edit(paramCase(id)))
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
    <RouterGuard acceptRoles={[UserRole.EMPLOYEEA]}>
      <Page title="Account: List">
        <Container>
          <HeaderBreadcrumbs
            heading="Account List"
            links={[
              { name: 'Dashboard', href: '' },
              { name: 'Account', href: '' },
              { name: 'List' },
            ]}
            action={
              <NextLink href={PATH_CES.account.new} passHref>
                <Button variant="contained" startIcon={<Iconify icon={'eva:plus-fill'} />}>
                  New Account
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
                        tableData.map((row) => `${row.Id}`)
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
                        tableData.map((row) => `${row.Id}`)
                      )
                    }
                  />

                  <TableBody>
                    {dataFiltered
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row) => (
                        <AccountTableRow
                          key={`${row.Id}`}
                          row={row}
                          selected={selected.includes(`${row.Id}`)}
                          onSelectRow={() => onSelectRow(`${row.Id}`)}
                          onDeleteRow={() => handleDeleteRow(`${row.Id}`)}
                          onEditRow={() => handleEditRow(row.Name)}
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
    </RouterGuard>
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
  tableData: UserData[]
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
