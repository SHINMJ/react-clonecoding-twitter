import { authService } from 'myFirebase'
import React, { useState } from 'react'

const Auth = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [newAccount, setNewAccount] = useState(true)
  const [error, setError] = useState('')

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
    <div>
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
        <p>{error}</p>
      </form>
      <span onClick={handleToggle}>
        {newAccount ? 'Sign In' : 'Create Account'}
      </span>
      <p></p>
      <button>Continue with Google</button>
      <button>Continue with Github</button>
    </div>
  )
}

export default Auth
