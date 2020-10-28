import React from 'react'
import {useStores} from '../stores'
import {observer} from 'mobx-react'
import styled from 'styled-components'

const StyledDiv = styled.div`
  background-color: rgb(53, 150, 255);
  padding: 10px;
  margin-bottom: 20px;
  color: #fff;
  border-radius: 4px;
`

const Tips = observer(({children}) => {
  const {UserStore} = useStores()
  return (
    <>
      {
        UserStore.currentUser ? null : <StyledDiv>{children}</StyledDiv>
      }
    </>
  )
})

export default Tips
