import React from 'react'
import { FlatList } from 'react-native'
import Message from '../Message'

export default class ChatList extends React.Component {
  componentDidMount () {
    this.timer = setTimeout(() => {
      this.myList.scrollToEnd({ animated: true })
    }, 1000)
  }

  componentDidUpdate (prevProps) {
    if (prevProps.data.length < this.props.data.length) {
      this.myList.scrollToEnd({ animated: true })
    }
  }

  componentWillUnmount () {
    if (this.timer) {
      clearInterval(this.timer)
    }
  }

  render () {
    return (
      <FlatList
        ref={ref => { this.myList = ref }}
        data={this.props.data}
        keyExtractor={(item) => String(item.createdAt)}
        renderItem={({ item }) => <Message data={item} self={item.from === this.props.userUid} />}
      />
    )
  }
}
