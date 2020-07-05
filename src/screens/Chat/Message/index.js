import React from 'react'
import moment from 'moment'
import { Bubble, BubbleArrow, Text, Time, Wrapper } from './styled'

function Message ({ data, self }) {
  const isSelfMessage = self || false
  const time = moment(data.createdAt).format('H:m')

  return (
    <Wrapper>
      <Bubble self={isSelfMessage}>
        <Text self={isSelfMessage}>{data.text}</Text>
        <Time>{time}</Time>
      </Bubble>
      <BubbleArrow />
    </Wrapper>
  )
}

export default Message
