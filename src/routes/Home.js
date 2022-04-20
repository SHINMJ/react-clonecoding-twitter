import { firestoreService } from 'myFirebase'
import React, { useEffect, useState } from 'react'

const Home = () => {
  const [nweet, setNweet] = useState('')
  const [nweets, setNweets] = useState([])

  const getNweets = async () => {
    try {
      const dbNweets = await firestoreService.collection('nweets').get()

      dbNweets.forEach((doc) => {
        const nweetObj = {
          data: doc.data(),
          id: doc.id,
        }
        setNweets((prev) => [nweetObj, ...prev])
      })

      console.log(nweets)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getNweets()
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
        nweet,
        createAt: Date.now(),
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
            <h4>{item.data.nweet}</h4>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home
