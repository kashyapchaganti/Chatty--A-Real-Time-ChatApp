import React from 'react'
import { styled } from 'styled-components'
import welcome from "../assets/x.gif"

export default function Welcome({currentUser}) {
  return (
    <Container>
        <img src={welcome} alt="Robot" />
        <h1>Welcome, <span>{currentUser.username}</span></h1>
        <h3>Please, Select a Chat to Start Messaging</h3>
        
    </Container>
  )
}
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
  img {
    height: 20rem;
  }
  span {
    color: #4e0eff;
  }
`;
