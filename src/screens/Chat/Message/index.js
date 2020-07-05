import React from 'react'
import moment from 'moment'
import { Bubble, BubbleArrow, Text, Time, Wrapper } from './styled'

function Message ({ data, self }) {
  const isSelf = self || false
  const time = moment(data.createdAt).format('H:m')

  return (
    <Wrapper>
      <Bubble self={isSelf}>
        <Text self={isSelf}>{data.text}</Text>
        <Time>{time}</Time>
      </Bubble>
      <BubbleArrow self={isSelf} />
    </Wrapper>
  )
}

export default Message
