import styled from '@emotion/native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Text } from '@app/components/SharedStyled'
import { Button, InputText } from '@app/components'

export const CustomButton = styled(Button)`
  margin: 5px 0;
`

export const Container = styled.View`
  align-items: center;
  background-color: white;
  flex: 1;
  padding: 20px
`

export const Input = styled(InputText)`
  padding: 10px;
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
