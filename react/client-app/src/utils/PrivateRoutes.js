import { Outlet, Navigate } from 'react-router-dom'
import React from 'react'

const PrivateRoutes = () => {
    let auth = {'token':true} //token = true means that private route will not be blocked
    return(
        auth.token ? <Outlet/> : <Navigate to="/login"/>
    )
}


export default PrivateRoutes