import {
  Box,
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
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
import { capitalCase, paramCase } from 'change-case'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'
import { useMemo, useState } from 'react'
import { ACCOUNT_STATUS_OPTIONS_SA, Params, Role } from 'src/@types/@ces'
import { accountApi, projectApi } from 'src/api-client'
import Iconify from 'src/components/Iconify'
import Scrollbar from 'src/components/Scrollbar'
import {
  TableEmptyRows,
  TableHeadCustom,
  TableNoData,
  TableSelectedActions,
  TableSkeleton,
} from 'src/components/table'
import { useAccountDetails, useProjectListMemberNotInGroup } from 'src/hooks/@ces'
import useAuth from 'src/hooks/useAuth'
import useTable, { emptyRows } from 'src/hooks/useTable'
import useTabs from 'src/hooks/useTabs'
import { PATH_CES } from 'src/routes/paths'
import { confirmDialog } from 'src/utils/confirmDialog'
import LoadingTable from 'src/utils/loadingTable'
import AccountNewEditForm from '../../account/AccountNewEditForm'
import AccountWallet from '../../account/wallet/AccountWallet'
import BenefitAccountTableRow from './BenefitAccountTableRow'
import BenefitAccountToolbar from './BenefitAccountToolbar'

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Employee', align: 'left' },
  { id: 'phone', label: 'Phone', align: 'left' },
  { id: 'isReceived', label: 'Is Received', align: 'center' },
  { id: 'createdAt', label: 'created at', align: 'left' },
  { id: 'updatedAt', label: 'updated at', align: 'left' },
  { id: 'status', label: 'status', align: 'left' },
  { id: '' },
]
const FILTER_OPTIONS = ['descending', 'ascending']

// ----------------------------------------------------------------------

type Props = {
  benefitId: string
  groupId: string
}
export default function BenefitAccountTable({ benefitId, groupId }: Props) {
  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,
    // setPage,
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

  const { user } = useAuth()

  const statusOptions = ACCOUNT_STATUS_OPTIONS_SA

  const { enqueueSnackbar } = useSnackbar()
  const [params, setParams] = useState<Partial<Params>>()
  const [timeoutName, setTimeoutName] = useState<any>()
  const [filterAttribute, setFilterAttribute] = useState('')
  const [filterOptions, setFilterOptions] = useState('')
  const { data, mutate, isLoading } = useProjectListMemberNotInGroup({
    id: benefitId,
    params,
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

  const handleAddMemberRow = async (id: string) => {
    confirmDialog('Do you really want to add this account to group ?', async () => {
      try {
        await projectApi.addMember({
          groupId,
          accountId: [id],
        })
        mutate()

        enqueueSnackbar('Add successful')
      } catch (error) {
        console.error(error)
      }
    })
  }

  const handleAddMemberAllRows = async (selected: string[]) => {
    confirmDialog('Do you really want to add all account to group ?', async () => {
      try {
        await projectApi.addMember({
          groupId,
          accountId: [...selected],
        })
        mutate()
        setSelected([])
        enqueueSnackbar('Add successful')
      } catch (error) {
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

  const [open, setOpen] = useState(false)
  const [accountId, setAccountId] = useState('')

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleClickRow = (id: string) => {
    setAccountId(id)
    handleClickOpen()
  }

  const denseHeight = dense ? 52 : 72

  const isNotFound =
    (!accountList.length && !!filterName) ||
    (!accountList.length && !!filterRole) ||
    (!accountList.length && !!filterStatus)

  return (
    <Card>
      {open && <AccountDetails id={accountId} handleClose={handleClose} />}
      <Tabs
        allowScrollButtonsMobile
        variant="scrollable"
        scrollButtons="auto"
        value={filterStatus}
        onChange={onChangeFilterStatus}
        sx={{ px: 2, bgcolor: 'background.neutral' }}
      >
        {/* {statusOptions.map((tab) => (
          <Tab disableRipple key={tab.code} label={tab.label} value={tab.code} />
        ))} */}
      </Tabs>

      <Divider />

      <BenefitAccountToolbar
        filterName={filterName}
        onFilterName={handleFilterName}
        filterOptions={filterOptions}
        filterAttribute={filterAttribute}
        optionsSort={TABLE_HEAD}
        optionsOrderBy={FILTER_OPTIONS}
        onFilterAttribute={handleFilterAttribute}
        onFilterOptions={handleFilterOptions}
        handleClearFilter={handleClearFilter}
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
                  accountList.map((row) => `${row.accountId}`)
                )
              }
              actions={
                <>
                  <Tooltip title="Add">
                    <IconButton color="primary" onClick={() => handleAddMemberAllRows(selected)}>
                      <Iconify icon={'material-symbols:add'} />
                    </IconButton>
                  </Tooltip>
                  {/* <Tooltip title="Delete">
                    <IconButton color="primary" onClick={() => handleDeleteRows(selected)}>
                      <Iconify icon={'eva:trash-2-outline'} />
                    </IconButton>
                  </Tooltip> */}
                </>
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
                : accountList.map((row) => (
                    <BenefitAccountTableRow
                      key={`${row.accountId}`}
                      row={row}
                      isValidating={isLoading}
                      selected={selected.includes(`${row.accountId}`)}
                      onSelectRow={() => onSelectRow(`${row.accountId}`)}
                      onDeleteRow={() => handleDeleteRow(`${row.accountId}`)}
                      onEditRow={() => handleEditRow(row.accountId)}
                      onClickRow={() => handleClickRow(`${row.accountId}`)}
                      onAddMemberRow={() => handleAddMemberRow(`${row.accountId}`)}
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

type AccountDetailsProps = {
  id: string
  handleClose: any
}

function AccountDetails({ handleClose, id }: AccountDetailsProps) {
  const { data } = useAccountDetails({ id })
  const account = data?.data
  const { currentTab, onChangeTab } = useTabs('general')

  const ACCOUNT_TABS = [
    {
      value: 'general',
      icon: <Iconify icon={'ic:round-account-box'} width={20} height={20} />,
      component: <AccountNewEditForm currentUser={account} isDetail />,
    },
    {
      value: 'wallet',
      icon: <Iconify icon={'ic:round-receipt'} width={20} height={20} />,
      component: <AccountWallet accountId={`${account?.id}`} />,
    },
  ]

  return (
    <Dialog fullWidth maxWidth="lg" open onClose={handleClose}>
      <DialogTitle>Employee Details</DialogTitle>

      <DialogContent sx={{ mt: 1 }}>
        <Tabs
          allowScrollButtonsMobile
          variant="scrollable"
          scrollButtons="auto"
          value={currentTab}
          onChange={onChangeTab}
        >
          {ACCOUNT_TABS.map((tab) => (
            <Tab
              disableRipple
              key={tab.value}
              label={capitalCase(tab.value)}
              icon={tab.icon}
              value={tab.value}
            />
          ))}
        </Tabs>

        <Box sx={{ mb: 5 }} />

        {!account ? (
          <>Loading...</>
        ) : (
          ACCOUNT_TABS.map((tab) => {
            const isMatched = tab.value === currentTab
            return isMatched && <Box key={tab.value}>{tab.component}</Box>
          })
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  )
}
