import Attachment from 'components/Attachment'
import { firestoreService } from 'myFirebase'
import React, { useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons'

const NweetFactory = ({ user }) => {
  const [nweet, setNweet] = useState('')
  const attachmentRef = useRef()

  const handleChange = (event) => {
    const {
      target: { value },
    } = event

    setNweet(value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const attachmentUrl = await attachmentRef.current.upload()

    try {
      const nweetObj = {
        text: nweet,
        createAt: Date.now(),
        creatorId: user.uid,
        attachmentUrl,
      }
      await firestoreService.collection('nweets').add(nweetObj)
      setNweet('')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className='factoryForm'>
      <div className='factoryInput__container'>
        <input
          type='text'
          value={nweet}
          onChange={handleChange}
          placeholder="What's on your mind?"
          maxLength={120}
          className='factoryInput__input'
        />

        <input type='submit' value='&rarr;' className='factoryInput__arrow' />
      </div>
      <Attachment user={user} ref={attachmentRef} label='add Photo' />
    </form>
  )
}

export default NweetFactory
