import React from 'react'
import {
  Avatar, Badge, Body, Container, Details,
  LastMessage, Name, Time
} from './styled'

function Contact (props) {
  const { name } = props.data
  const image = props.image || require('../../../assets/alumni-avatar-small.png')

  return (
    <Container>
      <Avatar source={image} />
      <Body>
        <Name>{name}</Name>
        <LastMessage>Something here...</LastMessage>
      </Body>
      <Details>
        <Time>09:25</Time>
        <Badge>2</Badge>
      </Details>
    </Container>
  )
}

export default Contact
