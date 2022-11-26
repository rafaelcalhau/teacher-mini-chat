import React, { useContext, useEffect, useState } from 'react'
import { Keyboard, View } from 'react-native'
import { Snackbar } from 'react-native-paper'

import { ROUTES } from '@app/constants'
import { signin, getProfile } from '@app/services/firebase'
import { User as UserStorage } from '@app/services/localstorage'
import { store } from '@app/store'
import { authenticate } from '@app/store/actions'
import { isValidEmail, formatUserData } from '@app/modules/utils'
import {
  CustomButton,
  Input,
  Logo,
  Title
} from './styled'
import {
  FormScrollView,
  Grid,
  ScreenContainerView
} from '@app/components/SharedStyled'

function SignIn ({ navigation }) {
  const { state: { user }, dispatch } = useContext(store)
  const [email, handleEmail] = useState('')
  const [password, handlePassword] = useState('')
  const [isAuthenticating, setIsAuthenticating] = useState(false)
  const [snackbar, handleSnackbar] = useState({ visible: false, text: '' })

  function goToSignUp () {
    navigation.navigate(ROUTES.SignUp)
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

      await signin(email, password)
        .then(async ({ user }) => {
          if (user) {
            const userData = formatUserData(user)
            const profile = await getProfile(userData.uid)
    
            // Register the authentication
            dispatch(authenticate({ ...userData, ...profile }))
    
            // Register user on local storage
            UserStorage.put({ ...userData, password })
          } else {
            setSnack('Sorry, something wrong happened.')
          }
        })
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
            console.log('@tron', '[signInWithEmailAndPassword] error', errorMessage)
          }
        })
        .finally(() => setIsAuthenticating(false))
    }
  }

  function setSnack (text = '') {
    handleSnackbar({ visible: true, text })
  }

  // update when user is logged in
  useEffect(() => {
    if (user && user.uid) {
      navigation.navigate(ROUTES.Chats)
    }
  }, [user]) // eslint-disable-line

  return (
    <ScreenContainerView
      onTouchStart={(ev) => {
        Keyboard.dismiss()
        ev.stopPropagation()
      }}
    >
      <FormScrollView
        contentContainerStyle={{
          alignItems: 'center',
          alignSelf: 'stretch',
          justifyContent: 'center',
          flex: 1
        }}
      >
        <Logo source={require('../../assets/logo.png')} />
        <Title>SIGN IN</Title>

        <Input
          autoCapitalize='none'
          label='Your email address'
          keyboardType='email-address'
          onChangeText={handleEmail}
          value={email}
        />
        <Input
          secureTextEntry
          autoCapitalize='none'
          label='Your password'
          onChangeText={handlePassword}
          value={password}
        />

        <Grid.Row>
          <CustomButton loading={isAuthenticating} label='LOGIN' onPress={handleLogin} />
          <CustomButton outline label='CREATE ACCOUNT' onPress={goToSignUp} />
        </Grid.Row>
      </FormScrollView>

      <Snackbar
        visible={snackbar.visible}
        onDismiss={handleDismissSnackBar}
      >
        {snackbar.text}
      </Snackbar>
    </ScreenContainerView>
  )
}

export default SignIn
