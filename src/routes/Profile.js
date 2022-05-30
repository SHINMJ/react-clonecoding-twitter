import React, { useEffect, useState, useRef } from 'react'
import { authService, firestoreService } from 'myFirebase'
import { useHistory } from 'react-router-dom'
import Attachment from 'components/Attachment'

const Profile = ({ user, refreshUser }) => {
  const history = useHistory()
  const [newDisplayName, setNewDisplayName] = useState(user.displayName)
  const [newPhotoUrl, setNewPhotoUrl] = useState(user.photoURL)
  const attachmentRef = useRef()

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

    const attachmentUrl = await attachmentRef.current.upload()

    if (user.displayName === newDisplayName && attachmentUrl === '') {
      return
    }

    await user.updateProfile({
      displayName: newDisplayName,
      photoURL: attachmentUrl,
    })

    setNewPhotoUrl(attachmentUrl)

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
      <form onSubmit={handleSubmit} className='profileForm'>
        <div className='container'>
          <input
            type='text'
            placeholder='Display Name'
            text={newDisplayName}
            onChange={handleDisplayNameChange}
            className='formInput'
            autoFocus
          />

          <Attachment
            user={user}
            ref={attachmentRef}
            label='add Profile Photo'
            url={newPhotoUrl}
          />
          <input
            type='submit'
            value='update profile'
            className='formBtn'
            style={{
              marginTop: 10,
            }}
          />
          <span className='formBtn cancelBtn logOut' onClick={handleLogout}>
            Log Out
          </span>
        </div>
      </form>
    </>
  )
}

export default Profile
