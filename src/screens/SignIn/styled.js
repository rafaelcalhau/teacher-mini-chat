import styled from 'styled-components/native'
import KeyboardAwareScrollView from '@pietile-native-kit/keyboard-aware-scrollview'
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

export const Content = styled(KeyboardAwareScrollView).attrs({
  contentContainerStyle: {
    alignItems: 'center',
    alignSelf: 'stretch',
    flex: 1
  }
})`
  width: 100%
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
