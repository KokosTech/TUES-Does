import React from 'react'
import axios from 'axios'
const Update = ()=>{
const [oldPassword, setOldPassword] = React.useState('')
const [newPassword, setNewPassword] = React.useState('')
const [errors, setErrors] = React.useState('')
const handleSubmit = (e) => {
e.preventDefault()
setErrors('')
axios.post('/update', {oldPassword,newPassword})
.then(res=> {
console.log(res)
setErrors('Password updated')
})
.catch(err=>{
if(err.response){
if(err.response.status===401) setErrors('Invalid password')
else if(err.response.status===403) setErrors('Session expired')
else setErrors('Please try again.')}
console.log(err)})
}
return (
<form>
<input type='password' name='oldPassword' placeholder='Old Password' onChange = {e=> setOldPassword(e.target.value)}/>
<input type='password' name='newPassword' placeholder='New Password' onChange = {e=> setNewPassword(e.target.value)}/>
<button type='submit' onClick= {e=> handleSubmit(e)}>Update</button><p>{errors}</p>
</form>
)
}
export default Update