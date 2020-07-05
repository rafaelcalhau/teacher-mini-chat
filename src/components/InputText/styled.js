import styled from 'styled-components/native'
import { Text } from '../../components/SharedStyled'

export const Container = styled.View`
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: ${({ width }) => width || '100%'}
`

export const Label = styled(Text)`
  align-self: stretch;
  text-align: ${({ align }) => align || 'left'}
  width: ${({ width }) => width || '100%'}
`

export const TextInput = styled.TextInput`
  align-self: stretch;
  border-bottom-color: ${({ theme }) => theme.colors.gray};
  border-bottom-width: 1px;
  color: ${({ theme }) => theme.colors.text.default};
  font-size: 16px;
  padding: 5px;
  text-align: ${({ align }) => align || 'left'}
`
