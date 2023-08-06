// @mui
import { TableRow, TableCell, Skeleton, Stack, TableRowProps } from '@mui/material'

// ----------------------------------------------------------------------

export default function TableSkeleton({ ...other }: TableRowProps) {
  return (
    <TableRow {...other}>
      <TableCell colSpan={12}>
        <Stack spacing={3} direction="row" alignItems="center">
          <Skeleton
            variant="rectangular"
            width={20}
            height={20}
            sx={{ borderRadius: 0.5, flexShrink: 0 }}
          />
          {/* <Skeleton variant="text" width="100%" height={20} /> */}
          {/* <Skeleton variant="text" width={160} height={20} /> */}
          <Skeleton variant="text" width="100%" height={20} />
        </Stack>
      </TableCell>
    </TableRow>
  )
}
