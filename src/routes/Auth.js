import AuthForm from 'components/AuthForm'
import SocailForm from 'components/SocialForm'
import { firebaseInstance, authService } from 'myFirebase'
import React, { useState } from 'react'

const Auth = () => {
  const [error, setError] = useState('')

  return (
    <div>
      <AuthForm setError={setError} />
      <SocailForm setError={setError} />
      <p>{error}</p>
    </div>
  )
}

export default Auth
