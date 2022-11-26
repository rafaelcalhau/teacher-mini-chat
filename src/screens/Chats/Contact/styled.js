import styled from '@emotion/native'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5'
import { Avatar as PaperAvatar, Badge as PaperBadge } from 'react-native-paper'
import { Text } from '../../../components/SharedStyled'

export const Avatar = styled(PaperAvatar.Image)`
  background-color: transparent
`

export const AvatarView = styled.View`
  align-items: flex-start;
  justify-content: center;
  padding: 0 5px
`

export const Badge = styled(PaperBadge)`
  align-self: center;
  background-color: ${({ theme }) => theme.colors.primary}
`

export const Body = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: center;
  padding: 0 10px;
`

export const Container = styled.TouchableOpacity`
  flex-direction: row;
  padding: 10px 0;
`

export const Details = styled.View`
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: 50px
`

export const Icon = styled(FontAwesomeIcon)`
  color: ${({ theme }) => theme.colors.darkgray};
  bottom: -8px;
  padding: 5px;
  position: absolute;
  right: -5px;
  z-index: 9;
`

export const Name = styled(Text)`
  color: ${({ theme }) => theme.colors.silver};
  font-size: 14px;
`

export const LastMessage = styled(Text)`
  color: ${({ theme }) => theme.colors.darkgray}
  font-size: 11px;
`

export const Time = styled(Text)`
  color: ${({ theme }) => theme.colors.text.default}
  font-size: 10px;
  margin-bottom: 3px
`
