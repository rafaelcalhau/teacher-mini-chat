import React from 'react'
import {
  Avatar, AvatarView, Badge, Body, Container,
  Details, Icon, LastMessage, Name, Time
} from './styled'

function Contact (props) {
  const { onPress } = props
  const { accountType, lastMessage, name, newMessages } = props.data
  const handlePress = onPress || (() => null)
  const iconName = accountType === 'alumni' ? 'user-graduate' : 'user-tie'
  const image = props.image || require('../../../assets/alumni-avatar-small.png')

  return (
    <Container onPress={handlePress}>
      <AvatarView>
        <Avatar source={image} />
        <Icon size={14} name={iconName} />
      </AvatarView>
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
