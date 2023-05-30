import React from 'react'
import { RouterGuard, UserRole } from 'src/guards/RouterGuard'

function index() {
    return (
        <RouterGuard acceptRoles={[UserRole.SYSTEMADMIN]}><div>trang nay chi system admin vao dc thoi</div></RouterGuard>

    )
}

export default index