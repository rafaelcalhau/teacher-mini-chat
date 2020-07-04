import styled from 'styled-components/native'
import AntIcons from 'react-native-vector-icons/AntDesign'
import { Text } from '../../components/SharedStyled'

export const Body = styled.View`
  align-self: stretch;
  flex: 1
`
export const ButtonLogout = styled.TouchableOpacity`
  height: 40px;
  width: 40px;
`

export const Container = styled.View`
  align-self: stretch;
  flex: 1;
  padding: 0 20px;
`

export const Header = styled.View`
  align-items: center;
  align-self: stretch;
  flex-direction: row;
  height: 82px;
  margin-bottom: 25px
`

export const HeaderBody = styled.View`
  flex: 1;
  flex-direction: column;
  height: 82px;
  justify-content: center;
  padding: 0 20px
`

export const Title = styled(Text)`
  color: ${({ theme }) => theme.colors.dark};
  font-size: 24px
`

export const HeaderIcon = styled(AntIcons).attrs({
  size: 34
})`
  color: ${({ theme }) => theme.colors.primary}
`

export const UserName = styled(Text)`
  color: ${({ theme }) => theme.colors.silver};
  font-size: 22px
`

export const UserType = styled(Text)`
  color: ${({ theme }) => theme.colors.darkgray};
  font-size: 16px
`
