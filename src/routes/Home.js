import { firestoreService } from 'myFirebase'
import React, { useEffect, useState } from 'react'

const Home = ({ user }) => {
  const [nweet, setNweet] = useState('')
  const [nweets, setNweets] = useState([])

  useEffect(() => {
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
        <input type='submit' value='Nweet' />
      </form>

      <div>
        {nweets.map((item) => (
          <div key={item.id}>
            <h4>{item.text}</h4>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home
