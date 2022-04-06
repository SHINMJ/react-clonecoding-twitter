import React, { useState } from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import Auth from '../routes/Auth'
import Home from '../routes/Home'

const AppRouter = () => {
  const [isLogedIn, setIsLogedIn] = useState(true)

  return (
    <Router>
      <Switch>
        {isLogedIn ? (
          <Route exact path='/'>
            <Home />
          </Route>
        ) : (
          <Route exact path='/'>
            <Auth />
          </Route>
        )}
      </Switch>
    </Router>
  )
}

export default AppRouter
