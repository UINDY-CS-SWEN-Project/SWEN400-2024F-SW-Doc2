import { Outlet, Navigate } from 'react-router-dom'
import React from 'react'


const PrivateRoutes = () => {
    let isAuthenticated = localStorage.getItem('isAuthenticated');
    let auth = {'token':false};
    if(isAuthenticated === 'true'){
        auth = {'token':true};
    }else{
        auth = {'token':false};
    }
    
    return(
        auth.token ? <Outlet/> : <Navigate to="/login"/>
    )
}


export default PrivateRoutes