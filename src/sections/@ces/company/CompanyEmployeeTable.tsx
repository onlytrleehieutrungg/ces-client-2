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
  TableSkeleton,
} from 'src/components/table'
import { useAccountEmployeeCompany } from 'src/hooks/@ces'
import useAuth from 'src/hooks/useAuth'
import useTable, { emptyRows, getComparator } from 'src/hooks/useTable'
import useTabs from 'src/hooks/useTabs'
import { PATH_CES } from 'src/routes/paths'
import { confirmDialog } from 'src/utils/confirmDialog'
import LoadingTable from 'src/utils/loadingTable'
import CompanyEmployeeTableRow from './CompanyEmployeeTableRow'
import CompanyEmployeeToolbar from './CompanyEmployeeToolbar'

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Employee', align: 'left' },

  { id: 'phone', label: 'Phone', align: 'left' },
  { id: 'createdAt', label: 'created at', align: 'left' },
  { id: 'updatedAt', label: 'updated at', align: 'left' },
  { id: 'status', label: 'status', align: 'left' },
  { id: '' },
]
const FILTER_OPTIONS = ['descending', 'ascending']

// ----------------------------------------------------------------------

type Props = {
  companyId: string
  any?: any
}
export default function CompanyEmployeeTable({ companyId }: Props) {
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

  const statusOptions = ACCOUNT_STATUS_OPTIONS_SA

  const { enqueueSnackbar } = useSnackbar()
  const [params, setParams] = useState<Partial<Params>>()
  const [timeoutName, setTimeoutName] = useState<any>()
  const [filterAttribute, setFilterAttribute] = useState('')
  const [filterOptions, setFilterOptions] = useState('')
  const { data, mutate, isLoading } = useAccountEmployeeCompany({
    params: {
      ...params,
      CompanyId: companyId,
    },
  })
  const accountList = data?.data || []
  useMemo(
    () =>
      setParams({
        Page: page + 1,
        Size: rowsPerPage,
        Sort: filterAttribute == '' ? 'createdAt' : filterAttribute,
        Order: filterOptions == '' ? 'desc' : filterOptions,
      }),
    [filterAttribute, filterOptions, page, rowsPerPage]
  )
  const [filterName, setFilterName] = useState('')

  const [filterRole] = useState('all')

  const { currentTab: filterStatus, onChangeTab: onChangeFilterStatus } = useTabs('all')
  const handleClearFilter = () => {
    setFilterAttribute('')
    setFilterName('')
    setFilterOptions('')
  }
  const filterNameFuction = (value: string) => {
    setParams({ Page: page + 1, Size: rowsPerPage, Name: value })
  }

  const handleFilterOptions = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterOptions(event.target.value)
  }
  const handleFilterAttribute = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterAttribute(event.target.value)
  }
  const handleFilterName = (filterName: string) => {
    setFilterName(filterName)

    if (timeoutName) {
      clearTimeout(timeoutName)
    }

    const newTimeoutname = setTimeout(() => {
      filterNameFuction(filterName)
    }, 300)
    setTimeoutName(newTimeoutname)
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

      <CompanyEmployeeToolbar
        filterName={filterName}
        onFilterName={handleFilterName}
        filterOptions={filterOptions}
        filterAttribute={filterAttribute}
        optionsSort={TABLE_HEAD}
        optionsOrderBy={FILTER_OPTIONS}
        onFilterAttribute={handleFilterAttribute}
        onFilterOptions={handleFilterOptions}
        handleClearFilter={handleClearFilter}

        // filterRole={filterRole}
        // onFilterRole={handleFilterRole}
        // optionsRole={roleOptions}
      />
      <LoadingTable isValidating={isLoading} />

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
              {isLoading
                ? Array.from(Array(rowsPerPage)).map((e) => (
                    <TableSkeleton sx={{ height: denseHeight, px: dense ? 1 : 0 }} key={e} />
                  ))
                : dataFiltered.map((row) => (
                    <CompanyEmployeeTableRow
                      key={`${row.id}`}
                      row={row}
                      isValidating={isLoading}
                      selected={selected.includes(`${row.id}`)}
                      onSelectRow={() => onSelectRow(`${row.id}`)}
                      onDeleteRow={() => handleDeleteRow(`${row.id}`)}
                      onEditRow={() => handleEditRow(row.id)}
                      onClickRow={() => handleClickRow(`${row.id}`)}
                    />
                  ))}

              {!isLoading && (
                <TableEmptyRows
                  height={denseHeight}
                  emptyRows={emptyRows(page + 1, rowsPerPage, data?.metaData?.total)}
                />
              )}
              <TableNoData isNotFound={isNotFound && !isLoading} />
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
  // const stabilizedThis = tableData.map((el, index) => [el, index] as const)

  // stabilizedThis.sort((a, b) => {
  //   const order = comparator(a[0], b[0])
  //   if (order !== 0) return order
  //   return a[1] - b[1]
  // })

  // tableData = stabilizedThis.map((el) => el[0])

  // if (filterName) {
  //   tableData = tableData.filter(
  //     (item: Record<string, any>) =>
  //       item.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
  //   )
  // }

  // if (filterStatus !== 'all') {
  //   tableData = tableData.filter((item: Record<string, any>) => item.status == filterStatus)
  // }

  // if (filterRole !== 'all') {
  //   tableData = tableData.filter((item: Record<string, any>) => item.role == filterRole)
  // }

  return tableData
}
