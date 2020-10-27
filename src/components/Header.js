import React from 'react'
import Logo from './logo.svg'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

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

function Header() {
  return (
    <StyledHeader>
      <img src={Logo} alt=""/>
      <nav>
        <StyledLink to='/' activeClassName='active' exact>首页</StyledLink>
        <StyledLink to='/history' activeClassName='active'>上传历史</StyledLink>
        <StyledLink to='/about' activeClassName='active'>关于我</StyledLink>
      </nav>
      <button>
        <StyledLink to='/login'>登陆</StyledLink>
      </button>
      <button>
        <StyledLink to='/register'>注册</StyledLink>
      </button>
    </StyledHeader>
  )
}

export default Header