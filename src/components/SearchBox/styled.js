import styled from '@emotion/native'
import IonIcon from 'react-native-vector-icons/Ionicons'

export const Container = styled.View`
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: ${({ width }) => width || '100%'}
`

export const Icon = styled(IonIcon)`
  color: ${({ theme }) => theme.colors.silver};
  position: absolute;
  z-index: 9;
  left: 10px;
  top: 12px
`

export const Input = styled.TextInput`
  align-self: stretch;
  color: ${({ theme }) => theme.colors.text.default};
  background-color: #E5E5E5;
  border-radius: 4px;
  padding: 12px 12px 12px 42px;
  margin: 5px 0
`
