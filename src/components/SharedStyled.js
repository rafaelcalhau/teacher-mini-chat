import styled from 'styled-components/native'

export const SafeAreaView = styled.SafeAreaView`
  flex: 1
`

export const Text = styled.Text`
  color: ${({ theme }) => theme.colors.text.default}
`
