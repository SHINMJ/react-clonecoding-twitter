import { firestoreService, storageService } from 'myFirebase'
import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPencilAlt } from '@fortawesome/free-solid-svg-icons'

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
    <div className='nweet'>
      {editing ? (
        <>
          {isOwner && (
            <>
              <form onSubmit={handleSubmit} className='container nweetEdit'>
                <input
                  value={newNweet}
                  onChange={handleChange}
                  placeholder='Edit your nweet'
                  type='text'
                  required
                  className='formInput'
                  autoFocus
                />
                <input type='submit' value='Update' className='formBtn' />
              </form>
              <button onClick={toggleEditing} className='formBtn cancelBtn'>
                Cancel
              </button>
            </>
          )}
        </>
      ) : (
        <>
          <h4>{nweetObj.text}</h4>
          {nweetObj.attachmentUrl && <img src={nweetObj.attachmentUrl} />}
          {isOwner && (
            <div class='nweet__actions'>
              <span onClick={handleDelete}>
                <FontAwesomeIcon icon={faTrash} />
              </span>
              <span onClick={toggleEditing}>
                <FontAwesomeIcon icon={faPencilAlt} />
              </span>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default Nweet
