import React from 'react'
import { Keyboard } from 'react-native'
import { Container, CustomButton, Input, Logo, Title } from './styled'

function SignIn () {
  return (
    <Container onTouchStart={() => Keyboard.dismiss()}>
      <Logo />
      <Title>SIGN IN</Title>

      <Input
        align='center'
        label='Your email address'
        width='80%'
        onTouchStart={e => e.preventDefault()}
      />
      <Input
        align='center'
        label='Your password'
        margin='15px 0 0 0'
        width='80%'
      />

      <CustomButton label='LOGIN' width='80%' />
      <CustomButton outline label='CREATE ACCOUNT' width='80%' />
    </Container>
  )
}

export default SignIn
