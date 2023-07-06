import { useRouter } from 'next/router'
import React from 'react'
import useAuth from 'src/hooks/useAuth'

export enum UserRole {
  SYSTEMADMIN = 0,
  EMTERPRISEADMIN = 1,
  SUPPLIERADMIN = 2,
  EMPLOYEE = 3,
}

export const routes = {
  deniedPage: '/dashboard/permission-denied',
}

interface RouterGuardProps {
  acceptRoles: Array<UserRole>
}

export const RouterGuard: React.FC<RouterGuardProps> = ({ children, acceptRoles }) => {
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()
  const role = user?.role
  const condition = acceptRoles.find((item) => item === role)
  React.useEffect(() => {
    if (isAuthenticated && condition === undefined) {
      router.push(routes.deniedPage)
    }
  }, [isAuthenticated, condition, router])

  return <>{children}</>
}
