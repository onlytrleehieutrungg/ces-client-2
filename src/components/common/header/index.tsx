import useResponsive from '@/hook/useResponsive'
import MenuIcon from '@mui/icons-material/Menu'
import { IconButton, Toolbar, Typography, styled } from '@mui/material'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'

const drawerWidth = 240

interface AppBarProps extends MuiAppBarProps {
  open?: boolean
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  boxShadow: 'none',
  backgroundColor: 'transparent',
  // height: HEADER_HEIGHT_DESKTOP,
  backdropFilter: 'blur(5px)',

  ...(open
    ? {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      }
    : {
        marginLeft: drawerWidth,
        width: `calc(100% - (${theme.spacing(7)} + 1px))`,
        [theme.breakpoints.up('sm')]: {
          width: `calc(100% - (${theme.spacing(8)} + 1px))`,
        },
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
      }),
  // ...(mobile && {}),
  [theme.breakpoints.down('lg')]: {
    width: `100%`,
  },
}))

type HeaderProps = {
  open: boolean
  toggleDrawer: any
}
const Header = ({ open, toggleDrawer }: HeaderProps) => {
  const isDesktop = useResponsive('up', 'desktop')

  return (
    <AppBar position="fixed" open={open}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={toggleDrawer(true)}
          edge="start"
          sx={{
            mr: 1,
            color: 'red',
            ...((open || isDesktop) && { display: 'none' }),
          }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div" color={'red'}>
          Header here
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

export default Header
