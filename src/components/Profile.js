import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import '../App.css'
const Profile=()=>{

    const {user,isAuthenticated}=useAuth0();
    return(
        isAuthenticated && (
            <div>
                <img id="logph" src={user.picture} alt={user.name}/>
                <h2 id="loginname">{user.name}</h2>
            </div>
        )
    )

}

export default Profile;