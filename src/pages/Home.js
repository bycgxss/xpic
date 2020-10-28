import React from 'react'
import {observer} from 'mobx-react'
import Tips from '../components/Tips'

import Uploader from '../components/Uploader'

const Home = observer(() => {
  return (
    <>
      <Tips>请先登陆后再使用本功能</Tips>
      <Uploader/>
    </>
  )
})

export default Home