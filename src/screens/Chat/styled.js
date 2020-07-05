import styled from 'styled-components/native'
import VectorIcon from 'react-native-vector-icons/Ionicons'
import { FlatList } from 'react-native'
import { Text } from '../../components/SharedStyled'

export const Body = styled.View`
  flex: 1
`

export const BackButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  height: 40px;
  width: 40px;
`

export const BackIcon = styled(VectorIcon).attrs({
  size: 34
})`
  color: ${({ theme }) => theme.colors.primary}
`

export const Container = styled.View`
  flex: 1;
  padding: 0 20px;
`

export const Header = styled.View`
  align-items: center;
  flex-direction: row;
  height: 82px;
  margin-bottom: 25px
`

export const HeaderBody = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: center;
  padding: 0 20px
`

export const Messages = styled(FlatList)`
  margin: 25px 0
`

export const UserName = styled(Text)`
  color: ${({ theme }) => theme.colors.silver};
  font-size: 22px
`

export const UserType = styled(Text)`
  color: ${({ theme }) => theme.colors.darkgray};
  font-size: 16px
`
