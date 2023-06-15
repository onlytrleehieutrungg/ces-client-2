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
  roles?: number[]
  children: React.ReactNode
}

export default function RoleBasedGuard({ hasContent, roles, children }: RoleBasedGuardProp) {
  const { user } = useAuth()

  const currentRole = user?.roleId

  if (typeof roles !== 'undefined' && !roles.includes(currentRole || 999)) {
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
