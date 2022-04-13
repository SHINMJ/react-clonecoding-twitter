import AppRouter from 'components/Router'
import React, { useState } from 'react'
import { authService } from 'myFirebase'

function App() {
  const auth = authService.currentUser
  console.log(auth)
  const [isLoggedIn, setIsLoggedIn] = useState(auth)
  return (
    <>
      <AppRouter isLoggedIn={isLoggedIn} />
      <footer>&copy; {new Date().getFullYear()} Nwitter</footer>
    </>
  )
}

export default App
