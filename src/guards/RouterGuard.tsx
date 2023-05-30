import { useRouter } from 'next/router';
import React from 'react'
import useAuth from 'src/hooks/useAuth'

export enum UserRole {
    SYSTEMADMIN = 0,
    EMTERPRISEADMIN = 1,
    SUPPLIERADMIN = 2,
    EMPLOYEEA = 3
}
interface RouterGuardProps {
    acceptRoles: Array<UserRole>
}

export const RouterGuard: React.FC<RouterGuardProps> = ({ children, acceptRoles }) => {
    const { user, isAuthenticated } = useAuth();
    const router = useRouter()
    const role = user?.roleId
    const condition = acceptRoles.find((item) => item === role);
    console.log("acceptrole", acceptRoles)
    console.log("crt", role)
    console.log(isAuthenticated);

    React.useEffect(() => {
        if (isAuthenticated && condition === undefined) {

            router.push("/dashboard/permission-denied")
        }
    }, [isAuthenticated, condition, router])

    return <>{children}</>

}



