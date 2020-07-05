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
  margin-bottom: 10px;
  text-align: ${({ align }) => align || 'left'}
  width: ${({ width }) => width || '100%'}
`

export const Options = styled.View`
  align-items: center;
  flex-wrap: wrap;
  flex-direction: ${({ horizontal }) => horizontal ? 'row' : 'column'};
  justify-content: ${({ align }) => align || 'flex-start'};
  width: 100%
`
