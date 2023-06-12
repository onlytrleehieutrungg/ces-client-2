import { useState } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { Checkbox, TableRow, TableCell, MenuItem } from '@mui/material';
import { TableMoreMenu } from 'src/components/table';
import Iconify from 'src/components/Iconify';
import { Order, Status } from 'src/@types/@ces/order';
import Label from 'src/components/Label';
type Props = {
    row: Order;
    selected: boolean;
    onSelectRow: VoidFunction;
    onViewRow: VoidFunction;
};

export default function OrderTableRow({
    row,
    selected,
    onSelectRow,
    onViewRow
}: Props) {
    const theme = useTheme();

    const { id, total, address, note, status } = row;

    const [openMenu, setOpenMenuActions] = useState<HTMLElement | null>(null);

    const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
        setOpenMenuActions(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setOpenMenuActions(null);
    };


    const mapStatus = (status: number) => {
        const rs = Object.values(Status)
        return rs[status - 1]
    }

    return (
        <TableRow hover selected={selected}>
            <TableCell padding="checkbox">
                <Checkbox checked={selected} onClick={onSelectRow} />
            </TableCell>

            <TableCell align="left">{id}</TableCell>
            <TableCell align="left" sx={{ textTransform: 'capitalize' }}>{total}</TableCell>
            <TableCell align="left">{address}</TableCell>
            <TableCell align="left">{note}</TableCell>
            <TableCell align="left">
                <Label
                    variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                    color={
                        (mapStatus(status) === 'Complete' && 'success') ||
                        (mapStatus(status) === 'Waiting for payment' && 'warning') ||
                        (mapStatus(status) === 'Cancel' && 'error') ||
                        'default'
                    }
                    sx={{ textTransform: 'capitalize' }}
                >
                    {mapStatus(status)}
                </Label>
            </TableCell>
            {/* <TableCell align="left">{mapStatus(status)}</TableCell> */}
            <TableCell align="right">
                <TableMoreMenu
                    open={openMenu}
                    onOpen={handleOpenMenu}
                    onClose={handleCloseMenu}
                    actions={
                        <>
                            <MenuItem
                                onClick={() => {
                                    onViewRow();
                                    handleCloseMenu();
                                }}
                            >
                                <Iconify icon={'eva:eye-fill'} />
                                View
                            </MenuItem>
                        </>
                    }
                />
            </TableCell>
        </TableRow>
    );
}
