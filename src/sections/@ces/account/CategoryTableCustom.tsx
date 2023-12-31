// @mui
import {
  Box, Card,
  Container,
  Divider,
  FormControlLabel,
  IconButton,
  Switch,
  Table,
  TableBody,
  TableContainer,
  TablePagination,
  Tooltip
} from '@mui/material'
import { paramCase } from 'change-case'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'
import { useMemo, useState } from 'react'
import { Category, Params } from 'src/@types/@ces'
import { categoryApi } from 'src/api-client/category'
import Iconify from 'src/components/Iconify'
import Scrollbar from 'src/components/Scrollbar'
import {
  TableEmptyRows,
  TableHeadCustom,
  TableNoData,
  TableSelectedActions,
  TableSkeleton
} from 'src/components/table'
import { useCategoryListBySupplier } from 'src/hooks/@ces/useCategory'
import useTable, { emptyRows, getComparator } from 'src/hooks/useTable'
import useTabs from 'src/hooks/useTabs'
import Layout from 'src/layouts'
import { PATH_CES } from 'src/routes/paths'
import CategoryTableRow from 'src/sections/@ces/category/CategoryTableRow'
import CategoryTableToolbar from 'src/sections/@ces/category/CategoryTableToolbar'
import { confirmDialog } from 'src/utils/confirmDialog'
import LoadingTable from 'src/utils/loadingTable'

// ----------------------------------------------------------------------
const FILTER_OPTIONS = ['descending', 'ascending']

const TABLE_HEAD = [
  { id: 'name', label: 'Name', align: 'left' },
  { id: 'createdat', label: 'Created At', align: 'left' },
  { id: 'updatedat', label: 'Updated At', align: 'left' },
  { id: '' },
]

CategoryTableCustom.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>
}

// ----------------------------------------------------------------------
interface CategoryTableCustomProps {
  supplierId?: string
}
export default function CategoryTableCustom({ supplierId }: CategoryTableCustomProps) {
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

  const [params, setParams] = useState<Partial<Params>>()

  const { data, mutate, isLoading, isValidating } = useCategoryListBySupplier({
    supplierId,
    params,
  })

  const tableData: Category[] = data?.data ?? []

  const { enqueueSnackbar } = useSnackbar()

  const [filterName, setFilterName] = useState('')

  const [filterRole, setFilterRole] = useState('all')

  const [timeoutName, setTimeoutName] = useState<any>()
  const [filterAttribute, setFilterAttribute] = useState('')
  const [filterOptions, setFilterOptions] = useState('')
  const { currentTab: filterStatus, onChangeTab: onChangeFilterStatus } = useTabs('all')

  const handleFilterRole = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterRole(event.target.value)
  }
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

  const handleClearFilter = () => {
    setFilterAttribute('')
    setFilterName('')
    setFilterOptions('')
  }
  const handleDeleteRow = (id: string) => {
    const cateId = parseInt(id)
    confirmDialog('Do you really want to delete this category ?', async () => {
      try {
        await categoryApi.delete(cateId)
        mutate()
        enqueueSnackbar('Delete successfull')
      } catch (error) {
        enqueueSnackbar('Delete failed')
        console.error(error)
      }
    })
  }

  const handleDeleteRows = (selected: string[]) => {
    setSelected([])
    console.log('delete all account action')
  }
  const filterNameFuction = (value: string) => {
    setParams({ Page: page + 1, Size: rowsPerPage, Name: value })
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
  const handleFilterOptions = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterOptions(event.target.value)
  }
  const handleFilterAttribute = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterAttribute(event.target.value)
  }
  const handleEditRow = (id: string) => {
    push(PATH_CES.category.edit(paramCase(id.toString())))
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
    <Container>
      <Card>
        <CategoryTableToolbar
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
            <Divider />
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
                {isLoading
                  ? Array.from(Array(rowsPerPage)).map((e) => (
                      <TableSkeleton sx={{ height: denseHeight, px: dense ? 1 : 0 }} key={e} />
                    ))
                  : dataFiltered.map((row) => (
                      <CategoryTableRow
                        key={`${row.id}`}
                        row={row}
                        isValidating={isLoading}
                        selected={selected.includes(`${row.id}`)}
                        onSelectRow={() => onSelectRow(`${row.id}`)}
                        onDeleteRow={() => handleDeleteRow(`${row.id}`)}
                        onEditRow={() => handleEditRow(row.id)}
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
            rowsPerPageOptions={[5, 10]}
            component="div"
            count={data?.metaData?.total || 0}
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
  tableData: Category[]
  comparator: (a: any, b: any) => number
  filterName: string
  filterStatus: string
  filterRole: string
}) {
  return tableData
}
