import AppRouter from 'components/Router'
import React, { useEffect, useState } from 'react'
import { authService } from 'myFirebase'

function App() {
  const [init, setInit] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    authService.onAuthStateChanged((userObj) => {
      if (userObj) {
        setIsLoggedIn(true)
        setUser(userObj)
      } else {
        setIsLoggedIn(false)
      }
      setInit(true)
    })
  }, [])

  return (
    <>
      {init ? (
        <AppRouter isLoggedIn={isLoggedIn} user={user} />
      ) : (
        'initialize....'
      )}
      <footer>&copy; {new Date().getFullYear()} Nwitter</footer>
    </>
  )
}

export default App
