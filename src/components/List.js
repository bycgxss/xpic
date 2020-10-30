import React, {useEffect} from 'react'
import {observer} from 'mobx-react'
import {useStores} from '../stores'
import InfiniteScroll from 'react-infinite-scroller'
import {List as AntdList, Spin} from 'antd'
import styled from 'styled-components'

const Img = styled.img`
  width: 100px;
  height: 120px;
  object-fit: contain;
  border: 1px solid #eee;
`

const List = observer(() => {

  const {HistoryStore} = useStores()

  const loadMore = () => {
    HistoryStore.find()
  }

  /* eslint-disable */
  useEffect(() => {
    console.log('进入组件')
    return () => {
      HistoryStore.reset()
    }
  }, [])
  /* eslint-enable */

  return (
    <div>
      <InfiniteScroll
        initialLoad={true}
        pageStart={0}
        loadMore={loadMore}
        hasMore={!HistoryStore.isLoading && HistoryStore.hasMore}
        useWindow={true}
      >
        <AntdList
          dataSource={HistoryStore.list}
          renderItem={item =>
            <AntdList.Item key={item.id}>
              <div>
                <Img src={item.attributes.url.attributes.url}/>
              </div>
              <div>
                <h5>{item.attributes.filename}</h5>
              </div>
              <div>
                <a href={item.attributes.url.attributes.url} target="_blank"
                   rel="noopener noreferrer">{item.attributes.url.attributes.url}</a>
              </div>
            </AntdList.Item>
          }
        >
          {HistoryStore.isLoading && HistoryStore.hasMore && (
            <div>
              <Spin tip="加载中"/>
            </div>
          )}
        </AntdList>
      </InfiniteScroll>
    </div>
  )
})

export default List