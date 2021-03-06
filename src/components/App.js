import AppRouter from 'components/Router'
import React, { useEffect, useState } from 'react'
import { authService } from 'myFirebase'

function App() {
  const [init, setInit] = useState(false)
  // 사용자 정보는 최상단에서 관리하도록 한다. 어플리케이션 전체(Home, Profile..)에서 사용되므로..
  // 이와 같이 각 정보를 어디에서 어떻게 적절히 사용하느냐가 중요하다.
  const [user, setUser] = useState(null)

  useEffect(() => {
    authService.onIdTokenChanged((userObj) => {
      if (userObj) {
        setUserObj(userObj)
      } else {
        setUser(null)
      }
      setInit(true)
    })
  }, [])

  const refreshUser = () => {
    setUserObj(authService.currentUser)
  }

  const setUserObj = (currentUser) => {
    console.log(currentUser.photoURL)
    setUser({
      displayName: currentUser.displayName,
      uid: currentUser.uid,
      photoURL: currentUser.photoURL,
      updateProfile: (args) => currentUser.updateProfile(args),
    })
  }

  return (
    <>
      {init ? (
        <AppRouter
          refreshUser={refreshUser}
          isLoggedIn={Boolean(user)}
          user={user}
        />
      ) : (
        'initialize....'
      )}
      <footer>&copy; {new Date().getFullYear()} Nwitter</footer>
    </>
  )
}

export default App
