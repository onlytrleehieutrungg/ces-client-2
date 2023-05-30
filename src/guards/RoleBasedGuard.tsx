import { m } from 'framer-motion';
// @mui
import { Container, Typography } from '@mui/material';
// hooks
import useAuth from '../hooks/useAuth';
// components
import { MotionContainer, varBounce } from '../components/animate';
// assets
import { ForbiddenIllustration } from '../assets';

// ----------------------------------------------------------------------

type RoleBasedGuardProp = {
  hasContent?: boolean;
  roles?: string[];
  children: React.ReactNode;
};

export default function RoleBasedGuard({ hasContent, roles, children }: RoleBasedGuardProp) {
  // Logic here to get current user role
  const { user } = useAuth();

  const currentRole = 'user';
  // const currentRole = user?.roleId.toString(); // admin;
  // console.log("role", typeof (currentRole));

  if (typeof roles !== 'undefined' && !roles.includes(currentRole)) {
    return <Container component={MotionContainer} sx={{ textAlign: 'center' }}>
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
  }

  return <>{children}</>;
}
