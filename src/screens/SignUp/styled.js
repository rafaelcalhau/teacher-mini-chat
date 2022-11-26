import styled from '@emotion/native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Text } from '../../components/SharedStyled'
import { Button, InputCheckbox, InputText } from '../../components'

export const CustomButton = styled(Button)`
  margin: 5px 0;
`

export const Content = styled(KeyboardAwareScrollView)`
  width: 100%
`

export const Form = styled.View`
  flex: 0.9;
  margin: 10px -10px;
`

export const RadioGroup = styled(InputCheckbox)``

export const Input = styled(InputText)`
  flex: 1;
  margin: 0;
  padding: 5px;
`

export const Logo = styled.Image`
  margin: 0 48px 20px;
  height: 60px;
  width: 183px;
`

export const Row = styled.View`
  align-self: stretch;
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 5px 0px;
`

export const Title = styled(Text)`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 30px
`
