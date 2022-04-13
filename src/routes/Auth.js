import React, { useState } from 'react'

const Auth = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleChangeEmail = (event) => {
    setEmail(event.target.value)
  }

  const handleChangePassword = (event) => {
    setPassword(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    console.log(email, password)
  }

  return (
    <div>
      <form>
        <input
          name='email'
          type='text'
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
        <input onSubmit={handleSubmit} type='submit' value='Log In' />
      </form>
      <button>Continue with Google</button>
      <button>Continue with Github</button>
    </div>
  )
}

export default Auth
