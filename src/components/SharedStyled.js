import styled from '@emotion/native'

export const ScreenContainerView = styled.View`
  align-items: center;
  align-self: stretch;
  background-color: white;
  flex: 1;
  padding: 10px;
  width: 100%;
`

export const Loader = styled.ActivityIndicator`
  align-self: center;
  color: ${({ theme }) => theme.colors.primary};
  margin: 15px 0
`

export const SafeAreaView = styled.SafeAreaView`
  flex: 1
`

export const Text = styled.Text`
  color: ${({ theme }) => theme.colors.text.default}
`
