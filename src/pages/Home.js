import React from 'react'
import {observer} from 'mobx-react'
import {useStores} from '../stores'

const Home = observer(() => {
  const {UserStore} = useStores()

  return (
    <>
      {
        UserStore.currentUser
          ? <h1>Hello,{UserStore.currentUser.attributes.username}</h1>
          : <h1>home</h1>
      }
    </>
  )
})

export default Home