import Attachment from 'components/Attachment'
import { firestoreService } from 'myFirebase'
import React, { useEffect, useRef, useState } from 'react'

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
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        value={nweet}
        onChange={handleChange}
        placeholder="What's on your mind?"
        maxLength={120}
      />
      <Attachment user={user} ref={attachmentRef} label='add Photo' />
      <input type='submit' value='Nweet' />
    </form>
  )
}

export default NweetFactory
