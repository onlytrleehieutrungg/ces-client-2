// next
import NextLink from 'next/link'
// @mui
import { Box, Link, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
// hooks
import useAuth from '../../../hooks/useAuth'
// routes
import { PATH_DASHBOARD } from '../../../routes/paths'
// components
import { Role, WalletData } from 'src/@types/@ces'
import { fNumber } from 'src/utils/formatNumber'
import MyAvatar from '../../../components/MyAvatar'

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: theme.palette.grey[500_12],
  transition: theme.transitions.create('opacity', {
    duration: theme.transitions.duration.shorter,
  }),
}))

// ----------------------------------------------------------------------

type Props = {
  isCollapse: boolean | undefined
}

export default function NavbarAccount({ isCollapse }: Props) {
  const { user } = useAuth()

  return (
    <NextLink href={PATH_DASHBOARD.user.account} passHref>
      <Link underline="none" color="inherit">
        <RootStyle
          sx={{
            ...(isCollapse && {
              bgcolor: 'transparent',
            }),
          }}
        >
          <MyAvatar />

          <Box
            sx={{
              ml: 2,
              transition: (theme) =>
                theme.transitions.create('width', {
                  duration: theme.transitions.duration.shorter,
                }),
              ...(isCollapse && {
                ml: 0,
                width: 0,
              }),
            }}
          >
            <Typography variant="subtitle2" noWrap>
              {user?.name}
            </Typography>
            {user && (
              <>
                <Typography variant="body2" noWrap sx={{ color: 'text.secondary' }}>
                  {Role[user.role]}
                </Typography>
                {user.wallets?.map((x: WalletData) => (
                  <Typography key={x.id} variant="body2" noWrap sx={{ color: 'text.secondary' }}>
                    {fNumber(x.balance)}
                  </Typography>
                ))}
              </>
            )}
          </Box>
        </RootStyle>
      </Link>
    </NextLink>
  )
}
