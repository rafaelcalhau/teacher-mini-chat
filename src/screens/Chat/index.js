import React, { useContext, useEffect, useState } from 'react'
import { NativeModules, Platform } from 'react-native'
import { Snackbar } from 'react-native-paper'

import { store } from '@app/store'
import { Loader } from '@app/components/SharedStyled'
import {
  getLastMessages,
  sendMessage,
  subscribeToNewMessages,
  unsubscribeToNewMessages
} from '@app/services/firebase'

import ChatList from './ChatList'
import {
  Avatar,
  BackIcon,
  Body,
  Container,
  Form,
  FormControls,
  FormIcon,
  Header,
  HeaderBody,
  IconButton,
  Input,
  UserName,
  UserType,
  Wrapper
} from './styled'

function Chat ({ navigation, route }) {
  const { contact } = route.params
  const { state: { user } } = useContext(store)
  const [chatKey, setChatKey] = useState('')
  const [messages, setMessages] = useState([])
  const [messagesLoaded, setMessagesLoaded] = useState(false)
  const [snackbar, handleSnackbar] = useState({ visible: false, text: '' })
  const [text, setText] = useState('')
  const [statusBarHeight, setStatusBarHeight] = useState(0)

  function handleDismissSnackBar () {
    handleSnackbar({ visible: false, text: '' })
  }

  async function handleSend () {
    if (!text.length) {
      return
    }

    await sendMessage(user.uid, chatKey, text)
    setText('')
    // chatListRef.scrollToEnd(true)
  }

  function renderAvatar () {
    return contact.image || require('../../assets/alumni-avatar-small.png')
  }

  // onMount
  useEffect(() => {
    const uids = [user.uid, contact.uid].sort((a, b) => a > b ? 1 : -1)
    const chatKey = uids.join('')

    setChatKey(chatKey)

    const loadMessages = async () => {
      const newMessages = await getLastMessages(chatKey, 15)

      setMessages(newMessages)
      setMessagesLoaded(true)

      // chatListRef.scrollToEnd(true)
    }

    const subscription = subscribeToNewMessages(chatKey, message => {
      setMessages(messages => [...messages, message])
      // chatListRef.scrollToEnd(true)
    })

    const { StatusBarManager } = NativeModules

    StatusBarManager
      .getHeight((statusBarFrameData) => setStatusBarHeight(statusBarFrameData.height))

    loadMessages()

    // onUnmount
    return async () => unsubscribeToNewMessages(chatKey, await subscription)
  }, []) // eslint-disable-line

  return (
    <Wrapper
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={statusBarHeight}
    >
      <Container>
        <Header>
          <IconButton onPress={() => navigation.goBack()}>
            <BackIcon name='arrow-back' size={34} />
          </IconButton>

          <Avatar size={36} source={renderAvatar()} />

          <HeaderBody>
            <UserName>{contact.name}</UserName>
            <UserType>{contact.accountType}</UserType>
          </HeaderBody>
        </Header>

        {!messagesLoaded && <Loader size='small' />}

        <Body>
          <ChatList data={messages} userUid={user.uid} />
        </Body>

        <Snackbar
          visible={snackbar.visible}
          onDismiss={handleDismissSnackBar}
        >
          {snackbar.text}
        </Snackbar>

        <Form>
          <Input
            placeholder='Send a message...'
            onChangeText={setText}
            value={text}
            autoCapitalize='none'
            placeholderTextColor='rgba(255, 255, 255, .5)'
          />

          <FormControls>
            {
              text.length === 0
                ? (
                  <>
                    <IconButton>
                      <FormIcon name='camera' size={22} />
                    </IconButton>

                    <IconButton>
                      <FormIcon name='microphone' size={22} />
                    </IconButton>
                  </>
                ) : (
                  <IconButton onPress={handleSend}>
                    <FormIcon name='send' size={22} />
                  </IconButton>
                )
            }
          </FormControls>
        </Form>
      </Container>
    </Wrapper>
  )
}

export default Chat
