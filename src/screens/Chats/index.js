import React, { useContext } from 'react'
import { store } from '../../store'
import {
  Body, ButtonLogout, Container, Header, HeaderBody,
  HeaderIcon, Title, UserName, UserType
} from './styled'
import { logout } from '../../services/firebase'
import { User as UserStorage } from '../../services/localstorage'

function Chats ({ navigation }) {
  const { dispatch, state: { user } } = useContext(store)

  function handleLogout () {
    logout(dispatch)

    UserStorage.delete()
    navigation.navigate('SignIn')
  }

  return (
    <Container>
      <Header>
        <HeaderIcon name='user' />

        <HeaderBody>
          <UserName>{user.name}</UserName>
          <UserType>{user.accountType}</UserType>
        </HeaderBody>

        <ButtonLogout onPress={handleLogout}>
          <HeaderIcon name='logout' />
        </ButtonLogout>
      </Header>

      <Body>
        <Title>Chats</Title>
      </Body>
    </Container>
  )
}

export default Chats
