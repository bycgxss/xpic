import React from 'react'
import Logo from './logo.svg'
import { NavLink, useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { Button, message } from 'antd'
import { useStores } from '../stores'
import { observer } from 'mobx-react'

const StyledHeader = styled.header`
  background-color: #02101f;
  padding: 10px 80px;
  display:flex;
  align-items:center;
  > img {
    height: 30px;
  }
`

const StyledLink = styled(NavLink)`
  color: #fff;
  margin-left: 50px;
  &.active {
    color: rgb(53, 150, 255);
  }
`

const StyledLogin = styled.div`
  margin-left: auto;
  color: #fff;
  > button {
    margin-left: 10px;
  }
`

const Header = observer(() => {
  const {UserStore, AuthStore} = useStores()
  const history = useHistory()

  const handleLogout = () => {
    AuthStore.logout()
    message.info('已注销')
    history.push('/')
  }

  const handleLogin = () => {
    console.log('跳转到登陆页面')
    history.push('/login')
  }

  const handleRegister = () => {
    console.log('跳转到注册页面')
    history.push('/register')

  }



  return (
    <StyledHeader>
      <img src={Logo} alt=""/>
      <nav>
        <StyledLink to='/' activeClassName='active' exact>首页</StyledLink>
        <StyledLink to='/history' activeClassName='active'>上传历史</StyledLink>
        <StyledLink to='/about' activeClassName='active'>关于我</StyledLink>
      </nav>
      <StyledLogin>
        {
          UserStore.currentUser ?
            <>
              {UserStore.currentUser.attributes.username } <Button type="primary" onClick={() => handleLogout()}>注销</Button>
            </>
          :
            <>
              <Button type="primary" onClick={() => handleLogin()}>登陆</Button>
              <Button type="primary" onClick={() => handleRegister()}>注册</Button>
            </>
        }
      </StyledLogin>
    </StyledHeader>
  )
})

export default Header