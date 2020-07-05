import React, { useContext, useEffect, useState } from 'react'
import { Platform } from 'react-native'
import { Snackbar } from 'react-native-paper'
import { store } from '../../store'
import { Loader } from '../../components/SharedStyled'
import Message from './Message'
import {
  Avatar, BackIcon, Body, Container, Form, FormControls, FormIcons,
  Header, HeaderBody, IconButton, Input, Messages, UserName,
  UserType, Wrapper
} from './styled'
import {
  getLastMessages, sendMessage,
  subscribeToNewMessages, unsubscribeToNewMessages
} from '../../services/firebase'

function Chat ({ navigation }) {
  const { state: { user } } = useContext(store)
  const [chatKey, setChatKey] = useState('')
  const [contact] = useState(navigation.getParam('contact'))
  const [messages, setMessages] = useState([])
  const [messagesLoaded, setMessagesLoaded] = useState(false)
  const [snackbar, handleSnackbar] = useState({ visible: false, text: '' })
  const [text, setText] = useState('')

  function handleDismissSnackBar () {
    handleSnackbar({ visible: false, text: '' })
  }

  async function handleSend () {
    if (!text.length) {
      return
    }

    await sendMessage(user.uid, chatKey, text)
    setText('')
  }

  function renderAvatar () {
    return contact.image || require('../../assets/alumni-avatar-small.png')
  }

  function renderMessages () {
    if (!messagesLoaded) {
      return null
    }

    return (
      <Messages
        data={(messages || [])}
        keyExtractor={(item) => String(item.createdAt)}
        renderItem={({ item }) => <Message data={item} self={item.from === user.uid} />}
      />
    )
  }

  // function setSnack (text = '') {
  //   handleSnackbar({ visible: true, text })
  // }

  // onMount
  useEffect(() => {
    const uids = [user.uid, contact.uid].sort((a, b) => a > b ? 1 : -1)
    const chatKey = uids.join('')

    setChatKey(chatKey)

    const loadMessages = async () => {
      const newMessages = await getLastMessages(chatKey, 15)

      setMessages(newMessages)
      setMessagesLoaded(true)
    }

    const subscription = subscribeToNewMessages(chatKey, message => {
      console.tron('subscription.message', message)
      setMessages(messages => [...messages, message])
    })

    loadMessages()

    // onUnmount
    return async () => unsubscribeToNewMessages(chatKey, await subscription)
  }, []) // eslint-disable-line

  return (
    <Wrapper
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={44}
    >
      <Container>
        <Header>
          <IconButton onPress={() => navigation.goBack()}>
            <BackIcon name='arrow-back' />
          </IconButton>

          <Avatar source={renderAvatar()} />

          <HeaderBody>
            <UserName>{contact.name}</UserName>
            <UserType>{contact.accountType}</UserType>
          </HeaderBody>
        </Header>

        <Body>
          {
            !messagesLoaded
              ? <Loader />
              : renderMessages()
          }
        </Body>

        <Snackbar
          visible={snackbar.visible}
          onDismiss={handleDismissSnackBar}
        >
          {snackbar.text}
        </Snackbar>
      </Container>
      <Form>
        <Input placeholder='Send a message...' onChangeText={setText} value={text} />
        <FormControls>
          {
            text.length === 0
              ? (
                <>
                  <IconButton>
                    <FormIcons.Camera />
                  </IconButton>

                  <IconButton>
                    <FormIcons.Mic />
                  </IconButton>
                </>
              ) : (
                <IconButton onPress={handleSend}>
                  <FormIcons.Send />
                </IconButton>
              )
          }
        </FormControls>
      </Form>
    </Wrapper>
  )
}

export default Chat
