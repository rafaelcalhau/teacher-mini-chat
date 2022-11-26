import React from 'react'
import {
  Avatar, AvatarView, Badge, Body, Container,
  Details, Icon, LastMessage, Name, Time
} from './styled'

function Contact (props) {
  const { onPress } = props
  const { accountType, lastMessage, name, newMessages } = props.data
  const handlePress = onPress || (() => null)
  const iconName = accountType === 'student' ? 'user-graduate' : 'user-tie'
  const image = props.image || require('@app/assets/student-avatar-small.png')
  const thereIsLastMessage = (lastMessage?.length ?? 0) > 0

  return (
    <Container onPress={handlePress}>
      <AvatarView>
        <Avatar source={image} />
        <Icon size={14} name={iconName} />
      </AvatarView>
      <Body>
        <Name>{name}</Name>
        {thereIsLastMessage && <LastMessage>{lastMessage}</LastMessage>}
      </Body>
      {thereIsLastMessage && (
        <Details>
          <Time>lastMessage.time</Time>
          {(newMessages && newMessages > 0) && <Badge>{newMessages}</Badge>}
        </Details>
      )}
    </Container>
  )
}

export default Contact
