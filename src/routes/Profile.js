import React from 'react'
import { authService } from 'myFirebase'
import { useHistory } from 'react-router-dom'

const Profile = () => {
  const history = useHistory()
  const handleLogout = () => {
    authService.signOut()
    history.push('/')
  }
  return (
    <>
      <h2>profile</h2>
      <button onClick={handleLogout}>Logout</button>
    </>
  )
}

export default Profile
