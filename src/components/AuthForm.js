import React, { useState } from 'react'
import { firebaseInstance, authService } from 'myFirebase'

const AuthForm = ({ setError }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [newAccount, setNewAccount] = useState(false)

  const handleChangeEmail = (event) => {
    setEmail(event.target.value)
  }

  const handleChangePassword = (event) => {
    setPassword(event.target.value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    console.log(email, password)
    try {
      let data
      if (newAccount) {
        data = await authService.createUserWithEmailAndPassword(email, password)
        return
      }

      data = await authService.signInWithEmailAndPassword(email, password)

      console.log(data)
    } catch (error) {
      console.log(error)
      setError(error.message)
    }
  }

  const handleToggle = () => setNewAccount((prev) => !prev)

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          name='email'
          type='email'
          placeholder='Email'
          required
          value={email}
          onChange={handleChangeEmail}
        />
        <input
          name='password'
          type='password'
          placeholder='Password'
          required
          value={password}
          onChange={handleChangePassword}
        />
        <input
          type='submit'
          value={newAccount ? 'Create Account' : 'Sign In'}
        />
      </form>
      <span onClick={handleToggle}>
        {newAccount ? 'Sign In' : 'Create Account'}
      </span>
    </>
  )
}

export default AuthForm
