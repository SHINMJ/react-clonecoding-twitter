import React from 'react'
import { HashRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import Auth from 'routes/Auth'
import Home from 'routes/Home'
import Profile from 'routes/Profile'
import Navigation from 'components/Navigation'

const AppRouter = ({ isLoggedIn, user, refreshUser }) => {
  return (
    <Router>
      {isLoggedIn && <Navigation user={user} />}
      <Switch>
        {isLoggedIn ? (
          <>
            <div
              style={{
                maxWidth: 890,
                width: '100%',
                margin: '0 auto',
                marginTop: 80,
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <Route exact path='/'>
                <Home user={user} />
              </Route>
              <Route exact path='/profile'>
                <Profile user={user} refreshUser={refreshUser} />
              </Route>
              {/* <Redirect from='*' to='/' /> */}
            </div>
          </>
        ) : (
          <>
            <Route exact path='/'>
              <Auth />
            </Route>
            {/* <Redirect from='*' to='/' /> */}
          </>
        )}
      </Switch>
    </Router>
  )
}

export default AppRouter
