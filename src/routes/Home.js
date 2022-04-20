import { authService } from 'myFirebase'
import React from 'react'

const Home = () => {
  const handleLogout = () => {
    authService.signOut()
  }

  return (
    <div>
      <h2>Home</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Home
