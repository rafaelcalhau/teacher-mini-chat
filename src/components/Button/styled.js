import styled from 'styled-components/native'
import { Text } from '../SharedStyled'

export const Button = styled.TouchableOpacity`
  align-items: center;
  background-color: ${({ outline, theme }) => outline ? 'white' : theme.colors.primary};
  border-color: ${({ theme }) => theme.colors.primary};
  border-width: 1px;
  height: 48px;
  justify-content: center;
  width: ${({ width }) => width || '100%'}
`

export const Label = styled(Text)`
  color: ${({ outline, theme }) => outline ? theme.colors.primary : 'white'};
  font-weight: bold
  margin-top: ${({ loading }) => loading ? '4px' : '0px'};
`
