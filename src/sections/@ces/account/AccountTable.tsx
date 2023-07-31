import {
  Box,
  Card,
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
import { useSnackbar } from 'notistack'
import { useMemo, useState } from 'react'
import { ACCOUNT_STATUS_OPTIONS_SA, AccountData, Params, Role } from 'src/@types/@ces'
import { accountApi } from 'src/api-client'
import Iconify from 'src/components/Iconify'
import Scrollbar from 'src/components/Scrollbar'
import {
  TableEmptyRows,
  TableHeadCustom,
  TableNoData,
  TableSelectedActions,
} from 'src/components/table'
import { useAccountList } from 'src/hooks/@ces'
import useAuth from 'src/hooks/useAuth'
import useTable, { emptyRows, getComparator } from 'src/hooks/useTable'
import useTabs from 'src/hooks/useTabs'
import { PATH_CES } from 'src/routes/paths'
import { confirmDialog } from 'src/utils/confirmDialog'
import LoadingTable from 'src/utils/loadingTable'
import AccountTableRow from './AccountTableRow'
import AccountTableToolbar from './AccountTableToolbar'

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'name', align: 'left' },
  { id: 'email', label: 'email', align: 'left' },
  { id: 'phone', label: 'phone', align: 'left' },
  { id: 'status', label: 'status', align: 'left' },
  { id: 'createdAt', label: 'created at', align: 'left' },
  { id: 'updatedAt', label: 'updated at', align: 'left' },
  { id: '' },
]

// ----------------------------------------------------------------------

type Props = {
  any?: any
}
export default function AccountTable({}: Props) {
  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,
    // setPage,
    //
    selected,
    // setSelected,
    onSelectRow,
    onSelectAllRows,
    //
    onSort,
    onChangeDense,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable()

  const { push } = useRouter()

  const { user } = useAuth()

  // const roleOptions = user?.role === Role['System Admin'] ? ROLE_OPTIONS_SA : ROLE_OPTIONS_EA
  const statusOptions = ACCOUNT_STATUS_OPTIONS_SA

  const { enqueueSnackbar } = useSnackbar()
  const [params, setParams] = useState<Partial<Params>>()

  const { data, mutate, isValidating } = useAccountList({ params })
  const accountList = data?.data || []
  useMemo(() => setParams({ Page: page + 1, Size: rowsPerPage }), [page, rowsPerPage])

  const [filterName, setFilterName] = useState('')

  const [filterRole] = useState('all')

  const { currentTab: filterStatus, onChangeTab: onChangeFilterStatus } = useTabs('all')

  const handleFilterName = (filterName: string) => {
    setFilterName(filterName)
  }

  // const handleFilterRole = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setFilterRole(event.target.value)
  //   setPage(0)
  // }

  const handleDeleteRow = (id: string) => {
    confirmDialog('Do you really want to delete this account ?', async () => {
      try {
        await accountApi.delete(id)
        mutate()
        enqueueSnackbar('Delete successful')
      } catch (error) {
        enqueueSnackbar('Delete failed', { variant: 'error' })

        console.error(error)
      }
    })
  }

  const handleDeleteRows = (selected: string[]) => {
    console.log('delete all account action', selected)
  }

  const handleEditRow = (id: string) => {
    // push(PATH_CES.account.edit(paramCase(id)))
    push(PATH_CES.account.detail(paramCase(id)))
  }

  const handleClickRow = (id: string) => {
    push(PATH_CES.account.detail(paramCase(id)))
  }

  const dataFiltered = applySortFilter({
    tableData: accountList,
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
    <Card>
      <Tabs
        allowScrollButtonsMobile
        variant="scrollable"
        scrollButtons="auto"
        value={filterStatus}
        onChange={onChangeFilterStatus}
        sx={{ px: 2, bgcolor: 'background.neutral' }}
      >
        {statusOptions.map((tab) => (
          <Tab disableRipple key={tab.code} label={tab.label} value={tab.code} />
        ))}
      </Tabs>

      <Divider />

      <AccountTableToolbar
        filterName={filterName}
        onFilterName={handleFilterName}
        // filterRole={filterRole}
        // onFilterRole={handleFilterRole}
        // optionsRole={roleOptions}
      />
      <LoadingTable isValidating={isValidating} />

      <Scrollbar>
        <TableContainer sx={{ minWidth: 800, position: 'relative' }}>
          {selected.length > 0 && (
            <TableSelectedActions
              dense={dense}
              numSelected={selected.length}
              rowCount={accountList.length}
              onSelectAllRows={(checked) =>
                onSelectAllRows(
                  checked,
                  accountList.map((row) => `${row.id}`)
                )
              }
              actions={
                true ? (
                  <Tooltip title="Delete">
                    <IconButton color="primary" onClick={() => handleDeleteRows(selected)}>
                      <Iconify icon={'eva:trash-2-outline'} />
                    </IconButton>
                  </Tooltip>
                ) : (
                  <Tooltip title="Add">
                    <IconButton color="primary" onClick={() => handleDeleteRows(selected)}>
                      <Iconify icon={'material-symbols:add'} />
                    </IconButton>
                  </Tooltip>
                )
              }
            />
          )}

          <Table size={dense ? 'small' : 'medium'}>
            <TableHeadCustom
              order={order}
              orderBy={orderBy}
              headLabel={
                user?.role == Role['System Admin']
                  ? TABLE_HEAD.filter((x) => x.id !== 'companyId')
                  : TABLE_HEAD
              }
              rowCount={accountList.length}
              numSelected={selected.length}
              onSort={onSort}
              onSelectAllRows={(checked) =>
                onSelectAllRows(
                  checked,
                  accountList.map((row: any) => `${row.id}`)
                )
              }
            />

            <TableBody>
              {dataFiltered.map((row) => (
                <AccountTableRow
                  key={`${row.id}`}
                  row={row}
                  isValidating={isValidating}
                  selected={selected.includes(`${row.id}`)}
                  onSelectRow={() => onSelectRow(`${row.id}`)}
                  onDeleteRow={() => handleDeleteRow(`${row.id}`)}
                  onEditRow={() => handleEditRow(row.id)}
                  onClickRow={() => handleClickRow(`${row.id}`)}
                />
              ))}

              <TableEmptyRows
                height={denseHeight}
                emptyRows={emptyRows(page, rowsPerPage, accountList.length)}
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
          count={data?.metaData?.total}
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
  tableData: AccountData[]
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
        item.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
    )
  }

  if (filterStatus !== 'all') {
    tableData = tableData.filter((item: Record<string, any>) => item.status == filterStatus)
  }

  if (filterRole !== 'all') {
    tableData = tableData.filter((item: Record<string, any>) => item.role == filterRole)
  }

  return tableData
}
