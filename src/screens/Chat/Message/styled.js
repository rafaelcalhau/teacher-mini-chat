import styled from 'styled-components/native'
import { Text as BaseText } from '../../../components/SharedStyled'

export const Bubble = styled.View`
  align-self: ${({ self }) => self ? 'flex-end' : 'flex-start'};
  background-color: ${({ self, theme }) => !self ? theme.colors.primaryLight : theme.colors.primary}
  border-radius: 5px;
  flex-direction: row;
  padding: 15px 25px 20px 15px;
  min-width: 100px;
`

export const BubbleArrow = styled.View`
  border-color: ${({ self, theme }) => !self ? theme.colors.primaryLight : theme.colors.primary}
  ${
    ({ self, theme }) => self
      ? `
      border-top-color: transparent;
      border-right-color: transparent;
      border-bottom-color: ${({ theme }) => theme.colors.primary};
      border-left-color: transparent;
      border-top-width: 0;
      border-right-width: 15px;
      border-bottom-width: 10px;
      border-left-width: 10px;
      border-top-right-radius: 5px;
    `
      : `
      border-top-color: transparent;
      border-right-color: ${({ theme }) => theme.colors.primaryLight};
      border-bottom-color: transparent;
      border-left-color: transparent;
      border-top-width: 0;
      border-right-width: 15px;
      border-bottom-width: 10px;
      border-left-width: 10px;
      border-top-left-radius: 5px;
    `
  }
  width: 0px;
  height: 0px;
  position: absolute;
  bottom: 20px;
  left: ${({ self, theme }) => self ? 'auto' : '0'};
  right: ${({ self, theme }) => self ? '0' : 'auto'};
  z-index: -1
`

export const Text = styled(BaseText)`
  color: ${({ self, theme }) => !self ? theme.colors.text.default : theme.colors.primaryLight}
  font-size: 14px;
`

export const Time = styled(BaseText)`
  color: ${({ theme }) => theme.colors.gray}
  font-size: 10px;
  position: absolute;
  right: 6px;
  bottom: 6px;
`

export const Wrapper = styled.View`
  padding: 5px 15px;
  margin: 2px 0
`
