import styled from 'styled-components/native'
import { KeyboardAvoidingView, Text } from '../../components/SharedStyled'
import { Button, InputText } from '../../components'

export const CustomButton = styled(Button)`
  margin: 10px 0;
`

export const Container = styled(KeyboardAvoidingView)`
  align-items: center;
  background-color: white;
  flex: 1;
  padding: 20px
`

export const Input = styled(InputText).attrs({
  autoCapitalize: 'none',
  autoCorrect: false
})`
  margin: 10px 0
`

export const Logo = styled.Image.attrs({
  source: require('../../assets/logo.png')
})`
  margin: 100px 0 48px;
  height: 28px;
  width: 183px;
`

export const Title = styled(Text)`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 70px
`
