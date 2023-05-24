import useResponsive from '@/hook/useResponsive'
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'
import {
  Checkbox,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import MuiDrawer from '@mui/material/Drawer'
import { CSSObject, SxProps, Theme, styled } from '@mui/material/styles'
import { useState } from 'react'
import Logo from '../logo'

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import InboxIcon from '@mui/icons-material/Inbox'
import MailIcon from '@mui/icons-material/Mail'
import MenuIcon from '@mui/icons-material/Menu'

const drawerWidth = 240

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
})

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
})

export const DrawerDesktop = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  })
)

interface DrawerHeaderProps {
  open?: boolean
}
export const DrawerHeader = styled('div')<DrawerHeaderProps & SxProps>(({ theme, open }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: open ? 'space-between' : open === undefined ? 'flex-end' : 'center',
  padding: theme.spacing(0, 2),

  // height: HEADER_HEIGHT_DESKTOP,
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}))

export const Drawer = styled(MuiDrawer)(({ theme, open }) => ({
  width: drawerWidth,
  zIndex: theme.zIndex.drawer + 2,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}))

type NavbarProps = {
  open: boolean
  setOpen: any
  openDrawerMobile: any
  toggleDrawer: any
}
const Navbar = ({ open, setOpen, openDrawerMobile, toggleDrawer }: NavbarProps) => {
  const [check, setCheck] = useState(false)
  const isDesktop = useResponsive('up', 'desktop')
  const onHoverEnter = () => {
    setOpen(true)
  }
  const onHoverLeave = () => {
    setOpen(false)
  }

  return (
    <>
      {isDesktop ? (
        <DrawerDesktop
          onMouseEnter={!check ? onHoverEnter : undefined}
          onMouseLeave={!check ? onHoverLeave : undefined}
          variant="permanent"
          open={open}
        >
          <DrawerHeader open={open}>
            <Logo />
            {open && (
              <Checkbox
                icon={<RadioButtonUncheckedIcon />}
                checkedIcon={<RadioButtonCheckedIcon />}
                checked={check}
                onChange={() => setCheck(!check)}
              />
            )}
          </DrawerHeader>
          <Divider />
          <List>
            {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
              <ListItem key={text} disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </DrawerDesktop>
      ) : (
        <Drawer variant="temporary" open={openDrawerMobile} onClose={toggleDrawer(false)}>
          <DrawerHeader>
            <IconButton onClick={toggleDrawer(!openDrawerMobile)}>
              {!openDrawerMobile ? <MenuIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
              <ListItem key={text} disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
      )}
    </>
  )
}
export default Navbar
