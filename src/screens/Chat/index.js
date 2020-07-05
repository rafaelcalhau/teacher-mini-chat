import React, { useContext, useEffect, useState } from 'react'
import { Snackbar } from 'react-native-paper'
import { store } from '../../store'
import { Loader } from '../../components/SharedStyled'
import {
  BackButton, BackIcon, Body, Container,
  Header, HeaderBody, Messages, UserName, UserType
} from './styled'
import { getLastMessages } from '../../services/firebase'

function Chat ({ navigation }) {
  const { state: { user } } = useContext(store)
  const [chatKey, setChatKey] = useState('')
  const [contact] = useState(navigation.getParam('contact'))
  const [messages, setMessages] = useState('')
  const [messagesLoaded, setMessagesLoaded] = useState(false)
  const [snackbar, handleSnackbar] = useState({ visible: false, text: '' })
  const [text, setText] = useState('')

  function handleDismissSnackBar () {
    handleSnackbar({ visible: false, text: '' })
  }

  function renderMessages () {
    if (!messagesLoaded) {
      return null
    }

    return (
      <Messages
        data={(messages || [])}
        keyExtractor={(item) => item.datetime}
        renderItem={({ item }) => null}
      />
    )
  }

  // function setSnack (text = '') {
  //   handleSnackbar({ visible: true, text })
  // }

  // onMount
  useEffect(() => {
    const chatKey = `${user.uid}${contact.uid}`
    setChatKey(chatKey)

    const loadMessages = async () => {
      const messages = (await getLastMessages(chatKey)) || []

      setMessages(messages)
      setMessagesLoaded(true)
    }

    loadMessages()
  }, []) // eslint-disable-line

  return (
    <>
      <Container>
        <Header>
          <BackButton>
            <BackIcon name='arrow-back' />
          </BackButton>

          <HeaderBody>
            <UserName>{user.name}</UserName>
            <UserType>{user.accountType}</UserType>
          </HeaderBody>
        </Header>

        <Body>
          {
            !messagesLoaded
              ? <Loader />
              : renderMessages()
          }

          <Snackbar
            visible={snackbar.visible}
            onDismiss={handleDismissSnackBar}
          >
            {snackbar.text}
          </Snackbar>
        </Body>
      </Container>
    </>
  )
}

export default Chat
