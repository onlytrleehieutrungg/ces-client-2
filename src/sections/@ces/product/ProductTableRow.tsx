import { useState } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { Avatar, Checkbox, TableRow, TableCell, Typography, MenuItem } from '@mui/material';
import { TableMoreMenu } from 'src/components/table';
import Iconify from 'src/components/Iconify';
import Label from 'src/components/Label';
import { Product } from 'src/@types/@ces/product';
// @types

// components


// ------------------------------------------------------d----------------

type Props = {
    row: Product;
    selected: boolean;
    onEditRow: VoidFunction;
    onSelectRow: VoidFunction;
    onDeleteRow: VoidFunction;
};

export default function ProductTableRow({
    row,
    selected,
    onEditRow,
    onSelectRow,
    onDeleteRow,
}: Props) {
    const theme = useTheme();

    const { name, price, quantity, description, category, avatarUrl } = row;

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

            <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar alt={name} src={avatarUrl} sx={{ mr: 2 }} />
                <Typography variant="subtitle2" noWrap>
                    {name}
                </Typography>
            </TableCell>
            <TableCell align="left">{description}</TableCell>
            <TableCell align="left">{price}</TableCell>

            <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
                {quantity}
            </TableCell>
            <TableCell align="left">{category?.name}</TableCell>

            <TableCell align="right">
                <TableMoreMenu
                    open={openMenu}
                    onOpen={handleOpenMenu}
                    onClose={handleCloseMenu}
                    actions={
                        <>
                            <MenuItem
                                onClick={() => {
                                    onDeleteRow();
                                    handleCloseMenu();
                                }}
                                sx={{ color: 'error.main' }}
                            >
                                <Iconify icon={'eva:trash-2-outline'} />
                                Delete
                            </MenuItem>
                            <MenuItem
                                onClick={() => {
                                    onEditRow();
                                    handleCloseMenu();
                                }}
                            >
                                <Iconify icon={'eva:edit-fill'} />
                                Edit
                            </MenuItem>
                        </>
                    }
                />
            </TableCell>
        </TableRow>
    );
}
