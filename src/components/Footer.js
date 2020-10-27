import React from 'react'
import styled from 'styled-components'


const StyledFooter = styled.footer`
  padding: 10px 80px;
  text-align: center;
  font-size: 12px;
  color: #aaa;
`

function Footer() {
  return (
    <StyledFooter>
      <p>Footer</p>
    </StyledFooter>
  )
}

export default Footer