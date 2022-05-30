import { firestoreService, storageService } from 'myFirebase'
import React, { useState } from 'react'

const Nweet = ({ nweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false)
  const [newNweet, setNewNweet] = useState(nweetObj.text)

  const handleDelete = async () => {
    const ok = window.confirm('Are you sure you want to delete this nweet?')

    if (ok) {
      await storageService.refFromURL(nweetObj.attachmentUrl).delete()

      await firestoreService.doc(`nweets/${nweetObj.id}`).delete()
    }
  }

  const toggleEditing = () => setEditing((prev) => !prev)

  const handleChange = (event) => {
    const {
      target: { value },
    } = event

    setNewNweet(value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    await firestoreService.doc(`nweets/${nweetObj.id}`).update({
      text: newNweet,
    })

    setEditing(false)
  }

  return (
    <div>
      {editing ? (
        <>
          {isOwner && (
            <>
              <form onSubmit={handleSubmit}>
                <input
                  value={newNweet}
                  onChange={handleChange}
                  placeholder='Edit your nweet'
                  type='text'
                  required
                />
                <input type='submit' value='Update' />
              </form>
              <button onClick={toggleEditing}>Cancel</button>
            </>
          )}
        </>
      ) : (
        <>
          <h4>{nweetObj.text}</h4>
          {nweetObj.attachmentUrl && (
            <img src={nweetObj.attachmentUrl} width='50px' height='50px' />
          )}
          {isOwner && (
            <>
              <button onClick={handleDelete}>Delete</button>
              <button onClick={toggleEditing}>Edit</button>
            </>
          )}
        </>
      )}
    </div>
  )
}

export default Nweet
