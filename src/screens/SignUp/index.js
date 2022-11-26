import React, { useContext, useState } from 'react'
import { Keyboard } from 'react-native'
import { Snackbar } from 'react-native-paper'
import { store } from '../../store'
import {
  Content,
  CustomButton,
  Form,
  Input,
  Logo,
  RadioGroup,
  Row,
  Title
} from './styled'
import { User as UserStorage } from '../../services/localstorage'
import { isValidEmail, formatUserData } from '../../modules/utils'
import { registerProfile, signup } from '../../services/firebase'
import { authenticate } from '../../store/actions'
import { ScreenContainerView } from '../../components/SharedStyled'

function SignUp ({ navigation }) {
  const { dispatch } = useContext(store)
  const [accountType, handleAccountType] = useState(null)
  const [name, handleName] = useState('')
  const [email, handleEmail] = useState('')
  const [password, handlePassword] = useState('')
  const [passwordConfirmation, handlePasswordConfirmation] = useState('')
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
      setSnack('Please select between Teacher and Student')
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
      const { user } = await signup(email, password)
        .catch(error => {
          const errorCode = error.code
          const errorMessage = error.message

          if (errorCode === 'auth/weak-password') {
            setSnack('The password is too weak.')
          } else {
            setSnack(errorMessage)
          }
        })

      if (user) {
        const profile = formatUserData({ ...user._user, displayName })

        // Register profile on database
        await registerProfile(profile.uid, {
          accountType,
          name: displayName
        })

        // Register on global state
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
    <ScreenContainerView onTouchStart={() => Keyboard.dismiss()}>
      <Content
        contentContainerStyle={{
          alignItems: 'center',
          alignSelf: 'stretch',
          justifyContent: 'center',
          padding: 5,
          flex: 1
        }}
      >
        <Logo source={require('../../assets/logo.png')} />
        <Title>SIGN UP</Title>

        <Form>
          <RadioGroup
            horizontal
            radio
            label='You are...'
            onChange={handleAccountType}
            options={[
              { label: 'Teacher', value: 'teacher' },
              { label: 'Student', value: 'student' }
            ]}
            optionWidth='40%'
            value={accountType}
            width='80%'
          />

          <Row>
            <Input
              autoCapitalize='none'
              label='Your name'
              onChangeText={handleName}
              value={name}
              width='80%'
            />
          </Row>
          
          <Row>
            <Input
              autoCapitalize='none'
              label='Your email address'
              onChangeText={handleEmail}
              value={email}
              width='80%'
            />
          </Row>

          <Row>
            <Input
              secureTextEntry
              autoCapitalize='none'
              label='Your password'
              onChangeText={handlePassword}
              value={password}
              width='80%'
            />
            <Input
              autoCapitalize='none'
              secureTextEntry
              label='Confirm password'
              onChangeText={handlePasswordConfirmation}
              value={passwordConfirmation}
              width='80%'
            />
          </Row>
        </Form>

        <CustomButton loading={isAuthenticating} label='REGISTER' width='80%' onPress={handleRegister} />
        <CustomButton outline label='BACK' width='80%' onPress={handleBack} />
      </Content>

      <Snackbar
        visible={snackbar.visible}
        onDismiss={handleDismissSnackBar}
      >
        {snackbar.text}
      </Snackbar>
    </ScreenContainerView>
  )
}

export default SignUp
