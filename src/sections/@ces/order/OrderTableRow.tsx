import { useState } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { Avatar, Checkbox, TableRow, TableCell, Typography, MenuItem } from '@mui/material';
import { TableMoreMenu } from 'src/components/table';
import Iconify from 'src/components/Iconify';
import Label from 'src/components/Label';
import { Product } from 'src/@types/@ces/product';
import { Order } from 'src/@types/@ces/order';
// @types
// ------------------------------------------------------d----------------

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

    return (
        <TableRow hover selected={selected}>
            <TableCell padding="checkbox">
                <Checkbox checked={selected} onClick={onSelectRow} />
            </TableCell>

            <TableCell align="left">{id}</TableCell>
            <TableCell align="left" sx={{ textTransform: 'capitalize' }}>{total}</TableCell>
            <TableCell align="left">{address}</TableCell>
            <TableCell align="left">{note}</TableCell>
            <TableCell align="left">{status}</TableCell>


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
