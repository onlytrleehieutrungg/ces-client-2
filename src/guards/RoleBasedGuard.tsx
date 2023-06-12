import { m } from 'framer-motion'
// @mui
import { Container, Typography } from '@mui/material'
// hooks
import useAuth from '../hooks/useAuth'
// components
import { MotionContainer, varBounce } from '../components/animate'
// assets
import { ForbiddenIllustration } from '../assets'

// ----------------------------------------------------------------------

type RoleBasedGuardProp = {
  hasContent?: boolean
  roles?: string[]
  children: React.ReactNode
}

export default function RoleBasedGuard({ hasContent, roles, children }: RoleBasedGuardProp) {
  // Logic here to get current user role
  const { user } = useAuth()

  let currentRole
  switch (user?.roleId) {
    case 1:
      currentRole = 'sa'
      break
    case 2:
      currentRole = 'ea'
      break
    case 3:
      currentRole = 'spa'
      break
    default:
      currentRole = ''
      break
  }

  if (typeof roles !== 'undefined' && !roles.includes(currentRole)) {
    return hasContent ? (
      <Container component={MotionContainer} sx={{ textAlign: 'center' }}>
        <m.div variants={varBounce().in}>
          <Typography variant="h3" paragraph>
            Permission Denied
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <Typography sx={{ color: 'text.secondary' }}>
            You do not have permission to access this page
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <ForbiddenIllustration sx={{ height: 260, my: { xs: 5, sm: 10 } }} />
        </m.div>
      </Container>
    ) : null
  }

  return <>{children}</>
}
