import styled from 'styled-components/native'
import { Platform } from 'react-native'

const behavior = Platform.select({
  android: 'height',
  ios: 'padding'
})

export const KeyboardAvoidingView = styled.KeyboardAvoidingView.attrs({
  behavior
})``

export const SafeAreaView = styled.SafeAreaView`
  flex: 1
`

export const Text = styled.Text`
  color: ${({ theme }) => theme.colors.text.default}
`
