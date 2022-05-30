import Attachment from 'components/Attachment'
import NweetFactory from 'components/NweetFactory'
import Nweet from 'components/Nweet'
import { firestoreService } from 'myFirebase'
import React, { useEffect, useState } from 'react'

const Home = ({ user }) => {
  const [nweets, setNweets] = useState([])

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

  return (
    <div>
      <h2>Home</h2>
      <NweetFactory user={user} />

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
