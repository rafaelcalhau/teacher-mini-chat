import React, { useContext, useState } from 'react'
import { Keyboard } from 'react-native'
import { Snackbar } from 'react-native-paper'
import { store } from '@app/store'
import {
  CustomButton,
  Form,
  Input,
  Logo,
  RadioGroup,
  Title
} from './styled'
import { User as UserStorage } from '@app/services/localstorage'
import { isValidEmail, formatUserData } from '@app/modules/utils'
import { registerProfile, signup } from '@app/services/firebase'
import { authenticate } from '@app/store/actions'
import {
  FormScrollView,
  Grid,
  ScreenContainerView
} from '@app/components/SharedStyled'

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
      <FormScrollView
        contentContainerStyle={{
          alignItems: 'center',
          alignSelf: 'stretch',
          justifyContent: 'center',
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

          <Grid.Row>
            <Grid.Column>
              <Input
                autoCapitalize='none'
                label='Your name'
                onChangeText={handleName}
                value={name}
              />
            </Grid.Column>
          </Grid.Row>
          
          <Grid.Row>
            <Grid.Column>
              <Input
                autoCapitalize='none'
                label='Your email address'
                onChangeText={handleEmail}
                value={email}
              />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row direction='row'>
            <Grid.Column size='50%'>
              <Input
                secureTextEntry
                autoCapitalize='none'
                label='Your password'
                onChangeText={handlePassword}
                value={password}
              />
            </Grid.Column>
            <Grid.Column size='50%'>
              <Input
                autoCapitalize='none'
                secureTextEntry
                label='Confirm password'
                onChangeText={handlePasswordConfirmation}
                value={passwordConfirmation}
              />
            </Grid.Column>
          </Grid.Row>
        </Form>

        <CustomButton loading={isAuthenticating} label='REGISTER' onPress={handleRegister} />
        <CustomButton outline label='BACK' onPress={handleBack} />
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

export default SignUp
