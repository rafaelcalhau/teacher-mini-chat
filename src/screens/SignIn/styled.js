import styled from '@emotion/native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Text } from '../../components/SharedStyled'
import { Button, InputText } from '../../components'

export const CustomButton = styled(Button)`
  margin: 10px 0;
`

export const Container = styled.View`
  align-items: center;
  background-color: white;
  flex: 1;
  padding: 20px
`

export const Content = styled(KeyboardAwareScrollView)`
  width: 100%
`

export const Input = styled(InputText)`
  margin: 10px 0
`

export const Logo = styled.Image`
  margin: 40px 0 48px;
  height: 60px;
  width: 183px;
`

export const Title = styled(Text)`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 70px
`
