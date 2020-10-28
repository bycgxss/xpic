import React, {useRef} from 'react'
import {useStores} from '../stores'
import {observer} from 'mobx-react'

const Uploader = observer(() => {
  const {ImageStore} = useStores()
  const fileRef = useRef()
  const bindChange = () => {
    if (fileRef.current.files.length > 0) {
      ImageStore.setFile(fileRef.current.files[0])
      ImageStore.setFilename(fileRef.current.files[0].name)
      ImageStore.uploader()
        .then((serverFile) => {
          console.log('上传成功')
          console.log(serverFile)
        })
        .catch(() => {
          console.log('上传失败')
        })
    }
    console.log(fileRef.current)
    window.file = fileRef.current
  }

  return (
    <div>
      <h1>文件上传</h1>
      <input type="file" ref={fileRef} onChange={bindChange}/>
    </div>
  )
})

export default Uploader