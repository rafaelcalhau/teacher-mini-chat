import React from 'react'
import {
  Avatar, Badge, Body, Container, Details,
  LastMessage, Name, Time
} from './styled'

function Contact (props) {
  const { onPress } = props
  const { lastMessage, name, newMessages } = props.data
  const handlePress = onPress || (() => null)
  const image = props.image || require('../../../assets/alumni-avatar-small.png')

  return (
    <Container onPress={handlePress}>
      <Avatar source={image} />
      <Body>
        <Name>{name}</Name>
        {lastMessage.length > 0 && <LastMessage>{lastMessage}</LastMessage>}
      </Body>
      {
        lastMessage.length > 0 && (
          <Details>
            <Time>lastMessage.time</Time>
            {(newMessages && newMessages > 0) && <Badge>{newMessages}</Badge>}
          </Details>
        )
      }
    </Container>
  )
}

export default Contact
