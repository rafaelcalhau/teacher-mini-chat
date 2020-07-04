import React, { useContext, useState } from 'react'
import { Keyboard } from 'react-native'
import { Snackbar } from 'react-native-paper'
import auth from '@react-native-firebase/auth'
import { store } from '../../store'
import { Container, Content, CustomButton, Input, Logo, RadioGroup, Title } from './styled'
import { User as UserStorage } from '../../modules/localstorage'
import { isValidEmail, formatUserData } from '../../modules/utils'
import { authenticate } from '../../store/actions'

function SignUp ({ navigation }) {
  const { dispatch } = useContext(store)
  const [accountType, handleAccountType] = useState(null)
  const [name, handleName] = useState('Rafael Santos')
  const [email, handleEmail] = useState('rafaelcalhau@yahoo.com')
  const [password, handlePassword] = useState('123123')
  const [passwordConfirmation, handlePasswordConfirmation] = useState('123123')
  const [isAuthenticating, setIsAuthenticating] = useState(false)
  const [snackbar, handleSnackbar] = useState({ visible: false, text: '' })

  function handleBack () {
    navigation.goBack()
  }

  function handleDismissSnackBar () {
    handleSnackbar({ visible: false, text: '' })
  }

  async function handleRegister () {
    if (!accountType) {
      setSnack('Please select between Teacher and Alumni')
    } else if (!name.length) {
      setSnack('Please enter your Name')
    } else if (!isValidEmail(email)) {
      setSnack('Please enter a valid Email Address')
    } else if (password.length < 6) {
      setSnack('Your password must have atleast 6 characters.')
    } else if (passwordConfirmation !== password) {
      setSnack('Your password confirmation failed.')
    } else {
      setIsAuthenticating(true)

      const displayName = name
      const { user } = await auth()
        .createUserWithEmailAndPassword(email, password)
        .catch(error => {
          const errorCode = error.code
          const errorMessage = error.message

          if (errorCode === 'auth/weak-password') {
            setSnack('The password is too weak.')
          } else {
            setSnack(errorMessage)
          }
        })

      // Register the name
      auth().currentUser.updateProfile({ displayName })

      if (user) {
        const profile = formatUserData({ ...user._user, displayName })
        dispatch(authenticate(profile))

        // Register user on local storage
        UserStorage.put({ accountType, ...profile })
      } else {
        setSnack('Sorry, something wrong happened.')
      }

      setIsAuthenticating(false)
    }
  }

  function setSnack (text = '') {
    handleSnackbar({ visible: true, text })
  }

  return (
    <Container onTouchStart={() => Keyboard.dismiss()}>
      <Content>
        <Logo />
        <Title>SIGN UP</Title>

        <RadioGroup
          horizontal
          radio
          label='You are...'
          onChange={handleAccountType}
          options={[
            { label: 'Teacher', value: 'teacher' },
            { label: 'Alumni', value: 'alumni' }
          ]}
          optionWidth='42%'
          value={accountType}
          width='80%'
        />

        <Input
          label='Your name'
          onChangeText={handleName}
          value={name}
          width='80%'
        />
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
        <Input
          last
          secureTextEntry
          label='Confirme your password'
          onChangeText={handlePasswordConfirmation}
          value={passwordConfirmation}
          width='80%'
        />

        <CustomButton loading={isAuthenticating} label='REGISTER' width='80%' onPress={handleRegister} />
        <CustomButton outline label='BACK' width='80%' onPress={handleBack} />
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

export default SignUp
