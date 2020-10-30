import React from 'react'
import Tips from '../components/Tips'
import Uploader from '../components/Uploader'

const Home = () => {
  return (
    <>
      <Tips>请先登陆后再使用本功能</Tips>
      <Uploader/>
    </>
  )
}

export default Home