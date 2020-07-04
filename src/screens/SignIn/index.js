import React, { useContext, useEffect, useState } from 'react'
import { Keyboard } from 'react-native'
import { Snackbar } from 'react-native-paper'
import auth from '@react-native-firebase/auth'
import { store } from '../../store'
import { authenticate } from '../../store/actions'
import { isValidEmail, formatUserData } from '../../modules/utils'
import { Container, Content, CustomButton, Input, Logo, Title } from './styled'

function SignIn ({ navigation }) {
  const { state: { user }, dispatch } = useContext(store)
  const [email, handleEmail] = useState('')
  const [password, handlePassword] = useState('')
  const [isAuthenticating, setIsAuthenticating] = useState(false)
  const [snackbar, handleSnackbar] = useState({ visible: false, text: '' })

  function goToSignUp () {
    navigation.navigate('SignUp')
  }

  function handleDismissSnackBar () {
    handleSnackbar({ visible: false, text: '' })
  }

  async function handleLogin () {
    if (!isValidEmail(email)) {
      setSnack('Please enter a valid Email Address')
    } else if (password.length < 6) {
      setSnack('Your password must have atleast 6 characters.')
    } else {
      setIsAuthenticating(true)

      await auth()
        .signInWithEmailAndPassword(email, password)
        .then(user => dispatch(authenticate(formatUserData(user))))
        .catch(error => {
          const errorCode = error.code
          const errorMessage = error.message

          if (errorCode === 'auth/user-not-found') {
            setSnack('The user is not registered.')
          } else if (errorCode === 'auth/weak-password') {
            setSnack('The password is too weak.')
          } else if (errorCode === 'auth/wrong-password') {
            setSnack('The password is incorrect.')
          } else {
            console.tron('[signInWithEmailAndPassword] error', errorMessage)
          }
        })

      setIsAuthenticating(false)
    }
  }

  function setSnack (text = '') {
    handleSnackbar({ visible: true, text })
  }

  // update when user is logged in
  useEffect(() => {
    if (user && user.uid) {
      navigation.navigate('Chats')
    }
  }, [user]) // eslint-disable-line

  return (
    <Container onTouchStart={(ev) => {
      Keyboard.dismiss()
      ev.stopPropagation()
    }}
    >
      <Content>
        <Logo />
        <Title>SIGN IN</Title>

        <Input
          label='Your email address'
          onChangeText={handleEmail}
          value={email}
          width='80%'
        />
        <Input
          secureTextEntry
          label='Your password'
          onChangeText={handlePassword}
          value={password}
          width='80%'
        />

        <CustomButton loading={isAuthenticating} label='LOGIN' width='80%' onPress={handleLogin} />
        <CustomButton outline label='CREATE ACCOUNT' width='80%' onPress={goToSignUp} />
      </Content>

      <Snackbar
        visible={snackbar.visible}
        onDismiss={handleDismissSnackBar}
      >
        {snackbar.text}
      </Snackbar>
    </Container>
  )
}

export default SignIn
