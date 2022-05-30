import { firebaseInstance, authService } from 'myFirebase'
import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faTwitter,
  faGoogle,
  faGithub,
} from '@fortawesome/free-brands-svg-icons'

const SocailForm = ({ setError }) => {
  const handleSocialLogin = async (event) => {
    const {
      target: { name },
    } = event

    let provider
    if (name == 'google') {
      provider = new firebaseInstance.auth.GoogleAuthProvider()
    } else if (name == 'github') {
      provider = new firebaseInstance.auth.GithubAuthProvider()
    }

    try {
      const data = await authService.signInWithPopup(provider)

      console.log(data)
    } catch (error) {
      console.log(error)
      setError(error.message)
    }
  }
  return (
    <div className='authBtns'>
      <button name='google' onClick={handleSocialLogin} className='authBtn'>
        Continue with Google <FontAwesomeIcon icon={faGoogle} />
      </button>
      <button name='github' onClick={handleSocialLogin} className='authBtn'>
        Continue with Github <FontAwesomeIcon icon={faGithub} />
      </button>
    </div>
  )
}

export default SocailForm
