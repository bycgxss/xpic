import React, {useRef} from 'react'
import {useStores} from '../stores'
import {observer, useLocalStore} from 'mobx-react'
import {Upload, message, Spin} from 'antd'
import {InboxOutlined} from '@ant-design/icons'
import styled from 'styled-components'

const {Dragger} = Upload

const ResultDiv = styled.div`
  margin-top: 30px;
  border: 1px dashed #ccc;
  padding: 20px;
  img { max-height: 200px; }
  a { color: rgb(53, 150, 255); }
  dt { margin-bottom: 5px; }
  [type='text'] {margin-right: 10px; border-radius: 4px}
`


const Uploader = observer(() => {
  const {ImageStore, UserStore} = useStores()
  const widthRef = useRef()
  const heightRef = useRef()

  const store = useLocalStore(() => ({
    width: null,
    height: null,

    setWidth(width) {
      store.width = width
    },
    setHeight(height) {
      store.height = height
    },

    get widthStr() {
      return store.width ? `/w/${store.width}` : ''
    },
    get heightStr() {
      return store.height ? `/h/${store.height}` : ''
    },
    get fullStr() {
      return ImageStore.serverFile.attributes.url.attributes.url + '?imageView2/0' + store.widthStr + store.heightStr
    }
  }))

  const bindWidthChange = () => {
    store.setWidth(widthRef.current.value)
  }

  const bindHeightChange = () => {
    store.setHeight(heightRef.current.value)
  }

  const props = {
    showUploadList: false,
    beforeUpload: file => {
      ImageStore.setFile(file)
      ImageStore.setFilename(file.name)
      if (UserStore.currentUser === null) {
        message.warning('请先登陆！')
        return false
      }
      if (!/(svg$)|(png$)|(jpg$)|(jpeg$)|(gif$)/ig.test(file.type)) {
        message.error('只能上传.png/.svg/.jpg/.jpeg/.gif格式的图片')
        return false
      }
      if (file.size > 1024 * 1024) {
        message.error('只能上传1M大小的图片')
        return false
      }
      ImageStore.uploader()
        .then((serverFile) => {
          console.log('上传成功')
          console.log(serverFile)
        })
        .catch(() => {
          console.log('上传失败')
        })
      return false
    }
  }

  return (
    <div>
      <Spin tip="上传中" spinning={ImageStore.isUploading}>
        <Dragger {...props}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined/>
          </p>
          <p className="ant-upload-text">点击或拖拽即可上传</p>
          <p className="ant-upload-hint">
            仅支持.png/.svg/.jpg/.jpeg/.gif格式图片，可上传1M大小的图片
          </p>
        </Dragger>
      </Spin>
      {
        ImageStore.serverFile
          ? <ResultDiv>
            <h1>上传结果：</h1>
            <dl>
              <dt>线上地址：</dt>
              <dd><a href={ImageStore.serverFile.attributes.url.attributes.url} target="_blank"
                     rel="noreferrer">{ImageStore.serverFile.attributes.url.attributes.url}</a></dd>
              <dt>文件名：</dt>
              <dd>{ImageStore.filename}</dd>
              <dt>图片预览：</dt>
              <dd><img src={ImageStore.serverFile.attributes.url.attributes.url} alt=""/></dd>
              <dt>更多尺寸（px）：</dt>
              <dd>
                最大宽度：<input type="number" onChange={bindWidthChange} placeholder="可选" ref={widthRef}/>
                最大高度：<input type="number" onChange={bindHeightChange} placeholder="可选" ref={heightRef}/>
              </dd>
              <dd><a href={store.fullStr} target="_blank" rel="noreferrer">{store.fullStr}</a></dd>
            </dl>
          </ResultDiv>
          : null
      }
    </div>
  )
})

export default Uploader