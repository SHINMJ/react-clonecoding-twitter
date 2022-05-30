import React, { useEffect, useState } from 'react'
import { authService, firestoreService } from 'myFirebase'
import { useHistory } from 'react-router-dom'

const Profile = ({ user, refreshUser }) => {
  const history = useHistory()
  const [newDisplayName, setNewDisplayName] = useState(user.displayName)

  const getMyNweets = async () => {
    const nweets = await firestoreService
      .collection('nweets')
      .where('creatorId', '==', user.uid)
      .orderBy('createAt', 'desc')
      .get()

    console.log(nweets.docs)
  }

  useEffect(() => {
    getMyNweets()
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (user.displayName === newDisplayName) {
      return
    }

    await user.updateProfile({
      displayName: newDisplayName,
    })

    refreshUser()
  }

  const handleDisplayNameChange = (event) => {
    const {
      target: { value },
    } = event
    setNewDisplayName(value)
  }

  const handleLogout = () => {
    authService.signOut()
    history.push('/')
  }

  return (
    <>
      <h2>profile</h2>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Display Name'
          text={newDisplayName}
          onChange={handleDisplayNameChange}
        />
        <input type='submit' value='update profile' />
      </form>
      <button onClick={handleLogout}>Logout</button>
    </>
  )
}

export default Profile
