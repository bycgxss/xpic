import React, {useState} from 'react'
import Logo from './logo.svg'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { Button } from 'antd'

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
    border-bottom: 1px solid #fff;
  }
`

const StyledLogin = styled.div`
  margin-left: auto;
  color: #fff;
  > button {
    margin-left: 10px;
  }
`

function Header() {
  const [isLogin, setIsLogin] = useState(false)
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
          isLogin ?
            <>
              bycgxss <Button type="primary" onClick={() => setIsLogin(false)}>注销</Button>
            </>
          :
            <>
              <Button type="primary" onClick={() => setIsLogin(true)}>登陆</Button>
              <Button type="primary">注册</Button>
            </>
        }
      </StyledLogin>
    </StyledHeader>
  )
}

export default Header