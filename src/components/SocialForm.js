import { firebaseInstance, authService } from 'myFirebase'
import React, { useState } from 'react'

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
    <>
      <button name='google' onClick={handleSocialLogin}>
        Continue with Google
      </button>
      <button name='github' onClick={handleSocialLogin}>
        Continue with Github
      </button>
    </>
  )
}

export default SocailForm
