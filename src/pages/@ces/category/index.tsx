// @mui
import {
  Box,
  Button,
  Card,
  Container,
  FormControlLabel,
  IconButton,
  Switch,
  Table,
  TableBody,
  TableContainer,
  TablePagination,
  Tooltip,
} from '@mui/material'
import { paramCase } from 'change-case'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'
import { useMemo, useState } from 'react'
import { Category, Params, Role } from 'src/@types/@ces'
import { categoryApi } from 'src/api-client/category'
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs'
import Iconify from 'src/components/Iconify'
import LoadingScreen from 'src/components/LoadingScreen'
import Page from 'src/components/Page'
import Scrollbar from 'src/components/Scrollbar'
import {
  TableEmptyRows,
  TableHeadCustom,
  TableNoData,
  TableSelectedActions,
} from 'src/components/table'
import RoleBasedGuard from 'src/guards/RoleBasedGuard'
import { useCategoryList } from 'src/hooks/@ces/useCategory'
import useTable, { emptyRows, getComparator } from 'src/hooks/useTable'
import useTabs from 'src/hooks/useTabs'
import Layout from 'src/layouts'
import { PATH_CES } from 'src/routes/paths'
import CategoryTableRow from 'src/sections/@ces/category/CategoryTableRow'
import CategoryTableToolbar from 'src/sections/@ces/category/CategoryTableToolbar'
import { confirmDialog } from 'src/utils/confirmDialog'
import LoadingTable from 'src/utils/loadingTable'

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Name', align: 'left' },
  { id: 'description', label: 'Description', align: 'left' },
  { id: '' },
]

CategoryPage.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>
}

// ----------------------------------------------------------------------

export default function CategoryPage() {
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

  const { data, mutate, isLoading, isValidating } = useCategoryList({ params })

  const tableData: Category[] = data?.data ?? []

  const { enqueueSnackbar } = useSnackbar()

  const [filterName, setFilterName] = useState('')

  const [filterRole, setFilterRole] = useState('all')

  const { currentTab: filterStatus, onChangeTab: onChangeFilterStatus } = useTabs('all')

  const handleFilterRole = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterRole(event.target.value)
  }
  useMemo(
    () => setParams({ Page: page + 1, Size: rowsPerPage, Name: filterName }),
    [page, rowsPerPage, filterName]
  )
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

  const handleFilterName = (filterName: string) => {
    setFilterName(filterName)
  }

  const handleEditRow = (id: number) => {
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
    <RoleBasedGuard hasContent roles={[Role['Supplier Admin']]}>
      <Page title="Category: List">
        <Container>
          <HeaderBreadcrumbs
            heading="Category List"
            links={[
              { name: 'Dashboard', href: '' },
              { name: 'Category', href: '' },
              { name: 'List' },
            ]}
            action={
              <NextLink href={PATH_CES.category.new} passHref>
                <Button variant="contained" startIcon={<Iconify icon={'eva:plus-fill'} />}>
                  New Category
                </Button>
              </NextLink>
            }
          />

          <Card>
            <CategoryTableToolbar filterName={filterName} onFilterName={handleFilterName} />
            <LoadingTable isValidating={isValidating} />

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
                    {dataFiltered.map((row) => (
                      <CategoryTableRow
                        key={`${row.id}`}
                        row={row}
                        isValidating={isValidating}
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
                rowsPerPageOptions={[5, 10]}
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
        </Container>
      </Page>
    </RoleBasedGuard>
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
    tableData = tableData.filter((item: Record<string, any>) => item.Status == filterStatus)
  }

  if (filterRole !== 'all') {
    tableData = tableData.filter((item: Record<string, any>) => item.Role == filterRole)
  }

  return tableData
}
// function enqueueSnackbar(arg0: string) {
//   throw new Error('Function not implemented.')
// }
