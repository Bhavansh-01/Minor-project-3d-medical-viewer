import React from 'react'
import {useAuth0} from '@auth0/auth0-react';
import '../App.css'
const LoginButton=()=>{
    const{loginWithRedirect,isAuthenticated}=useAuth0();

    return (
        !isAuthenticated && (
            <button  id="loginb" class="custom-btn btn-6" onClick={()=>loginWithRedirect()}>
                Log In
            </button>
    )
    )
}
export default LoginButton