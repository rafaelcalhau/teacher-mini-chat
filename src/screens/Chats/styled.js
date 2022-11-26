import styled from '@emotion/native'
import { FlatList } from 'react-native'
import AntIcons from 'react-native-vector-icons/AntDesign'
import { FAB } from 'react-native-paper'
import { Button, InputText } from '../../components'
import { Text } from '../../components/SharedStyled'

export const AvatarAlumini = styled.Image`
  align-self: center;
  margin-bottom: 25px
`

export const Body = styled.View`
  flex: 1
`

export const ButtonAddContact = styled(FAB)`
  background-color: ${({ theme }) => theme.colors.primary};
  position: absolute;
  right: 20px
  bottom: 20px
`

export const ButtonSubmitNewContact = styled(Button)`
  margin-top: 20px
`

export const ButtonLogout = styled.TouchableOpacity`
  height: 40px;
  width: 40px;
`

export const ContactForm = styled.View`
  align-self: center;
  background-color: white;
  width: 80%;
  padding: 0 30px 30px;
`

export const ContactFormTitle = styled(Text)`
  color: ${({ theme }) => theme.colors.dark};
  font-size: 22px;
  font-weight: 600;
  margin: 20px 0 30px
`

export const ContactsList = styled(FlatList)`
  margin: 25px 0
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

export const Input = styled(InputText)`
  margin: ${({ last }) => !last ? '15px 0 0 0' : '15px 0'}
`

export const Title = styled(Text)`
  color: ${({ theme }) => theme.colors.dark};
  font-size: 28px;
  font-weight: bold;
`

export const HeaderIcon = styled(AntIcons)`
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

export const ZeroContactsText = styled(Text)`
  color: ${({ theme }) => theme.colors.darkgray};
  margin-bottom: 25px;
  font-size: 18px;
  font-weight: 300
`

export const ZeroContactsView = styled.View`
  align-items: center;
  flex: 1;
  flex-direction: column;
  justify-content: center;
`
