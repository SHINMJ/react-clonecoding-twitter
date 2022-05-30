import AuthForm from 'components/AuthForm'
import SocailForm from 'components/SocialForm'
import { firebaseInstance, authService } from 'myFirebase'
import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faTwitter,
  faGoogle,
  faGithub,
} from '@fortawesome/free-brands-svg-icons'

const Auth = () => {
  const [error, setError] = useState('')

  return (
    <div className='authContainer'>
      <FontAwesomeIcon
        icon={faTwitter}
        color={'#04AAFF'}
        size='3x'
        style={{ marginBottom: 30 }}
      />
      <AuthForm setError={setError} />
      <SocailForm setError={setError} />
      <p>{error}</p>
    </div>
  )
}

export default Auth
