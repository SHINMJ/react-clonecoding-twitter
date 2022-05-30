import Nweet from 'components/Nweet'
import { firestoreService } from 'myFirebase'
import React, { useEffect, useState } from 'react'

const Home = ({ user }) => {
  const [nweet, setNweet] = useState('')
  const [nweets, setNweets] = useState([])
  const [attachment, setAttachment] = useState('')

  useEffect(() => {
    // firestore의 변화를 감지
    firestoreService.collection('nweets').onSnapshot((snapshot) => {
      const nweetsArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      setNweets(nweetsArr)
    })
  }, [])

  const handleChange = (event) => {
    const {
      target: { value },
    } = event

    setNweet(value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      await firestoreService.collection('nweets').add({
        text: nweet,
        createAt: Date.now(),
        creatorId: user.uid,
      })
      setNweet('')
    } catch (error) {
      console.log(error)
    }
  }

  const handleFileChange = (event) => {
    const {
      target: { files },
    } = event

    const theFile = files[0]
    const reader = new FileReader()
    reader.onloadend = (finishedEvent) => {
      const { currentTarget } = finishedEvent
      setAttachment(currentTarget.result)
    }

    reader.readAsDataURL(theFile)
    console.log(theFile)
  }

  const handleClearPhoto = (event) => {
    event.preventDefault()
    setAttachment(null)
  }

  return (
    <div>
      <h2>Home</h2>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          value={nweet}
          onChange={handleChange}
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <input type='file' accept='image/*' onChange={handleFileChange} />
        <input type='submit' value='Nweet' />
        {attachment && (
          <div>
            <img src={attachment} width='50px' height='50px' />
            <button onClick={handleClearPhoto}>clear photo</button>
          </div>
        )}
      </form>

      <div>
        {nweets.map((item) => (
          <Nweet
            key={item.id}
            nweetObj={item}
            isOwner={item.creatorId === user.uid}
          />
        ))}
      </div>
    </div>
  )
}

export default Home
