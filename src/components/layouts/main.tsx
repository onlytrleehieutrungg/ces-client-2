import { LayoutProps } from '@/@types'

import { Box, Stack } from '@mui/material'
import { useState } from 'react'
import Header from '../common/header'
import Navbar, { DrawerHeader } from '../common/navbar'

export function MainLayout({ children }: LayoutProps) {
  const [open, setOpen] = useState(false)
  const [openDrawerMobile, setOpenDrawerMobile] = useState(false)

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return
    }
    setOpenDrawerMobile(open)
  }

  return (
    <Stack direction={'row'}>
      <Header open={open} toggleDrawer={toggleDrawer} />

      <Navbar
        open={open}
        setOpen={setOpen}
        openDrawerMobile={openDrawerMobile}
        toggleDrawer={toggleDrawer}
      />

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {children}
      </Box>
    </Stack>
  )
}
