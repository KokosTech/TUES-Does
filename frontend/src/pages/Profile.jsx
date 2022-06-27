import React from 'react'
import axios from 'axios'
import Update from './UpdatePassword'
const Profile = ({user, setUser})=>{
const handleLogout = (e) => {
e.preventDefault(e)
axios.get('/logout')
.then(res=>{
localStorage.removeItem('jwtToken')
delete axios.defaults.headers.common['Authorization']
setUser({ auth:false, name:'' })
})
.catch(err=>console.log(err))
}
return(
<div>
<p>{`Hi ${user.name}`}</p>
<Update/>
<button type='submit' onClick= {e=> handleLogout(e)}>Logout</button></div>
)
}
export default Profile